import { IsNotEmpty, IsString, IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class UpdateVendorPaymentDto {
  @IsMongoId()
  @IsNotEmpty()
  leadId: string;

  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @IsMongoId()
  @IsOptional()
  orderId?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  paymentType?: string;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsString()
  @IsOptional()
  transactionId?: string;

  @IsNumber()
  @IsOptional()
  paymentDate?: number;

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
