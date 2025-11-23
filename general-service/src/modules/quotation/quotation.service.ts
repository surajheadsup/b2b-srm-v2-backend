import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Quotation, QuotationDocument } from './schemas/quotation.schema';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { DeleteQuotationDto } from './dto/delete-quotation.dto';
import { QueryQuotationDto } from './dto/query-quotation.dto';
import { QueryBuilderUtil } from '../../common/utils/query-builder.util';
import { PopulateBuilderUtil } from '../../common/utils/populate-builder.util';

@Injectable()
export class QuotationService {
  constructor(@InjectModel(Quotation.name) private quotationModel: Model<QuotationDocument>) {}

  async create(createQuotationDto: CreateQuotationDto): Promise<Quotation> {
    try {
      const now = Date.now();
      const quotation = new this.quotationModel({
        ...createQuotationDto,
        createdAt: now,
        updatedAt: now,
      });

      return await quotation.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Quotation with this quotation number already exists');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(queryDto: QueryQuotationDto): Promise<{ data: Quotation[]; total: number; page: number; limit: number; totalPages: number }> {
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
        this.quotationModel
          .find(searchQuery)
          .populate(populateOptions)
          .skip(skip)
          .limit(limit)
          .lean(),
        this.quotationModel.countDocuments(searchQuery),
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

  async update(updateQuotationDto: UpdateQuotationDto): Promise<Quotation> {
    try {
      const { _id, ...updateData } = updateQuotationDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid quotation ObjectId');
      }

      const updatePayload: any = {
        ...updateData,
        updatedAt: Date.now(),
      };

      const quotation = await this.quotationModel
        .findOneAndUpdate(
          { _id, isDeleted: false },
          { $set: updatePayload },
          { new: true }
        )
        .lean();

      if (!quotation) {
        throw new NotFoundException('Quotation not found');
      }

      return quotation;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Quotation with this quotation number already exists');
      }
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(deleteQuotationDto: DeleteQuotationDto): Promise<{ message: string }> {
    try {
      const { _id } = deleteQuotationDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid quotation ObjectId');
      }

      const result = await this.quotationModel.updateOne(
        { _id, isDeleted: false },
        {
          $set: {
            isDeleted: true,
            deletedAt: Date.now(),
          },
        }
      );

      if (result.matchedCount === 0) {
        throw new NotFoundException('Quotation not found');
      }

      return { message: 'Quotation deleted successfully' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
