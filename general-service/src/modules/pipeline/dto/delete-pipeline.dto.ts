import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeletePipelineDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
