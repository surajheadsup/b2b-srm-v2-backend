import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Variant, VariantSchema } from './variant.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: false, versionKey: false })
export class Product {
  @Prop({ required: true, trim: true })
  productName: string;

  @Prop({ type: [String], default: [] })
  documents: string[];

  @Prop({ trim: true })
  make: string;

  @Prop({ type: [VariantSchema], default: [] })
  varients: Variant[];

  @Prop({ trim: true })
  hsnNo: string;

  @Prop({ default: null })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  updatedBy: Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: null })
  deletedAt: number;

  @Prop({ default: () => Date.now() })
  createdAt: number;

  @Prop({ default: () => Date.now() })
  updatedAt: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ productName: 1 });
ProductSchema.index({ make: 1 });
ProductSchema.index({ hsnNo: 1 });
ProductSchema.index({ isDeleted: 1 });
ProductSchema.index({ createdAt: -1 });