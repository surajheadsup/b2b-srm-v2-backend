import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class VendorBillingAddress {
  @Prop({ required: true })
  address: string;

  @Prop()
  landmark: string;

  @Prop({ required: true })
  pinCode: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true, index: true })
  state: string;

  @Prop({ required: true, index: true })
  city: string;

  @Prop()
  gstNo: string;
}

export const VendorBillingAddressSchema = SchemaFactory.createForClass(VendorBillingAddress);
