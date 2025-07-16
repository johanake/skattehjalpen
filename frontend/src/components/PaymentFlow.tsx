import { useState } from 'react';
import { trpc } from '../utils/trpc';

interface PaymentFlowProps {
  onPaymentSuccess: () => void;
}

export const PaymentFlow: React.FC<PaymentFlowProps> = ({ onPaymentSuccess }) => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'professional'>('basic');
  const [processing, setProcessing] = useState(false);

  const createPaymentSession = trpc.tax.createPaymentSession.useMutation();
  const completePayment = trpc.tax.completePayment.useMutation();

  const plans = {
    basic: {
      name: 'Grundanalys',
      price: 299,
      features: [
        'Grundläggande skatterådgivning',
        'Kvittoanalys',
        'Standardavdrag granskning',
        'E-postsupport',
      ],
    },
    premium: {
      name: 'Premiumanalys',
      price: 599,
      features: [
        'Omfattande skatterådgivning',
        'Avancerad kvittoanalys',
        'Detaljerade avdragsrekommendationer',
        'Riskbedömning',
        'Prioriterad support',
        'PDF-rapport',
      ],
    },
    professional: {
      name: 'Professionell tjänst',
      price: 999,
      features: [
        'Expertkonsultation',
        'Komplett skatteoptimering',
        'Revisionsskydd',
        'Skatteexpert granskning',
        'Telefonsupport',
        'Detaljerad rapport med förklaringar',
      ],
    },
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // Create payment session
      const paymentSession = await createPaymentSession.mutateAsync({
        amount: plans[selectedPlan].price,
        currency: 'SEK',
        paymentMethod: 'card',
      });

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Complete payment
      await completePayment.mutateAsync({ id: paymentSession.id });

      onPaymentSuccess();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-white">Välj ditt paket</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(plans).map(([key, plan]) => (
          <div
            key={key}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedPlan === key 
                ? 'border-green-500 bg-green-900/20' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onClick={() => setSelectedPlan(key as any)}
          >
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">{plan.name}</h4>
              <div className="text-2xl font-bold text-green-400 mb-4">
                {plan.price} kr
              </div>
              <ul className="text-left text-sm text-gray-300 space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-white">
            Valt: {plans[selectedPlan].name}
          </span>
          <span className="text-xl font-bold text-green-400">
            {plans[selectedPlan].price} kr
          </span>
        </div>

        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {processing ? 'Bearbetar betalning...' : 'Betala nu'}
        </button>

        {(createPaymentSession.error || completePayment.error) && (
          <div className="mt-4 p-3 bg-red-900 border border-red-400 text-red-200 rounded">
            Betalningen misslyckades. Försök igen.
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400 text-center">
        <p>Säker betalning. Dina uppgifter är krypterade och skyddade.</p>
        <p>30 dagars pengarna-tillbaka-garanti om du inte är nöjd.</p>
      </div>
    </div>
  );
};