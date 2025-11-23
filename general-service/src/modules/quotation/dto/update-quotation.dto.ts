import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QuotationProductDto } from './quotation-product.dto';

export class UpdateQuotationDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsOptional()
  quotationNo?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuotationProductDto)
  @IsOptional()
  products?: QuotationProductDto[];

  @IsMongoId()
  @IsOptional()
  customerID?: string;

  @IsArray()
  @IsOptional()
  customerIds?: string[];

  @IsMongoId()
  @IsOptional()
  leadId?: string;

  @IsString()
  @IsOptional()
  status?: string;

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
