import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { VendorBillingAddressDto } from './billing-address.dto';
import { VendorShippingAddressDto } from './shipping-address.dto';
import { BankDetailDto } from './bank-detail.dto';

export class CreateVendorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

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
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  gstNo?: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsOptional()
  pancardNo?: string;

  @IsString()
  @IsOptional()
  msmeNo?: string;

  @IsArray()
  @IsOptional()
  gst?: string[];

  @IsArray()
  @IsOptional()
  msme?: string[];

  @IsArray()
  @IsOptional()
  pancard?: string[];

  @IsArray()
  @IsOptional()
  tdstcs?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VendorBillingAddressDto)
  @IsOptional()
  billingAddresses?: VendorBillingAddressDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VendorShippingAddressDto)
  @IsOptional()
  shippingAddresses?: VendorShippingAddressDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BankDetailDto)
  @IsOptional()
  bankDetails?: BankDetailDto[];

  @IsArray()
  @IsOptional()
  config?: any[];

  @IsMongoId()
  @IsOptional()
  createdBy?: string;

  @IsMongoId()
  @IsOptional()
  updatedBy?: string;
}
