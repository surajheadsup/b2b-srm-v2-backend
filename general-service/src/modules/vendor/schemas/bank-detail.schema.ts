import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class BankDetail {
  @Prop()
  bankName: string;

  @Prop()
  accountNumber: string;

  @Prop()
  ifscCode: string;

  @Prop()
  accountHolderName: string;

  @Prop()
  branchName: string;
}

export const BankDetailSchema = SchemaFactory.createForClass(BankDetail);
