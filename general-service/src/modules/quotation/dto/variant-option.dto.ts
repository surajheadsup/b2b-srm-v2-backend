import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class VariantOptionDto {
  @IsString()
  @IsNotEmpty()
  varientName: string;

  @IsString()
  @IsOptional()
  specifications?: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsOptional()
  askedPrice?: string;

  @IsString()
  @IsOptional()
  minQty?: string;

  @IsString()
  @IsNotEmpty()
  varientUnit: string;

  @IsString()
  @IsNotEmpty()
  priceUnit: string;

  @IsString()
  @IsNotEmpty()
  gst: string;
}
