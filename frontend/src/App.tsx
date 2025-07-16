import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { TaxWizard } from './components/TaxWizard';
import { UserAgreement } from './components/UserAgreement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/wizard" element={<TaxWizard />} />
        <Route path="/user-agreement" element={<UserAgreement />} />
      </Routes>
    </Router>
  );
}

export default App;