import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Vendor, VendorDocument } from './schemas/vendor.schema';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { DeleteVendorDto } from './dto/delete-vendor.dto';
import { QueryVendorDto } from './dto/query-vendor.dto';
import { QueryBuilderUtil } from '../../common/utils/query-builder.util';
import { PopulateBuilderUtil } from '../../common/utils/populate-builder.util';

@Injectable()
export class VendorService {
  constructor(@InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>) {}

  async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
    try {
      if (createVendorDto.createdBy && !isValidObjectId(createVendorDto.createdBy)) {
        throw new BadRequestException('Invalid createdBy ObjectId');
      }

      const now = Date.now();
      const vendor = new this.vendorModel({
        ...createVendorDto,
        createdAt: now,
        updatedAt: now,
      });

      return await vendor.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Vendor with this email already exists');
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(queryDto: QueryVendorDto): Promise<{ data: Vendor[]; total: number; page: number; limit: number; totalPages: number }> {
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
        this.vendorModel
          .find(searchQuery)
          .populate(populateOptions)
          .skip(skip)
          .limit(limit)
          .lean(),
        this.vendorModel.countDocuments(searchQuery),
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

  async update(updateVendorDto: UpdateVendorDto): Promise<Vendor> {
    try {
      const { _id, updatedBy, ...updateData } = updateVendorDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid vendor ObjectId');
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

      const vendor = await this.vendorModel
        .findOneAndUpdate(
          { _id, isDeleted: false },
          { $set: updatePayload },
          { new: true }
        )
        .lean();

      if (!vendor) {
        throw new NotFoundException('Vendor not found');
      }

      return vendor;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Vendor with this email already exists');
      }
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(deleteVendorDto: DeleteVendorDto): Promise<{ message: string }> {
    try {
      const { _id } = deleteVendorDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid vendor ObjectId');
      }

      const result = await this.vendorModel.updateOne(
        { _id, isDeleted: false },
        {
          $set: {
            isDeleted: true,
            deletedAt: Date.now(),
          },
        }
      );

      if (result.matchedCount === 0) {
        throw new NotFoundException('Vendor not found');
      }

      return { message: 'Vendor deleted successfully' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
