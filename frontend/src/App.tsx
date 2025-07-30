import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { TaxWizard } from "./components/TaxWizard";
import { UserAgreement } from "./components/UserAgreement";
import { FAQ } from "./components/FAQ";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TaxAnalysisResult } from "./components/TaxAnalysisResult";
import { TaxAdviceHistory } from "./components/TaxAdviceHistory";
import { StripeProvider } from "./components/StripeProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ScrollToTop } from "./components/ScrollToTop";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <ScrollToTop />
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
          path="/vanliga-fragor"
          element={
            <Layout>
              <FAQ />
            </Layout>
          }
        />
        <Route
          path="/integritetspolicy"
          element={
            <Layout>
              <PrivacyPolicy />
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
        <Route
          path="/mina-analyser"
          element={
            <ProtectedRoute>
              <Layout>
                <TaxAdviceHistory />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mina-analyser/:id"
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
