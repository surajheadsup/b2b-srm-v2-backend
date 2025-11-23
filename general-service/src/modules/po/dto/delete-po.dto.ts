import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeletePoDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
