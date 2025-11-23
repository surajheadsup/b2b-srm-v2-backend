import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ _id: false })
export class LeadDetails {
  @Prop({ required: true, unique: true, index: true })
  refNo: string;

  @Prop({ type: Array, default: [] })
  stakeHolder: any[];

  @Prop({ required: true, index: true })
  leadType: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  leadSource: mongoose.Schema.Types.ObjectId;
}

export const LeadDetailsSchema = SchemaFactory.createForClass(LeadDetails);
