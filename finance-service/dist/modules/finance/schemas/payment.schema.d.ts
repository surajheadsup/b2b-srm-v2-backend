import { Types } from 'mongoose';
export declare class Payment {
    id: string;
    orderId: Types.ObjectId;
    amount: number;
    paymentType: string;
    paymentMethod: string;
    transactionId: string;
    paymentDate: number;
    paymentProof: string;
    remarks: string;
    creditDays: number;
    interestRate: number;
    dueDate: number;
    interestAmount: number;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
    createdAt: number;
    updatedAt: number;
}
export declare const PaymentSchema: import("mongoose").Schema<Payment, import("mongoose").Model<Payment, any, any, any, import("mongoose").Document<unknown, any, Payment, any, {}> & Payment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Payment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Payment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Payment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
