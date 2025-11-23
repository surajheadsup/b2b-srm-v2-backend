import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsArray } from 'class-validator';

export class CreatePoDto {
  @IsArray()
  @IsOptional()
  products?: string[];

  @IsArray()
  @IsOptional()
  quotations?: string[];

  @IsArray()
  @IsOptional()
  customers?: string[];

  @IsArray()
  @IsOptional()
  orders?: string[];

  @IsArray()
  @IsOptional()
  files?: string[];

  @IsString()
  @IsNotEmpty()
  poType: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsArray()
  @IsOptional()
  config?: any[];

  @IsMongoId()
  @IsNotEmpty()
  createdBy: string;

  @IsMongoId()
  @IsNotEmpty()
  updatedBy: string;
}
