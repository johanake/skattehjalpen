import React from "react";

export const UserAgreement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-white to-bg-secondary">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-bg-white rounded-lg shadow-lg p-8 border border-border-light">
          <h1 className="text-3xl font-bold text-text-primary mb-8">
            📄 Användarvillkor för Skattehjälpen
          </h1>
          <p className="text-text-muted mb-8">
            Senast uppdaterad: 16 juli 2025
          </p>

          <div className="prose prose-lg text-text-secondary max-w-none">
            <p className="mb-8 text-lg">
              Välkommen till Skattehjälpen ("tjänsten"). Dessa användarvillkor
              reglerar din användning av vår AI-baserade plattform som ger
              vägledande information om inkomstdeklaration för privatpersoner i
              Sverige. Genom att använda tjänsten samtycker du till dessa
              villkor.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                1. Tjänstens syfte och begränsning
              </h2>
              <p className="mb-4">
                Tjänsten tillhandahåller automatgenererad vägledning kring
                skattefrågor baserat på offentligt tillgänglig information,
                såsom Skatteverkets regler och exempel. Den är inte en
                ersättning för professionell skatterådgivning från revisor,
                jurist eller Skatteverket.
              </p>
              <p className="mb-4">Tjänsten:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Är inte auktoriserad av Skatteverket</li>
                <li>
                  Erbjuder inte personlig rådgivning baserat på dina specifika
                  förhållanden
                </li>
                <li>Ska ses som allmän och vägledande information</li>
              </ul>
              <p className="mb-4">
                Vi rekommenderar att du alltid kontaktar en kvalificerad
                rådgivare vid viktiga beslut som rör din deklaration.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                2. Ansvarsfriskrivning
              </h2>
              <p className="mb-4">
                Vi strävar efter att ge korrekt och aktuell information, men:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Vi garanterar inte att informationen är fullständig, korrekt
                  eller uppdaterad
                </li>
                <li>Du använder tjänsten på egen risk</li>
                <li>
                  Vi tar inget ansvar för eventuella skador, felaktiga
                  deklarationer, skattetillägg eller andra konsekvenser som kan
                  uppstå genom att du agerar på information från tjänsten
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                3. Användarens ansvar
              </h2>
              <p className="mb-4">Du ansvarar själv för att:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Tolka och använda informationen på ett korrekt sätt</li>
                <li>
                  Säkerställa att den information du lämnar till tjänsten är
                  korrekt (om sådan inmatning förekommer)
                </li>
                <li>
                  Kontakta Skatteverket eller professionell rådgivare vid
                  tveksamheter
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                4. Personuppgifter och dataskydd (GDPR)
              </h2>
              <p className="mb-4">
                Om tjänsten samlar in personuppgifter gäller följande:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Vi behandlar personuppgifter i enlighet med
                  dataskyddsförordningen (GDPR)
                </li>
                <li>
                  Vi samlar endast in uppgifter som är nödvändiga för tjänstens
                  funktion
                </li>
                <li>
                  Uppgifterna lagras säkert och delas inte med tredje part utan
                  ditt samtycke
                </li>
                <li>
                  Du har rätt att få tillgång till, rätta eller radera dina
                  personuppgifter när som helst
                </li>
              </ul>
              <p className="mb-4">
                Mer information finns i vår integritetspolicy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                5. Immateriella rättigheter
              </h2>
              <p className="mb-4">
                Allt innehåll i tjänsten, inklusive texter, kod och AI-modeller,
                tillhör Skattehjälpen AB och får inte kopieras, distribueras
                eller återanvändas utan skriftligt tillstånd.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                6. Betalning och återbetalning
              </h2>
              <p className="mb-4">
                Alla tjänster betalas i förväg. Vi erbjuder:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Säkra betalningar via etablerade betalningslösningar</li>
                <li>14 dagars ångerrätt enligt konsumentköplagen</li>
                <li>
                  Återbetalning vid tekniska fel som hindrar tjänsteutförande
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                7. Ändringar av villkor
              </h2>
              <p className="mb-4">
                Vi förbehåller oss rätten att när som helst uppdatera dessa
                användarvillkor. Vid väsentliga ändringar kommer vi att
                informera användare via tjänsten eller e-post om du har ett
                konto.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                8. Tillämplig lag och tvistlösning
              </h2>
              <p className="mb-4">
                Dessa villkor regleras enligt svensk lag. Tvister som uppstår i
                samband med användningen av tjänsten ska i första hand lösas
                genom förhandling. Om det inte går kan tvisten prövas i svensk
                domstol, med Stockholm tingsrätt som första instans.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                9. Kontakt
              </h2>
              <p className="mb-4">
                Om du har frågor om dessa villkor eller tjänsten, kontakta oss
                på:
              </p>
              <ul className="list-none mb-4 space-y-2">
                <li>📧 support@skattehjalpen.se</li>
                <li>📍 Skattehjälpen AB, Box 123, 111 22 Stockholm</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
