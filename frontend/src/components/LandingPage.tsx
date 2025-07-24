import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
import { ProductCard } from "./products/ProductCard";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartWizard = () => {
    navigate("/skatt/inkomstdeklaration");
  };

  const handleShowUserAgreement = () => {
    navigate("/user-agreement");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br bg-primary">
      {/* Hero Section */}
      <section
        className="pt-20 pb-32 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url(/hero-picture.jpg)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-text-inverse mb-6">
              AI-driven skatterådgivning för{" "}
              <span className="text-accent">svenska</span> skattebetalare
            </h2>
            <p className="text-xl text-text-inverse mb-8 max-w-3xl mx-auto">
              Din personliga AI-assistent för deklarationen. Fyll i vårt smarta
              frågeformulär på 10 minuter och få hjälp att hitta dolda avdrag
              och maximera din skatteåterbäring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <PrimaryButton size="lg" onClick={handleStartWizard}>
                Kom igång nu
              </PrimaryButton>
              <SecondaryButton
                size="lg"
                onClick={() => console.log("Pressed Se Demo")}
                className="px-8 py-4 text-lg"
              >
                Se demo
              </SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-text-primary mb-4">
              Varför välja Skattehjälpen?
            </h3>
            <p className="text-xl text-text-secondary">
              Vårt AI-system analyserar dina utgifter under året, för att
              identifiera alla möjliga avdrag
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-text-inverse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-text-primary mb-4">
                Automatisk skatteanalys
              </h4>
              <p className="text-text-secondary">
                Vår AI analyserar dina inkomster och utgifter automatiskt enligt
                Skatteverkets regler för olika avdragstyper.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-text-inverse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-text-primary mb-4">
                Maximera din återbäring
              </h4>
              <p className="text-text-secondary">
                Hitta dolda avdrag för hemmakontor, resor, utbildning och
                arbetsrelaterade kostnader som du kanske missat.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-text-inverse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-text-primary mb-4">
                Säker data
              </h4>
              <p className="text-text-secondary">
                Vi tar datasäkerhet på allvar. All information krypteras och
                lagras i EU, samt följer GDPR.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-text-inverse mb-4">
              Så här fungerar det
            </h3>
            <p className="text-xl text-text-inverse">
              Enkel process i fyra steg
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  1
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  Fyll i deklaration
                </h4>
                <p className="text-text-secondary">
                  Ange dina inkomster och nuvarande avdrag så analyserar vår AI
                  automatiskt
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  2
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  Se resultatet
                </h4>
                <p className="text-text-secondary">
                  Vi ger dig en förhandsvisning på vad du kan spara, INNAN du
                  går vidare till betalning
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  3
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  Betala för analysen
                </h4>
                <p className="text-text-secondary">
                  Säker betalning för din personliga skatteanalys
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  4
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  Få rådgivning
                </h4>
                <p className="text-text-secondary">
                  Detaljerad rapport med avdragsförslag och
                  optimeringsrekommendationer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-primary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-text-primary mb-4">
              Priser
            </h3>
          </div>
          <div className="flex justify-center">
            <div className="ms-4 me-4" />
            <ProductCard
              title="Skatteanalys"
              price={199}
              strikeThroughPrice={249}
              isRecommended={true}
            >
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-3 text-lg">✓</span>
                <span>Omfattande AI-baserad skatteanalys</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-3 text-lg">✓</span>
                <span>Automatisk identifiering av avdrag</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-3 text-lg">✓</span>
                <span>Detaljerade avdragsrekommendationer</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-3 text-lg">✓</span>
                <span>Visar var du fyller i avdraget i deklarationen</span>
              </li>
            </ProductCard>
            <div className="ms-4 me-4" />
            <ProductCard
              title="Partner-paketet"
              price={499}
              isRecommended={false}
            >
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-3 text-lg">✓</span>
                <span>Två analyser ingår</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-3 text-lg">✓</span>
                <span>Dela med valfri person</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-3 text-lg">✓</span>
                <span>Samma funktion som "Skatteanalys"</span>
              </li>
            </ProductCard>
          </div>

          <div className="text-center mt-12">
            <PrimaryButton size="lg" onClick={handleStartWizard}>
              Kom igång nu
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* Om oss Section */}
      <section id="about" className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">JH</span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    Vi vill göra skattedeklarationer enklare för alla svenskar.
                    Som många andra har vi märkt att det kan vara svårt att
                    hitta alla avdrag man har rätt till.
                  </p>
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    Vår idé var att använda teknik för att hjälpa fler människor
                    att få tillbaka mer pengar från skatten. Vi byggde
                    Skattehjälpen för att göra kunskap om skatt och avdrag mer
                    tillgängligt och prisvärt än traditionell skatterådgivning.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    Med hjälp av AI och automation kan vi erbjuda personlig
                    skatteanalys till en låg kostnad, så att alla ska kunna dra
                    nytta av de avdrag de har rätt till.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full mr-2">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h5 className="text-lg text-text-primary font-semibold">
                  Skattehjälpen
                </h5>
              </div>
              <p className="text-text-secondary">
                AI-driven skatteanalys för svenska skattebetalare
              </p>
            </div>

            <div>
              <h6 className="font-semibold mb-4 text-text-primary">Tjänster</h6>
              <ul className="space-y-2 text-text-secondary">
                <li>
                  <a
                    href="#"
                    className="hover:text-text-secondary transition-colors"
                  >
                    Analys av inkomstdeklaration
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="font-semibold mb-4 text-text-primary">Support</h6>
              <ul className="space-y-2 text-text-secondary">
                <li>
                  <a
                    href="#"
                    className="hover:text-text-primary transition-colors"
                  >
                    Hjälpcenter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-text-primary transition-colors"
                  >
                    Vanliga frågor
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-text-primary transition-colors"
                  >
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="font-semibold mb-4 text-text-primary">Företag</h6>
              <ul className="space-y-2 text-text-secondary">
                <li>
                  <a
                    href="#"
                    className="hover:text-text-primary transition-colors"
                  >
                    Om oss
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-text-primary transition-colors"
                  >
                    Integritetspolicy
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleShowUserAgreement}
                    className="hover:text-text-primary transition-colors"
                  >
                    Användarvillkor
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-text-primary">
            <p>&copy; 2024 Skattehjälpen. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
