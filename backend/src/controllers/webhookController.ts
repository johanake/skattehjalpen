import { Request, Response } from 'express';
import { stripeService } from '../services/stripeService.js';
import { PaymentSession } from '../models/PaymentSession.js';
import { logger } from '../utils/logger.js';

export class WebhookController {
  static async handleStripeWebhook(req: Request, res: Response) {
    const signature = req.headers['stripe-signature'] as string;

    if (!signature) {
      logger.error('Missing stripe-signature header');
      return res.status(400).json({ error: 'Missing stripe-signature header' });
    }

    try {
      // Construct the event from the raw body and signature
      const event = await stripeService.constructWebhookEvent(
        req.body,
        signature
      );

      logger.info('Stripe webhook received', {
        type: event.type,
        id: event.id
      });

      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          await WebhookController.handlePaymentSucceeded(event);
          break;

        case 'payment_intent.payment_failed':
          await WebhookController.handlePaymentFailed(event);
          break;

        case 'payment_intent.canceled':
          await WebhookController.handlePaymentCanceled(event);
          break;

        default:
          logger.info('Unhandled webhook event type', { type: event.type });
      }

      res.json({ received: true });
    } catch (error) {
      logger.error('Webhook error', error);
      res.status(400).json({ error: 'Webhook error' });
    }
  }

  private static async handlePaymentSucceeded(event: any) {
    const paymentIntent = event.data.object;

    logger.info('Payment succeeded', {
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    });

    try {
      // Update PaymentSession in database
      const paymentSession = await PaymentSession.findOne({
        stripeSessionId: paymentIntent.id
      });

      if (paymentSession) {
        paymentSession.status = 'completed';
        paymentSession.completedAt = new Date();
        await paymentSession.save();

        logger.info('PaymentSession updated to completed', {
          paymentSessionId: paymentSession._id,
          paymentIntentId: paymentIntent.id
        });
      } else {
        logger.warn('PaymentSession not found for payment intent', {
          paymentIntentId: paymentIntent.id
        });
      }
    } catch (error) {
      logger.error('Error updating PaymentSession on payment success', error);
    }
  }

  private static async handlePaymentFailed(event: any) {
    const paymentIntent = event.data.object;

    logger.error('Payment failed', {
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      lastPaymentError: paymentIntent.last_payment_error
    });

    try {
      // Update PaymentSession status to failed
      const paymentSession = await PaymentSession.findOne({
        stripeSessionId: paymentIntent.id
      });

      if (paymentSession) {
        paymentSession.status = 'failed';
        await paymentSession.save();

        logger.info('PaymentSession updated to failed', {
          paymentSessionId: paymentSession._id,
          paymentIntentId: paymentIntent.id
        });
      }
    } catch (error) {
      logger.error('Error updating PaymentSession on payment failure', error);
    }
  }

  private static async handlePaymentCanceled(event: any) {
    const paymentIntent = event.data.object;

    logger.info('Payment canceled', {
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    });

    // TODO: Update PaymentSession status to canceled
  }
}