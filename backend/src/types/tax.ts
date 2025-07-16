export interface TaxDeclaration {
  id: string;
  userId: string;
  year: number;
  income: {
    salary?: number;
    freelance?: number;
    investment?: number;
    other?: number;
  };
  currentDeductions: {
    workRelated?: number;
    homeOffice?: number;
    travel?: number;
    education?: number;
    charitable?: number;
    other?: number;
  };
  personalInfo: {
    name: string;
    personalNumber: string;
    address: string;
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
    hasChildren: boolean;
    childrenCount?: number;
  };
  status: 'draft' | 'submitted' | 'processing' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Receipt {
  id: string;
  declarationId: string;
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

export interface TaxAdvice {
  id: string;
  declarationId: string;
  suggestedDeductions: {
    category: string;
    currentAmount: number;
    suggestedAmount: number;
    potentialSavings: number;
    confidence: 'high' | 'medium' | 'low';
    explanation: string;
    requiredDocuments: string[];
    relatedReceipts: string[];
  }[];
  totalPotentialSavings: number;
  riskAssessment: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
  };
  recommendations: string[];
  generatedAt: Date;
}

export interface PaymentSession {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod?: string;
  createdAt: Date;
  completedAt?: Date;
}