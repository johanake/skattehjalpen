import React from "react";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-white to-bg-secondary">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-bg-white rounded-lg shadow-lg p-8 border border-border-light">
          <h1 className="text-3xl font-bold text-text-primary mb-8">
            🔒 Integritetspolicy för Skattehjälpen
          </h1>
          <p className="text-text-primary mb-8">
            Senast uppdaterad: 30 juli 2025
          </p>

          <div className="prose prose-lg text-text-secondary max-w-none">
            <p className="mb-8 text-lg">
              Skattehjälpen AB ("vi", "oss", "vårt") respekterar din integritet
              och är engagerade i att skydda dina personuppgifter. Denna
              integritetspolicy förklarar hur vi samlar in, använder, lagrar och
              skyddar dina uppgifter när du använder vår tjänst.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                1. Personuppgiftsansvarig
              </h2>
              <p className="mb-4">
                Personuppgiftsansvarig för behandlingen av dina personuppgifter
                är:
              </p>
              <div className="bg-bg-secondary p-4 rounded-lg mb-4">
                <p className="mb-2">
                  <strong>Skattehjälpen AB</strong>
                </p>
                <p className="mb-2">Box 123, 111 22 Stockholm</p>
                <p className="mb-2">E-post: privacy@skattehjalpen.se</p>
                <p>Organisationsnummer: 559XXX-XXXX</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                2. Vilka personuppgifter samlar vi in?
              </h2>
              <p className="mb-4">
                Vi kan samla in följande typer av personuppgifter:
              </p>

              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Kontouppgifter:
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>E-postadress (används som användarnamn)</li>
                <li>Lösenord (krypterat)</li>
                <li>Kontoskapandedatum</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Skattedeklarationsuppgifter:
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Inkomstuppgifter</li>
                <li>Avdragsuppgifter</li>
                <li>
                  Ekonomiska förhållanden relaterade till skattedeklaration
                </li>
                <li>Uppladdade kvitton och dokument</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Betalningsuppgifter:
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Betalningshistorik och transaktionsstatus</li>
                <li>
                  Betalningsinformation hanteras av vår betaltjänstleverantör
                  Stripe
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Tekniska uppgifter:
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>IP-adress</li>
                <li>Webbläsarinformation</li>
                <li>Tidsstämplar för aktivitet</li>
                <li>Loggar för felsökning och säkerhet</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                3. Hur använder vi dina personuppgifter?
              </h2>
              <p className="mb-4">
                Vi behandlar dina personuppgifter för följande ändamål:
              </p>

              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Tjänsteleverans (Artikel 6.1(b) GDPR - Avtalsuppfyllelse):
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Skapa och hantera ditt användarkonto</li>
                <li>Utföra skatteanalyser baserat på dina uppgifter</li>
                <li>Leverera analysresultat och rekommendationer</li>
                <li>Hantera betalningar och fakturer</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Kundservice (Artikel 6.1(f) GDPR - Berättigat intresse):
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Svara på dina frågor och förfrågningar</li>
                <li>Tillhandahålla teknisk support</li>
                <li>Förbättra vår tjänst baserat på feedback</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mb-3">
                Säkerhet och efterlevnad (Artikel 6.1(f) GDPR - Berättigat
                intresse):
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Skydda mot bedrägerier och missbruk</li>
                <li>Säkerställa säkerhet för våra system</li>
                <li>Efterleva juridiska förpliktelser</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                4. Delning av personuppgifter
              </h2>
              <p className="mb-4">
                Vi delar inte dina personuppgifter med tredje parter förutom i
                följande fall:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Betaltjänstleverantör:</strong> Stripe hanterar
                  betalningar säkert enligt deras integritetspolicy
                </li>
                <li>
                  <strong>Molntjänstleverantör:</strong> Våra servrar och
                  databaser drivs av betrodda molntjänstleverantörer inom EU
                </li>
                <li>
                  <strong>Juridiska krav:</strong> Om det krävs enligt lag eller
                  myndighetsförordning
                </li>
                <li>
                  <strong>Samtycke:</strong> När du uttryckligen har samtyckt
                  till delning
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                5. Lagringstid
              </h2>
              <p className="mb-4">
                Vi lagrar dina personuppgifter så länge som:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Ditt konto är aktivt</li>
                <li>Det är nödvändigt för att tillhandahålla våra tjänster</li>
                <li>Det krävs enligt lag (t.ex. bokföringslagen)</li>
                <li>Det behövs för att lösa tvister eller genomdriva avtal</li>
              </ul>
              <p className="mb-4">
                <strong>Specifika lagringstider:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Kontouppgifter: Tills du begär radering av ditt konto</li>
                <li>Skatteanalyser: Tills du begär radering av ditt konto</li>
                <li>Betalningsuppgifter: 7 år (enligt bokföringslagen)</li>
                <li>Loggar och tekniska data: 13 månader</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                6. Dina rättigheter enligt GDPR
              </h2>
              <p className="mb-4">
                Du har följande rättigheter avseende dina personuppgifter:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-bg-secondary p-4 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">
                    Rätt till information
                  </h4>
                  <p className="text-sm">
                    Få information om hur dina uppgifter behandlas
                  </p>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">
                    Ändring
                  </h4>
                  <p className="text-sm">
                    Rätta felaktiga eller ofullständiga uppgifter
                  </p>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">
                    Radering
                  </h4>
                  <p className="text-sm">Begära att dina uppgifter raderas</p>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">
                    Begränsning
                  </h4>
                  <p className="text-sm">
                    Begränsa behandlingen av dina uppgifter
                  </p>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">
                    Dataportabilitet
                  </h4>
                  <p className="text-sm">
                    Få ut dina uppgifter i strukturerat format
                  </p>
                </div>
                <div className="bg-bg-secondary p-4 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">
                    Invändning
                  </h4>
                  <p className="text-sm">
                    Invända mot behandling baserad på berättigat intresse
                  </p>
                </div>
              </div>

              <p className="mb-4">
                För att utöva dina rättigheter, kontakta oss på
                <strong> privacy@skattehjalpen.se</strong>. Vi svarar inom 30
                dagar.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                7. Säkerhet
              </h2>
              <p className="mb-4">
                Vi vidtar omfattande säkerhetsåtgärder för att skydda dina
                personuppgifter:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All data krypteras både i transit och i vila</li>
                <li>Säkra datacenters inom EU med fysisk säkerhet</li>
                <li>Regelbundna säkerhetsuppdateringar och övervakning</li>
                <li>Begränsad åtkomst baserat på behov</li>
                <li>Regelbundna säkerhetstester och granskningar</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                8. Cookies och spårningsteknologier
              </h2>
              <p className="mb-4">
                Vi använder nödvändiga cookies för att säkerställa att tjänsten
                fungerar korrekt:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Sessionscookies:</strong> För att hålla dig inloggad
                  under din session
                </li>
                <li>
                  <strong>Säkerhetscookies:</strong> För att förhindra
                  CSRF-attacker
                </li>
                <li>
                  <strong>Funktionella cookies:</strong> För att komma ihåg dina
                  inställningar
                </li>
              </ul>
              <p className="mb-4">
                Vi använder inte cookies för marknadsföring eller spårning utan
                ditt samtycke.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                9. Internationella överföringar
              </h2>
              <p className="mb-4">
                Alla dina personuppgifter lagras och behandlas inom
                EU/EES-området. Vi överför inte personuppgifter till länder
                utanför EU utan adekvat skyddsnivå.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                10. Barn under 16 år
              </h2>
              <p className="mb-4">
                Vår tjänst är inte riktad till barn under 16 år. Vi samlar inte
                medvetet in personuppgifter från barn under 16 år utan
                föräldrarnas samtycke.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                11. Ändringar av integritetspolicyn
              </h2>
              <p className="mb-4">
                Vi kan uppdatera denna integritetspolicy från tid till annan.
                Vid väsentliga ändringar kommer vi att informera dig via e-post
                eller genom meddelande i tjänsten.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                12. Klagomål till tillsynsmyndighet
              </h2>
              <p className="mb-4">
                Om du är missnöjd med hur vi hanterar dina personuppgifter har
                du rätt att lämna klagomål till Integritetsskyddsmyndigheten
                (IMY):
              </p>
              <div className="bg-bg-secondary p-4 rounded-lg mb-4">
                <p className="mb-2">
                  <strong>Integritetsskyddsmyndigheten</strong>
                </p>
                <p className="mb-2">Box 8114, 104 20 Stockholm</p>
                <p className="mb-2">Telefon: 08-657 61 00</p>
                <p>E-post: imy@imy.se</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-accent mb-4">
                13. Kontaktuppgifter
              </h2>
              <p className="mb-4">
                Om du har frågor om denna integritetspolicy eller vill utöva
                dina rättigheter, kontakta oss:
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-accent mr-2">📧</span>
                  <span>
                    <strong>E-post:</strong> privacy@skattehjalpen.se
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-accent mr-2">📞</span>
                  <span>
                    <strong>Telefon:</strong> 08-XXX XX XX
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-accent mr-2">📍</span>
                  <span>
                    <strong>Postadress:</strong> Skattehjälpen AB, Box 123, 111
                    22 Stockholm
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
