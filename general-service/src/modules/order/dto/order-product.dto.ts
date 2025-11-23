import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { VendorBreakdownDto } from './vendor-breakdown.dto';

export class OrderProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  variant: string;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  gst: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VendorBreakdownDto)
  vendorBreakdown: VendorBreakdownDto[];
}
