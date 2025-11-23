"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceController = void 0;
const common_1 = require("@nestjs/common");
const finance_service_1 = require("./finance.service");
const add_client_payment_dto_1 = require("./dto/add-client-payment.dto");
const update_client_payment_dto_1 = require("./dto/update-client-payment.dto");
const delete_client_payment_dto_1 = require("./dto/delete-client-payment.dto");
const add_vendor_payment_dto_1 = require("./dto/add-vendor-payment.dto");
const update_vendor_payment_dto_1 = require("./dto/update-vendor-payment.dto");
const delete_vendor_payment_dto_1 = require("./dto/delete-vendor-payment.dto");
const response_util_1 = require("../../common/utils/response.util");
let FinanceController = class FinanceController {
    financeService;
    constructor(financeService) {
        this.financeService = financeService;
    }
    getUserId(headers) {
        return headers['x-user-id'] || '507f1f77bcf86cd799439011';
    }
    async getFinance(leadId) {
        const finance = await this.financeService.getFinanceByLeadId(leadId);
        return response_util_1.ResponseUtil.success(finance, 'Finance details retrieved successfully');
    }
    async addClientPayment(addClientPaymentDto, headers) {
        const userId = this.getUserId(headers);
        const finance = await this.financeService.addClientPayment(addClientPaymentDto, userId);
        return response_util_1.ResponseUtil.created(finance, 'Client payment added successfully');
    }
    async updateClientPayment(updateClientPaymentDto, headers) {
        const userId = this.getUserId(headers);
        const finance = await this.financeService.updateClientPayment(updateClientPaymentDto, userId);
        return response_util_1.ResponseUtil.success(finance, 'Client payment updated successfully');
    }
    async deleteClientPayment(deleteClientPaymentDto, headers) {
        const userId = this.getUserId(headers);
        const finance = await this.financeService.deleteClientPayment(deleteClientPaymentDto, userId);
        return response_util_1.ResponseUtil.success(finance, 'Client payment deleted successfully');
    }
    async addVendorPayment(addVendorPaymentDto, headers) {
        const userId = this.getUserId(headers);
        const finance = await this.financeService.addVendorPayment(addVendorPaymentDto, userId);
        return response_util_1.ResponseUtil.created(finance, 'Vendor payment added successfully');
    }
    async updateVendorPayment(updateVendorPaymentDto, headers) {
        const userId = this.getUserId(headers);
        const finance = await this.financeService.updateVendorPayment(updateVendorPaymentDto, userId);
        return response_util_1.ResponseUtil.success(finance, 'Vendor payment updated successfully');
    }
    async deleteVendorPayment(deleteVendorPaymentDto, headers) {
        const userId = this.getUserId(headers);
        const finance = await this.financeService.deleteVendorPayment(deleteVendorPaymentDto, userId);
        return response_util_1.ResponseUtil.success(finance, 'Vendor payment deleted successfully');
    }
};
exports.FinanceController = FinanceController;
__decorate([
    (0, common_1.Get)(':leadId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('leadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "getFinance", null);
__decorate([
    (0, common_1.Post)('add-client-payment'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_client_payment_dto_1.AddClientPaymentDto, Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "addClientPayment", null);
__decorate([
    (0, common_1.Post)('update-client-payment'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_client_payment_dto_1.UpdateClientPaymentDto, Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "updateClientPayment", null);
__decorate([
    (0, common_1.Post)('delete-client-payment'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_client_payment_dto_1.DeleteClientPaymentDto, Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "deleteClientPayment", null);
__decorate([
    (0, common_1.Post)('add-vendor-payment'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_vendor_payment_dto_1.AddVendorPaymentDto, Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "addVendorPayment", null);
__decorate([
    (0, common_1.Post)('update-vendor-payment'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_vendor_payment_dto_1.UpdateVendorPaymentDto, Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "updateVendorPayment", null);
__decorate([
    (0, common_1.Post)('delete-vendor-payment'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_vendor_payment_dto_1.DeleteVendorPaymentDto, Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "deleteVendorPayment", null);
exports.FinanceController = FinanceController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [finance_service_1.FinanceService])
], FinanceController);
//# sourceMappingURL=finance.controller.js.map