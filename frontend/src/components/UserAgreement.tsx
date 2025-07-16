import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UserAgreement: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToLanding = () => {
    navigate('/');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handleBackToLanding}
                className="flex items-center text-gray-300 hover:text-green-400 transition-colors mr-4"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Tillbaka
              </button>
              <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-full mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">Skattehjälpen</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-8">📄 Användarvillkor för Skattehjälpen</h1>
          <p className="text-gray-400 mb-8">Senast uppdaterad: 16 juli 2025</p>
          
          <div className="prose prose-lg text-gray-300 max-w-none">
            <p className="mb-8 text-lg">
              Välkommen till Skattehjälpen ("tjänsten"). Dessa användarvillkor reglerar din användning av vår AI-baserade plattform som ger vägledande information om inkomstdeklaration för privatpersoner i Sverige. Genom att använda tjänsten samtycker du till dessa villkor.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">1. Tjänstens syfte och begränsning</h2>
              <p className="mb-4">
                Tjänsten tillhandahåller automatgenererad vägledning kring skattefrågor baserat på offentligt tillgänglig information, såsom Skatteverkets regler och exempel. Den är inte en ersättning för professionell skatterådgivning från revisor, jurist eller Skatteverket.
              </p>
              <p className="mb-4">Tjänsten:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Är inte auktoriserad av Skatteverket</li>
                <li>Erbjuder inte personlig rådgivning baserat på dina specifika förhållanden</li>
                <li>Ska ses som allmän och vägledande information</li>
              </ul>
              <p className="mb-4">
                Vi rekommenderar att du alltid kontaktar en kvalificerad rådgivare vid viktiga beslut som rör din deklaration.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">2. Ansvarsfriskrivning</h2>
              <p className="mb-4">
                Vi strävar efter att ge korrekt och aktuell information, men:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Vi garanterar inte att informationen är fullständig, korrekt eller uppdaterad</li>
                <li>Du använder tjänsten på egen risk</li>
                <li>Vi tar inget ansvar för eventuella skador, felaktiga deklarationer, skattetillägg eller andra konsekvenser som kan uppstå genom att du agerar på information från tjänsten</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">3. Användarens ansvar</h2>
              <p className="mb-4">
                Du ansvarar själv för att:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Tolka och använda informationen på ett korrekt sätt</li>
                <li>Säkerställa att den information du lämnar till tjänsten är korrekt (om sådan inmatning förekommer)</li>
                <li>Kontakta Skatteverket eller professionell rådgivare vid tveksamheter</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">4. Personuppgifter och dataskydd (GDPR)</h2>
              <p className="mb-4">
                Om tjänsten samlar in personuppgifter gäller följande:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Vi behandlar personuppgifter i enlighet med dataskyddsförordningen (GDPR)</li>
                <li>Vi samlar endast in uppgifter som är nödvändiga för tjänstens funktion</li>
                <li>Uppgifterna lagras säkert och delas inte med tredje part utan ditt samtycke</li>
                <li>Du har rätt att få tillgång till, rätta eller radera dina personuppgifter när som helst</li>
              </ul>
              <p className="mb-4">
                Mer information finns i vår integritetspolicy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">5. Immateriella rättigheter</h2>
              <p className="mb-4">
                Allt innehåll i tjänsten, inklusive texter, kod och AI-modeller, tillhör Skattehjälpen AB och får inte kopieras, distribueras eller återanvändas utan skriftligt tillstånd.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">6. Betalning och återbetalning</h2>
              <p className="mb-4">
                Alla tjänster betalas i förväg. Vi erbjuder:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Säkra betalningar via etablerade betalningslösningar</li>
                <li>14 dagars ångerrätt enligt konsumentköplagen</li>
                <li>Återbetalning vid tekniska fel som hindrar tjänsteutförande</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">7. Ändringar av villkor</h2>
              <p className="mb-4">
                Vi förbehåller oss rätten att när som helst uppdatera dessa användarvillkor. Vid väsentliga ändringar kommer vi att informera användare via tjänsten eller e-post om du har ett konto.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">8. Tillämplig lag och tvistlösning</h2>
              <p className="mb-4">
                Dessa villkor regleras enligt svensk lag. Tvister som uppstår i samband med användningen av tjänsten ska i första hand lösas genom förhandling. Om det inte går kan tvisten prövas i svensk domstol, med Stockholm tingsrätt som första instans.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">9. Kontakt</h2>
              <p className="mb-4">
                Om du har frågor om dessa villkor eller tjänsten, kontakta oss på:
              </p>
              <ul className="list-none mb-4 space-y-2">
                <li>📧 support@skattehjalpen.se</li>
                <li>📍 Skattehjälpen AB, Box 123, 111 22 Stockholm</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-600">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBackToLanding}
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Jag godkänner villkoren
              </button>
              <button
                onClick={handleBackToLanding}
                className="text-green-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 transition-colors border border-green-400"
              >
                Tillbaka till startsidan
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};