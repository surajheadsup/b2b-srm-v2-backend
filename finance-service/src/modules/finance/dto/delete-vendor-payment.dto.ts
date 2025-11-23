import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class DeleteVendorPaymentDto {
  @IsMongoId()
  @IsNotEmpty()
  leadId: string;

  @IsString()
  @IsNotEmpty()
  paymentId: string;
}
