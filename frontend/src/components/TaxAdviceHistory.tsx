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
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-100 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <div className="bg-red-100 border border-red-600 rounded-lg p-4">
          <p className="text-red-600">
            Error loading tax advice history: {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!taxAdviceHistory || taxAdviceHistory.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📊 Dina skatteanalyser
          </h1>
          <p className="text-gray-600">
            Här ser du alla dina tidigare skatteanalyser och avdragsmöjligheter
          </p>
        </div>

        <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Inga skatteanalyser ännu
          </h2>
          <p className="text-gray-600 mb-4">
            När du har genomfört din första skatteanalys kommer den att visas
            här.
          </p>
          <button
            onClick={() => navigate("/skatt/inkomstdeklaration")}
            className="inline-flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Gör din första skatteanalys
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📊 Dina skatteanalyser
        </h1>
        <p className="text-gray-600">
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
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              {/* Analysis Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Skatteanalys från{" "}
                    {new Date(advice.generatedAt).toLocaleDateString("sv-SE")}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Analys-ID: {advice.id.substring(0, 8)}...</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/mina-analyser/${advice.id}`)}
                  className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Visa fullständig analys
                </button>
              </div>

              {/* Summary Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-500 border border-green-600 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {(advice.totalPotentialSavings || 0).toLocaleString(
                      "sv-SE"
                    )}{" "}
                    kr
                  </div>
                  <div className="text-sm text-white">Potentiell besparing</div>
                </div>

                <div className="bg-blue-500 border border-blue-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {totalDeductionAmount.toLocaleString("sv-SE")} kr
                  </div>
                  <div className="text-sm text-white">Totalt avdrag</div>
                </div>

                <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {advice.suggestedDeductions.length}
                  </div>
                  <div className="text-sm text-gray-800">
                    Avdragsmöjligheter
                  </div>
                </div>
              </div>

              {/* Top Deductions Preview */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
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
                          className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-800 truncate">
                                {deduction.category || "Okänt avdrag"}
                              </h4>
                            </div>
                            <p
                              className="text-sm text-gray-600 break-words overflow-hidden"
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
                            <div className="text-lg font-bold text-green-600">
                              {(deduction.potentialSavings || 0).toLocaleString(
                                "sv-SE"
                              )}{" "}
                              kr
                            </div>
                            <div className="text-xs text-gray-800">
                              Besparing
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">
                    Inga specifika avdragsmöjligheter identifierades.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-8 bg-blue-500 border border-blue-800 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-white mb-2">
          Vill du göra en ny skatteanalys?
        </h2>
        <p className="text-white mb-4">
          Skattelagarna ändras ofta. Det kan vara värt att kontrollera om det
          finns nya avdragsmöjligheter.
        </p>
        <button
          onClick={() => navigate("/skatt/inkomstdeklaration")}
          className="inline-flex items-center px-6 py-3 bg-white text-blue-800 rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          Gör ny skatteanalys
        </button>
      </div>
    </div>
  );
};
