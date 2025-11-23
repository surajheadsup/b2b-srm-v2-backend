import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { LeadDetails, LeadDetailsSchema } from './lead-details.schema';

export type PipelineDocument = Pipeline & Document;

@Schema({ timestamps: false, collection: 'pipelines' })
export class Pipeline {
  @Prop({ type: LeadDetailsSchema, required: true })
  @Type(() => LeadDetails)
  leadDetails: LeadDetails;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Quotation', default: [] })
  quotations: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Customer', default: [] })
  customers: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Po', default: [] })
  clientPos: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Po', default: [] })
  vendorPos: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Order', default: [] })
  orders: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Finance', default: [] })
  finance: mongoose.Schema.Types.ObjectId[];

  @Prop({ default: false, index: true })
  isDeleted: boolean;

  @Prop({ type: Array, default: [] })
  config: any[];

  @Prop({ default: false })
  sameAsBillingAddress: boolean;

  @Prop({ type: Array, default: [] })
  products: any[];

  @Prop({ type: Array, default: [] })
  billingAddress: any[];

  @Prop({ type: Array, default: [] })
  shippingAddress: any[];

  @Prop({ type: Array, default: [] })
  remainingProducts: any[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  selectedOrderId: mongoose.Schema.Types.ObjectId;

  @Prop()
  deletedAt: number;

  @Prop({ required: true, index: -1 })
  createdAt: number;

  @Prop({ required: true })
  updatedAt: number;
}

export const PipelineSchema = SchemaFactory.createForClass(Pipeline);
