import mongoose, { Document, Schema } from 'mongoose';

export interface IPaymentSession extends Document {
  userId: mongoose.Types.ObjectId;
  declarationId?: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod?: string;
  stripeSessionId?: string;
  createdAt: Date;
  completedAt?: Date;
}

const paymentSessionSchema = new Schema<IPaymentSession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    declarationId: {
      type: Schema.Types.ObjectId,
      ref: 'TaxDeclaration',
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: 'SEK',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: String,
    stripeSessionId: String,
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
paymentSessionSchema.index({ userId: 1 });
paymentSessionSchema.index({ status: 1 });
paymentSessionSchema.index({ createdAt: -1 });
paymentSessionSchema.index({ stripeSessionId: 1 });

export const PaymentSession = mongoose.model<IPaymentSession>('PaymentSession', paymentSessionSchema);