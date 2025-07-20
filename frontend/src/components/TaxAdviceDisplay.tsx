import { useEffect } from 'react';
import { trpc } from '../utils/trpc';
import { TaxAnalysisResult } from './TaxAnalysisResult';

interface TaxAdviceDisplayProps {
  declarationId: string;
}

export const TaxAdviceDisplay: React.FC<TaxAdviceDisplayProps> = ({ declarationId }) => {
  const generateAdvice = trpc.tax.generateAdvice.useMutation();
  const { data: advice, isLoading, error } = generateAdvice.data 
    ? { data: generateAdvice.data, isLoading: false, error: null }
    : { data: null, isLoading: generateAdvice.isPending, error: generateAdvice.error };

  // Automatically generate advice when component loads
  useEffect(() => {
    if (!advice && !isLoading && !error) {
      generateAdvice.mutate({ declarationId });
    }
  }, [declarationId, advice, isLoading, error, generateAdvice]);

  const handleGenerateAdvice = () => {
    generateAdvice.mutate({ declarationId });
  };

  if (error) {
    return (
      <div className="bg-danger-light border border-danger rounded-lg p-4">
        <p className="text-danger">Error generating advice: {error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-bg-white p-6 rounded-lg shadow-lg border border-border-light">
        <h3 className="text-lg font-semibold mb-4 text-primary">Skatterådgivning</h3>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-text-secondary">Analyserar din deklaration med AI...</p>
            <p className="text-text-muted text-sm mt-2">Detta kan ta upp till 30 sekunder</p>
          </div>
        </div>
      </div>
    );
  }

  if (!advice) {
    return (
      <div className="bg-bg-white p-6 rounded-lg shadow-lg border border-border-light">
        <h3 className="text-lg font-semibold mb-4 text-primary">Skatterådgivning</h3>
        <p className="text-text-secondary mb-4">
          Redo att få personlig skatterådgivning? Vår AI analyserar din deklaration och kvitton för att hitta möjliga besparingar.
        </p>
        <button
          onClick={handleGenerateAdvice}
          disabled={isLoading}
          className="bg-accent text-text-inverse px-6 py-2 rounded hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Genererar rådgivning...' : 'Generera skatterådgivning'}
        </button>
      </div>
    );
  }

  // Use the TaxAnalysisResult component to display the advice
  return <TaxAnalysisResult advice={advice} />;
};