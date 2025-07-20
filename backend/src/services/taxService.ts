import type {
  TaxDeclaration,
  Receipt,
  TaxAdvice,
  PaymentSession,
} from "../types/tax.js";
import type {
  CreateTaxDeclarationInput,
  CreatePaymentSessionInput,
} from "../validators/taxValidators.js";
import { LLMService } from "./llmService.js";

export class TaxService {
  private static declarations: TaxDeclaration[] = [];
  private static receipts: Receipt[] = [];
  private static advices: TaxAdvice[] = [];
  private static payments: PaymentSession[] = [];
  private static llmResults: Map<string, any> = new Map(); // Store LLM results by declaration ID

  // Tax Declaration methods
  static async createTaxDeclaration(
    userId: string,
    data: CreateTaxDeclarationInput
  ): Promise<TaxDeclaration> {
    console.log("Creating tax declaration and running LLM analysis");

    const declaration: TaxDeclaration = {
      id: Math.random().toString(36).substring(7),
      userId,
      ...data,
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Store the declaration first
    this.declarations.push(declaration);

    // Run LLM analysis and store the results
    const llmService = new LLMService();
    const llmAdvice = await llmService.analyseTaxDeclaration(
      JSON.stringify(declaration),
      2025
    );

    console.log("LLM analysis completed:", llmAdvice);
    
    // Store LLM results for later use
    this.llmResults.set(declaration.id, llmAdvice);

    // Update the declaration status to completed
    declaration.status = "completed";
    declaration.updatedAt = new Date();

    return declaration;
  }

  static async getTaxDeclaration(id: string): Promise<TaxDeclaration | null> {
    return this.declarations.find((d) => d.id === id) || null;
  }

  static async getUserDeclarations(userId: string): Promise<TaxDeclaration[]> {
    return this.declarations.filter((d) => d.userId === userId);
  }

  // Receipt methods
  static async createReceipt(
    declarationId: string,
    receiptData: Partial<Receipt>
  ): Promise<Receipt> {
    const receipt: Receipt = {
      id: Math.random().toString(36).substring(7),
      declarationId,
      fileName: receiptData.fileName || "",
      fileType: receiptData.fileType || "",
      fileSize: receiptData.fileSize || 0,
      category: receiptData.category || "other",
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
    return this.receipts.filter((r) => r.declarationId === declarationId);
  }

  // Tax Advice methods
  static async generateAdvice(declarationId: string): Promise<TaxAdvice> {
    const declaration = await this.getTaxDeclaration(declarationId);
    const receipts = await this.getReceipts(declarationId);

    if (!declaration) {
      throw new Error("Tax declaration not found");
    }

    // Check if we have LLM results stored for this declaration
    const llmResults = this.llmResults.get(declarationId);
    
    let advice: TaxAdvice;
    
    if (llmResults) {
      // Convert LLM results to TaxAdvice format
      advice = this.convertLLMResultsToTaxAdvice(declarationId, llmResults);
    } else {
      // Fall back to calculated advice
      advice = this.calculateTaxAdvice(declaration, receipts);
    }
    
    this.advices.push(advice);
    return advice;
  }

  private static convertLLMResultsToTaxAdvice(declarationId: string, llmResults: any): TaxAdvice {
    const suggestedDeductions = llmResults.deductions?.map((deduction: any) => ({
      category: deduction.title || 'Okänt avdrag',
      currentAmount: 0, // LLM doesn't provide current amount
      suggestedAmount: parseFloat(deduction.amount?.replace(/[^0-9.-]+/g, '') || '0'),
      potentialSavings: parseFloat(deduction.amount?.replace(/[^0-9.-]+/g, '') || '0') * 0.32, // Estimate 32% tax rate
      confidence: 'medium' as const, // Default confidence from LLM
      explanation: deduction.motivation || deduction.calculation || 'Ingen förklaring tillgänglig',
      requiredDocuments: [deduction.where || 'Se Skatteverkets anvisningar'],
      relatedReceipts: []
    })) || [];

    return {
      id: Math.random().toString(36).substring(7),
      declarationId,
      suggestedDeductions,
      totalPotentialSavings: llmResults.totalDeductions || suggestedDeductions.reduce((sum: number, d: any) => sum + d.potentialSavings, 0),
      riskAssessment: {
        level: 'low' as const,
        factors: []
      },
      recommendations: [
        'Spara alla kvitton och dokument',
        'Kontrollera Skatteverkets senaste regler',
        'Överväg att konsultera en skattespecialist för komplexa fall'
      ],
      generatedAt: new Date()
    };
  }

  private static calculateTaxAdvice(
    declaration: TaxDeclaration,
    receipts: Receipt[]
  ): TaxAdvice {
    const suggestedDeductions = [];
    let totalPotentialSavings = 0;

    // Analyze work equipment expenses (Arbetsutrustning)
    const workReceipts = receipts.filter((r) => r.category === "work");
    const workReceiptTotal = workReceipts.reduce(
      (sum, r) => sum + (r.amount || 0),
      0
    );

    // Calculate current work equipment deductions from form data
    const currentWorkEquipmentDeduction =
      (parseFloat(declaration.workEquipment.computer || "0") || 0) +
      (parseFloat(declaration.workEquipment.mobilePhone || "0") || 0) +
      (parseFloat(declaration.workEquipment.internet || "0") || 0) +
      (parseFloat(declaration.workEquipment.protectiveGear || "0") || 0) +
      (parseFloat(declaration.workEquipment.tools || "0") || 0) +
      (parseFloat(declaration.workEquipment.uniform || "0") || 0);

    if (
      workReceiptTotal > currentWorkEquipmentDeduction &&
      declaration.workEquipment.selfFunded
    ) {
      const potentialSavings =
        (workReceiptTotal - currentWorkEquipmentDeduction) * 0.32;
      suggestedDeductions.push({
        category: "Arbetsutrustning",
        currentAmount: currentWorkEquipmentDeduction,
        suggestedAmount: workReceiptTotal,
        potentialSavings,
        confidence: "high" as const,
        explanation:
          "Du har kvitton för arbetsutrustning som överskrider ditt nuvarande avdrag och har bekostas själv",
        requiredDocuments: [
          "Kvitton för arbetsutrustning",
          "Intyg om att du bekostat själv",
          "Arbetsgivarintyg",
        ],
        relatedReceipts: workReceipts.map((r) => r.id),
      });
      totalPotentialSavings += potentialSavings;
    }

    // Analyze commute expenses (Resekostnader)
    const travelReceipts = receipts.filter((r) => r.category === "travel");
    const travelReceiptTotal = travelReceipts.reduce(
      (sum, r) => sum + (r.amount || 0),
      0
    );

    // Calculate standard commute deduction
    const distance = parseFloat(declaration.commute.distance || "0");
    const standardCommuteDeduction =
      declaration.commute.hasCommute && distance >= 5
        ? Math.max(0, (distance * 2 * 220 - 11000) * 1.9) // Standard formula for commute deduction
        : 0;

    if (
      travelReceiptTotal > standardCommuteDeduction ||
      declaration.commute.hasParkingCosts
    ) {
      const parkingCosts =
        parseFloat(declaration.commute.parkingCostPerMonth || "0") * 12;
      const suggestedAmount =
        Math.max(travelReceiptTotal, standardCommuteDeduction) + parkingCosts;
      const potentialSavings =
        (suggestedAmount - standardCommuteDeduction) * 0.32;

      if (potentialSavings > 0) {
        suggestedDeductions.push({
          category: "Resekostnader",
          currentAmount: standardCommuteDeduction,
          suggestedAmount: suggestedAmount,
          potentialSavings,
          confidence: "medium" as const,
          explanation:
            "Resekostnader för pendling och parkering kan ge högre avdrag enligt Skatteverkets regler",
          requiredDocuments: [
            "Reseräkningar",
            "Parkeringsavgifter",
            "Avståndsberäkning",
          ],
          relatedReceipts: travelReceipts.map((r) => r.id),
        });
        totalPotentialSavings += potentialSavings;
      }
    }

    // ROT/RUT deductions
    const rotAmount = parseFloat(declaration.rotRut.rotAmount || "0");
    const rutAmount = parseFloat(declaration.rotRut.rutAmount || "0");

    if (declaration.rotRut.hasRotWork && rotAmount > 0) {
      const rotDeduction = Math.min(rotAmount * 0.3, 50000); // 30% up to 50k SEK
      const potentialSavings = rotDeduction * 0.32;
      suggestedDeductions.push({
        category: "ROT-avdrag",
        currentAmount: 0,
        suggestedAmount: rotDeduction,
        potentialSavings,
        confidence: "high" as const,
        explanation:
          "ROT-avdrag ger 30% avdrag på arbetskostnader för renovering och ombyggnad",
        requiredDocuments: [
          "Faktura från ROT-företag",
          "Kvitto på betalning",
          "Arbetsspecifikation",
        ],
        relatedReceipts: [],
      });
      totalPotentialSavings += potentialSavings;
    }

    if (declaration.rotRut.hasRutWork && rutAmount > 0) {
      const rutDeduction = Math.min(rutAmount * 0.5, 25000); // 50% up to 25k SEK
      const potentialSavings = rutDeduction * 0.32;
      suggestedDeductions.push({
        category: "RUT-avdrag",
        currentAmount: 0,
        suggestedAmount: rutDeduction,
        potentialSavings,
        confidence: "high" as const,
        explanation:
          "RUT-avdrag ger 50% avdrag på arbetskostnader för städning och hushållstjänster",
        requiredDocuments: [
          "Faktura från RUT-företag",
          "Kvitto på betalning",
          "Tjänstebeskrivning",
        ],
        relatedReceipts: [],
      });
      totalPotentialSavings += potentialSavings;
    }

    // Education expenses (Utbildningskostnader)
    const educationReceipts = receipts.filter(
      (r) => r.category === "education"
    );
    const educationReceiptTotal = educationReceipts.reduce(
      (sum, r) => sum + (r.amount || 0),
      0
    );

    if (
      educationReceiptTotal > 0 &&
      declaration.education.hasPaidForEducation &&
      declaration.education.isJobRelevant
    ) {
      const potentialSavings = educationReceiptTotal * 0.32;
      suggestedDeductions.push({
        category: "Utbildningskostnader",
        currentAmount: 0,
        suggestedAmount: educationReceiptTotal,
        potentialSavings,
        confidence: "medium" as const,
        explanation:
          "Utbildningskostnader som är arbetsrelaterade kan dras av enligt Skatteverkets regler",
        requiredDocuments: [
          "Kursintyg",
          "Kvitton för kurser",
          "Arbetsgivarintyg om arbetsrelaterad utbildning",
        ],
        relatedReceipts: educationReceipts.map((r) => r.id),
      });
      totalPotentialSavings += potentialSavings;
    }

    // Housing deductions (Bostadsränteavdrag)
    const mortgageInterest = parseFloat(
      declaration.housing.mortgageInterest || "0"
    );
    if (declaration.housing.hasMortgage && mortgageInterest > 0) {
      const interestDeduction = mortgageInterest * 0.3; // 30% deduction on mortgage interest
      const potentialSavings = interestDeduction * 0.32;
      suggestedDeductions.push({
        category: "Bostadsränteavdrag",
        currentAmount: 0,
        suggestedAmount: interestDeduction,
        potentialSavings,
        confidence: "high" as const,
        explanation:
          "Ränteavdrag på bolån ger 30% avdrag på räntekostnader för din bostad",
        requiredDocuments: [
          "Räntebesked från bank",
          "Låneavtal",
          "Årlig räntespecifikation",
        ],
        relatedReceipts: [],
      });
      totalPotentialSavings += potentialSavings;
    }

    // Charitable donations (Gåvoavdrag)
    const donationAmount = parseFloat(
      declaration.donations.donationAmount || "0"
    );
    if (
      declaration.donations.hasCharitableDonations &&
      donationAmount >= 2000
    ) {
      const donationDeduction = Math.min(donationAmount, 4000); // Max 4000 SEK per year
      const potentialSavings = donationDeduction * 0.32;
      suggestedDeductions.push({
        category: "Gåvoavdrag",
        currentAmount: 0,
        suggestedAmount: donationDeduction,
        potentialSavings,
        confidence: "high" as const,
        explanation:
          "Gåvor till välgörande organisationer ger avdrag för belopp mellan 2000-4000 kr per år",
        requiredDocuments: [
          "Kvitto från välgörande organisation",
          "90-konto kontroll",
          "Gåvointyg",
        ],
        relatedReceipts: [],
      });
      totalPotentialSavings += potentialSavings;
    }

    // Union and unemployment insurance fees
    const unionFee = parseFloat(declaration.donations.unionFee || "0");
    const unemploymentFee = parseFloat(
      declaration.donations.unemploymentInsuranceFee || "0"
    );
    const totalFees = unionFee + unemploymentFee;

    if (totalFees > 0) {
      const potentialSavings = totalFees * 0.32;
      suggestedDeductions.push({
        category: "Fackavgifter och A-kassa",
        currentAmount: 0,
        suggestedAmount: totalFees,
        potentialSavings,
        confidence: "high" as const,
        explanation:
          "Fackföreningsavgifter och A-kassa är avdragsgilla enligt Skatteverkets regler",
        requiredDocuments: [
          "Medlemsavgift fackförening",
          "A-kassa årsbesked",
          "Inbetalningskvitton",
        ],
        relatedReceipts: [],
      });
      totalPotentialSavings += potentialSavings;
    }

    // Rental income deductions
    const rentalIncome = parseFloat(declaration.rental.rentalIncome || "0");
    const rentalCosts = parseFloat(declaration.rental.rentalCosts || "0");

    if (
      declaration.rental.hasRentalIncome &&
      rentalIncome > 0 &&
      declaration.rental.hasRentalCosts &&
      rentalCosts > 0
    ) {
      const potentialSavings = rentalCosts * 0.32;
      suggestedDeductions.push({
        category: "Uthyrningskostnader",
        currentAmount: 0,
        suggestedAmount: rentalCosts,
        potentialSavings,
        confidence: "medium" as const,
        explanation:
          "Kostnader för uthyrning kan dras av mot uthyrningsinkomster",
        requiredDocuments: [
          "Hyreskontrakt",
          "Kvitton på reparationer",
          "Försäkringskvitton",
        ],
        relatedReceipts: [],
      });
      totalPotentialSavings += potentialSavings;
    }

    // Green technology deductions
    const solarCost = parseFloat(declaration.greenTech.solarPanelsCost || "0");
    const chargingCost = parseFloat(
      declaration.greenTech.chargingStationCost || "0"
    );
    const batteryCost = parseFloat(
      declaration.greenTech.batteryStorageCost || "0"
    );
    const totalGreenTechCost = solarCost + chargingCost + batteryCost;

    if (totalGreenTechCost > 0) {
      const greenTechDeduction = Math.min(totalGreenTechCost * 0.15, 50000); // 15% up to 50k SEK
      const potentialSavings = greenTechDeduction * 0.32;
      suggestedDeductions.push({
        category: "Grön teknik-avdrag",
        currentAmount: 0,
        suggestedAmount: greenTechDeduction,
        potentialSavings,
        confidence: "high" as const,
        explanation:
          "Investeringar i grön teknik som solceller och laddboxar ger 15% avdrag",
        requiredDocuments: [
          "Faktura installation",
          "Kvitto på betalning",
          "Installationsintyg",
        ],
        relatedReceipts: [],
      });
      totalPotentialSavings += potentialSavings;
    }

    return {
      id: Math.random().toString(36).substring(7),
      declarationId: declaration.id,
      suggestedDeductions,
      totalPotentialSavings,
      riskAssessment: {
        level: totalPotentialSavings > 10000 ? "medium" : "low",
        factors: totalPotentialSavings > 10000 ? ["High deduction amount"] : [],
      },
      recommendations: [
        "Spara alla kvitton organiserat och digitaliserat",
        "Dokumentera affärssyftet för alla utgifter",
        "Överväg att konsultera en skattespecialist för komplexa fall",
        "Kontrollera Skatteverkets senaste regler och gränser för avdrag",
        "Förvara dokumentation i minst 7 år enligt Skatteverkets krav",
      ],
      generatedAt: new Date(),
    };
  }

  // Payment methods
  static async createPaymentSession(
    userId: string,
    data: CreatePaymentSessionInput
  ): Promise<PaymentSession> {
    const payment: PaymentSession = {
      id: Math.random().toString(36).substring(7),
      userId,
      ...data,
      status: "pending",
      createdAt: new Date(),
    };

    this.payments.push(payment);
    return payment;
  }

  static async completePayment(paymentId: string): Promise<PaymentSession> {
    const payment = this.payments.find((p) => p.id === paymentId);
    if (!payment) {
      throw new Error("Payment not found");
    }

    payment.status = "completed";
    payment.completedAt = new Date();
    return payment;
  }

  static async getPayment(id: string): Promise<PaymentSession | null> {
    return this.payments.find((p) => p.id === id) || null;
  }
}
