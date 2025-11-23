import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Variant {
  @Prop({ required: true })
  varientName: string;

  @Prop({ required: true })
  price: string;

  @Prop({ default: null })
  askedPrice: string;

  @Prop({ default: '1' })
  minQty: string;

  @Prop({ required: true })
  varientUnit: string;

  @Prop({ required: true })
  priceUnit: string;

  @Prop({ required: true })
  gst: string;
}

export const VariantSchema = SchemaFactory.createForClass(Variant);