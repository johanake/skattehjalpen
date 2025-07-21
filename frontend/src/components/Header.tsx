import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "./AuthModal";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate("/");
  };

  const isWizardPage = location.pathname === "/skatt/inkomstdeklaration";
  const isUserAgreement = location.pathname === "/user-agreement";
  const isAnalysisPage =
    location.pathname === "/skatt/inkomstdeklaration/analys";

  return (
    <header className="bg-primary-bg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {(isWizardPage || isUserAgreement || isAnalysisPage) && (
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
            <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-full mr-3">
              <svg
                className="w-6 h-6 text-text-inverse"
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
            <h1 className="text-2xl font-bold text-text-primary">
              Skattehjälpen
            </h1>
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
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3 py-2 sm:px-4 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                >
                  Logga In
                </button>
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
