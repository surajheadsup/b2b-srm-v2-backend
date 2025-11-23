import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomerBillingAddressDto } from './billing-address.dto';
import { CustomerShippingAddressDto } from './shipping-address.dto';

export class UpdateCustomerDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  companySize?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  @IsOptional()
  natureOfCompany?: string;

  @IsString()
  @IsOptional()
  designation?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  gstNo?: string;

  @IsString()
  @IsOptional()
  contact?: string;

  @IsString()
  @IsOptional()
  pancardNo?: string;

  @IsArray()
  @IsOptional()
  gst?: string[];

  @IsArray()
  @IsOptional()
  pancard?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomerBillingAddressDto)
  @IsOptional()
  billingAddresses?: CustomerBillingAddressDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomerShippingAddressDto)
  @IsOptional()
  shippingAddresses?: CustomerShippingAddressDto[];

  @IsArray()
  @IsOptional()
  config?: any[];

  @IsString()
  @IsOptional()
  leadSource?: string;

  @IsMongoId()
  @IsOptional()
  updatedBy?: string;
}
