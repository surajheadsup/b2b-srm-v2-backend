import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { VendorBillingAddressDto } from './billing-address.dto';
import { VendorShippingAddressDto } from './shipping-address.dto';
import { BankDetailDto } from './bank-detail.dto';

export class UpdateVendorDto {
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
  updatedBy?: string;
}
