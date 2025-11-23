import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PermissionLevelDto } from './permission-level.dto';

export class RolePermissionDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionLevelDto)
  permission: PermissionLevelDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RolePermissionDto)
  child?: RolePermissionDto[] | null;
}
