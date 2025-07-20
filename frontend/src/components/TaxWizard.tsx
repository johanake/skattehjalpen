import { useState } from 'react';
import { TaxDeclarationForm } from './TaxDeclarationForm';
import { TaxAdviceDisplay } from './TaxAdviceDisplay';

export const TaxWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'declaration' | 'advice'>('declaration');
  const [declarationId, setDeclarationId] = useState<string | null>(null);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);

  const handleDeclarationSuccess = (id: string) => {
    setDeclarationId(id);
    setAnalysisCompleted(true);
    setCurrentStep('advice');
  };

  const steps = [
    { id: 'declaration', name: 'Skattedeklaration', completed: !!declarationId },
    { id: 'advice', name: 'Skatterådgivning', completed: analysisCompleted },
  ];

  return (
    <div className="min-h-screen bg-bg-white">

      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.completed
                    ? 'bg-accent text-white'
                    : currentStep === step.id
                    ? 'bg-accent text-white'
                    : 'bg-bg-secondary text-text-secondary border border-border-default'
                }`}
              >
                {step.completed ? '✓' : index + 1}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  step.completed ? 'text-accent' : 
                  currentStep === step.id ? 'text-accent' : 'text-text-muted'
                }`}>
                  {step.name}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 ml-4 ${
                  step.completed ? 'bg-accent' : 'bg-border-default'
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
              className={`px-4 py-2 rounded transition-colors ${
                currentStep === 'declaration'
                  ? 'bg-accent text-white'
                  : 'bg-bg-secondary text-text-secondary hover:bg-primary-light border border-border-default'
              }`}
            >
              Deklaration
            </button>
            {analysisCompleted && (
              <button
                onClick={() => setCurrentStep('advice')}
                className={`px-4 py-2 rounded transition-colors ${
                  currentStep === 'advice'
                    ? 'bg-accent text-white'
                    : 'bg-bg-secondary text-text-secondary hover:bg-primary-light border border-border-default'
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

          {currentStep === 'advice' && declarationId && analysisCompleted && (
            <TaxAdviceDisplay declarationId={declarationId} />
          )}
        </div>
      </div>
    </div>
  );
};