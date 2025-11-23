import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus, Headers } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { AddClientPaymentDto } from './dto/add-client-payment.dto';
import { UpdateClientPaymentDto } from './dto/update-client-payment.dto';
import { DeleteClientPaymentDto } from './dto/delete-client-payment.dto';
import { AddVendorPaymentDto } from './dto/add-vendor-payment.dto';
import { UpdateVendorPaymentDto } from './dto/update-vendor-payment.dto';
import { DeleteVendorPaymentDto } from './dto/delete-vendor-payment.dto';
import { ResponseUtil } from '../../common/utils/response.util';

@Controller()
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  private getUserId(headers: any): string {
    return headers['x-user-id'] || '507f1f77bcf86cd799439011';
  }

  @Get(':leadId')
  @HttpCode(HttpStatus.OK)
  async getFinance(@Param('leadId') leadId: string) {
    const finance = await this.financeService.getFinanceByLeadId(leadId);
    return ResponseUtil.success(finance, 'Finance details retrieved successfully');
  }

  @Post('add-client-payment')
  @HttpCode(HttpStatus.CREATED)
  async addClientPayment(@Body() addClientPaymentDto: AddClientPaymentDto, @Headers() headers) {
    const userId = this.getUserId(headers);
    const finance = await this.financeService.addClientPayment(addClientPaymentDto, userId);
    return ResponseUtil.created(finance, 'Client payment added successfully');
  }

  @Post('update-client-payment')
  @HttpCode(HttpStatus.OK)
  async updateClientPayment(@Body() updateClientPaymentDto: UpdateClientPaymentDto, @Headers() headers) {
    const userId = this.getUserId(headers);
    const finance = await this.financeService.updateClientPayment(updateClientPaymentDto, userId);
    return ResponseUtil.success(finance, 'Client payment updated successfully');
  }

  @Post('delete-client-payment')
  @HttpCode(HttpStatus.OK)
  async deleteClientPayment(@Body() deleteClientPaymentDto: DeleteClientPaymentDto, @Headers() headers) {
    const userId = this.getUserId(headers);
    const finance = await this.financeService.deleteClientPayment(deleteClientPaymentDto, userId);
    return ResponseUtil.success(finance, 'Client payment deleted successfully');
  }

  @Post('add-vendor-payment')
  @HttpCode(HttpStatus.CREATED)
  async addVendorPayment(@Body() addVendorPaymentDto: AddVendorPaymentDto, @Headers() headers) {
    const userId = this.getUserId(headers);
    const finance = await this.financeService.addVendorPayment(addVendorPaymentDto, userId);
    return ResponseUtil.created(finance, 'Vendor payment added successfully');
  }

  @Post('update-vendor-payment')
  @HttpCode(HttpStatus.OK)
  async updateVendorPayment(@Body() updateVendorPaymentDto: UpdateVendorPaymentDto, @Headers() headers) {
    const userId = this.getUserId(headers);
    const finance = await this.financeService.updateVendorPayment(updateVendorPaymentDto, userId);
    return ResponseUtil.success(finance, 'Vendor payment updated successfully');
  }

  @Post('delete-vendor-payment')
  @HttpCode(HttpStatus.OK)
  async deleteVendorPayment(@Body() deleteVendorPaymentDto: DeleteVendorPaymentDto, @Headers() headers) {
    const userId = this.getUserId(headers);
    const finance = await this.financeService.deleteVendorPayment(deleteVendorPaymentDto, userId);
    return ResponseUtil.success(finance, 'Vendor payment deleted successfully');
  }
}
