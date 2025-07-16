import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { TaxWizard } from './components/TaxWizard';

type AppState = 'landing' | 'wizard';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');

  const handleStartWizard = () => {
    setAppState('wizard');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
  };

  if (appState === 'landing') {
    return <LandingPage onStartWizard={handleStartWizard} />;
  }

  if (appState === 'wizard') {
    return <TaxWizard onBackToLanding={handleBackToLanding} />;
  }

  return null;
}

export default App;