import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { QueryBuilderUtil } from '../../common/utils/query-builder.util';
import { PopulateBuilderUtil } from '../../common/utils/populate-builder.util';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      if (createUserDto.createdBy && !isValidObjectId(createUserDto.createdBy)) {
        throw new BadRequestException('Invalid createdBy ObjectId');
      }

      // Hash password before storing
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const now = Date.now();
      const user = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
        createdAt: now,
        updatedAt: now,
      });

      const savedUser = await user.save();

      // Return user without password
      const { password: _, ...userObject } = savedUser.toObject();
      return userObject as any;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User with this email or username already exists');
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(queryDto: QueryUserDto): Promise<{ data: User[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const { page = 1, limit = 10, search = {}, populate = [] } = queryDto;

      if (page < 1 || limit < 1 || limit > 100) {
        throw new BadRequestException('Invalid pagination parameters');
      }

      const searchQuery = QueryBuilderUtil.buildSearchQuery(search);
      searchQuery.isDeleted = false;

      const populateOptions = PopulateBuilderUtil.buildPopulateArray(populate);

      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        this.userModel
          .find(searchQuery)
          .populate(populateOptions)
          .select('-password')
          .skip(skip)
          .limit(limit)
          .lean(),
        this.userModel.countDocuments(searchQuery),
      ]);

      return {
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const { _id, updatedBy, password, ...updateData } = updateUserDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid user ObjectId');
      }

      if (updatedBy && !isValidObjectId(updatedBy)) {
        throw new BadRequestException('Invalid updatedBy ObjectId');
      }

      const updatePayload: any = {
        ...updateData,
        updatedAt: Date.now(),
      };

      if (updatedBy) {
        updatePayload.updatedBy = updatedBy;
      }

      // Hash password if provided
      if (password) {
        updatePayload.password = await bcrypt.hash(password, 10);
      }

      const user = await this.userModel
        .findOneAndUpdate(
          { _id, isDeleted: false },
          { $set: updatePayload },
          { new: true }
        )
        .select('-password')
        .lean();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User with this email or username already exists');
      }
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(deleteUserDto: DeleteUserDto): Promise<{ message: string }> {
    try {
      const { _id } = deleteUserDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid user ObjectId');
      }

      const result = await this.userModel.updateOne(
        { _id, isDeleted: false },
        {
          $set: {
            isDeleted: true,
            deletedAt: Date.now(),
          },
        }
      );

      if (result.matchedCount === 0) {
        throw new NotFoundException('User not found');
      }

      return { message: 'User deleted successfully' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
