import { Type } from 'class-transformer';
import { IsOptional, ValidateNested, IsObject } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { PopulateDto } from './populate.dto';

export class BaseQueryDto extends PaginationDto {
  @IsOptional()
  @IsObject()
  search?: Record<string, any> = {};

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PopulateDto)
  populate?: PopulateDto[] = [];
}