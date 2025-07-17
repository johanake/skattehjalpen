import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { TaxWizard } from './components/TaxWizard';
import { UserAgreement } from './components/UserAgreement';
import { StripeProvider } from './components/StripeProvider';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/wizard" element={
          <StripeProvider>
            <TaxWizard />
          </StripeProvider>
        } />
        <Route path="/user-agreement" element={<UserAgreement />} />
      </Routes>
    </Router>
  );
}

export default App;