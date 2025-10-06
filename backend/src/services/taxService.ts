import mongoose from "mongoose";
import {
  TaxDeclaration as TaxDeclarationModel,
  ITaxDeclaration,
} from "../models/TaxDeclaration.js";
import {
  TaxAdvice as TaxAdviceModel,
  ITaxAdvice,
} from "../models/TaxAdvice.js";
import type { CreateTaxDeclarationInput } from "../validators/taxValidators.js";
import { LLMService } from "./llmService.js";
import {
  TaxDeclaration,
  TaxAdvice,
  DeductionResult,
} from "../models/Tax.js";

export class TaxService {
  // Tax Declaration methods
  static async createTaxDeclaration(
    userId: string | null,
    data: CreateTaxDeclarationInput
  ): Promise<TaxDeclaration> {
    console.log("Creating tax declaration and running LLM analysis");

    // Create the declaration in MongoDB
    const declaration = new TaxDeclarationModel({
      userId: userId ? new mongoose.Types.ObjectId(userId) : null,
      ...data,
      status: "draft",
    });

    await declaration.save();

    // Run LLM analysis
    const llmService = new LLMService();
    const llmAdvice = await llmService.analyseTaxDeclaration(
      JSON.stringify(declaration),
      2025
    );

    console.log("LLM analysis completed:", llmAdvice);

    // Create and store tax advice
    const advice = new TaxAdviceModel({
      declarationId: declaration._id,
      userId: userId ? new mongoose.Types.ObjectId(userId) : null,
      ...this.convertLLMResultsToTaxAdviceData(llmAdvice),
    });

    await advice.save();

    // Update the declaration status to completed
    declaration.status = "completed";
    await declaration.save();

    // Convert to interface format for return
    return this.formatDeclaration(declaration);
  }

  static async getTaxDeclaration(id: string): Promise<TaxDeclaration | null> {
    const declaration = await TaxDeclarationModel.findById(id);
    return declaration ? this.formatDeclaration(declaration) : null;
  }

  static async getUserDeclarations(userId: string): Promise<TaxDeclaration[]> {
    const declarations = await TaxDeclarationModel.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });
    return declarations.map((d) => this.formatDeclaration(d));
  }


  // Tax Advice methods
  static async generateAdvice(
    declarationId: string,
    userId?: string | null
  ): Promise<TaxAdvice> {
    // Check if advice already exists
    let existingAdvice = await TaxAdviceModel.findOne({
      declarationId: new mongoose.Types.ObjectId(declarationId),
    }).lean();

    if (existingAdvice) {
      return this.formatTaxAdvice(existingAdvice);
    }

    throw new Error("Tax advice not found. Please create a tax declaration first to generate advice.");
  }

  private static convertLLMResultsToTaxAdviceData(llmResults: DeductionResult) {
    const suggestedDeductions =
      llmResults.deductions?.map((deduction: any) => ({
        category: deduction.title || "Okänt avdrag",
        currentAmount: 0, // LLM doesn't provide current amount
        suggestedAmount: parseFloat(
          deduction.amount?.replace(/[^0-9.-]+/g, "") || "0"
        ),
        potentialSavings: parseFloat(
          deduction.potentialSaving?.replace(/[^0-9.-]+/g, "") || "0"
        ),
        confidence: "medium" as const, // Default confidence from LLM
        explanation:
          deduction.motivation ||
          deduction.calculation ||
          "Ingen förklaring tillgänglig",
        requiredDocuments: [deduction.where || "Se Skatteverkets anvisningar"],
      })) || [];

    const calculatedTotalPotentialSavings = suggestedDeductions.reduce(
      (sum: number, d: any) => sum + d.potentialSavings,
      0
    );

    return {
      suggestedDeductions,
      totalPotentialSavings: calculatedTotalPotentialSavings,
      riskAssessment: {
        level: "low" as const,
        factors: [],
      },
      recommendations: [
        "Spara alla kvitton och dokument",
        "Kontrollera Skatteverkets senaste regler",
        "Överväg att konsultera en skattespecialist för komplexa fall",
      ],
    };
  }


  // Helper formatting methods
  private static formatDeclaration(doc: ITaxDeclaration): TaxDeclaration {
    return {
      id: (doc._id as any).toString(),
      userId: doc.userId ? doc.userId.toString() : null,
      year: doc.year,
      personalInfo: doc.personalInfo,
      employment: doc.employment,
      commute: doc.commute,
      workEquipment: doc.workEquipment,
      housing: doc.housing,
      rotRut: doc.rotRut,
      donations: doc.donations,
      education: doc.education,
      rental: doc.rental,
      greenTech: doc.greenTech,
      other: doc.other,
      status: doc.status,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }


  static async getUserTaxAdviceHistory(userId: string): Promise<TaxAdvice[]> {
    const adviceList = await TaxAdviceModel.find({
      userId: new mongoose.Types.ObjectId(userId),
    })
      .sort({ generatedAt: -1 })
      .lean();
    return adviceList.map((advice) => this.formatTaxAdvice(advice));
  }

  static async getTaxAdviceById(
    adviceId: string,
    userId: string
  ): Promise<TaxAdvice | null> {
    const advice = await TaxAdviceModel.findOne({
      _id: new mongoose.Types.ObjectId(adviceId),
      userId: new mongoose.Types.ObjectId(userId),
    }).lean();
    return advice ? this.formatTaxAdvice(advice) : null;
  }

  private static formatTaxAdvice(doc: any): TaxAdvice {
    return {
      id: (doc._id as any).toString(),
      declarationId: doc.declarationId.toString(),
      userId: doc.userId ? doc.userId.toString() : null,
      suggestedDeductions: doc.suggestedDeductions,
      totalPotentialSavings: doc.totalPotentialSavings,
      riskAssessment: doc.riskAssessment,
      recommendations: doc.recommendations,
      generatedAt: doc.generatedAt,
    };
  }
}
