import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Calculation {
  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  cgst: number;

  @Prop({ required: true })
  sgst: number;

  @Prop({ required: true })
  totalTaxableAmount: number;
}

export const CalculationSchema = SchemaFactory.createForClass(Calculation);
