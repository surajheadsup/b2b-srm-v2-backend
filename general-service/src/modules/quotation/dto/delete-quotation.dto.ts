import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteQuotationDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
