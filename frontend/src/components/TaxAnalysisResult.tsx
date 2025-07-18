import React from "react";

interface DeductionItem {
  category: string;
  description: string;
  amount: number;
  deductionPoint: string;
  requirements: string[];
  eligibilityCheck: "eligible" | "partial" | "not_eligible";
}

interface DeductionResult {
  totalPotentialSavings: number;
  totalDeductionAmount: number;
  taxYear: number;
  deductions: DeductionItem[];
  summary: {
    workRelated: number;
    capitalGains: number;
    greenTech: number;
    rotRut: number;
    other: number;
  };
}

// Mock data for demonstration
const mockDeductionResult: DeductionResult = {
  totalPotentialSavings: 18750,
  totalDeductionAmount: 62500,
  taxYear: 2024,
  deductions: [
    {
      category: "Tjänsteresor",
      description: "Resekostnader och traktamente för 15 dagar tjänsteresor",
      amount: 8500,
      deductionPoint: "2.2 - Tjänsteresor",
      requirements: [
        "Kvitton på resekostnader",
        "Reseräkning från arbetsgivaren",
      ],
      eligibilityCheck: "eligible",
    },
    {
      category: "Arbetsutrustning",
      description: "Dator och mobiltelefon köpt för arbete",
      amount: 15000,
      deductionPoint: "2.4 - Övriga utgifter för ditt arbete",
      requirements: [
        "Belopp över 5 000 kr-spärren",
        "Arbetsgivaren tillhandahåller inte utrustning",
      ],
      eligibilityCheck: "eligible",
    },
    {
      category: "Hemkontor",
      description: "Merkostnader för uppvärmning och el för arbetsrum",
      amount: 4000,
      deductionPoint: "2.4 - Övriga utgifter för ditt arbete",
      requirements: [
        "Rummet används endast för arbete",
        "Arbetsgivaren tillhandahåller ingen arbetsplats",
      ],
      eligibilityCheck: "partial",
    },
    {
      category: "Resor till arbetet",
      description: "Pendling med egen bil, 45 km enkel väg",
      amount: 12000,
      deductionPoint: "2.1 - Resor till och från arbetet",
      requirements: [
        "Avstånd >5 km",
        "Sparar >2 timmar per dag",
        "Endast belopp över 11 000 kr",
      ],
      eligibilityCheck: "eligible",
    },
    {
      category: "ROT-arbete",
      description: "Takrenoveringsarbete utfört av certifierat företag",
      amount: 20000,
      deductionPoint: "4.1 - ROT-avdrag (förtryckt)",
      requirements: [
        "Arbete utfört av F-skatteregistrerat företag",
        "Betalning via företaget",
      ],
      eligibilityCheck: "eligible",
    },
    {
      category: "Grön teknik",
      description: "Installation av solceller och laddbox för elbil",
      amount: 3000,
      deductionPoint: "Skattereduktion för grön teknik",
      requirements: [
        "Installation av godkänt företag",
        "Betalning efter 1 januari 2021",
      ],
      eligibilityCheck: "eligible",
    },
  ],
  summary: {
    workRelated: 39500,
    capitalGains: 0,
    greenTech: 3000,
    rotRut: 20000,
    other: 0,
  },
};

export const TaxAnalysisResult: React.FC = () => {
  const getEligibilityColor = (status: string) => {
    switch (status) {
      case "eligible":
        return "text-accent bg-accent-light border-accent";
      case "partial":
        return "text-yellow-600 bg-yellow-50 border-yellow-300";
      case "not_eligible":
        return "text-red-600 bg-red-50 border-red-300";
      default:
        return "text-text-secondary bg-bg-secondary border-border-default";
    }
  };

  const getEligibilityText = (status: string) => {
    switch (status) {
      case "eligible":
        return "Berättigad";
      case "partial":
        return "Delvis berättigad";
      case "not_eligible":
        return "Ej berättigad";
      default:
        return "Okänd";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          📊 Analys av skatteavdragsmöjligheter
        </h1>
        <p className="text-text-secondary">
          Baserat på din inkomstdeklaration för {mockDeductionResult.taxYear}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-accent-light border border-accent rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-accent mb-2">
            {mockDeductionResult.totalPotentialSavings.toLocaleString("sv-SE")}{" "}
            kr
          </div>
          <div className="text-text-primary">Potentiell skattebesparning</div>
        </div>

        <div className="bg-primary-light border border-primary rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-text-inverse mb-2">
            {mockDeductionResult.totalDeductionAmount.toLocaleString("sv-SE")}{" "}
            kr
          </div>
          <div className="text-text-inverse">Totalt avdragsbelopp</div>
        </div>

        <div className="bg-bg-secondary border border-border-default rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-text-primary mb-2">
            {mockDeductionResult.deductions.length}
          </div>
          <div className="text-text-primary">Avdragsmöjligheter</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          💰 Uppdelning per kategori
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(mockDeductionResult.summary).map(
            ([key, value]) =>
              value > 0 && (
                <div
                  key={key}
                  className="bg-bg-secondary rounded-lg p-4 border border-border-light"
                >
                  <div className="font-semibold text-text-primary capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="text-lg font-bold text-accent">
                    {value.toLocaleString("sv-SE")} kr
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* Detailed Deductions */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          📋 Detaljerad genomgång av avdrag
        </h2>
        <div className="space-y-6">
          {mockDeductionResult.deductions.map((deduction, index) => (
            <div
              key={index}
              className="bg-bg-white border border-border-light rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {deduction.category}
                  </h3>
                  <p className="text-text-secondary mt-1">
                    {deduction.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-accent">
                    {deduction.amount.toLocaleString("sv-SE")} kr
                  </div>
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEligibilityColor(
                      deduction.eligibilityCheck
                    )}`}
                  >
                    {getEligibilityText(deduction.eligibilityCheck)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-text-primary mb-2">
                    📍 Deklarationspunkt
                  </h4>
                  <p className="text-text-secondary bg-bg-secondary px-3 py-2 rounded">
                    {deduction.deductionPoint}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-text-primary mb-2">
                    ✅ Krav som måste uppfyllas
                  </h4>
                  <ul className="text-text-secondary space-y-1">
                    {deduction.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
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
      </div>
    </div>
  );
};
