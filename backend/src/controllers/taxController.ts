import { TaxService } from '../services/taxService.js';
import {
  createTaxDeclarationSchema,
  createPaymentSessionSchema,
  getTaxDeclarationSchema,
  getReceiptsSchema,
  generateAdviceSchema,
} from '../validators/taxValidators.js';
import { publicProcedure, protectedProcedure } from '../trpc.js';

export const taxController = {
  // Tax Declaration endpoints
  createDeclaration: protectedProcedure
    .input(createTaxDeclarationSchema)
    .mutation(async ({ input, ctx }) => {
      return await TaxService.createTaxDeclaration(ctx.user!.id, input);
    }),

  getDeclaration: protectedProcedure
    .input(getTaxDeclarationSchema)
    .query(async ({ input, ctx }) => {
      const declaration = await TaxService.getTaxDeclaration(input.id);
      // Ensure user can only access their own declarations
      if (declaration && declaration.userId !== ctx.user!.id) {
        throw new Error('Unauthorized access to tax declaration');
      }
      return declaration;
    }),

  getUserDeclarations: protectedProcedure
    .query(async ({ ctx }) => {
      return await TaxService.getUserDeclarations(ctx.user!.id);
    }),

  // Receipt endpoints
  getReceipts: protectedProcedure
    .input(getReceiptsSchema)
    .query(async ({ input, ctx }) => {
      // Verify the declaration belongs to the user
      const declaration = await TaxService.getTaxDeclaration(input.declarationId);
      if (!declaration || declaration.userId !== ctx.user!.id) {
        throw new Error('Unauthorized access to receipts');
      }
      return await TaxService.getReceipts(input.declarationId);
    }),

  // Tax Advice endpoints
  generateAdvice: protectedProcedure
    .input(generateAdviceSchema)
    .mutation(async ({ input, ctx }) => {
      // Verify the declaration belongs to the user
      const declaration = await TaxService.getTaxDeclaration(input.declarationId);
      if (!declaration || declaration.userId !== ctx.user!.id) {
        throw new Error('Unauthorized access to tax advice');
      }
      return await TaxService.generateAdvice(input.declarationId, ctx.user!.id);
    }),

  getUserTaxAdviceHistory: protectedProcedure
    .query(async ({ ctx }) => {
      return await TaxService.getUserTaxAdviceHistory(ctx.user!.id);
    }),

  getTaxAdviceById: protectedProcedure
    .input(getTaxDeclarationSchema) // Reuse schema for advice ID
    .query(async ({ input, ctx }) => {
      const advice = await TaxService.getTaxAdviceById(input.id, ctx.user!.id);
      if (!advice) {
        throw new Error('Tax advice not found or unauthorized access');
      }
      return advice;
    }),

  // Payment endpoints
  createPaymentSession: protectedProcedure
    .input(createPaymentSessionSchema)
    .mutation(async ({ input, ctx }) => {
      return await TaxService.createPaymentSession(ctx.user!.id, input);
    }),

  completePayment: protectedProcedure
    .input(getTaxDeclarationSchema) // Reuse schema for payment ID
    .mutation(async ({ input, ctx }) => {
      // Verify the payment belongs to the user
      const payment = await TaxService.getPayment(input.id);
      if (!payment || payment.userId !== ctx.user!.id) {
        throw new Error('Unauthorized access to payment');
      }
      return await TaxService.completePayment(input.id);
    }),

  getPayment: protectedProcedure
    .input(getTaxDeclarationSchema) // Reuse schema for payment ID
    .query(async ({ input, ctx }) => {
      const payment = await TaxService.getPayment(input.id);
      // Ensure user can only access their own payments
      if (payment && payment.userId !== ctx.user!.id) {
        throw new Error('Unauthorized access to payment');
      }
      return payment;
    }),
};