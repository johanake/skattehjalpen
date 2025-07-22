import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { trpc } from "../utils/trpc";
import { useAuth } from "../contexts/AuthContext";

interface PaymentFlowProps {
  declarationId: string;
  onSuccess: () => void;
  requireRegistration?: boolean;
}

export const PaymentFlow: React.FC<PaymentFlowProps> = ({
  declarationId,
  onSuccess,
  requireRegistration = false,
}) => {
  const { user, login, register } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [registrationData, setRegistrationData] = useState({
    email: "",
    password: "",
  });
  const [showMockPayment, setShowMockPayment] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const createPaymentIntent = trpc.payment.createPaymentIntent.useMutation();

  const plan = {
    name: "Skatteanalys",
    price: 599,
    features: [
      "Omfattande AI-baserad skatteanalys",
      "Automatisk identifiering av avdrag",
      "Detaljerade avdragsrekommendationer",
      "Riskbedömning och säkerhetsanalys",
      "Prioriterad support",
      "Detaljerad PDF-rapport",
      "Uppföljning och rådgivning",
    ],
  };

  const handleMockPayment = async () => {
    setProcessing(true);
    setPaymentError(null);

    try {
      // Handle registration if needed
      if (requireRegistration && !user) {
        if (!registrationData.email || !registrationData.password) {
          setPaymentError(
            "Vänligen fyll i email och lösenord för att registrera dig."
          );
          setProcessing(false);
          return;
        }

        await register(registrationData.email, registrationData.password);
      }

      // Mock payment delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful payment
      onSuccess();
    } catch (error: any) {
      console.error("Mock payment/registration failed:", error);
      setPaymentError(
        error.message ||
          "Registrering eller betalning misslyckades. Försök igen."
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleRealPayment = async () => {
    if (!stripe || !elements) return;

    setProcessing(true);
    setPaymentError(null);

    try {
      // Handle registration first if needed
      if (requireRegistration && !user) {
        if (!registrationData.email || !registrationData.password) {
          setPaymentError(
            "Vänligen fyll i email och lösenord för att registrera dig."
          );
          setProcessing(false);
          return;
        }

        await register(registrationData.email, registrationData.password);
      }

      // Create payment intent
      const { clientSecret } = await createPaymentIntent.mutateAsync({
        amount: plan.price,
        currency: "sek",
      });

      if (!clientSecret) {
        throw new Error("Failed to create payment intent");
      }

      // Get card element
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // Confirm payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setPaymentError(error.message || "Payment failed");
      } else {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Payment failed:", error);
      setPaymentError(
        error.message ||
          "Betalning eller registrering misslyckades. Försök igen."
      );
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#1f2937",
        "::placeholder": {
          color: "#6b7280",
        },
      },
    },
  };

  return (
    <div className="bg-bg-white p-6 rounded-lg shadow-lg border border-border-light">
      <h3 className="text-lg font-semibold mb-4 text-text-primary">
        {requireRegistration && !user
          ? "Registrering & Betalning"
          : "Betalning"}
      </h3>

      {/* Plan Summary */}
      <div className="border border-accent rounded-lg p-4 mb-6 bg-accent-light">
        <div className="text-center">
          <h4 className="font-semibold text-text-primary mb-2">{plan.name}</h4>
          <div className="text-3xl font-bold text-accent mb-4">
            {plan.price} kr
          </div>
          <ul className="text-left text-sm text-text-secondary space-y-1">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Registration Form (if needed) */}
      {requireRegistration && !user && (
        <div className="bg-primary-light p-4 rounded-lg mb-6">
          <h4 className="font-medium text-primary mb-3">
            Skapa konto för att fortsätta
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                E-postadress
              </label>
              <input
                type="email"
                value={registrationData.email}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full p-3 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="din@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Lösenord
              </label>
              <input
                type="password"
                value={registrationData.password}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full p-3 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Välj ett säkert lösenord"
              />
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-primary mb-3">Välj betalningsmetod</h4>
        <div className="space-y-2">
          <button
            onClick={() => setShowMockPayment(true)}
            className={`w-full p-4 border rounded-lg text-left transition-colors ${
              showMockPayment
                ? "border-accent bg-accent-light"
                : "border-border-default hover:border-accent"
            }`}
          >
            <div className="font-medium">Mock Payment (För utveckling)</div>
            <div className="text-sm text-text-muted">
              Simulerad betalning utan riktigt kort
            </div>
          </button>
          <button
            onClick={() => setShowMockPayment(false)}
            className={`w-full p-4 border rounded-lg text-left transition-colors ${
              !showMockPayment
                ? "border-accent bg-accent-light"
                : "border-border-default hover:border-accent"
            }`}
          >
            <div className="font-medium">Stripe Payment</div>
            <div className="text-sm text-text-muted">
              Riktig betalning med kreditkort
            </div>
          </button>
        </div>
      </div>

      {/* Payment Form */}
      <div className="space-y-4">
        {!showMockPayment && (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Kortinformation
            </label>
            <div className="bg-bg-white p-3 rounded-lg border border-border-default">
              <CardElement options={cardElementOptions} />
            </div>
          </div>
        )}

        <button
          onClick={showMockPayment ? handleMockPayment : handleRealPayment}
          disabled={processing || (!showMockPayment && (!stripe || !elements))}
          className="w-full bg-accent text-white py-3 px-6 rounded-lg hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {processing
            ? requireRegistration && !user
              ? "Registrerar och bearbetar..."
              : "Bearbetar betalning..."
            : showMockPayment
            ? `Mock Betala ${plan.price} kr`
            : `Betala ${plan.price} kr`}
        </button>

        {paymentError && (
          <div className="mt-4 p-3 bg-danger-light border border-danger text-danger rounded">
            {paymentError}
          </div>
        )}

        {createPaymentIntent.error && (
          <div className="mt-4 p-3 bg-danger-light border border-danger text-danger rounded">
            Kunde inte skapa betalning. Försök igen.
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-text-primary text-center">
        <p>
          🔒 Säker betalning via Stripe. Dina kortuppgifter är krypterade och
          skyddade.
        </p>
      </div>
    </div>
  );
};
