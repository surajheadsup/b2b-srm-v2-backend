import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { QueryBuilderUtil } from '../../common/utils/query-builder.util';
import { PopulateBuilderUtil } from '../../common/utils/populate-builder.util';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const productData: any = {
        ...createProductDto,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      if (createProductDto.createdBy) {
        if (!Types.ObjectId.isValid(createProductDto.createdBy)) {
          throw new BadRequestException('Invalid createdBy ID format');
        }
        productData.createdBy = new Types.ObjectId(createProductDto.createdBy);
      }

      const product = new this.productModel(productData);
      return await product.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Product already exists');
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to create product: ${error.message}`);
    }
  }

  async findAll(queryDto: QueryProductDto): Promise<PaginationResult<Product>> {
    try {
      const { page = 1, limit = 10, search = {}, populate = [] } = queryDto;

      if (page < 1) throw new BadRequestException('Page must be greater than 0');
      if (limit < 1 || limit > 100) throw new BadRequestException('Limit must be between 1 and 100');

      const searchQuery = QueryBuilderUtil.buildSearchQuery(search);
      searchQuery.isDeleted = false;

      const populateConfig = PopulateBuilderUtil.buildPopulateArray(populate);
      const skip = (page - 1) * limit;

      let query = this.productModel.find(searchQuery).skip(skip).limit(limit).sort({ createdAt: -1 });
      // Replace the populate section (around line 68-72) with:
      if (populateConfig.length > 0) {
        populateConfig.forEach((config: any) => {
          query = query.populate(config) as any;
        });
      }
      const [data, total] = await Promise.all([
        query.exec(),
        this.productModel.countDocuments(searchQuery),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data,
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(`Failed to fetch products: ${error.message}`);
    }
  }

  async update(updateProductDto: UpdateProductDto): Promise<Product> {
  try {
    const { id, ...updateData } = updateProductDto;

    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID format');
    }

    if (updateData.updatedBy) {
      if (!Types.ObjectId.isValid(updateData.updatedBy)) {
        throw new BadRequestException('Invalid updatedBy ID format');
      }
      (updateData as any).updatedBy = new Types.ObjectId(updateData.updatedBy);
    }

    (updateData as any).updatedAt = Date.now();

    const product = await this.productModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  } catch (error) {
    if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
    if (error.code === 11000) throw new ConflictException('Duplicate entry');
    throw new InternalServerErrorException(`Failed to update product: ${error.message}`);
  }
}

  async remove(deleteProductDto: DeleteProductDto): Promise<{ message: string }> {
    try {
      const { id } = deleteProductDto;

      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid product ID format');
      }

      const product = await this.productModel.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { $set: { isDeleted: true, deletedAt: Date.now() } },
        { new: true },
      );

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return { message: 'Product deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(`Failed to delete product: ${error.message}`);
    }
  }

  async validateProducts(productIds: string[]): Promise<boolean> {
    try {
      if (!productIds || productIds.length === 0) {
        throw new BadRequestException('No IDs provided');
      }

      const invalidIds = productIds.filter((id) => !Types.ObjectId.isValid(id));
      if (invalidIds.length > 0) {
        throw new BadRequestException(`Invalid IDs: ${invalidIds.join(', ')}`);
      }

      const objectIds = productIds.map((id) => new Types.ObjectId(id));
      const count = await this.productModel.countDocuments({
        _id: { $in: objectIds },
        isDeleted: false,
      });

      return count === productIds.length;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(`Validation failed: ${error.message}`);
    }
  }
}