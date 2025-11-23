import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { DeleteQuotationDto } from './dto/delete-quotation.dto';
import { QueryQuotationDto } from './dto/query-quotation.dto';
import { ResponseUtil } from '../../common/utils/response.util';
import { TimeoutInterceptor } from '../../common/interceptors/timeout.interceptor';

@Controller()
@UseInterceptors(TimeoutInterceptor)
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post('create-quotation')
  async create(@Body() createQuotationDto: CreateQuotationDto) {
    const quotation = await this.quotationService.create(createQuotationDto);
    return ResponseUtil.created(quotation, 'Quotation created successfully');
  }

  @Post('get-quotations')
  async findAll(@Body() queryDto: QueryQuotationDto) {
    const result = await this.quotationService.findAll(queryDto);
    return ResponseUtil.paginated(
      result.data,
      result.total,
      result.page,
      result.limit,
      'Quotations retrieved successfully'
    );
  }

  @Post('update-quotation')
  async update(@Body() updateQuotationDto: UpdateQuotationDto) {
    const quotation = await this.quotationService.update(updateQuotationDto);
    return ResponseUtil.success(quotation, 'Quotation updated successfully');
  }

  @Post('delete-quotation')
  async remove(@Body() deleteQuotationDto: DeleteQuotationDto) {
    const result = await this.quotationService.remove(deleteQuotationDto);
    return ResponseUtil.success(result.message);
  }
}
