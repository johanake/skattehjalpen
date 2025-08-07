import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { trpc } from "../utils/trpc";

interface TaxAnalysisResultProps {
  advice?: {
    totalPotentialSavings: number;
    suggestedDeductions: Array<{
      category: string;
      currentAmount: number;
      suggestedAmount: number;
      potentialSavings: number;
      confidence: "high" | "medium" | "low";
      explanation: string;
      requiredDocuments: string[];
    }>;
    riskAssessment: {
      level: "low" | "medium" | "high";
      factors: string[];
    };
    recommendations: string[];
    generatedAt: Date;
  };
}

export const TaxAnalysisResult: React.FC<TaxAnalysisResultProps> = ({
  advice: propAdvice,
}) => {
  const { id: adviceId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch advice by ID if no prop advice is provided and we have an ID
  const {
    data: fetchedAdvice,
    isLoading,
    error,
  } = trpc.tax.getTaxAdviceById.useQuery(
    { id: adviceId! },
    {
      enabled: !propAdvice && !!adviceId,
      retry: 1,
    }
  );

  // Use prop advice if provided, otherwise use fetched advice
  const advice = propAdvice || fetchedAdvice;

  // Loading state for fetched advice
  if (!propAdvice && adviceId && isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-100 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state for fetched advice
  if (!propAdvice && adviceId && error) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <div className="bg-red-50 border border-red-600 rounded-lg p-4">
          <p className="text-red-600">
            Error loading tax advice: {error.message}
          </p>
        </div>
      </div>
    );
  }
  // Add safety check for advice prop
  if (!advice) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <div className="bg-red-50 border border-red-600 rounded-lg p-4">
          <p className="text-red-600">Error: No advice data available</p>
        </div>
      </div>
    );
  }

  const totalDeductionAmount =
    advice.suggestedDeductions?.reduce(
      (sum, deduction) => sum + (deduction.suggestedAmount || 0),
      0
    ) || 0;

  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Breadcrumb Navigation - only show when viewing specific analysis */}
      {adviceId && (
        <nav className="mb-6">
          <button
            onClick={() => navigate("/mina-analyser")}
            className="inline-flex items-center text-primary hover:text-primary-600 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Tillbaka till mina analyser
          </button>
        </nav>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📊 Analys av skatteavdragsmöjligheter
        </h1>
        <p className="text-gray-600">
          {adviceId
            ? `Analys från ${new Date(advice!.generatedAt).toLocaleDateString(
                "sv-SE"
              )}`
            : `Baserat på din inkomstdeklaration för ${currentYear}`}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-700 border border-accent rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">
            {(advice.totalPotentialSavings || 0).toLocaleString("sv-SE")} kr
          </div>
          <div className="text-white">Potentiell skattebesparning</div>
        </div>

        <div className="bg-blue-700 border border-primary rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">
            {totalDeductionAmount.toLocaleString("sv-SE")} kr
          </div>
          <div className="text-white">Totalt avdragsbelopp</div>
        </div>

        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {advice.suggestedDeductions?.length || 0}
          </div>
          <div className="text-gray-800">Avdragsmöjligheter</div>
        </div>
      </div>

      {/* Detailed Deductions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          📋 Detaljerad genomgång av avdrag
        </h2>
        {advice.suggestedDeductions?.length > 0 ? (
          <div className="space-y-6">
            {advice.suggestedDeductions.map((deduction, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {deduction.category || "Okänt avdrag"}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {deduction.explanation || "Ingen förklaring tillgänglig"}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-accent">
                      {(deduction.potentialSavings || 0).toLocaleString(
                        "sv-SE"
                      )}{" "}
                      kr
                    </div>
                    <div className="text-sm text-gray-800">
                      Potentiell besparing
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      💸 Potentiell besparing
                    </h4>
                    <p className="text-lg font-semibold text-accent">
                      {(deduction.potentialSavings || 0).toLocaleString(
                        "sv-SE"
                      )}{" "}
                      kr
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      📈 Föreslaget avdrag
                    </h4>
                    <p className="text-lg font-semibold text-accent">
                      {(deduction.suggestedAmount || 0).toLocaleString("sv-SE")}{" "}
                      kr
                    </p>
                  </div>
                  <div></div>
                </div>

                {(deduction.requiredDocuments?.length || 0) > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      ✅ Sektion i din inkomstdeklaration
                    </h4>
                    <ul className="text-gray-600 space-y-1">
                      {deduction.requiredDocuments?.map((doc, docIndex) => (
                        <li key={docIndex} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-600">
              Inga specifika avdragsmöjligheter identifierades baserat på din
              deklaration.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Detta betyder inte att du inte har några avdrag - kontrollera
              Skatteverkets standardavdrag.
            </p>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          💡 Rekommendationer
        </h2>
        <ul className="space-y-2">
          {advice.recommendations?.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span className="text-gray-600">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Items */}
      <div className="mt-8 bg-primary-light border border-primary rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📝 Nästa steg
        </h2>
        <ul className="space-y-2 text-gray-900">
          <li className="flex items-center">
            <span className="text-gray-900 mr-2">1.</span>
            Samla in kvitton och dokumentation för alla avdrag
          </li>
          <li className="flex items-center">
            <span className="text-gray-900 mr-2">2.</span>
            Logga in på Skatteverkets e-tjänst för att fylla i deklarationen
          </li>
          <li className="flex items-center">
            <span className="text-gray-900 mr-2">3.</span>
            Fyll i beloppen enligt angivna deklarationspunkter
          </li>
          <li className="flex items-center">
            <span className="text-gray-900 mr-2">4.</span>
            Kontrollera att alla krav är uppfyllda innan du lämnar in
          </li>
        </ul>

        <div className="mt-4 text-sm text-gray-900 opacity-75">
          Analys genererad den{" "}
          {new Date(advice.generatedAt).toLocaleDateString("sv-SE")}
        </div>
      </div>
    </div>
  );
};
