import { useState } from "react";
import { TaxDeclarationForm } from "./TaxDeclarationForm";
import { TaxAdviceDisplay } from "./TaxAdviceDisplay";
import { TaxAdvicePreview } from "./TaxAdvicePreview";
import { PaymentFlow } from "./PaymentFlow";
import { useAuth } from "../contexts/AuthContext";

export const TaxWizard: React.FC = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<
    "declaration" | "preview" | "payment" | "advice"
  >("declaration");
  const [declarationId, setDeclarationId] = useState<string | null>(null);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleDeclarationSuccess = (id: string) => {
    setDeclarationId(id);
    setAnalysisCompleted(true);
    setCurrentStep("preview");
  };

  const handlePreviewContinue = () => {
    if (user && paymentCompleted) {
      setCurrentStep("advice");
    } else {
      setCurrentStep("payment");
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    setCurrentStep("advice");
  };

  const steps = [
    {
      id: "declaration",
      name: "Skattedeklaration",
      completed: !!declarationId,
    },
    {
      id: "preview",
      name: "Förhandsgranskning",
      completed: !!declarationId && analysisCompleted,
    },
    {
      id: "payment",
      name: user ? "Betalning" : "Registrering & Betalning",
      completed: paymentCompleted,
    },
    {
      id: "advice",
      name: "Fullständig analys",
      completed: paymentCompleted && analysisCompleted,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-8">
          {/* Desktop Timeline */}
          <div className="hidden lg:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.completed
                      ? "bg-green-600  text-white"
                      : currentStep === step.id
                      ? "bg-accent text-white"
                      : "bg-slate-100 text-gray-600 border border-gray-300"
                  }`}
                >
                  {step.completed ? "✓" : index + 1}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${
                      step.completed
                        ? "text-accent"
                        : currentStep === step.id
                        ? "text-accent"
                        : "text-gray-600"
                    }`}
                  >
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 ml-4 ${
                      step.completed ? "bg-accent" : "bg-border-default"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden">
            <div className="flex items-center justify-center mb-4">
              <div className="flex space-x-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`w-3 h-3 rounded-full ${
                      step.completed
                        ? "bg-accent"
                        : currentStep === step.id
                        ? "bg-accent"
                        : "bg-border-default"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-center">
              <div
                className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-lg font-medium mb-3 ${
                  steps.find((s) => s.id === currentStep)?.completed
                    ? "bg-accent text-white"
                    : currentStep
                    ? "bg-accent text-white"
                    : "bg-gray-100 text-gray-600 border border-gray-300"
                }`}
              >
                {steps.find((s) => s.id === currentStep)?.completed
                  ? "✓"
                  : steps.findIndex((s) => s.id === currentStep) + 1}
              </div>
              <p className="text-lg font-medium text-accent">
                {steps.find((s) => s.id === currentStep)?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {declarationId && (
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setCurrentStep("declaration")}
              className={`px-4 py-2 rounded transition-colors ${
                currentStep === "declaration"
                  ? "bg-green-600 text-white"
                  : "bg-slate-100 text-gray-600 hover:bg-green-300 border border-border-default"
              }`}
            >
              Deklaration
            </button>
            {analysisCompleted && (
              <button
                onClick={() => setCurrentStep("preview")}
                className={`px-4 py-2 rounded transition-colors ${
                  currentStep === "preview"
                    ? "bg-green-600 text-white"
                    : "bg-slate-100 text-gray-600 hover:bg-green-300 border border-border-default"
                }`}
              >
                Förhandsgranskning
              </button>
            )}
            {paymentCompleted && (
              <button
                onClick={() => setCurrentStep("advice")}
                className={`px-4 py-2 rounded transition-colors ${
                  currentStep === "advice"
                    ? "bg-accent text-white"
                    : "bg-bg-secondary text-gray-600 hover:bg-blue-500 border border-border-default"
                }`}
              >
                Fullständig analys
              </button>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {currentStep === "declaration" && (
            <TaxDeclarationForm onSuccess={handleDeclarationSuccess} />
          )}

          {currentStep === "preview" && declarationId && analysisCompleted && (
            <TaxAdvicePreview
              declarationId={declarationId}
              onContinue={handlePreviewContinue}
              isLoggedIn={!!user}
            />
          )}

          {currentStep === "payment" && declarationId && (
            <PaymentFlow
              declarationId={declarationId}
              onSuccess={handlePaymentSuccess}
              requireRegistration={!user}
            />
          )}

          {currentStep === "advice" &&
            declarationId &&
            analysisCompleted &&
            paymentCompleted && (
              <TaxAdviceDisplay declarationId={declarationId} />
            )}
        </div>
      </div>
    </div>
  );
};
