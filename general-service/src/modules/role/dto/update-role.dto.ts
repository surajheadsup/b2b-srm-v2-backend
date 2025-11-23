import { IsString, IsNotEmpty, IsArray, IsOptional, IsMongoId, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RolePermissionDto } from './role-permission.dto';

export class UpdateRoleDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsOptional()
  roleName?: string;

  @IsArray()
  @IsOptional()
  allowedEndPoints?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RolePermissionDto)
  @IsOptional()
  permission?: RolePermissionDto[];

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  roleType?: string;

  @IsArray()
  @IsOptional()
  config?: any[];

  @IsArray()
  @IsOptional()
  supportPermissions?: any[];

  @IsMongoId()
  @IsOptional()
  updatedBy?: string;
}
