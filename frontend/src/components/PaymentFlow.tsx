import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { trpc } from '../utils/trpc';

interface PaymentFlowProps {
  onPaymentSuccess: () => void;
}

export const PaymentFlow: React.FC<PaymentFlowProps> = ({ onPaymentSuccess }) => {
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  const stripe = useStripe();
  const elements = useElements();
  
  const createPaymentIntent = trpc.payment.createPaymentIntent.useMutation();

  const plan = {
    name: 'Skatteanalys',
    price: 599,
    features: [
      'Omfattande AI-baserad skatteanalys',
      'Automatisk identifiering av avdrag',
      'Detaljerade avdragsrekommendationer',
      'Riskbedömning och säkerhetsanalys',
      'Prioriterad support',
      'Detaljerad PDF-rapport',
      'Uppföljning och rådgivning',
    ],
  };

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    
    setProcessing(true);
    setPaymentError(null);
    
    try {
      // Create payment intent
      const { clientSecret } = await createPaymentIntent.mutateAsync({
        amount: plan.price,
        currency: 'sek',
      });

      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // Get card element
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Confirm payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setPaymentError(error.message || 'Payment failed');
      } else {
        onPaymentSuccess();
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        '::placeholder': {
          color: '#6b7280',
        },
      },
    },
  };

  return (
    <div className="bg-bg-white p-6 rounded-lg shadow-lg border border-border-light">
      <h3 className="text-lg font-semibold mb-4 text-text-primary">Betalning</h3>
      
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

      {/* Payment Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Kortinformation
          </label>
          <div className="bg-bg-white p-3 rounded-lg border border-border-default">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={processing || !stripe || !elements}
          className="w-full bg-accent text-white py-3 px-6 rounded-lg hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {processing ? 'Bearbetar betalning...' : `Betala ${plan.price} kr`}
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

      <div className="mt-4 text-xs text-text-muted text-center">
        <p>🔒 Säker betalning via Stripe. Dina kortuppgifter är krypterade och skyddade.</p>
        <p>30 dagars pengarna-tillbaka-garanti om du inte är nöjd.</p>
      </div>
    </div>
  );
};