import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Vad är Skattehjälpen och hur fungerar det?",
    answer:
      "Skattehjälpen är en AI-driven plattform som analyserar din skattedeklaration och hjälper dig hitta avdrag du kanske missat. Du fyller i vårt frågeformulär, betalar för analysen, och får sedan en detaljerad rapport med avdragsförslag och instruktioner för hur du fyller i deklarationen.",
  },
  {
    question: "Är Skattehjälpen godkänd av Skatteverket?",
    answer:
      "Skattehjälpen är inte officiellt godkänd av Skatteverket, utan vi erbjuder vägledande information baserat på offentligt tillgängliga skattelagar och Skatteverkets riktlinjer. Vi rekommenderar att du alltid kontaktar Skatteverket eller en auktoriserad skatterådgivare vid osäkerhet.",
  },
  {
    question: "Vilka typer av avdrag kan ni hjälpa mig hitta?",
    answer:
      "Vi analyserar många olika avdragstyper inklusive hemmakontor, resor, utbildning, arbetsrelaterade kostnader, fackföreningsavgifter, pensionssparande, gåvor till välgörenhet, och mycket mer. Vår AI är tränad på Skatteverkets regler och kan identifiera både vanliga och ovanliga avdragsmöjligheter.",
  },
  {
    question: "Hur mycket kostar det att använda Skattehjälpen?",
    answer:
      "En grundläggande skatteanalys kostar 199 kr (ordinarie pris 249 kr). Vi erbjuder även ett partner-paket för 449 kr som inkluderar två analyser som kan delas med valfri person. Du får en förhandsvisning innan betalning så du kan se vad du kan spara.",
  },
  {
    question: "Är mina uppgifter säkra?",
    answer:
      "Ja, vi tar datasäkerhet mycket seriöst. All information krypteras och lagras säkert inom EU. Vi följer GDPR och delar aldrig dina uppgifter med tredje part utan ditt samtycke. Du har också rätt att få tillgång till, rätta eller radera dina personuppgifter när som helst.",
  },
  {
    question: "Kan jag få återbetalning om jag inte är nöjd?",
    answer:
      "Givet att vi levererar en förbrukningsbar digital produkt gäller inte ångerrätten i Distansavtalslagen. Med det sagt vill vi gärna att alla våra kunder är nöjda, så om du inte är nöjd ber vi dig vänligen kontakta vår support.",
  },
  {
    question: "Hur lång tid tar det att få min skatteanalys?",
    answer:
      "Analysen skapas automatiskt direkt efter att du slutfört frågeformuläret och genomfört betalningen. Du får omedelbar tillgång till din detaljerade rapport med avdragsförslag och instruktioner.",
  },
  {
    question: "Kan jag använda Skattehjälpen för tidigare års deklarationer?",
    answer:
      "Vår tjänst är optimerad för innevarande års deklaration enligt gällande skatteregler. För rättelse av tidigare års deklarationer rekommenderar vi att du kontaktar Skatteverket direkt eller en auktoriserad skatterådgivare.",
  },
  {
    question: "Vad händer om Skatteverket inte godkänner mina avdrag?",
    answer:
      "Skattehjälpen tillhandahåller vägledning baserat på allmänt tillgänglig information, men vi kan inte garantera att alla förslag godkänns av Skatteverket. Du ansvarar själv för att kontrollera och verifiera alla avdrag innan du lämnar in din deklaration. Vi rekommenderar att du sparar alla underlag.",
  },
  {
    question: "Kan jag kontakta er om jag har frågor efter analysen?",
    answer:
      "Du kan alltid kontakta vår support på support@skattehjalpen.se om du har frågor om din analys eller hur du ska tolka resultaten. Vi strävar efter att svara inom 24 timmar på vardagar.",
  },
];

export const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            ❓ Vanliga frågor
          </h1>
          <p className="text-gray-800 mb-8">
            Här hittar du svar på de vanligaste frågorna om Skattehjälpen
          </p>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-100 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-800">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 py-4 bg-gray-100 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-green-500 rounded-lg border border-green-600">
            <h3 className="text-xl font-semibold text-white mb-4">
              Har du fler frågor?
            </h3>
            <p className="text-white mb-4">
              Om du inte hittar svar på din fråga här, tveka inte att kontakta
              oss.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">📧</span>
                <span className="text-white">
                  support@skattehjalpen.se
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">📍</span>
                <span className="text-white">
                  Skattehjälpen AB, Box 123, 111 22 Stockholm
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
