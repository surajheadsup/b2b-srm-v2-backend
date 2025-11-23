import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: false, collection: 'users' })
export class User {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  username: string;

  @Prop({ required: true, index: true })
  phoneNumber: string;

  @Prop({ required: true, enum: ['male', 'female', 'other'] })
  gender: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
    index: true,
  })
  roleId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, index: true, enum: ['superadmin', 'admin', 'user'] })
  userType: string;

  @Prop({ default: false, index: true })
  isDeleted: boolean;

  @Prop({ type: Array, default: [] })
  config: any[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updatedBy: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, index: -1 })
  createdAt: number;

  @Prop({ required: true })
  updatedAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
