import { TaxService } from '../services/taxService';
import { FileUploadService } from '../services/fileUploadService';
import {
  createTaxDeclarationSchema,
  uploadReceiptSchema,
  createPaymentSessionSchema,
  getTaxDeclarationSchema,
  getReceiptsSchema,
  generateAdviceSchema,
} from '../validators/taxValidators';
import { publicProcedure } from '../trpc';

export const taxController = {
  // Tax Declaration endpoints
  createDeclaration: publicProcedure
    .input(createTaxDeclarationSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = 'mock-user-id'; // In real app, get from auth context
      return await TaxService.createTaxDeclaration(userId, input);
    }),

  getDeclaration: publicProcedure
    .input(getTaxDeclarationSchema)
    .query(async ({ input }) => {
      return await TaxService.getTaxDeclaration(input.id);
    }),

  getUserDeclarations: publicProcedure
    .query(async ({ ctx }) => {
      const userId = 'mock-user-id'; // In real app, get from auth context
      return await TaxService.getUserDeclarations(userId);
    }),

  // Receipt endpoints
  getReceipts: publicProcedure
    .input(getReceiptsSchema)
    .query(async ({ input }) => {
      return await TaxService.getReceipts(input.declarationId);
    }),

  // Tax Advice endpoints
  generateAdvice: publicProcedure
    .input(generateAdviceSchema)
    .mutation(async ({ input }) => {
      return await TaxService.generateAdvice(input.declarationId);
    }),

  // Payment endpoints
  createPaymentSession: publicProcedure
    .input(createPaymentSessionSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = 'mock-user-id'; // In real app, get from auth context
      return await TaxService.createPaymentSession(userId, input);
    }),

  completePayment: publicProcedure
    .input(getTaxDeclarationSchema) // Reuse schema for payment ID
    .mutation(async ({ input }) => {
      return await TaxService.completePayment(input.id);
    }),

  getPayment: publicProcedure
    .input(getTaxDeclarationSchema) // Reuse schema for payment ID
    .query(async ({ input }) => {
      return await TaxService.getPayment(input.id);
    }),
};