import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import { PrimaryButton } from "./buttons/PrimaryButton";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const isWizardPage = location.pathname === "/skatt/inkomstdeklaration";
  const isUserAgreement = location.pathname === "/user-agreement";
  const isAnalysisPage =
    location.pathname === "/skatt/inkomstdeklaration/analys" ||
    location.pathname.startsWith("/mina-analyser/");
  const isHistoryPage = location.pathname === "/mina-analyser";

  return (
    <header className="bg-slate-50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {(isWizardPage ||
              isUserAgreement ||
              isAnalysisPage ||
              isHistoryPage) && (
              <button
                onClick={handleBackClick}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Tillbaka till startsida"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
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
              </button>
            )}
            <button
              onClick={handleLogoClick}
              className="text-2xl font-bold text-gray-800 hover:text-green-600 transition-colors"
            >
              Skattehjälpen
            </button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Navigation for landing page */}
            {location.pathname === "/" && (
              <nav className="hidden md:flex space-x-4 lg:space-x-8 mr-4">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-gray-900 transition-colors text-sm lg:text-base"
                >
                  Funktioner
                </a>
                <a
                  href="#pricing"
                  className="text-gray-700 hover:text-gray-900 transition-colors text-sm lg:text-base"
                >
                  Priser
                </a>
                <button
                  onClick={() => navigate("/blogg")}
                  className="text-gray-700 hover:text-gray-900 transition-colors text-sm lg:text-base"
                >
                  Blogg
                </button>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-gray-900 transition-colors text-sm lg:text-base"
                >
                  Om oss
                </a>
              </nav>
            )}

            {/* Navigation for authenticated users */}
            {isAuthenticated && (
              <nav className="hidden md:flex space-x-4 lg:space-x-6 mr-4">
                <button
                  onClick={() => navigate("/skatt/inkomstdeklaration")}
                  className={`text-sm lg:text-base transition-colors ${
                    isWizardPage
                      ? "text-primary-600 font-medium"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Ny analys
                </button>
                <button
                  onClick={() => navigate("/mina-analyser")}
                  className={`text-sm lg:text-base transition-colors ${
                    isHistoryPage
                      ? "text-primary-600 font-medium"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Mina analyser
                </button>
                <button
                  onClick={() => navigate("/blogg")}
                  className={`text-sm lg:text-base transition-colors ${
                    location.pathname.startsWith("/blogg")
                      ? "text-primary-600 font-medium"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Blogg
                </button>
              </nav>
            )}

            {/* Auth buttons - always visible */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button
                    onClick={logout}
                    className="px-3 py-2 sm:px-4 text-sm text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Logga Ut
                  </button>
                </div>
              ) : (
                <PrimaryButton onClick={() => setIsAuthModalOpen(true)}>
                  Logga in
                </PrimaryButton>
              )}
            </div>
          </div>
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;
