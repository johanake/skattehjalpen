import { TRPCError } from "@trpc/server";
import { z } from "zod";
import mongoose from "mongoose";
import { stripeService } from "../services/stripeService.js";
import { PaymentSession } from "../models/PaymentSession.js";
import { publicProcedure, protectedProcedure, router } from "../trpc.js";

const createPaymentIntentSchema = z.object({
  amount: z.number().min(1),
  currency: z.string().default("sek"),
  declarationId: z.string().optional(),
});

const confirmPaymentSchema = z.object({
  paymentIntentId: z.string(),
});

const getPaymentStatusSchema = z.object({
  paymentIntentId: z.string(),
});

export const paymentRouter = router({
  createPaymentIntent: protectedProcedure
    .input(createPaymentIntentSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Create payment intent with Stripe
        const paymentIntent = await stripeService.createPaymentIntent(
          input.amount,
          input.currency
        );

        // Create payment session record in database
        const paymentSession = new PaymentSession({
          userId: ctx.user!.id,
          declarationId: input.declarationId ? new mongoose.Types.ObjectId(input.declarationId) : undefined,
          amount: input.amount,
          currency: input.currency.toUpperCase(),
          status: 'pending',
          stripeSessionId: paymentIntent.id,
        });

        await paymentSession.save();

        return {
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          paymentSessionId: (paymentSession._id as mongoose.Types.ObjectId).toString(),
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create payment intent",
        });
      }
    }),

  confirmPayment: publicProcedure
    .input(confirmPaymentSchema)
    .mutation(async ({ input }) => {
      try {
        const paymentIntent = await stripeService.confirmPayment(
          input.paymentIntentId
        );

        return {
          status: paymentIntent.status,
          paymentIntentId: paymentIntent.id,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to confirm payment",
        });
      }
    }),

  getPaymentStatus: publicProcedure
    .input(getPaymentStatusSchema)
    .query(async ({ input }) => {
      try {
        const paymentIntent = await stripeService.retrievePaymentIntent(
          input.paymentIntentId
        );

        return {
          status: paymentIntent.status,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve payment status",
        });
      }
    }),

  getUserPayments: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const payments = await PaymentSession.find({ userId: ctx.user!.id })
          .sort({ createdAt: -1 })
          .limit(50);

        return payments.map(payment => ({
          id: (payment._id as mongoose.Types.ObjectId).toString(),
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          createdAt: payment.createdAt,
          completedAt: payment.completedAt,
          declarationId: payment.declarationId?.toString(),
        }));
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve user payments",
        });
      }
    }),
});
