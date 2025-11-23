import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
