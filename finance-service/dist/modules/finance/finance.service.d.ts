import { Model } from 'mongoose';
import { Finance } from './schemas/finance.schema';
import { AddClientPaymentDto } from './dto/add-client-payment.dto';
import { UpdateClientPaymentDto } from './dto/update-client-payment.dto';
import { DeleteClientPaymentDto } from './dto/delete-client-payment.dto';
import { AddVendorPaymentDto } from './dto/add-vendor-payment.dto';
import { UpdateVendorPaymentDto } from './dto/update-vendor-payment.dto';
import { DeleteVendorPaymentDto } from './dto/delete-vendor-payment.dto';
export declare class FinanceService {
    private financeModel;
    constructor(financeModel: Model<Finance>);
    getFinanceByLeadId(leadId: string): Promise<Finance>;
    addClientPayment(addClientPaymentDto: AddClientPaymentDto, userId: string): Promise<Finance>;
    updateClientPayment(updateClientPaymentDto: UpdateClientPaymentDto, userId: string): Promise<Finance>;
    deleteClientPayment(deleteClientPaymentDto: DeleteClientPaymentDto, userId: string): Promise<Finance>;
    addVendorPayment(addVendorPaymentDto: AddVendorPaymentDto, userId: string): Promise<Finance>;
    updateVendorPayment(updateVendorPaymentDto: UpdateVendorPaymentDto, userId: string): Promise<Finance>;
    deleteVendorPayment(deleteVendorPaymentDto: DeleteVendorPaymentDto, userId: string): Promise<Finance>;
}
