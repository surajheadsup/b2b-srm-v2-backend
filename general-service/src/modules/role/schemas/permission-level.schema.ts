import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class PermissionLevel {
  @Prop({ default: false })
  read: boolean;

  @Prop({ default: false })
  write: boolean;

  @Prop({ default: false })
  delete: boolean;
}

export const PermissionLevelSchema = SchemaFactory.createForClass(PermissionLevel);
