import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { CustomerBillingAddress, CustomerBillingAddressSchema } from './billing-address.schema';
import { CustomerShippingAddress, CustomerShippingAddressSchema } from './shipping-address.schema';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: false, collection: 'customers' })
export class Customer {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true, index: true })
  companyName: string;

  @Prop()
  companySize: string;

  @Prop({ index: true })
  industry: string;

  @Prop()
  natureOfCompany: string;

  @Prop()
  designation: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ index: true })
  gstNo: string;

  @Prop({ required: true, index: true })
  contact: string;

  @Prop()
  pancardNo: string;

  @Prop({ type: [String], default: [] })
  gst: string[];

  @Prop({ type: [String], default: [] })
  pancard: string[];

  @Prop({ type: [CustomerBillingAddressSchema], default: [] })
  @Type(() => CustomerBillingAddress)
  billingAddresses: CustomerBillingAddress[];

  @Prop({ type: [CustomerShippingAddressSchema], default: [] })
  @Type(() => CustomerShippingAddress)
  shippingAddresses: CustomerShippingAddress[];

  @Prop({ type: Array, default: [] })
  config: any[];

  @Prop()
  leadSource: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updatedBy: mongoose.Schema.Types.ObjectId;

  @Prop({ default: false, index: true })
  isDeleted: boolean;

  @Prop()
  deletedAt: number;

  @Prop({ required: true, index: -1 })
  createdAt: number;

  @Prop({ required: true })
  updatedAt: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
