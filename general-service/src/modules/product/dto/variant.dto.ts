import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class VariantDto {
  @IsString()
  @IsNotEmpty()
  varientName: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsOptional()
  @IsString()
  askedPrice?: string;

  @IsOptional()
  @IsString()
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