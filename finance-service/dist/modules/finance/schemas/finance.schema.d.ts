import { Document, Types } from 'mongoose';
import { Payment } from './payment.schema';
export declare class Finance extends Document {
    leadId: Types.ObjectId;
    clientPayments: Payment[];
    vendorPayments: Payment[];
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
    createdAt: number;
    updatedAt: number;
    isDeleted: boolean;
    deletedAt: number;
}
export declare const FinanceSchema: import("mongoose").Schema<Finance, import("mongoose").Model<Finance, any, any, any, Document<unknown, any, Finance, any, {}> & Finance & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Finance, Document<unknown, {}, import("mongoose").FlatRecord<Finance>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Finance> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
