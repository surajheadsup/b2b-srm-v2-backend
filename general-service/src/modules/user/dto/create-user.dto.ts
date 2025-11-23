import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsMongoId()
  @IsNotEmpty()
  roleId: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  userType: string;

  @IsArray()
  @IsOptional()
  config?: any[];

  @IsMongoId()
  @IsOptional()
  createdBy?: string;

  @IsMongoId()
  @IsOptional()
  updatedBy?: string;
}
