import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DeleteCustomerDto } from './dto/delete-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
import { ResponseUtil } from '../../common/utils/response.util';
import { TimeoutInterceptor } from '../../common/interceptors/timeout.interceptor';

@Controller()
@UseInterceptors(TimeoutInterceptor)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('create-customer')
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.create(createCustomerDto);
    return ResponseUtil.created(customer, 'Customer created successfully');
  }

  @Post('get-customers')
  async findAll(@Body() queryDto: QueryCustomerDto) {
    const result = await this.customerService.findAll(queryDto);
    return ResponseUtil.paginated(
      result.data,
      result.total,
      result.page,
      result.limit,
      'Customers retrieved successfully'
    );
  }

  @Post('update-customer')
  async update(@Body() updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerService.update(updateCustomerDto);
    return ResponseUtil.success(customer, 'Customer updated successfully');
  }

  @Post('delete-customer')
  async remove(@Body() deleteCustomerDto: DeleteCustomerDto) {
    const result = await this.customerService.remove(deleteCustomerDto);
    return ResponseUtil.success(result.message);
  }
}
