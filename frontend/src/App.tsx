import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { TaxWizard } from "./components/TaxWizard";
import { UserAgreement } from "./components/UserAgreement";
import { TaxAnalysisResult } from "./components/TaxAnalysisResult";
import { StripeProvider } from "./components/StripeProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/skatt/inkomstdeklaration"
          element={
            <Layout>
              <StripeProvider>
                <TaxWizard />
              </StripeProvider>
            </Layout>
          }
        />
        <Route
          path="/user-agreement"
          element={
            <Layout>
              <UserAgreement />
            </Layout>
          }
        />
        <Route
          path="/skatt/inkomstdeklaration/analys"
          element={
            <ProtectedRoute>
              <Layout>
                <TaxAnalysisResult />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
