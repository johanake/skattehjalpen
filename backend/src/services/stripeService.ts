// import Stripe from 'stripe';
// import { env } from '../config/env';

// export class StripeService {
//   private stripe: Stripe;

//   constructor() {
//     if (!env.STRIPE_SECRET_KEY) {
//       throw new Error('STRIPE_SECRET_KEY is required');
//     }

//     this.stripe = new Stripe(env.STRIPE_SECRET_KEY, {
//       apiVersion: '2025-06-30.basil',
//     });
//   }

//   async createPaymentIntent(amount: number, currency: string = 'sek'): Promise<Stripe.PaymentIntent> {
//     try {
//       const paymentIntent = await this.stripe.paymentIntents.create({
//         amount: amount * 100, // Convert to öre (smallest Swedish currency unit)
//         currency: currency.toLowerCase(),
//         metadata: {
//           service: 'skatteanalys',
//         },
//       });

//       return paymentIntent;
//     } catch (error) {
//       console.error('Error creating payment intent:', error);
//       throw new Error('Failed to create payment intent');
//     }
//   }

//   async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
//     try {
//       const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
//       return paymentIntent;
//     } catch (error) {
//       console.error('Error retrieving payment intent:', error);
//       throw new Error('Failed to retrieve payment intent');
//     }
//   }

//   async confirmPayment(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
//     try {
//       const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId);
//       return paymentIntent;
//     } catch (error) {
//       console.error('Error confirming payment:', error);
//       throw new Error('Failed to confirm payment');
//     }
//   }

//   async constructWebhookEvent(body: string | Buffer, signature: string): Promise<Stripe.Event> {
//     if (!env.STRIPE_WEBHOOK_SECRET) {
//       throw new Error('STRIPE_WEBHOOK_SECRET is required');
//     }

//     try {
//       const event = this.stripe.webhooks.constructEvent(
//         body,
//         signature,
//         env.STRIPE_WEBHOOK_SECRET
//       );
//       return event;
//     } catch (error) {
//       console.error('Error constructing webhook event:', error);
//       throw new Error('Failed to construct webhook event');
//     }
//   }
// }

// export const stripeService = new StripeService();
