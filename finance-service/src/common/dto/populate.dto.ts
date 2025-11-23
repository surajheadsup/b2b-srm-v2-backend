import { IsString, IsOptional } from 'class-validator';

export class PopulateDto {
  @IsString()
  path: string;

  @IsOptional()
  @IsString()
  select?: string;
}
