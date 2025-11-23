export declare class AddClientPaymentDto {
    leadId: string;
    orderId: string;
    amount: number;
    paymentType: string;
    paymentMethod: string;
    transactionId?: string;
    paymentDate: number;
    paymentProof?: string;
    remarks?: string;
    creditDays?: number;
    interestRate?: number;
    dueDate?: number;
    interestAmount?: number;
}
