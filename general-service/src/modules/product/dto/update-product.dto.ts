import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VariantDto } from './variant.dto';

export class UpdateProductDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  documents?: string[];

  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  varients?: VariantDto[];

  @IsOptional()
  @IsString()
  hsnNo?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}