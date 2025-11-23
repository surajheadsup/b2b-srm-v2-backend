import { IsString, IsNotEmpty, IsArray, IsOptional, IsMongoId, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RolePermissionDto } from './role-permission.dto';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  roleName: string;

  @IsArray()
  @IsOptional()
  allowedEndPoints?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RolePermissionDto)
  @IsOptional()
  permission?: RolePermissionDto[];

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  roleType: string;

  @IsArray()
  @IsOptional()
  config?: any[];

  @IsArray()
  @IsOptional()
  supportPermissions?: any[];

  @IsMongoId()
  @IsOptional()
  createdBy?: string;

  @IsMongoId()
  @IsOptional()
  updatedBy?: string;
}
