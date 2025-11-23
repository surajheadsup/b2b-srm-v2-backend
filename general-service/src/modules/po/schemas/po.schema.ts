import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type PoDocument = Po & Document;

@Schema({ timestamps: false, collection: 'pos' })
export class Po {
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Product', default: [] })
  products: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Quotation', default: [] })
  quotations: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Customer', default: [] })
  customers: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Order', default: [] })
  orders: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'File', default: [] })
  files: mongoose.Schema.Types.ObjectId[];

  @Prop({ required: true, index: true })
  poType: string;

  @Prop({ default: false, index: true })
  isDeleted: boolean;

  @Prop({ required: true, index: true })
  status: string;

  @Prop({ type: Array, default: [] })
  config: any[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  updatedBy: mongoose.Schema.Types.ObjectId;

  @Prop()
  deletedAt: number;

  @Prop({ required: true, index: -1 })
  createdAt: number;

  @Prop({ required: true })
  updatedAt: number;
}

export const PoSchema = SchemaFactory.createForClass(Po);
