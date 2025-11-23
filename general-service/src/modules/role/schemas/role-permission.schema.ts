import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { PermissionLevel, PermissionLevelSchema } from './permission-level.schema';

@Schema({ _id: false })
export class RolePermission {
  @Prop({ required: true })
  value: string;

  @Prop({ type: [PermissionLevelSchema], required: true })
  @Type(() => PermissionLevel)
  permission: PermissionLevel[];

  @Prop({ type: [Object], default: null })
  child: RolePermission[] | null;
}

export const RolePermissionSchema = SchemaFactory.createForClass(RolePermission);
