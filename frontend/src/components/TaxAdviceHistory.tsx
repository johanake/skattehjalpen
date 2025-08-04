import React from "react";
import { useNavigate } from "react-router-dom";
import { trpc } from "../utils/trpc";

export const TaxAdviceHistory: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: taxAdviceHistory,
    isLoading,
    error,
  } = trpc.tax.getUserTaxAdviceHistory.useQuery();

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-bg-white">
        <div className="animate-pulse">
          <div className="h-8 bg-bg-secondary rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-bg-secondary rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-bg-white">
        <div className="bg-danger-light border border-danger rounded-lg p-4">
          <p className="text-danger">
            Error loading tax advice history: {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!taxAdviceHistory || taxAdviceHistory.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-bg-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            📊 Dina skatteanalyser
          </h1>
          <p className="text-text-secondary">
            Här ser du alla dina tidigare skatteanalyser och avdragsmöjligheter
          </p>
        </div>

        <div className="bg-bg-secondary border border-border-light rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Inga skatteanalyser ännu
          </h2>
          <p className="text-text-secondary mb-4">
            När du har genomfört din första skatteanalys kommer den att visas
            här.
          </p>
          <button
            onClick={() => navigate("/skatt/inkomstdeklaration")}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Gör din första skatteanalys
          </button>
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

  const getRiskLevelColor = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low":
        return "bg-accent text-white";
      case "medium":
        return "bg-yellow-600 text-white";
      case "high":
        return "bg-red-600 text-white";
      default:
        return "bg-bg-secondary text-text-primary";
    }
  };

  const getRiskLevelText = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low":
        return "LÅG RISK";
      case "medium":
        return "MEDEL RISK";
      case "high":
        return "HÖG RISK";
      default:
        return "OKÄND";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          📊 Dina skatteanalyser
        </h1>
        <p className="text-text-secondary">
          Här ser du alla dina tidigare skatteanalyser och avdragsmöjligheter (
          {taxAdviceHistory.length} st)
        </p>
      </div>

      <div className="space-y-8">
        {taxAdviceHistory.map((advice) => {
          const totalDeductionAmount = advice.suggestedDeductions.reduce(
            (sum, deduction) => sum + (deduction.suggestedAmount || 0),
            0
          );

          return (
            <div
              key={advice.id}
              className="bg-bg-white border border-border-light rounded-lg p-6 shadow-sm"
            >
              {/* Analysis Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-2">
                    Skatteanalys från{" "}
                    {new Date(advice.generatedAt).toLocaleDateString("sv-SE")}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>Analys-ID: {advice.id.substring(0, 8)}...</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getRiskLevelColor(
                        advice.riskAssessment.level
                      )}`}
                    >
                      {getRiskLevelText(advice.riskAssessment.level)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/mina-analyser/${advice.id}`)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
                >
                  Visa fullständig analys
                </button>
              </div>

              {/* Summary Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-accent-light border border-accent rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-text-inverse mb-1">
                    {(advice.totalPotentialSavings || 0).toLocaleString(
                      "sv-SE"
                    )}{" "}
                    kr
                  </div>
                  <div className="text-sm text-text-primary">
                    Potentiell besparing
                  </div>
                </div>

                <div className="bg-primary-light border border-primary rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-text-inverse mb-1">
                    {totalDeductionAmount.toLocaleString("sv-SE")} kr
                  </div>
                  <div className="text-sm text-text-inverse">Totalt avdrag</div>
                </div>

                <div className="bg-bg-secondary border border-border-default rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-text-primary mb-1">
                    {advice.suggestedDeductions.length}
                  </div>
                  <div className="text-sm text-text-primary">
                    Avdragsmöjligheter
                  </div>
                </div>
              </div>

              {/* Top Deductions Preview */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  Största avdragsmöjligheter
                </h3>
                {advice.suggestedDeductions.length > 0 ? (
                  <div className="space-y-3">
                    {advice.suggestedDeductions
                      .sort(
                        (a, b) =>
                          (b.potentialSavings || 0) - (a.potentialSavings || 0)
                      )
                      .slice(0, 3)
                      .map((deduction, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-bg-secondary rounded-lg"
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-text-primary truncate">
                                {deduction.category || "Okänt avdrag"}
                              </h4>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getConfidenceColor(
                                  deduction.confidence
                                )}`}
                              >
                                {deduction.confidence === "high"
                                  ? "Hög"
                                  : deduction.confidence === "medium"
                                  ? "Medel"
                                  : "Låg"}
                              </span>
                            </div>
                            <p
                              className="text-sm text-text-secondary break-words overflow-hidden"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical" as const,
                              }}
                            >
                              {deduction.explanation ||
                                "Ingen förklaring tillgänglig"}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-lg font-bold text-accent">
                              {(deduction.potentialSavings || 0).toLocaleString(
                                "sv-SE"
                              )}{" "}
                              kr
                            </div>
                            <div className="text-xs text-text-muted">
                              Besparing
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-text-secondary text-sm">
                    Inga specifika avdragsmöjligheter identifierades.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-8 bg-primary-light border border-primary rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-text-inverse mb-2">
          Vill du göra en ny skatteanalys?
        </h2>
        <p className="text-text-inverse mb-4">
          Skattelagarna ändras ofta. Det kan vara värt att kontrollera om det
          finns nya avdragsmöjligheter.
        </p>
        <button
          onClick={() => navigate("/skatt/inkomstdeklaration")}
          className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          Gör ny skatteanalys
        </button>
      </div>
    </div>
  );
};
