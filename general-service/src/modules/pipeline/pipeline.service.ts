import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Pipeline, PipelineDocument } from './schemas/pipeline.schema';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { DeletePipelineDto } from './dto/delete-pipeline.dto';
import { QueryPipelineDto } from './dto/query-pipeline.dto';
import { QueryBuilderUtil } from '../../common/utils/query-builder.util';
import { PopulateBuilderUtil } from '../../common/utils/populate-builder.util';

@Injectable()
export class PipelineService {
  constructor(@InjectModel(Pipeline.name) private pipelineModel: Model<PipelineDocument>) {}

  async create(createPipelineDto: CreatePipelineDto): Promise<Pipeline> {
    try {
      const now = Date.now();
      const pipeline = new this.pipelineModel({
        ...createPipelineDto,
        createdAt: now,
        updatedAt: now,
      });

      return await pipeline.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Pipeline with this ref number already exists');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(queryDto: QueryPipelineDto): Promise<{ data: Pipeline[]; total: number; page: number; limit: number; totalPages: number }> {
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
        this.pipelineModel
          .find(searchQuery)
          .populate(populateOptions)
          .skip(skip)
          .limit(limit)
          .lean(),
        this.pipelineModel.countDocuments(searchQuery),
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

  async update(updatePipelineDto: UpdatePipelineDto): Promise<Pipeline> {
    try {
      const { _id, ...updateData } = updatePipelineDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid pipeline ObjectId');
      }

      const updatePayload: any = {
        ...updateData,
        updatedAt: Date.now(),
      };

      const pipeline = await this.pipelineModel
        .findOneAndUpdate(
          { _id, isDeleted: false },
          { $set: updatePayload },
          { new: true }
        )
        .lean();

      if (!pipeline) {
        throw new NotFoundException('Pipeline not found');
      }

      return pipeline;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Pipeline with this ref number already exists');
      }
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(deletePipelineDto: DeletePipelineDto): Promise<{ message: string }> {
    try {
      const { _id } = deletePipelineDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid pipeline ObjectId');
      }

      const result = await this.pipelineModel.updateOne(
        { _id, isDeleted: false },
        {
          $set: {
            isDeleted: true,
            deletedAt: Date.now(),
          },
        }
      );

      if (result.matchedCount === 0) {
        throw new NotFoundException('Pipeline not found');
      }

      return { message: 'Pipeline deleted successfully' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
