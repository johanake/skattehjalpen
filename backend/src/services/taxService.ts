import type { TaxDeclaration, Receipt, TaxAdvice, PaymentSession } from '../types/tax';
import type { CreateTaxDeclarationInput, CreatePaymentSessionInput } from '../validators/taxValidators';

export class TaxService {
  private static declarations: TaxDeclaration[] = [];
  private static receipts: Receipt[] = [];
  private static advices: TaxAdvice[] = [];
  private static payments: PaymentSession[] = [];

  // Tax Declaration methods
  static async createTaxDeclaration(userId: string, data: CreateTaxDeclarationInput): Promise<TaxDeclaration> {
    const declaration: TaxDeclaration = {
      id: Math.random().toString(36).substring(7),
      userId,
      ...data,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.declarations.push(declaration);
    return declaration;
  }

  static async getTaxDeclaration(id: string): Promise<TaxDeclaration | null> {
    return this.declarations.find(d => d.id === id) || null;
  }

  static async getUserDeclarations(userId: string): Promise<TaxDeclaration[]> {
    return this.declarations.filter(d => d.userId === userId);
  }

  // Receipt methods
  static async createReceipt(declarationId: string, receiptData: Partial<Receipt>): Promise<Receipt> {
    const receipt: Receipt = {
      id: Math.random().toString(36).substring(7),
      declarationId,
      fileName: receiptData.fileName || '',
      fileType: receiptData.fileType || '',
      fileSize: receiptData.fileSize || 0,
      category: receiptData.category || 'other',
      amount: receiptData.amount,
      description: receiptData.description,
      date: receiptData.date,
      uploadedAt: new Date(),
      processedAt: new Date(),
      extractedData: receiptData.extractedData,
    };

    this.receipts.push(receipt);
    return receipt;
  }

  static async getReceipts(declarationId: string): Promise<Receipt[]> {
    return this.receipts.filter(r => r.declarationId === declarationId);
  }

  // Tax Advice methods
  static async generateAdvice(declarationId: string): Promise<TaxAdvice> {
    const declaration = await this.getTaxDeclaration(declarationId);
    const receipts = await this.getReceipts(declarationId);

    if (!declaration) {
      throw new Error('Tax declaration not found');
    }

    // Mock advice generation logic
    const advice = this.calculateTaxAdvice(declaration, receipts);
    this.advices.push(advice);
    return advice;
  }

  private static calculateTaxAdvice(declaration: TaxDeclaration, receipts: Receipt[]): TaxAdvice {
    const suggestedDeductions = [];
    let totalPotentialSavings = 0;

    // Analyze work-related expenses (Arbetsrelaterade kostnader)
    const workReceipts = receipts.filter(r => r.category === 'work');
    const workReceiptTotal = workReceipts.reduce((sum, r) => sum + (r.amount || 0), 0);
    const currentWorkDeduction = declaration.currentDeductions.workRelated || 0;
    
    if (workReceiptTotal > currentWorkDeduction) {
      const potentialSavings = (workReceiptTotal - currentWorkDeduction) * 0.32; // Swedish marginal tax rate
      suggestedDeductions.push({
        category: 'Arbetsrelaterade kostnader',
        currentAmount: currentWorkDeduction,
        suggestedAmount: workReceiptTotal,
        potentialSavings,
        confidence: 'high' as const,
        explanation: 'Du har kvitton för arbetsrelaterade kostnader som överskrider ditt nuvarande avdrag enligt Skatteverkets regler',
        requiredDocuments: ['Kvitton för arbetsutrustning', 'Dokumentation för hemmakontor', 'Arbetsgivarintyg'],
        relatedReceipts: workReceipts.map(r => r.id),
      });
      totalPotentialSavings += potentialSavings;
    }

    // Analyze travel expenses (Resekostnader)
    const travelReceipts = receipts.filter(r => r.category === 'travel');
    const travelReceiptTotal = travelReceipts.reduce((sum, r) => sum + (r.amount || 0), 0);
    const currentTravelDeduction = declaration.currentDeductions.travel || 0;
    
    if (travelReceiptTotal > currentTravelDeduction) {
      const potentialSavings = (travelReceiptTotal - currentTravelDeduction) * 0.32;
      suggestedDeductions.push({
        category: 'Resekostnader',
        currentAmount: currentTravelDeduction,
        suggestedAmount: travelReceiptTotal,
        potentialSavings,
        confidence: 'medium' as const,
        explanation: 'Resekostnader för arbetsresor kan dras av enligt Skatteverkets regler för traktamente och resa',
        requiredDocuments: ['Reseräkningar', 'Dokumentation av arbetssyfte', 'Milersättning'],
        relatedReceipts: travelReceipts.map(r => r.id),
      });
      totalPotentialSavings += potentialSavings;
    }

    // Home office deduction (Hemmakontor)
    const currentHomeOffice = declaration.currentDeductions.homeOffice || 0;
    const salary = declaration.income.salary || 0;
    const maxHomeOfficeDeduction = Math.min(salary * 0.5, 50000); // Max 50% av lön eller 50k SEK
    
    if (maxHomeOfficeDeduction > currentHomeOffice && salary > 0) {
      const potentialSavings = (maxHomeOfficeDeduction - currentHomeOffice) * 0.32;
      suggestedDeductions.push({
        category: 'Hemmakontor',
        currentAmount: currentHomeOffice,
        suggestedAmount: maxHomeOfficeDeduction,
        potentialSavings,
        confidence: 'high' as const,
        explanation: 'Du kan få högre hemmakontoravdrag. Skatteverket tillåter avdrag för hemmakontor upp till 50% av lönen eller maximalt 50 000 kr',
        requiredDocuments: ['Bilder på hemmakontor', 'Distansarbetsavtal', 'Arbetsgivarintyg'],
        relatedReceipts: [],
      });
      totalPotentialSavings += potentialSavings;
    }

    // Education expenses (Utbildningskostnader)
    const educationReceipts = receipts.filter(r => r.category === 'education');
    const educationReceiptTotal = educationReceipts.reduce((sum, r) => sum + (r.amount || 0), 0);
    const currentEducationDeduction = declaration.currentDeductions.education || 0;
    
    if (educationReceiptTotal > currentEducationDeduction) {
      const potentialSavings = (educationReceiptTotal - currentEducationDeduction) * 0.32;
      suggestedDeductions.push({
        category: 'Utbildningskostnader',
        currentAmount: currentEducationDeduction,
        suggestedAmount: educationReceiptTotal,
        potentialSavings,
        confidence: 'medium' as const,
        explanation: 'Utbildningskostnader som är arbetsrelaterade kan dras av enligt Skatteverkets regler',
        requiredDocuments: ['Kursintyg', 'Kvitton för kurser', 'Arbetsgivarintyg om arbetsrelaterad utbildning'],
        relatedReceipts: educationReceipts.map(r => r.id),
      });
      totalPotentialSavings += potentialSavings;
    }

    return {
      id: Math.random().toString(36).substring(7),
      declarationId: declaration.id,
      suggestedDeductions,
      totalPotentialSavings,
      riskAssessment: {
        level: totalPotentialSavings > 10000 ? 'medium' : 'low',
        factors: totalPotentialSavings > 10000 ? ['High deduction amount'] : [],
      },
      recommendations: [
        'Spara alla kvitton organiserat och digitaliserat',
        'Dokumentera affärssyftet för alla utgifter',
        'Överväg att konsultera en skattespecialist för komplexa fall',
        'Kontrollera Skatteverkets senaste regler och gränser för avdrag',
        'Förvara dokumentation i minst 7 år enligt Skatteverkets krav',
      ],
      generatedAt: new Date(),
    };
  }

  // Payment methods
  static async createPaymentSession(userId: string, data: CreatePaymentSessionInput): Promise<PaymentSession> {
    const payment: PaymentSession = {
      id: Math.random().toString(36).substring(7),
      userId,
      ...data,
      status: 'pending',
      createdAt: new Date(),
    };

    this.payments.push(payment);
    return payment;
  }

  static async completePayment(paymentId: string): Promise<PaymentSession> {
    const payment = this.payments.find(p => p.id === paymentId);
    if (!payment) {
      throw new Error('Payment not found');
    }

    payment.status = 'completed';
    payment.completedAt = new Date();
    return payment;
  }

  static async getPayment(id: string): Promise<PaymentSession | null> {
    return this.payments.find(p => p.id === id) || null;
  }
}