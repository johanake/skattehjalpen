import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

interface TaxAdvicePreviewProps {
  declarationId: string;
  onContinue: () => void;
  isLoggedIn: boolean;
}

export const TaxAdvicePreview: React.FC<TaxAdvicePreviewProps> = ({
  declarationId,
  onContinue,
  isLoggedIn,
}) => {
  const [totalDeductions, setTotalDeductions] = useState<number | null>(null);
  const generateAdvice = trpc.tax.generateAdvice.useMutation();

  useEffect(() => {
    generateAdvice.mutate(
      { declarationId },
      {
        onSuccess: (advice) => {
          const total = advice.totalPotentialSavings || 0;
          setTotalDeductions(total);
        },
      }
    );
  }, [declarationId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (generateAdvice.isPending) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Analyserar din deklaration...
        </h2>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-text-secondary">
              Vi beräknar dina möjliga avdrag...
            </p>
            <p className="text-text-muted text-sm mt-2">
              Detta kan ta upp till 30 sekunder
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (generateAdvice.error) {
    return (
      <div className="bg-red-100 border border-red-600 rounded-lg p-4">
        <p className="text-red-600">
          Ett fel uppstod vid analysen: {generateAdvice.error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-white p-8 rounded-lg shadow-lg border border-border-light">
      <div className="text-center mb-8">
        {totalDeductions !== null && totalDeductions >= 1 ? (
          <>
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎉</span>
            </div>
            <h2 className="text-3xl font-bold text-blue-800 mb-2">
              Fantastisk!
            </h2>
            <p className="text-lg text-text-secondary">
              Vi hittade möjliga besparingar för dig
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h2 className="text-3xl font-bold text-blue-800 mb-2">
              Analys klar!
            </h2>
            <p className="text-lg text-text-secondary">
              Vi har granskat din deklaration noggrant
            </p>
          </>
        )}
      </div>

      <div className="bg-green-100 p-6 rounded-lg mb-8 text-center">
        <div className="text-sm text-gray-800 mb-2">
          Vi har hittat en besparing på:
        </div>
        <div className="text-4xl font-bold text-text-inverse mb-2">
          {totalDeductions !== null ? formatCurrency(totalDeductions) : "---"}
        </div>
        <div className="text-sm text-text-muted">
          *Baserat på din skattedeklaration och våra AI-drivna beräkningar
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-bg-secondary p-4 rounded-lg border-l-4 border-accent">
          <h3 className="font-semibold text-blue-800 mb-2">
            Vad ingår i den fullständiga analysen?
          </h3>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-center">
              <span className="text-accent mr-2">✓</span>
              Detaljerad genomgång av alla möjliga avdrag
            </li>
            <li className="flex items-center">
              <span className="text-accent mr-2">✓</span>
              Specifika rekommendationer för din situation
            </li>
            <li className="flex items-center">
              <span className="text-accent mr-2">✓</span>
              Vi visar vad och var du fyller i inkomstdeklarationen
            </li>
            <li className="flex items-center">
              <span className="text-accent mr-2">✓</span>
              AI-genererade tips för maximala besparingar
            </li>
          </ul>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-800">
                Fullständig skatteanalys
              </h4>
              <p className="text-sm text-text-muted">
                Engångsbetalning - inga prenumerationer
              </p>
            </div>
            <div className="text-2xl font-bold text-blue-800">599 kr</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={onContinue}
            className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-500 transition-colors font-medium text-lg"
          >
            {isLoggedIn
              ? "Fortsätt till betalning"
              : "Registrera dig och betala"}
          </button>

          <div className="text-center text-sm text-text-secondary">
            <p>Säker betalning via Stripe</p>
          </div>
        </div>
      </div>
    </div>
  );
};
