import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { VendorBillingAddress, VendorBillingAddressSchema } from './billing-address.schema';
import { VendorShippingAddress, VendorShippingAddressSchema } from './shipping-address.schema';
import { BankDetail, BankDetailSchema } from './bank-detail.schema';

export type VendorDocument = Vendor & Document;

@Schema({ timestamps: false, collection: 'vendors' })
export class Vendor {
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

  @Prop()
  msmeNo: string;

  @Prop({ type: [String], default: [] })
  gst: string[];

  @Prop({ type: [String], default: [] })
  msme: string[];

  @Prop({ type: [String], default: [] })
  pancard: string[];

  @Prop({ type: [String], default: [] })
  tdstcs: string[];

  @Prop({ type: [VendorBillingAddressSchema], default: [] })
  @Type(() => VendorBillingAddress)
  billingAddresses: VendorBillingAddress[];

  @Prop({ type: [VendorShippingAddressSchema], default: [] })
  @Type(() => VendorShippingAddress)
  shippingAddresses: VendorShippingAddress[];

  @Prop({ type: [BankDetailSchema], default: [] })
  @Type(() => BankDetail)
  bankDetails: BankDetail[];

  @Prop({ type: Array, default: [] })
  config: any[];

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

export const VendorSchema = SchemaFactory.createForClass(Vendor);
