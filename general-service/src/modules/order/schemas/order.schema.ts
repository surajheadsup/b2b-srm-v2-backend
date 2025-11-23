import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { OrderAddress, OrderAddressSchema } from './order-address.schema';
import { OrderProduct, OrderProductSchema } from './order-product.schema';
import { Calculation, CalculationSchema } from './calculation.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: false, collection: 'orders' })
export class Order {
  @Prop({ required: true, unique: true, index: true })
  orderNo: string;

  @Prop({ required: true, unique: true, index: true })
  invoiceNo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true, index: true })
  leadId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quotation', required: true, index: true })
  quotationId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true, index: true })
  customers: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Vendor', default: [] })
  vendorIds: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [OrderAddressSchema], default: [] })
  @Type(() => OrderAddress)
  billingAddress: OrderAddress[];

  @Prop({ type: [OrderAddressSchema], default: [] })
  @Type(() => OrderAddress)
  shippingAddress: OrderAddress[];

  @Prop({ required: true, index: true })
  orderType: string;

  @Prop({ required: true, index: true })
  status: string;

  @Prop({ type: [OrderProductSchema], default: [] })
  @Type(() => OrderProduct)
  products: OrderProduct[];

  @Prop({ type: CalculationSchema })
  @Type(() => Calculation)
  calculations: Calculation;

  @Prop({ default: false, index: true })
  isSplit: boolean;

  @Prop()
  splitIndex: number;

  @Prop({ default: 0 })
  splitCount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  parentOrderId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: true, index: true })
  active: boolean;

  @Prop({ default: false, index: true })
  isDeleted: boolean;

  @Prop()
  deletedAt: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  updatedBy: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, index: -1 })
  createdAt: number;

  @Prop({ required: true })
  updatedAt: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
