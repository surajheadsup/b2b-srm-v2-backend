import { IsString, IsNotEmpty, IsMongoId, IsArray, IsOptional } from 'class-validator';

export class LeadDetailsDto {
  @IsString()
  @IsNotEmpty()
  refNo: string;

  @IsArray()
  @IsOptional()
  stakeHolder?: any[];

  @IsString()
  @IsNotEmpty()
  leadType: string;

  @IsMongoId()
  @IsNotEmpty()
  leadSource: string;
}
