import mongoose, { Document, Schema } from 'mongoose';

export interface IReceipt extends Document {
  declarationId: mongoose.Types.ObjectId;
  fileName: string;
  fileType: string;
  fileSize: number;
  category: 'work' | 'home' | 'travel' | 'education' | 'charity' | 'medical' | 'other';
  amount?: number;
  description?: string;
  date?: Date;
  uploadedAt: Date;
  processedAt?: Date;
  extractedData?: {
    vendor?: string;
    amount?: number;
    date?: Date;
    category?: string;
    description?: string;
  };
}

const receiptSchema = new Schema<IReceipt>(
  {
    declarationId: {
      type: Schema.Types.ObjectId,
      ref: 'TaxDeclaration',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['work', 'home', 'travel', 'education', 'charity', 'medical', 'other'],
      required: true,
    },
    amount: {
      type: Number,
      min: 0,
    },
    description: String,
    date: Date,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    processedAt: Date,
    extractedData: {
      vendor: String,
      amount: {
        type: Number,
        min: 0,
      },
      date: Date,
      category: String,
      description: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
receiptSchema.index({ category: 1 });
receiptSchema.index({ uploadedAt: -1 });
receiptSchema.index({ declarationId: 1, category: 1 });

export const Receipt = mongoose.model<IReceipt>('Receipt', receiptSchema);