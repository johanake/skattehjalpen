import { router, publicProcedure, protectedProcedure } from "./trpc.js";
import { userController } from "./controllers/userController.js";
import { taxController } from "./controllers/taxController.js";
import { paymentRouter } from "./controllers/paymentController.js";
import { AuthController } from "./controllers/authController.js";
import { registerSchema, loginSchema } from "./validators/authValidators.js";
import { z } from "zod";

export const appRouter = router({
  // Health check
  health: publicProcedure.query(() => ({ status: "ok" })),

  // Authentication endpoints
  auth: router({
    register: publicProcedure
      .input(registerSchema)
      .mutation(({ input }) => {
        return AuthController.register(input);
      }),
    
    login: publicProcedure
      .input(loginSchema)
      .mutation(({ input }) => {
        return AuthController.login(input);
      }),

    me: protectedProcedure
      .query(({ ctx }) => {
        return AuthController.getCurrentUser(ctx.user!.id);
      }),
  }),

  // Legacy endpoints (for backward compatibility)
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name}!`,
      };
    }),

  getUsers: publicProcedure.query(() => {
    return [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
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


    // Tax advice
    generateAdvice: taxController.generateAdvice,
    getUserTaxAdviceHistory: taxController.getUserTaxAdviceHistory,
    getTaxAdviceById: taxController.getTaxAdviceById,

    // Payment processing
    createPaymentSession: taxController.createPaymentSession,
    completePayment: taxController.completePayment,
    getPayment: taxController.getPayment,
  }),

  // Stripe payment endpoints
  payment: paymentRouter,
});

export type AppRouter = typeof appRouter;
