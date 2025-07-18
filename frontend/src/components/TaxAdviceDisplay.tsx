import { trpc } from '../utils/trpc';

interface TaxAdviceDisplayProps {
  declarationId: string;
}

export const TaxAdviceDisplay: React.FC<TaxAdviceDisplayProps> = ({ declarationId }) => {
  const generateAdvice = trpc.tax.generateAdvice.useMutation();
  const { data: advice, isLoading, error } = generateAdvice.data 
    ? { data: generateAdvice.data, isLoading: false, error: null }
    : { data: null, isLoading: generateAdvice.isPending, error: generateAdvice.error };

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

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-primary">Skatterådgivning resultat</h3>
      
      {/* Total Savings */}
      <div className="bg-accent-light border border-accent rounded-lg p-4 mb-6">
        <h4 className="text-lg font-semibold text-accent mb-2">
          Potentiell skattebesparing: {advice.totalPotentialSavings.toLocaleString()} kr
        </h4>
        <p className="text-text-primary">
          Baserat på din skattedeklaration och kvitton har vi hittat möjligheter att spara på skatten.
        </p>
      </div>

      {/* Suggested Deductions */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-text-primary mb-3">Föreslagna avdrag</h4>
        <div className="space-y-4">
          {advice.suggestedDeductions.map((deduction, index) => (
            <div key={index} className="border border-border-default rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-text-primary">{deduction.category}</h5>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  deduction.confidence === 'high' ? 'bg-accent text-text-inverse' :
                  deduction.confidence === 'medium' ? 'bg-warning text-text-inverse' :
                  'bg-danger text-text-inverse'
                }`}>
                  {deduction.confidence} confidence
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-sm text-text-muted">Nuvarande avdrag</p>
                  <p className="font-medium text-text-primary">{deduction.currentAmount.toLocaleString()} kr</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Föreslaget avdrag</p>
                  <p className="font-medium text-text-primary">{deduction.suggestedAmount.toLocaleString()} kr</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Potentiell besparing</p>
                  <p className="font-medium text-accent">{deduction.potentialSavings.toLocaleString()} kr</p>
                </div>
              </div>
              
              <p className="text-text-secondary mb-3">{deduction.explanation}</p>
              
              {deduction.requiredDocuments.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-text-secondary mb-1">Krävda dokument:</p>
                  <ul className="text-sm text-text-secondary list-disc list-inside">
                    {deduction.requiredDocuments.map((doc, docIndex) => (
                      <li key={docIndex}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {deduction.relatedReceipts.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">
                    Relaterade kvitton: {deduction.relatedReceipts.length}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-text-primary mb-3">Riskbedömning</h4>
        <div className={`border rounded-lg p-4 ${
          advice.riskAssessment.level === 'low' ? 'border-accent bg-accent-light' :
          advice.riskAssessment.level === 'medium' ? 'border-warning bg-warning-light' :
          'border-danger bg-danger-light'
        }`}>
          <div className="flex items-center mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              advice.riskAssessment.level === 'low' ? 'bg-accent text-text-inverse' :
              advice.riskAssessment.level === 'medium' ? 'bg-warning text-text-inverse' :
              'bg-danger text-text-inverse'
            }`}>
              {advice.riskAssessment.level === 'low' ? 'LÅG' : 
               advice.riskAssessment.level === 'medium' ? 'MEDEL' : 'HÖG'} RISK
            </span>
          </div>
          {advice.riskAssessment.factors.length > 0 && (
            <ul className="text-sm list-disc list-inside text-text-secondary">
              {advice.riskAssessment.factors.map((factor, index) => (
                <li key={index}>{factor}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h4 className="text-md font-semibold text-text-primary mb-3">Rekommendationer</h4>
        <ul className="space-y-2">
          {advice.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span className="text-text-secondary">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-sm text-text-muted">
        Rådgivning genererad den {new Date(advice.generatedAt).toLocaleDateString('sv-SE')}
      </div>
    </div>
  );
};