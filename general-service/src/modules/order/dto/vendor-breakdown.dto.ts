import { IsString, IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';

export class VendorBreakdownDto {
  @IsMongoId()
  @IsNotEmpty()
  vendorId: string;

  @IsString()
  @IsNotEmpty()
  vendorName: string;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsNumber()
  @IsNotEmpty()
  pRate: number;

  @IsNumber()
  @IsNotEmpty()
  pAmount: number;

  @IsNumber()
  @IsNotEmpty()
  gst: number;
}
