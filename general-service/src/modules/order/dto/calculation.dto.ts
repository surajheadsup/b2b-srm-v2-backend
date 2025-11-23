import { IsNumber, IsNotEmpty } from 'class-validator';

export class CalculationDto {
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsNumber()
  @IsNotEmpty()
  cgst: number;

  @IsNumber()
  @IsNotEmpty()
  sgst: number;

  @IsNumber()
  @IsNotEmpty()
  totalTaxableAmount: number;
}
