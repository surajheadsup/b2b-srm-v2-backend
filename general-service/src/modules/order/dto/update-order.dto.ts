import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsBoolean, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderAddressDto } from './order-address.dto';
import { OrderProductDto } from './order-product.dto';
import { CalculationDto } from './calculation.dto';

export class UpdateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsOptional()
  orderNo?: string;

  @IsString()
  @IsOptional()
  invoiceNo?: string;

  @IsMongoId()
  @IsOptional()
  leadId?: string;

  @IsMongoId()
  @IsOptional()
  quotationId?: string;

  @IsMongoId()
  @IsOptional()
  customers?: string;

  @IsArray()
  @IsOptional()
  vendorIds?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderAddressDto)
  @IsOptional()
  billingAddress?: OrderAddressDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderAddressDto)
  @IsOptional()
  shippingAddress?: OrderAddressDto[];

  @IsString()
  @IsOptional()
  orderType?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  @IsOptional()
  products?: OrderProductDto[];

  @ValidateNested()
  @Type(() => CalculationDto)
  @IsOptional()
  calculations?: CalculationDto;

  @IsBoolean()
  @IsOptional()
  isSplit?: boolean;

  @IsNumber()
  @IsOptional()
  splitIndex?: number;

  @IsNumber()
  @IsOptional()
  splitCount?: number;

  @IsMongoId()
  @IsOptional()
  parentOrderId?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsMongoId()
  @IsOptional()
  updatedBy?: string;
}
