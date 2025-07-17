/* import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { stripeService } from '../services/stripeService';
import { publicProcedure, router } from '../trpc';

const createPaymentIntentSchema = z.object({
  amount: z.number().min(1),
  currency: z.string().default('sek'),
});

const confirmPaymentSchema = z.object({
  paymentIntentId: z.string(),
});

const getPaymentStatusSchema = z.object({
  paymentIntentId: z.string(),
});

export const paymentRouter = router({
  createPaymentIntent: publicProcedure
    .input(createPaymentIntentSchema)
    .mutation(async ({ input }) => {
      try {
        const paymentIntent = await stripeService.createPaymentIntent(
          input.amount,
          input.currency
        );

        return {
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create payment intent',
        });
      }
    }),

  confirmPayment: publicProcedure
    .input(confirmPaymentSchema)
    .mutation(async ({ input }) => {
      try {
        const paymentIntent = await stripeService.confirmPayment(input.paymentIntentId);
        
        return {
          status: paymentIntent.status,
          paymentIntentId: paymentIntent.id,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to confirm payment',
        });
      }
    }),

  getPaymentStatus: publicProcedure
    .input(getPaymentStatusSchema)
    .query(async ({ input }) => {
      try {
        const paymentIntent = await stripeService.retrievePaymentIntent(input.paymentIntentId);
        
        return {
          status: paymentIntent.status,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve payment status',
        });
      }
    }),
}); */
