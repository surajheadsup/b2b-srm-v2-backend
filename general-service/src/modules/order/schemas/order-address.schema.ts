import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class OrderAddress {
  @Prop({ required: true })
  address1: string;

  @Prop()
  address2: string;

  @Prop()
  landmark: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  pincode: string;

  @Prop()
  gstNo: string;

  @Prop()
  gstDoc: string;

  @Prop({ required: true })
  index: number;

  @Prop({ type: Object })
  location: {
    lat: number;
    lng: number;
  };
}

export const OrderAddressSchema = SchemaFactory.createForClass(OrderAddress);
