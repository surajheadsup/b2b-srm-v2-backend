import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteVendorDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
