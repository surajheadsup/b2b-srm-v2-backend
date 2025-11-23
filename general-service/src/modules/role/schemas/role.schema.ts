import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { RolePermission, RolePermissionSchema } from './role-permission.schema';

export type RoleDocument = Role & Document;

@Schema({ timestamps: false, collection: 'roles' })
export class Role {
  @Prop({ required: true, unique: true, index: true })
  roleName: string;

  @Prop({ type: [String], default: [] })
  allowedEndPoints: string[];

  @Prop({ type: [RolePermissionSchema], default: [] })
  @Type(() => RolePermission)
  permission: RolePermission[];

  @Prop({ required: true, index: true, enum: ['active', 'inactive'] })
  status: string;

  @Prop({ default: false, index: true })
  isDeleted: boolean;

  @Prop({ required: true, index: true, enum: ['superadmin', 'admin', 'user'] })
  roleType: string;

  @Prop({ type: Array, default: [] })
  config: any[];

  @Prop({ type: Array, default: [] })
  supportPermissions: any[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updatedBy: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, index: -1 })
  createdAt: number;

  @Prop({ required: true })
  updatedAt: number;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
