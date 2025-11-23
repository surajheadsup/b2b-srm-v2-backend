import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteCustomerDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
