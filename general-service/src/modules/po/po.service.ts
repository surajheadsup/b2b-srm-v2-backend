import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Po, PoDocument } from './schemas/po.schema';
import { CreatePoDto } from './dto/create-po.dto';
import { UpdatePoDto } from './dto/update-po.dto';
import { DeletePoDto } from './dto/delete-po.dto';
import { QueryPoDto } from './dto/query-po.dto';
import { QueryBuilderUtil } from '../../common/utils/query-builder.util';
import { PopulateBuilderUtil } from '../../common/utils/populate-builder.util';

@Injectable()
export class PoService {
  constructor(@InjectModel(Po.name) private poModel: Model<PoDocument>) {}

  async create(createPoDto: CreatePoDto): Promise<Po> {
    try {
      if (!isValidObjectId(createPoDto.createdBy)) {
        throw new BadRequestException('Invalid createdBy ObjectId');
      }

      const now = Date.now();
      const po = new this.poModel({
        ...createPoDto,
        createdAt: now,
        updatedAt: now,
      });

      return await po.save();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(queryDto: QueryPoDto): Promise<{ data: Po[]; total: number; page: number; limit: number; totalPages: number }> {
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
        this.poModel
          .find(searchQuery)
          .populate(populateOptions)
          .skip(skip)
          .limit(limit)
          .lean(),
        this.poModel.countDocuments(searchQuery),
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

  async update(updatePoDto: UpdatePoDto): Promise<Po> {
    try {
      const { _id, updatedBy, ...updateData } = updatePoDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid PO ObjectId');
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

      const po = await this.poModel
        .findOneAndUpdate(
          { _id, isDeleted: false },
          { $set: updatePayload },
          { new: true }
        )
        .lean();

      if (!po) {
        throw new NotFoundException('PO not found');
      }

      return po;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(deletePoDto: DeletePoDto): Promise<{ message: string }> {
    try {
      const { _id } = deletePoDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid PO ObjectId');
      }

      const result = await this.poModel.updateOne(
        { _id, isDeleted: false },
        {
          $set: {
            isDeleted: true,
            deletedAt: Date.now(),
          },
        }
      );

      if (result.matchedCount === 0) {
        throw new NotFoundException('PO not found');
      }

      return { message: 'PO deleted successfully' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
