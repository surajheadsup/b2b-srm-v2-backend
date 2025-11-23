import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DeleteOrderDto } from './dto/delete-order.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import { QueryBuilderUtil } from '../../common/utils/query-builder.util';
import { PopulateBuilderUtil } from '../../common/utils/populate-builder.util';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      if (!isValidObjectId(createOrderDto.createdBy)) {
        throw new BadRequestException('Invalid createdBy ObjectId');
      }

      const now = Date.now();
      const order = new this.orderModel({
        ...createOrderDto,
        createdAt: now,
        updatedAt: now,
      });

      return await order.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Order with this order number or invoice number already exists');
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(queryDto: QueryOrderDto): Promise<{ data: Order[]; total: number; page: number; limit: number; totalPages: number }> {
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
        this.orderModel
          .find(searchQuery)
          .populate(populateOptions)
          .skip(skip)
          .limit(limit)
          .lean(),
        this.orderModel.countDocuments(searchQuery),
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

  async update(updateOrderDto: UpdateOrderDto): Promise<Order> {
    try {
      const { _id, updatedBy, ...updateData } = updateOrderDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid order ObjectId');
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

      const order = await this.orderModel
        .findOneAndUpdate(
          { _id, isDeleted: false },
          { $set: updatePayload },
          { new: true }
        )
        .lean();

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      return order;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Order with this order number or invoice number already exists');
      }
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(deleteOrderDto: DeleteOrderDto): Promise<{ message: string }> {
    try {
      const { _id } = deleteOrderDto;

      if (!isValidObjectId(_id)) {
        throw new BadRequestException('Invalid order ObjectId');
      }

      const result = await this.orderModel.updateOne(
        { _id, isDeleted: false },
        {
          $set: {
            isDeleted: true,
            deletedAt: Date.now(),
          },
        }
      );

      if (result.matchedCount === 0) {
        throw new NotFoundException('Order not found');
      }

      return { message: 'Order deleted successfully' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
