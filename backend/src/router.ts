import { router, publicProcedure } from './trpc';
import { userController } from './controllers/userController';
import { taxController } from './controllers/taxController';
import { z } from 'zod';

export const appRouter = router({
  // Health check
  health: publicProcedure.query(() => ({ status: 'ok' })),

  // Legacy endpoints (for backward compatibility)
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name}!`,
      };
    }),

  getUsers: publicProcedure
    .query(() => {
      return [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ];
    }),

  // Organized by feature
  user: router({
    getAll: userController.getUsers,
    getById: userController.getUserById,
    create: userController.createUser,
  }),

  // Tax service endpoints
  tax: router({
    // Declaration management
    createDeclaration: taxController.createDeclaration,
    getDeclaration: taxController.getDeclaration,
    getUserDeclarations: taxController.getUserDeclarations,

    // Receipt management
    getReceipts: taxController.getReceipts,

    // Tax advice
    generateAdvice: taxController.generateAdvice,

    // Payment processing
    createPaymentSession: taxController.createPaymentSession,
    completePayment: taxController.completePayment,
    getPayment: taxController.getPayment,
  }),
});

export type AppRouter = typeof appRouter;