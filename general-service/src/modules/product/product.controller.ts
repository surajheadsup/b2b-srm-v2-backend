import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { ResponseUtil } from '../../common/utils/response.util';
import { TimeoutInterceptor } from '../../common/interceptors/timeout.interceptor';

@Controller('product')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
@UseInterceptors(TimeoutInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create-product')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return ResponseUtil.created(product, 'Product created successfully');
  }

  @Post('get-products')
  @HttpCode(HttpStatus.OK)
  async findAll(@Body() queryDto: QueryProductDto) {
    const result = await this.productService.findAll(queryDto);
    return ResponseUtil.paginated(
      result.data,
      result.total,
      result.page,
      result.limit,
      'Products fetched successfully',
    );
  }

  @Post('update-product')
  @HttpCode(HttpStatus.OK)
  async update(@Body() updateProductDto: UpdateProductDto) {
    const product = await this.productService.update(updateProductDto);
    return ResponseUtil.success(product, 'Product updated successfully');
  }

  @Post('delete-product')
  @HttpCode(HttpStatus.OK)
  async remove(@Body() deleteProductDto: DeleteProductDto) {
    const result = await this.productService.remove(deleteProductDto);
    return ResponseUtil.success(result, 'Product deleted successfully');
  }
}