import Stripe from "stripe";
import { env } from "../config/env.js";

export class StripeService {
  private stripe: Stripe | null = null;
  private isMockMode: boolean;

  constructor() {
    this.isMockMode = true;

    if (!this.isMockMode) {
      this.stripe = new Stripe(env.STRIPE_SECRET_KEY!, {
        apiVersion: "2025-06-30.basil",
      });
    }
  }

  async createPaymentIntent(
    amount: number,
    currency: string = "sek"
  ): Promise<Stripe.PaymentIntent> {
    if (this.isMockMode) {
      console.log(
        `[MOCK] Creating payment intent for ${amount} ${currency.toUpperCase()}`
      );
      return {
        id: `pi_mock_${Date.now()}`,
        object: "payment_intent",
        amount: amount * 100,
        amount_capturable: 0,
        amount_received: 0,
        currency: currency.toLowerCase(),
        status: "requires_payment_method",
        client_secret: `pi_mock_${Date.now()}_secret_mock`,
        metadata: {
          service: "skatteanalys",
        },
        created: Math.floor(Date.now() / 1000),
        livemode: false,
        payment_method_types: ["card"],
      } as unknown as Stripe.PaymentIntent;
    }

    try {
      const paymentIntent = await this.stripe!.paymentIntents.create({
        amount: amount * 100, // Convert to öre (smallest Swedish currency unit)
        currency: currency.toLowerCase(),
        metadata: {
          service: "skatteanalys",
        },
      });

      return paymentIntent;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw new Error("Failed to create payment intent");
    }
  }

  async retrievePaymentIntent(
    paymentIntentId: string
  ): Promise<Stripe.PaymentIntent> {
    if (this.isMockMode) {
      console.log(`[MOCK] Retrieving payment intent: ${paymentIntentId}`);
      return {
        id: paymentIntentId,
        object: "payment_intent",
        amount: 99900, // 999 SEK in öre
        amount_capturable: 0,
        amount_received: 99900,
        currency: "sek",
        status: "succeeded",
        client_secret: `${paymentIntentId}_secret_mock`,
        metadata: {
          service: "skatteanalys",
        },
        created: Math.floor(Date.now() / 1000),
        livemode: false,
        payment_method_types: ["card"],
      } as unknown as Stripe.PaymentIntent;
    }

    try {
      const paymentIntent = await this.stripe!.paymentIntents.retrieve(
        paymentIntentId
      );
      return paymentIntent;
    } catch (error) {
      console.error("Error retrieving payment intent:", error);
      throw new Error("Failed to retrieve payment intent");
    }
  }

  async confirmPayment(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    if (this.isMockMode) {
      console.log(`[MOCK] Confirming payment: ${paymentIntentId}`);
      return {
        id: paymentIntentId,
        object: "payment_intent",
        amount: 99900, // 999 SEK in öre
        amount_capturable: 0,
        amount_received: 99900,
        currency: "sek",
        status: "succeeded",
        client_secret: `${paymentIntentId}_secret_mock`,
        metadata: {
          service: "skatteanalys",
        },
        created: Math.floor(Date.now() / 1000),
        livemode: false,
        payment_method_types: ["card"],
      } as unknown as Stripe.PaymentIntent;
    }

    try {
      const paymentIntent = await this.stripe!.paymentIntents.confirm(
        paymentIntentId
      );
      return paymentIntent;
    } catch (error) {
      console.error("Error confirming payment:", error);
      throw new Error("Failed to confirm payment");
    }
  }

  async constructWebhookEvent(
    body: string | Buffer,
    signature: string
  ): Promise<Stripe.Event> {
    if (this.isMockMode) {
      console.log(
        `[MOCK] Constructing webhook event with signature: ${signature}`
      );
      return {
        id: `evt_mock_${Date.now()}`,
        type: "payment_intent.succeeded",
        data: {
          object: {
            id: `pi_mock_${Date.now()}`,
            amount: 99900,
            currency: "sek",
            status: "succeeded",
          } as Stripe.PaymentIntent,
        },
        created: Math.floor(Date.now() / 1000),
      } as Stripe.Event;
    }

    if (!env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("STRIPE_WEBHOOK_SECRET is required");
    }

    try {
      const event = this.stripe!.webhooks.constructEvent(
        body,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      );
      return event;
    } catch (error) {
      console.error("Error constructing webhook event:", error);
      throw new Error("Failed to construct webhook event");
    }
  }
}

export const stripeService = new StripeService();
