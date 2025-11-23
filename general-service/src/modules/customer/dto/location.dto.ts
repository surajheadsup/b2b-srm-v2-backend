import { IsNumber, IsOptional } from 'class-validator';

export class LocationDto {
  @IsNumber()
  @IsOptional()
  lat?: number;

  @IsNumber()
  @IsOptional()
  lng?: number;
}
