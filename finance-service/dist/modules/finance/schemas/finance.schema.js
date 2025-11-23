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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceSchema = exports.Finance = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_schema_1 = require("./payment.schema");
let Finance = class Finance extends mongoose_2.Document {
    leadId;
    clientPayments;
    vendorPayments;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
    isDeleted;
    deletedAt;
};
exports.Finance = Finance;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, unique: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Finance.prototype, "leadId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [payment_schema_1.PaymentSchema], default: [] }),
    __metadata("design:type", Array)
], Finance.prototype, "clientPayments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [payment_schema_1.PaymentSchema], default: [] }),
    __metadata("design:type", Array)
], Finance.prototype, "vendorPayments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Finance.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Finance.prototype, "updatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Number)
], Finance.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Number)
], Finance.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Finance.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Finance.prototype, "deletedAt", void 0);
exports.Finance = Finance = __decorate([
    (0, mongoose_1.Schema)({ collection: 'finances', timestamps: false })
], Finance);
exports.FinanceSchema = mongoose_1.SchemaFactory.createForClass(Finance);
//# sourceMappingURL=finance.schema.js.map