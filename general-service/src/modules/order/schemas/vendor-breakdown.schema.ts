import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ _id: false })
export class VendorBreakdown {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true })
  vendorId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  vendorName: string;

  @Prop({ required: true })
  qty: number;

  @Prop({ required: true })
  pRate: number;

  @Prop({ required: true })
  pAmount: number;

  @Prop({ required: true })
  gst: number;
}

export const VendorBreakdownSchema = SchemaFactory.createForClass(VendorBreakdown);
