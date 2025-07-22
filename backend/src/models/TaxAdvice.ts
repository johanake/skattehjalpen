import mongoose, { Document, Schema } from 'mongoose';

export interface ITaxAdvice extends Document {
  declarationId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | null;
  suggestedDeductions: {
    category: string;
    currentAmount: number;
    suggestedAmount: number;
    potentialSavings: number;
    confidence: 'high' | 'medium' | 'low';
    explanation: string;
    requiredDocuments: string[];
    relatedReceipts: mongoose.Types.ObjectId[];
  }[];
  totalPotentialSavings: number;
  riskAssessment: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
  };
  recommendations: string[];
  generatedAt: Date;
}

const taxAdviceSchema = new Schema<ITaxAdvice>(
  {
    declarationId: {
      type: Schema.Types.ObjectId,
      ref: 'TaxDeclaration',
      required: true,
      unique: true, // One advice per declaration
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
    suggestedDeductions: [{
      category: {
        type: String,
        required: true,
      },
      currentAmount: {
        type: Number,
        required: true,
        min: 0,
      },
      suggestedAmount: {
        type: Number,
        required: true,
        min: 0,
      },
      potentialSavings: {
        type: Number,
        required: true,
        min: 0,
      },
      confidence: {
        type: String,
        enum: ['high', 'medium', 'low'],
        required: true,
      },
      explanation: {
        type: String,
        required: true,
      },
      requiredDocuments: [{
        type: String,
      }],
      relatedReceipts: [{
        type: Schema.Types.ObjectId,
        ref: 'Receipt',
      }],
    }],
    totalPotentialSavings: {
      type: Number,
      required: true,
      min: 0,
    },
    riskAssessment: {
      level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
      },
      factors: [{
        type: String,
      }],
    },
    recommendations: [{
      type: String,
    }],
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to automatically calculate totalPotentialSavings from individual deductions
taxAdviceSchema.pre('save', function (next) {
  if (this.suggestedDeductions && this.suggestedDeductions.length > 0) {
    this.totalPotentialSavings = this.suggestedDeductions.reduce(
      (sum, deduction) => sum + (deduction.potentialSavings || 0),
      0
    );
  }
  next();
});

// Indexes for better performance
taxAdviceSchema.index({ declarationId: 1 });
taxAdviceSchema.index({ userId: 1 });
taxAdviceSchema.index({ generatedAt: -1 });

export const TaxAdvice = mongoose.model<ITaxAdvice>('TaxAdvice', taxAdviceSchema);