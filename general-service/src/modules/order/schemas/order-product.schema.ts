import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { VendorBreakdown, VendorBreakdownSchema } from './vendor-breakdown.schema';

@Schema({ _id: false })
export class OrderProduct {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  variant: string;

  @Prop({ required: true })
  qty: number;

  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  gst: number;

  @Prop({ required: true })
  unit: string;

  @Prop({ type: [VendorBreakdownSchema], default: [] })
  @Type(() => VendorBreakdown)
  vendorBreakdown: VendorBreakdown[];
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);
