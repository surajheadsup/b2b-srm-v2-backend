import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteRoleDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
