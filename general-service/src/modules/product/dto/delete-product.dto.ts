import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteProductDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}