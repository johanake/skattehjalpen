import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import { SecondaryButton } from "./buttons/SecondaryButton";

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
    <header className="bg-primary-bg shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {(isWizardPage ||
              isUserAgreement ||
              isAnalysisPage ||
              isHistoryPage) && (
              <button
                onClick={handleBackClick}
                className="mr-4 p-2 rounded-full hover:bg-bg-secondary transition-colors"
                aria-label="Tillbaka till startsida"
              >
                <svg
                  className="w-6 h-6 text-text-primary"
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
            <div className="flex items-center justify-center w-10 h-10 mr-3">
              <svg
                className="w-8 h-8"
                viewBox="0 0 32 32"
                fill="none"
              >
                <rect width="32" height="32" rx="6" fill="#1E3A8A"/>
                <path d="M8 10C8 9.44772 8.44772 9 9 9H23C23.5523 9 24 9.44772 24 10V22C24 22.5523 23.5523 23 23 23H9C8.44772 23 8 22.5523 8 22V10Z" fill="#F1F5F9"/>
                <path d="M10 12H22V13H10V12Z" fill="#3B82F6"/>
                <path d="M10 15H22V16H10V15Z" fill="#3B82F6"/>
                <path d="M10 18H18V19H10V18Z" fill="#3B82F6"/>
                <circle cx="20" cy="18.5" r="1.5" fill="#16A34A"/>
                <path d="M19.3 18.5L19.7 18.9L20.7 17.9" stroke="white" strokeWidth="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <button
              onClick={handleLogoClick}
              className="text-2xl font-bold text-text-primary hover:text-accent transition-colors"
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
                <SecondaryButton
                  className=""
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Logga in
                </SecondaryButton>
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
