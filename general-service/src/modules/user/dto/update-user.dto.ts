import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsArray } from 'class-validator';

export class UpdateUserDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsMongoId()
  @IsOptional()
  roleId?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  userType?: string;

  @IsArray()
  @IsOptional()
  config?: any[];

  @IsMongoId()
  @IsOptional()
  updatedBy?: string;
}
