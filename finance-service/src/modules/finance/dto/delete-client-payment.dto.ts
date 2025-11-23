import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class DeleteClientPaymentDto {
  @IsMongoId()
  @IsNotEmpty()
  leadId: string;

  @IsString()
  @IsNotEmpty()
  paymentId: string;
}
