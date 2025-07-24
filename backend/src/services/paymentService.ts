import mongoose from "mongoose";
import { CreatePaymentSessionInput } from "../validators/taxValidators";
import {
  IPaymentSession,
  PaymentSession as PaymentSessionModel,
} from "../models/PaymentSession.js";

import type { PaymentSession } from "../models/Tax.js";

export class PaymentService {
  static async createPaymentSession(
    userId: string,
    data: CreatePaymentSessionInput
  ): Promise<PaymentSession> {
    const payment = new PaymentSessionModel({
      userId: new mongoose.Types.ObjectId(userId),
      ...data,
      status: "pending",
    });

    await payment.save();
    return this.formatPaymentSession(payment);
  }

  static async completePayment(paymentId: string): Promise<PaymentSession> {
    const payment = await PaymentSessionModel.findById(paymentId);
    if (!payment) {
      throw new Error("Payment not found");
    }

    payment.status = "completed";
    payment.completedAt = new Date();
    await payment.save();

    return this.formatPaymentSession(payment);
  }

  static async getPayment(id: string): Promise<PaymentSession | null> {
    const payment = await PaymentSessionModel.findById(id);
    return payment ? this.formatPaymentSession(payment) : null;
  }

  private static formatPaymentSession(doc: IPaymentSession): PaymentSession {
    return {
      id: (doc._id as any).toString(),
      userId: doc.userId.toString(),
      amount: doc.amount,
      currency: doc.currency,
      status: doc.status,
      paymentMethod: doc.paymentMethod,
      createdAt: doc.createdAt,
      completedAt: doc.completedAt,
    };
  }
}
