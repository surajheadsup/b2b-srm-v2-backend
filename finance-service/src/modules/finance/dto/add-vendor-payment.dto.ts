import { IsNotEmpty, IsString, IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class AddVendorPaymentDto {
  @IsMongoId()
  @IsNotEmpty()
  leadId: string;

  @IsMongoId()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  paymentType: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsString()
  @IsOptional()
  transactionId?: string;

  @IsNumber()
  @IsNotEmpty()
  paymentDate: number;

  @IsString()
  @IsOptional()
  paymentProof?: string;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsNumber()
  @IsOptional()
  creditDays?: number;

  @IsNumber()
  @IsOptional()
  interestRate?: number;

  @IsNumber()
  @IsOptional()
  dueDate?: number;

  @IsNumber()
  @IsOptional()
  interestAmount?: number;
}
