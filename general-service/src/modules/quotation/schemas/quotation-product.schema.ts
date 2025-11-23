import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { VariantOption, VariantOptionSchema } from './variant-option.schema';

@Schema({ _id: false })
export class QuotationProduct {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  productId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  productName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true })
  vendorId: mongoose.Schema.Types.ObjectId;

  @Prop()
  parentProductId: string;

  @Prop({ required: true })
  variant: string;

  @Prop({ type: [VariantOptionSchema], default: [] })
  @Type(() => VariantOption)
  variantOptions: VariantOption[];

  @Prop({ required: true })
  qty: number;

  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  amount: number;

  @Prop()
  pRate: number;

  @Prop()
  pAmount: number;

  @Prop({ required: true })
  gst: number;

  @Prop({ default: 0 })
  splitCount: number;

  @Prop({ default: false })
  isSplit: boolean;

  @Prop()
  splitIndex: number;

  @Prop({ required: true })
  id: string;
}

export const QuotationProductSchema = SchemaFactory.createForClass(QuotationProduct);
