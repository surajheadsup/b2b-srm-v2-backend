import { IsBoolean, IsOptional } from 'class-validator';

export class PermissionLevelDto {
  @IsBoolean()
  @IsOptional()
  read?: boolean;

  @IsBoolean()
  @IsOptional()
  write?: boolean;

  @IsBoolean()
  @IsOptional()
  delete?: boolean;
}
