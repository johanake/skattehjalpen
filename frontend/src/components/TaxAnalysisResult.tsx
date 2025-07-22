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
      <div className="max-w-6xl mx-auto p-6 bg-bg-white">
        <div className="animate-pulse">
          <div className="h-8 bg-bg-secondary rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-bg-secondary rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-bg-secondary rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state for fetched advice
  if (!propAdvice && adviceId && error) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-bg-white">
        <div className="bg-danger-light border border-danger rounded-lg p-4">
          <p className="text-danger">
            Error loading tax advice: {error.message}
          </p>
        </div>
      </div>
    );
  }
  // Add safety check for advice prop
  if (!advice) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-bg-white">
        <div className="bg-danger-light border border-danger rounded-lg p-4">
          <p className="text-danger">Error: No advice data available</p>
        </div>
      </div>
    );
  }

  const getConfidenceColor = (confidence: "high" | "medium" | "low") => {
    switch (confidence) {
      case "high":
        return "text-accent bg-accent-light border-accent";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-300";
      case "low":
        return "text-red-600 bg-red-50 border-red-300";
      default:
        return "text-text-secondary bg-bg-secondary border-border-default";
    }
  };

  const getConfidenceText = (confidence: "high" | "medium" | "low") => {
    switch (confidence) {
      case "high":
        return "Hög tillförlitlighet";
      case "medium":
        return "Medel tillförlitlighet";
      case "low":
        return "Låg tillförlitlighet";
      default:
        return "Okänd";
    }
  };

  const totalDeductionAmount =
    advice.suggestedDeductions?.reduce(
      (sum, deduction) => sum + (deduction.suggestedAmount || 0),
      0
    ) || 0;

  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-bg-white">
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
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          📊 Analys av skatteavdragsmöjligheter
        </h1>
        <p className="text-text-secondary">
          {adviceId
            ? `Analys från ${new Date(advice!.generatedAt).toLocaleDateString(
                "sv-SE"
              )}`
            : `Baserat på din inkomstdeklaration för ${currentYear}`}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-accent-light border border-accent rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-text-inverse mb-2">
            {(advice.totalPotentialSavings || 0).toLocaleString("sv-SE")} kr
          </div>
          <div className="text-text-inverse">Potentiell skattebesparning</div>
        </div>

        <div className="bg-primary-light border border-primary rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-text-inverse mb-2">
            {totalDeductionAmount.toLocaleString("sv-SE")} kr
          </div>
          <div className="text-text-inverse">Totalt avdragsbelopp</div>
        </div>

        <div className="bg-bg-secondary border border-border-default rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-text-primary mb-2">
            {advice.suggestedDeductions?.length || 0}
          </div>
          <div className="text-text-primary">Avdragsmöjligheter</div>
        </div>
      </div>

      {/* Detailed Deductions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          📋 Detaljerad genomgång av avdrag
        </h2>
        {advice.suggestedDeductions?.length > 0 ? (
          <div className="space-y-6">
            {advice.suggestedDeductions.map((deduction, index) => (
              <div
                key={index}
                className="bg-bg-white border border-border-light rounded-lg p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {deduction.category || "Okänt avdrag"}
                    </h3>
                    <p className="text-text-secondary mt-1">
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
                    <div className="text-sm text-text-muted">
                      Potentiell besparing
                    </div>
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getConfidenceColor(
                        deduction.confidence
                      )}`}
                    >
                      {getConfidenceText(deduction.confidence)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">
                      💰 Nuvarande avdrag
                    </h4>
                    <p className="text-lg font-semibold text-text-secondary">
                      {(deduction.currentAmount || 0).toLocaleString("sv-SE")}{" "}
                      kr
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">
                      📈 Föreslaget avdrag
                    </h4>
                    <p className="text-lg font-semibold text-accent">
                      {(deduction.suggestedAmount || 0).toLocaleString("sv-SE")}{" "}
                      kr
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">
                      💸 Potentiell besparing
                    </h4>
                    <p className="text-lg font-semibold text-accent">
                      {(deduction.potentialSavings || 0).toLocaleString(
                        "sv-SE"
                      )}{" "}
                      kr
                    </p>
                  </div>
                </div>

                {(deduction.requiredDocuments?.length || 0) > 0 && (
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">
                      ✅ Sektion i din inkomstdeklaration
                    </h4>
                    <ul className="text-text-secondary space-y-1">
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
          <div className="bg-bg-secondary border border-border-light rounded-lg p-6 text-center">
            <p className="text-text-secondary">
              Inga specifika avdragsmöjligheter identifierades baserat på din
              deklaration.
            </p>
            <p className="text-text-muted text-sm mt-2">
              Detta betyder inte att du inte har några avdrag - kontrollera
              Skatteverkets standardavdrag.
            </p>
          </div>
        )}
      </div>

      {/* Risk Assessment */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          ⚠️ Riskbedömning
        </h2>
        <div
          className={`border rounded-lg p-4 ${
            advice.riskAssessment?.level === "low"
              ? "border-accent bg-accent-light"
              : advice.riskAssessment?.level === "medium"
              ? "border-yellow-300 bg-yellow-50"
              : "border-red-300 bg-red-50"
          }`}
        >
          <div className="flex items-center mb-2">
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${
                advice.riskAssessment?.level === "low"
                  ? "bg-accent text-white"
                  : advice.riskAssessment?.level === "medium"
                  ? "bg-yellow-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {advice.riskAssessment?.level === "low"
                ? "LÅG RISK"
                : advice.riskAssessment?.level === "medium"
                ? "MEDEL RISK"
                : "HÖG RISK"}
            </span>
          </div>
          {advice.riskAssessment?.factors?.length > 0 && (
            <ul className="text-sm list-disc list-inside text-text-secondary">
              {advice.riskAssessment.factors.map((factor, index) => (
                <li key={index}>{factor}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          💡 Rekommendationer
        </h2>
        <ul className="space-y-2">
          {advice.recommendations?.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span className="text-text-secondary">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Items */}
      <div className="mt-8 bg-primary-light border border-primary rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-inverse mb-4">
          📝 Nästa steg
        </h2>
        <ul className="space-y-2 text-text-inverse">
          <li className="flex items-center">
            <span className="text-text-inverse mr-2">1.</span>
            Samla in kvitton och dokumentation för alla avdrag
          </li>
          <li className="flex items-center">
            <span className="text-text-inverse mr-2">2.</span>
            Logga in på Skatteverkets e-tjänst för att fylla i deklarationen
          </li>
          <li className="flex items-center">
            <span className="text-text-inverse mr-2">3.</span>
            Fyll i beloppen enligt angivna deklarationspunkter
          </li>
          <li className="flex items-center">
            <span className="text-text-inverse mr-2">4.</span>
            Kontrollera att alla krav är uppfyllda innan du lämnar in
          </li>
        </ul>

        <div className="mt-4 text-sm text-text-inverse opacity-75">
          Analys genererad den{" "}
          {new Date(advice.generatedAt).toLocaleDateString("sv-SE")}
        </div>
      </div>
    </div>
  );
};
