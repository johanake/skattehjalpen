import React from "react";
import { useNavigate } from "react-router-dom";

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
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-text-inverse mb-6">
              AI-driven skatterådgivning för{" "}
              <span className="text-accent">svenska</span> skattebetalare
            </h2>
            <p className="text-xl text-text-inverse mb-8 max-w-3xl mx-auto">
              Ladda upp din skattedeklaration och kvitton så hjälper vår AI dig
              att hitta dolda avdrag och maximera din skatteåterbäring enligt
              Skatteverkets regler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleStartWizard}
                className="bg-bg-accent-dark text-text-inverse px-8 py-4 rounded-lg text-lg font-semibold hover:bg-bg-accent-light transition-colors shadow-lg"
              >
                Kom igång nu
              </button>
              <button className="text-accent px-8 py-4 rounded-lg text-lg font-semibold hover:bg-bg-secondary transition-colors border border-accent">
                Se demo
              </button>
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
                Skatteverket-godkänt
              </h4>
              <p className="text-text-secondary">
                Alla våra rekommendationer följer Skatteverkets riktlinjer och
                är säkra att använda i din deklaration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">
              Så här fungerar det
            </h3>
            <p className="text-xl text-text-muted">Enkel process i tre steg</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-full text-white font-bold text-lg mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Fyll i deklaration
              </h4>
              <p className="text-text-muted text-sm">
                Ange dina inkomster och nuvarande avdrag så analyserar vår AI
                automatiskt
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-full text-white font-bold text-lg mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Betala för analysen
              </h4>
              <p className="text-text-muted text-sm">
                Säker betalning för din personliga skatteanalys
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-full text-white font-bold text-lg mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Få rådgivning
              </h4>
              <p className="text-text-muted text-sm">
                Detaljerad rapport med avdragsförslag och
                optimeringsrekommendationer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-primary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-text-primary mb-4">
              Enkla priser
            </h3>
          </div>

          <div className="flex justify-center">
            <div className="border-2 border-border-default rounded-lg p-8 relative bg-primary max-w-md">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm">
                  Rekommenderas
                </span>
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-semibold text-white mb-2">
                  Skatteanalys
                </h4>
                <div className="text-4xl font-bold text-text-inverse mb-4">
                  199 kr
                </div>
                <ul className="text-left text-text-inverse space-y-3 mb-6">
                  <li>✓ Omfattande AI-baserad skatteanalys</li>
                  <li>✓ Automatisk identifiering av avdrag</li>
                  <li>✓ Detaljerade avdragsrekommendationer</li>
                  <li>✓ Riskbedömning och säkerhetsanalys</li>
                  <li>✓ Prioriterad support</li>
                  <li>✓ Detaljerad PDF-rapport</li>
                  <li>✓ Uppföljning och rådgivning</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleStartWizard}
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              Kom igång nu
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
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
                <h5 className="text-lg font-semibold">Skattehjälpen</h5>
              </div>
              <p className="text-text-muted">
                AI-driven skatterådgivning för svenska skattebetalare
              </p>
            </div>

            <div>
              <h6 className="font-semibold mb-4 text-text-inverse">Tjänster</h6>
              <ul className="space-y-2 text-text-muted">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Skattedeklaration
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    AI-baserad analys
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Avdragsoptimering
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Riskbedömning
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="font-semibold mb-4 text-text-inverse">Support</h6>
              <ul className="space-y-2 text-text-muted">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Hjälpcenter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Vanliga frågor
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Kontakt
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="font-semibold mb-4 text-text-inverse">Företag</h6>
              <ul className="space-y-2 text-text-muted">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Om oss
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Karriär
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Integritetspolicy
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleShowUserAgreement}
                    className="hover:text-green-400 transition-colors"
                  >
                    Användarvillkor
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-text-muted">
            <p>&copy; 2024 Skattehjälpen. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
