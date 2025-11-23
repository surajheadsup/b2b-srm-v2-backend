import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Finance } from './schemas/finance.schema';
import { AddClientPaymentDto } from './dto/add-client-payment.dto';
import { UpdateClientPaymentDto } from './dto/update-client-payment.dto';
import { DeleteClientPaymentDto } from './dto/delete-client-payment.dto';
import { AddVendorPaymentDto } from './dto/add-vendor-payment.dto';
import { UpdateVendorPaymentDto } from './dto/update-vendor-payment.dto';
import { DeleteVendorPaymentDto } from './dto/delete-vendor-payment.dto';

@Injectable()
export class FinanceService {
  constructor(
    @InjectModel(Finance.name) private financeModel: Model<Finance>,
  ) {}

  async getFinanceByLeadId(leadId: string): Promise<Finance> {
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
      throw new NotFoundException('Finance record not found');
    }

    return finance;
  }

  async addClientPayment(addClientPaymentDto: AddClientPaymentDto, userId: string): Promise<Finance> {
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
    } else {
      finance.clientPayments.push(newPayment as any);
      finance.updatedBy = userId as any;
      finance.updatedAt = timestamp;
    }

    return await finance.save();
  }

  async updateClientPayment(updateClientPaymentDto: UpdateClientPaymentDto, userId: string): Promise<Finance> {
    const { leadId, paymentId, ...updateData } = updateClientPaymentDto;

    const finance = await this.financeModel.findOne({ leadId, isDeleted: false });

    if (!finance) {
      throw new NotFoundException('Finance record not found');
    }

    const paymentIndex = finance.clientPayments.findIndex((p) => p.id === paymentId);

    if (paymentIndex === -1) {
      throw new NotFoundException('Client payment not found');
    }

    const timestamp = Date.now();
    Object.assign(finance.clientPayments[paymentIndex], {
      ...updateData,
      updatedBy: userId,
      updatedAt: timestamp,
    });

    finance.updatedBy = userId as any;
    finance.updatedAt = timestamp;

    return await finance.save();
  }

  async deleteClientPayment(deleteClientPaymentDto: DeleteClientPaymentDto, userId: string): Promise<Finance> {
    const { leadId, paymentId } = deleteClientPaymentDto;

    const finance = await this.financeModel.findOne({ leadId, isDeleted: false });

    if (!finance) {
      throw new NotFoundException('Finance record not found');
    }

    const paymentIndex = finance.clientPayments.findIndex((p) => p.id === paymentId);

    if (paymentIndex === -1) {
      throw new NotFoundException('Client payment not found');
    }

    finance.clientPayments.splice(paymentIndex, 1);
    finance.updatedBy = userId as any;
    finance.updatedAt = Date.now();

    return await finance.save();
  }

  async addVendorPayment(addVendorPaymentDto: AddVendorPaymentDto, userId: string): Promise<Finance> {
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
    } else {
      finance.vendorPayments.push(newPayment as any);
      finance.updatedBy = userId as any;
      finance.updatedAt = timestamp;
    }

    return await finance.save();
  }

  async updateVendorPayment(updateVendorPaymentDto: UpdateVendorPaymentDto, userId: string): Promise<Finance> {
    const { leadId, paymentId, ...updateData } = updateVendorPaymentDto;

    const finance = await this.financeModel.findOne({ leadId, isDeleted: false });

    if (!finance) {
      throw new NotFoundException('Finance record not found');
    }

    const paymentIndex = finance.vendorPayments.findIndex((p) => p.id === paymentId);

    if (paymentIndex === -1) {
      throw new NotFoundException('Vendor payment not found');
    }

    const timestamp = Date.now();
    Object.assign(finance.vendorPayments[paymentIndex], {
      ...updateData,
      updatedBy: userId,
      updatedAt: timestamp,
    });

    finance.updatedBy = userId as any;
    finance.updatedAt = timestamp;

    return await finance.save();
  }

  async deleteVendorPayment(deleteVendorPaymentDto: DeleteVendorPaymentDto, userId: string): Promise<Finance> {
    const { leadId, paymentId } = deleteVendorPaymentDto;

    const finance = await this.financeModel.findOne({ leadId, isDeleted: false });

    if (!finance) {
      throw new NotFoundException('Finance record not found');
    }

    const paymentIndex = finance.vendorPayments.findIndex((p) => p.id === paymentId);

    if (paymentIndex === -1) {
      throw new NotFoundException('Vendor payment not found');
    }

    finance.vendorPayments.splice(paymentIndex, 1);
    finance.updatedBy = userId as any;
    finance.updatedAt = Date.now();

    return await finance.save();
  }
}
