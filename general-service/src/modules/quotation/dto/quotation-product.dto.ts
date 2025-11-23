import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsNumber, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { VariantOptionDto } from './variant-option.dto';

export class QuotationProductDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsMongoId()
  @IsNotEmpty()
  vendorId: string;

  @IsString()
  @IsOptional()
  parentProductId?: string;

  @IsString()
  @IsNotEmpty()
  variant: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantOptionDto)
  @IsOptional()
  variantOptions?: VariantOptionDto[];

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsOptional()
  pRate?: number;

  @IsNumber()
  @IsOptional()
  pAmount?: number;

  @IsNumber()
  @IsNotEmpty()
  gst: number;

  @IsNumber()
  @IsOptional()
  splitCount?: number;

  @IsBoolean()
  @IsOptional()
  isSplit?: boolean;

  @IsNumber()
  @IsOptional()
  splitIndex?: number;

  @IsString()
  @IsNotEmpty()
  id: string;
}
