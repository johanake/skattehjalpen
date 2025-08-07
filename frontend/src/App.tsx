import React, { Suspense } from "react";
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

// Lazy load blog components to avoid import issues on main page
const BlogList = React.lazy(() => import("./components/BlogList").then(module => ({ default: module.BlogList })));
const BlogPost = React.lazy(() => import("./components/BlogPost").then(module => ({ default: module.BlogPost })));

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
        <Route
          path="/blogg"
          element={
            <Layout>
              <Suspense fallback={<div className="flex justify-center items-center min-h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                <BlogList />
              </Suspense>
            </Layout>
          }
        />
        <Route
          path="/blogg/:slug"
          element={
            <Layout>
              <Suspense fallback={<div className="flex justify-center items-center min-h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                <BlogPost />
              </Suspense>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
