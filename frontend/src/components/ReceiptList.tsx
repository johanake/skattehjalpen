import { trpc } from '../utils/trpc';

type Receipt = {
  id: string;
  declarationId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  category: 'work' | 'home' | 'travel' | 'education' | 'charity' | 'medical' | 'other';
  amount?: number;
  description?: string;
  date?: Date;
  uploadedAt: Date;
  processedAt?: Date;
  extractedData?: {
    vendor?: string;
    amount?: number;
    date?: Date;
    category?: string;
    description?: string;
  };
};

interface ReceiptListProps {
  declarationId: string;
}

export const ReceiptList: React.FC<ReceiptListProps> = ({ declarationId }) => {
  const { data: receipts, isLoading, error, refetch } = trpc.tax.getReceipts.useQuery(
    { declarationId },
    { enabled: !!declarationId }
  );

  if (isLoading) {
    return (
      <div className="bg-bg-white p-6 rounded-lg shadow-lg border border-border-light">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">Uploaded Receipts</h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
          <p className="mt-2 text-text-secondary">Loading receipts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-bg-white p-6 rounded-lg shadow-lg border border-border-light">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">Uploaded Receipts</h3>
        <div className="text-center py-8">
          <p className="text-danger">Error loading receipts: {error.message}</p>
          <button
            onClick={() => refetch()}
            className="mt-2 text-accent hover:text-accent-light transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      work: 'bg-primary-light text-primary',
      home: 'bg-accent-light text-accent',
      travel: 'bg-purple-100 text-purple-700',
      education: 'bg-yellow-100 text-yellow-700',
      charity: 'bg-pink-100 text-pink-700',
      medical: 'bg-danger-light text-danger',
      other: 'bg-bg-secondary text-text-secondary',
    };
    return colors[category] || colors.other;
  };

  const getCategoryDisplayName = (category: string) => {
    const names: Record<string, string> = {
      work: 'Arbetsrelaterat',
      home: 'Hemmakontor',
      travel: 'Resor',
      education: 'Utbildning',
      charity: 'Välgörenhet',
      medical: 'Medicinskt',
      other: 'Övrigt',
    };
    return names[category] || category;
  };

  return (
    <div className="bg-bg-white p-6 rounded-lg shadow-lg border border-border-light">
      <h3 className="text-lg font-semibold mb-4 text-text-primary">
        Uppladdade kvitton ({receipts?.length || 0})
      </h3>
      
      {!receipts || receipts.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-text-muted mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-text-secondary">Inga kvitton uppladdade ännu</p>
          <p className="text-sm text-text-muted mt-1">Ladda upp dina kvitton för att få bättre skatterådgivning</p>
        </div>
      ) : (
        <div className="space-y-4">
          {receipts.map((receipt: Receipt) => (
            <div key={receipt.id} className="border border-border-default rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary">{receipt.fileName}</h4>
                  <p className="text-sm text-text-secondary">{receipt.description || 'Ingen beskrivning'}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(receipt.category)}`}>
                  {getCategoryDisplayName(receipt.category)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-text-muted">Belopp</p>
                  <p className="font-medium text-text-primary">
                    {receipt.amount ? `${receipt.amount.toLocaleString()} kr` : 'Saknas'}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">Datum</p>
                  <p className="font-medium text-text-primary">
                    {receipt.date ? new Date(receipt.date).toLocaleDateString('sv-SE') : 'Saknas'}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">Filstorlek</p>
                  <p className="font-medium text-text-primary">{(receipt.fileSize / 1024 / 1024).toFixed(1)} MB</p>
                </div>
                <div>
                  <p className="text-text-muted">Uppladdad</p>
                  <p className="font-medium text-text-primary">{new Date(receipt.uploadedAt).toLocaleDateString('sv-SE')}</p>
                </div>
              </div>
              
              {receipt.extractedData && (
                <div className="mt-3 p-3 bg-bg-secondary rounded">
                  <p className="text-sm font-medium text-text-primary mb-1">Extraherad data:</p>
                  <div className="text-sm text-text-secondary space-y-1">
                    {receipt.extractedData.vendor && (
                      <p><span className="font-medium text-text-primary">Leverantör:</span> {receipt.extractedData.vendor}</p>
                    )}
                    {receipt.extractedData.amount && (
                      <p><span className="font-medium text-text-primary">Belopp:</span> {receipt.extractedData.amount} kr</p>
                    )}
                    {receipt.extractedData.date && (
                      <p><span className="font-medium text-text-primary">Datum:</span> {new Date(receipt.extractedData.date).toLocaleDateString('sv-SE')}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};