import { FinanceService } from './finance.service';
import { AddClientPaymentDto } from './dto/add-client-payment.dto';
import { UpdateClientPaymentDto } from './dto/update-client-payment.dto';
import { DeleteClientPaymentDto } from './dto/delete-client-payment.dto';
import { AddVendorPaymentDto } from './dto/add-vendor-payment.dto';
import { UpdateVendorPaymentDto } from './dto/update-vendor-payment.dto';
import { DeleteVendorPaymentDto } from './dto/delete-vendor-payment.dto';
export declare class FinanceController {
    private readonly financeService;
    constructor(financeService: FinanceService);
    private getUserId;
    getFinance(leadId: string): Promise<import("../../common/interfaces/base-response.interface").BaseResponse<import("./schemas/finance.schema").Finance>>;
    addClientPayment(addClientPaymentDto: AddClientPaymentDto, headers: any): Promise<import("../../common/interfaces/base-response.interface").BaseResponse<import("./schemas/finance.schema").Finance>>;
    updateClientPayment(updateClientPaymentDto: UpdateClientPaymentDto, headers: any): Promise<import("../../common/interfaces/base-response.interface").BaseResponse<import("./schemas/finance.schema").Finance>>;
    deleteClientPayment(deleteClientPaymentDto: DeleteClientPaymentDto, headers: any): Promise<import("../../common/interfaces/base-response.interface").BaseResponse<import("./schemas/finance.schema").Finance>>;
    addVendorPayment(addVendorPaymentDto: AddVendorPaymentDto, headers: any): Promise<import("../../common/interfaces/base-response.interface").BaseResponse<import("./schemas/finance.schema").Finance>>;
    updateVendorPayment(updateVendorPaymentDto: UpdateVendorPaymentDto, headers: any): Promise<import("../../common/interfaces/base-response.interface").BaseResponse<import("./schemas/finance.schema").Finance>>;
    deleteVendorPayment(deleteVendorPaymentDto: DeleteVendorPaymentDto, headers: any): Promise<import("../../common/interfaces/base-response.interface").BaseResponse<import("./schemas/finance.schema").Finance>>;
}
