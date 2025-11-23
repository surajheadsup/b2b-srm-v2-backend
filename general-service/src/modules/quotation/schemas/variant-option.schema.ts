import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class VariantOption {
  @Prop({ required: true })
  varientName: string;

  @Prop()
  specifications: string;

  @Prop({ required: true })
  price: string;

  @Prop()
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

export const VariantOptionSchema = SchemaFactory.createForClass(VariantOption);
