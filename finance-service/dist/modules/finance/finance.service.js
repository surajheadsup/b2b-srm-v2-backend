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
exports.FinanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const finance_schema_1 = require("./schemas/finance.schema");
let FinanceService = class FinanceService {
    financeModel;
    constructor(financeModel) {
        this.financeModel = financeModel;
    }
    async getFinanceByLeadId(leadId) {
        const finance = await this.financeModel
            .findOne({ leadId, isDeleted: false })
            .populate({
            path: 'clientPayments.orderId',
            populate: [
                { path: 'customerId', select: 'name email' },
                { path: 'vendorId', select: 'name email' },
            ],
        })
            .populate({
            path: 'vendorPayments.orderId',
            populate: [
                { path: 'customerId', select: 'name email' },
                { path: 'vendorId', select: 'name email' },
            ],
        })
            .exec();
        if (!finance) {
            throw new common_1.NotFoundException('Finance record not found');
        }
        return finance;
    }
    async addClientPayment(addClientPaymentDto, userId) {
        const { leadId, orderId, ...paymentData } = addClientPaymentDto;
        let finance = await this.financeModel.findOne({ leadId, isDeleted: false });
        const timestamp = Date.now();
        const paymentId = `CLIENT-PAYMENT-${timestamp}`;
        const newPayment = {
            id: paymentId,
            orderId,
            ...paymentData,
            createdBy: userId,
            updatedBy: userId,
            createdAt: timestamp,
            updatedAt: timestamp,
        };
        if (!finance) {
            finance = new this.financeModel({
                leadId,
                clientPayments: [newPayment],
                vendorPayments: [],
                createdBy: userId,
                updatedBy: userId,
                createdAt: timestamp,
                updatedAt: timestamp,
            });
        }
        else {
            finance.clientPayments.push(newPayment);
            finance.updatedBy = userId;
            finance.updatedAt = timestamp;
        }
        return await finance.save();
    }
    async updateClientPayment(updateClientPaymentDto, userId) {
        const { leadId, paymentId, ...updateData } = updateClientPaymentDto;
        const finance = await this.financeModel.findOne({ leadId, isDeleted: false });
        if (!finance) {
            throw new common_1.NotFoundException('Finance record not found');
        }
        const paymentIndex = finance.clientPayments.findIndex((p) => p.id === paymentId);
        if (paymentIndex === -1) {
            throw new common_1.NotFoundException('Client payment not found');
        }
        const timestamp = Date.now();
        Object.assign(finance.clientPayments[paymentIndex], {
            ...updateData,
            updatedBy: userId,
            updatedAt: timestamp,
        });
        finance.updatedBy = userId;
        finance.updatedAt = timestamp;
        return await finance.save();
    }
    async deleteClientPayment(deleteClientPaymentDto, userId) {
        const { leadId, paymentId } = deleteClientPaymentDto;
        const finance = await this.financeModel.findOne({ leadId, isDeleted: false });
        if (!finance) {
            throw new common_1.NotFoundException('Finance record not found');
        }
        const paymentIndex = finance.clientPayments.findIndex((p) => p.id === paymentId);
        if (paymentIndex === -1) {
            throw new common_1.NotFoundException('Client payment not found');
        }
        finance.clientPayments.splice(paymentIndex, 1);
        finance.updatedBy = userId;
        finance.updatedAt = Date.now();
        return await finance.save();
    }
    async addVendorPayment(addVendorPaymentDto, userId) {
        const { leadId, orderId, ...paymentData } = addVendorPaymentDto;
        let finance = await this.financeModel.findOne({ leadId, isDeleted: false });
        const timestamp = Date.now();
        const paymentId = `VENDOR-PAYMENT-${timestamp}`;
        const newPayment = {
            id: paymentId,
            orderId,
            ...paymentData,
            createdBy: userId,
            updatedBy: userId,
            createdAt: timestamp,
            updatedAt: timestamp,
        };
        if (!finance) {
            finance = new this.financeModel({
                leadId,
                clientPayments: [],
                vendorPayments: [newPayment],
                createdBy: userId,
                updatedBy: userId,
                createdAt: timestamp,
                updatedAt: timestamp,
            });
        }
        else {
            finance.vendorPayments.push(newPayment);
            finance.updatedBy = userId;
            finance.updatedAt = timestamp;
        }
        return await finance.save();
    }
    async updateVendorPayment(updateVendorPaymentDto, userId) {
        const { leadId, paymentId, ...updateData } = updateVendorPaymentDto;
        const finance = await this.financeModel.findOne({ leadId, isDeleted: false });
        if (!finance) {
            throw new common_1.NotFoundException('Finance record not found');
        }
        const paymentIndex = finance.vendorPayments.findIndex((p) => p.id === paymentId);
        if (paymentIndex === -1) {
            throw new common_1.NotFoundException('Vendor payment not found');
        }
        const timestamp = Date.now();
        Object.assign(finance.vendorPayments[paymentIndex], {
            ...updateData,
            updatedBy: userId,
            updatedAt: timestamp,
        });
        finance.updatedBy = userId;
        finance.updatedAt = timestamp;
        return await finance.save();
    }
    async deleteVendorPayment(deleteVendorPaymentDto, userId) {
        const { leadId, paymentId } = deleteVendorPaymentDto;
        const finance = await this.financeModel.findOne({ leadId, isDeleted: false });
        if (!finance) {
            throw new common_1.NotFoundException('Finance record not found');
        }
        const paymentIndex = finance.vendorPayments.findIndex((p) => p.id === paymentId);
        if (paymentIndex === -1) {
            throw new common_1.NotFoundException('Vendor payment not found');
        }
        finance.vendorPayments.splice(paymentIndex, 1);
        finance.updatedBy = userId;
        finance.updatedAt = Date.now();
        return await finance.save();
    }
};
exports.FinanceService = FinanceService;
exports.FinanceService = FinanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(finance_schema_1.Finance.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FinanceService);
//# sourceMappingURL=finance.service.js.map