import { z } from 'zod';

export const createTaxDeclarationSchema = z.object({
  year: z.number().min(2020).max(new Date().getFullYear()),
  income: z.object({
    salary: z.number().optional(),
    freelance: z.number().optional(),
    investment: z.number().optional(),
    other: z.number().optional(),
  }),
  currentDeductions: z.object({
    workRelated: z.number().optional(),
    homeOffice: z.number().optional(),
    travel: z.number().optional(),
    education: z.number().optional(),
    charitable: z.number().optional(),
    other: z.number().optional(),
  }),
  personalInfo: z.object({
    name: z.string().min(1).max(100),
    personalNumber: z.string().min(10).max(15),
    address: z.string().min(5).max(200),
    maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']),
    hasChildren: z.boolean(),
    childrenCount: z.number().optional(),
  }),
});

export const uploadReceiptSchema = z.object({
  declarationId: z.string(),
  category: z.enum(['work', 'home', 'travel', 'education', 'charity', 'medical', 'other']),
  amount: z.number().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
});

export const createPaymentSessionSchema = z.object({
  amount: z.number().min(1),
  currency: z.string().default('SEK'),
  paymentMethod: z.string().optional(),
});

export const getTaxDeclarationSchema = z.object({
  id: z.string(),
});

export const getReceiptsSchema = z.object({
  declarationId: z.string(),
});

export const generateAdviceSchema = z.object({
  declarationId: z.string(),
});

export type CreateTaxDeclarationInput = z.infer<typeof createTaxDeclarationSchema>;
export type UploadReceiptInput = z.infer<typeof uploadReceiptSchema>;
export type CreatePaymentSessionInput = z.infer<typeof createPaymentSessionSchema>;
export type GetTaxDeclarationInput = z.infer<typeof getTaxDeclarationSchema>;
export type GetReceiptsInput = z.infer<typeof getReceiptsSchema>;
export type GenerateAdviceInput = z.infer<typeof generateAdviceSchema>;