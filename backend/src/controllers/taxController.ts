import { TaxService } from "../services/taxService.js";
import {
  createTaxDeclarationSchema,
  createPaymentSessionSchema,
  getTaxDeclarationSchema,
  generateAdviceSchema,
} from "../validators/taxValidators.js";
import { publicProcedure, protectedProcedure } from "../trpc.js";
import { PaymentService } from "../services/paymentService.js";

export const taxController = {
  // Tax Declaration endpoints
  createDeclaration: publicProcedure
    .input(createTaxDeclarationSchema)
    .mutation(async ({ input, ctx }) => {
      // Allow anonymous users to create declarations
      const userId = ctx.user?.id || null;
      return await TaxService.createTaxDeclaration(userId, input);
    }),

  getDeclaration: protectedProcedure
    .input(getTaxDeclarationSchema)
    .query(async ({ input, ctx }) => {
      const declaration = await TaxService.getTaxDeclaration(input.id);
      // Ensure user can only access their own declarations
      if (declaration && declaration.userId !== ctx.user!.id) {
        throw new Error("Unauthorized access to tax declaration");
      }
      return declaration;
    }),

  getUserDeclarations: protectedProcedure.query(async ({ ctx }) => {
    return await TaxService.getUserDeclarations(ctx.user!.id);
  }),


  // Tax Advice endpoints
  generateAdvice: publicProcedure
    .input(generateAdviceSchema)
    .mutation(async ({ input, ctx }) => {
      // Allow anonymous users to generate advice for their declarations
      const userId = ctx.user?.id || null;
      return await TaxService.generateAdvice(input.declarationId, userId);
    }),

  getUserTaxAdviceHistory: protectedProcedure.query(async ({ ctx }) => {
    return await TaxService.getUserTaxAdviceHistory(ctx.user!.id);
  }),

  getTaxAdviceById: protectedProcedure
    .input(getTaxDeclarationSchema) // Reuse schema for advice ID
    .query(async ({ input, ctx }) => {
      const advice = await TaxService.getTaxAdviceById(input.id, ctx.user!.id);
      if (!advice) {
        throw new Error("Tax advice not found or unauthorized access");
      }
      return advice;
    }),

  // Payment endpoints
  createPaymentSession: protectedProcedure
    .input(createPaymentSessionSchema)
    .mutation(async ({ input, ctx }) => {
      return await PaymentService.createPaymentSession(ctx.user!.id, input);
    }),

  completePayment: protectedProcedure
    .input(getTaxDeclarationSchema) // Reuse schema for payment ID
    .mutation(async ({ input, ctx }) => {
      // Verify the payment belongs to the user
      const payment = await PaymentService.getPayment(input.id);
      if (!payment || payment.userId !== ctx.user!.id) {
        throw new Error("Unauthorized access to payment");
      }
      return await PaymentService.completePayment(input.id);
    }),

  getPayment: protectedProcedure
    .input(getTaxDeclarationSchema) // Reuse schema for payment ID
    .query(async ({ input, ctx }) => {
      const payment = await PaymentService.getPayment(input.id);
      // Ensure user can only access their own payments
      if (payment && payment.userId !== ctx.user!.id) {
        throw new Error("Unauthorized access to payment");
      }
      return payment;
    }),
};
