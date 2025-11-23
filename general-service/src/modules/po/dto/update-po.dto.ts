import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsArray } from 'class-validator';

export class UpdatePoDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

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
  @IsOptional()
  poType?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsArray()
  @IsOptional()
  config?: any[];

  @IsMongoId()
  @IsOptional()
  updatedBy?: string;
}
