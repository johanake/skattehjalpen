import { useState } from 'react';
import { TaxDeclarationForm } from './TaxDeclarationForm';
import { ReceiptUpload } from './ReceiptUpload';
import { ReceiptList } from './ReceiptList';
import { TaxAdviceDisplay } from './TaxAdviceDisplay';
import { PaymentFlow } from './PaymentFlow';

interface TaxWizardProps {
  onBackToLanding: () => void;
}

export const TaxWizard: React.FC<TaxWizardProps> = ({ onBackToLanding }) => {
  const [currentStep, setCurrentStep] = useState<'declaration' | 'receipts' | 'payment' | 'advice'>('declaration');
  const [declarationId, setDeclarationId] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleDeclarationSuccess = (id: string) => {
    setDeclarationId(id);
    setCurrentStep('receipts');
  };

  const handleReceiptUpload = () => {
    // Just refresh the receipt list - no need to change steps
  };

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    setCurrentStep('advice');
  };

  const steps = [
    { id: 'declaration', name: 'Skattedeklaration', completed: !!declarationId },
    { id: 'receipts', name: 'Ladda upp kvitton', completed: false },
    { id: 'payment', name: 'Betalning', completed: paymentCompleted },
    { id: 'advice', name: 'Skatterådgivning', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={onBackToLanding}
                className="flex items-center text-gray-300 hover:text-green-400 mb-2 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Tillbaka till startsida
              </button>
              <h1 className="text-3xl font-bold text-white">
                Skattehjälpen
              </h1>
              <p className="text-gray-300 mt-2">
                AI-driven skatterådgivning för svenska skattebetalare
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Steg {steps.findIndex(s => s.id === currentStep) + 1} av {steps.length}</div>
              <div className="text-lg font-semibold text-white">{steps.find(s => s.id === currentStep)?.name}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.completed
                    ? 'bg-green-600 text-white'
                    : currentStep === step.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-600 text-gray-300'
                }`}
              >
                {step.completed ? '✓' : index + 1}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  step.completed ? 'text-green-400' : 
                  currentStep === step.id ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {step.name}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 ml-4 ${
                  step.completed ? 'bg-green-600' : 'bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        {declarationId && (
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setCurrentStep('declaration')}
              className={`px-4 py-2 rounded ${
                currentStep === 'declaration'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Deklaration
            </button>
            <button
              onClick={() => setCurrentStep('receipts')}
              className={`px-4 py-2 rounded ${
                currentStep === 'receipts'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Kvitton
            </button>
            <button
              onClick={() => setCurrentStep('payment')}
              className={`px-4 py-2 rounded ${
                currentStep === 'payment'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Betalning
            </button>
            {paymentCompleted && (
              <button
                onClick={() => setCurrentStep('advice')}
                className={`px-4 py-2 rounded ${
                  currentStep === 'advice'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Skatterådgivning
              </button>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {currentStep === 'declaration' && (
            <TaxDeclarationForm onSuccess={handleDeclarationSuccess} />
          )}

          {currentStep === 'receipts' && declarationId && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReceiptUpload 
                declarationId={declarationId} 
                onUploadSuccess={handleReceiptUpload} 
              />
              <ReceiptList declarationId={declarationId} />
            </div>
          )}

          {currentStep === 'payment' && (
            <PaymentFlow onPaymentSuccess={handlePaymentSuccess} />
          )}

          {currentStep === 'advice' && declarationId && paymentCompleted && (
            <TaxAdviceDisplay declarationId={declarationId} />
          )}
        </div>

        {/* Action Buttons */}
        {currentStep === 'receipts' && declarationId && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentStep('payment')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium"
            >
              Fortsätt till betalning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};