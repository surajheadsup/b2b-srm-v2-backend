import { IsNotEmpty, IsOptional, IsMongoId, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LeadDetailsDto } from './lead-details.dto';

export class CreatePipelineDto {
  @ValidateNested()
  @Type(() => LeadDetailsDto)
  @IsNotEmpty()
  leadDetails: LeadDetailsDto;

  @IsArray()
  @IsOptional()
  quotations?: string[];

  @IsArray()
  @IsOptional()
  customers?: string[];

  @IsArray()
  @IsOptional()
  clientPos?: string[];

  @IsArray()
  @IsOptional()
  vendorPos?: string[];

  @IsArray()
  @IsOptional()
  orders?: string[];

  @IsArray()
  @IsOptional()
  finance?: string[];

  @IsArray()
  @IsOptional()
  config?: any[];

  @IsBoolean()
  @IsOptional()
  sameAsBillingAddress?: boolean;

  @IsArray()
  @IsOptional()
  products?: any[];

  @IsArray()
  @IsOptional()
  billingAddress?: any[];

  @IsArray()
  @IsOptional()
  shippingAddress?: any[];

  @IsArray()
  @IsOptional()
  remainingProducts?: any[];

  @IsMongoId()
  @IsOptional()
  selectedOrderId?: string;
}
