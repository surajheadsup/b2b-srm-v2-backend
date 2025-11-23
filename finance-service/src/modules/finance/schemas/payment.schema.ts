import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ _id: false })
export class Payment {
  @Prop({ required: true })
  id: string;

  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  orderId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  paymentType: string;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop()
  transactionId: string;

  @Prop({ required: true })
  paymentDate: number;

  @Prop()
  paymentProof: string;

  @Prop()
  remarks: string;

  @Prop()
  creditDays: number;

  @Prop()
  interestRate: number;

  @Prop()
  dueDate: number;

  @Prop()
  interestAmount: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: number;

  @Prop({ default: Date.now })
  updatedAt: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
