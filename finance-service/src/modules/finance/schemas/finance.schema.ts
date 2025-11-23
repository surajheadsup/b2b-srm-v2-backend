import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Payment, PaymentSchema } from './payment.schema';

@Schema({ collection: 'finances', timestamps: false })
export class Finance extends Document {
  @Prop({ type: Types.ObjectId, required: true, unique: true })
  leadId: Types.ObjectId;

  @Prop({ type: [PaymentSchema], default: [] })
  clientPayments: Payment[];

  @Prop({ type: [PaymentSchema], default: [] })
  vendorPayments: Payment[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: number;

  @Prop({ default: Date.now })
  updatedAt: number;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: number;
}

export const FinanceSchema = SchemaFactory.createForClass(Finance);
