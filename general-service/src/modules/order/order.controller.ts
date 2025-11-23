import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DeleteOrderDto } from './dto/delete-order.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import { ResponseUtil } from '../../common/utils/response.util';
import { TimeoutInterceptor } from '../../common/interceptors/timeout.interceptor';

@Controller()
@UseInterceptors(TimeoutInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create-order')
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.create(createOrderDto);
    return ResponseUtil.created(order, 'Order created successfully');
  }

  @Post('get-orders')
  async findAll(@Body() queryDto: QueryOrderDto) {
    const result = await this.orderService.findAll(queryDto);
    return ResponseUtil.paginated(
      result.data,
      result.total,
      result.page,
      result.limit,
      'Orders retrieved successfully'
    );
  }

  @Post('update-order')
  async update(@Body() updateOrderDto: UpdateOrderDto) {
    const order = await this.orderService.update(updateOrderDto);
    return ResponseUtil.success(order, 'Order updated successfully');
  }

  @Post('delete-order')
  async remove(@Body() deleteOrderDto: DeleteOrderDto) {
    const result = await this.orderService.remove(deleteOrderDto);
    return ResponseUtil.success(result.message);
  }
}
