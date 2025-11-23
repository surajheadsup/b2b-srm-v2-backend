import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { QuotationProduct, QuotationProductSchema } from './quotation-product.schema';

export type QuotationDocument = Quotation & Document;

@Schema({ timestamps: false, collection: 'quotations' })
export class Quotation {
  @Prop({ required: true, unique: true, index: true })
  quotationNo: string;

  @Prop({ type: [QuotationProductSchema], default: [] })
  @Type(() => QuotationProduct)
  products: QuotationProduct[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true, index: true })
  customerID: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Customer', default: [] })
  customerIds: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lead', index: true })
  leadId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, index: true })
  status: string;

  @Prop({ default: true, index: true })
  active: boolean;

  @Prop({ type: Array, default: [] })
  config: any[];

  @Prop()
  version: string;

  @Prop({ default: false, index: true })
  isDeleted: boolean;

  @Prop()
  deletedAt: number;

  @Prop({ required: true, index: -1 })
  createdAt: number;

  @Prop({ required: true })
  updatedAt: number;
}

export const QuotationSchema = SchemaFactory.createForClass(Quotation);
