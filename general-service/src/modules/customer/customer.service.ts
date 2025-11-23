import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DeleteCustomerDto } from './dto/delete-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
import { QueryBuilderUtil } from '../../common/utils/query-builder.util';
import { PopulateBuilderUtil } from '../../common/utils/populate-builder.util';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      if (createCustomerDto.createdBy && !isValidObjectId(createCustomerDto.createdBy)) {
        throw new BadRequestException('Invalid createdBy ObjectId');
      }

      const now = Date.now();
      const customer = new this.customerModel({
        ...createCustomerDto,
        createdAt: now,
        updatedAt: now,
      });

      return await customer.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Customer with this email already exists');
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(queryDto: QueryCustomerDto): Promise<{ data: Customer[]; total: number; page: number; limit: number; totalPages: number }> {
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
        this.customerModel
          .find(searchQuery)
          .populate(populateOptions)
          .skip(skip)
          .limit(limit)
          .lean(),
        this.customerModel.countDocuments(searchQuery),
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

  async update(updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    try {
      const { _id, updatedBy, ...updateData } = updateCustomerDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid customer ObjectId');
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

      const customer = await this.customerModel
        .findOneAndUpdate(
          { _id, isDeleted: false },
          { $set: updatePayload },
          { new: true }
        )
        .lean();

      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      return customer;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Customer with this email already exists');
      }
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(deleteCustomerDto: DeleteCustomerDto): Promise<{ message: string }> {
    try {
      const { _id } = deleteCustomerDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid customer ObjectId');
      }

      const result = await this.customerModel.updateOne(
        { _id, isDeleted: false },
        {
          $set: {
            isDeleted: true,
            deletedAt: Date.now(),
          },
        }
      );

      if (result.matchedCount === 0) {
        throw new NotFoundException('Customer not found');
      }

      return { message: 'Customer deleted successfully' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
