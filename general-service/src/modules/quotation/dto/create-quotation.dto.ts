import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QuotationProductDto } from './quotation-product.dto';

export class CreateQuotationDto {
  @IsString()
  @IsNotEmpty()
  quotationNo: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuotationProductDto)
  @IsOptional()
  products?: QuotationProductDto[];

  @IsMongoId()
  @IsNotEmpty()
  customerID: string;

  @IsArray()
  @IsOptional()
  customerIds?: string[];

  @IsMongoId()
  @IsOptional()
  leadId?: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsArray()
  @IsOptional()
  config?: any[];

  @IsString()
  @IsOptional()
  version?: string;
}
