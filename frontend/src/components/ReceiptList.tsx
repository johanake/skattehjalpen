import { trpc } from '../utils/trpc';

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
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-white">Uploaded Receipts</h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-300">Loading receipts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-white">Uploaded Receipts</h3>
        <div className="text-center py-8">
          <p className="text-red-400">Error loading receipts: {error.message}</p>
          <button
            onClick={() => refetch()}
            className="mt-2 text-green-400 hover:text-green-300"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      work: 'bg-blue-900 text-blue-200',
      home: 'bg-green-900 text-green-200',
      travel: 'bg-purple-900 text-purple-200',
      education: 'bg-yellow-900 text-yellow-200',
      charity: 'bg-pink-900 text-pink-200',
      medical: 'bg-red-900 text-red-200',
      other: 'bg-gray-700 text-gray-200',
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
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-white">
        Uppladdade kvitton ({receipts?.length || 0})
      </h3>
      
      {!receipts || receipts.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-300">Inga kvitton uppladdade ännu</p>
          <p className="text-sm text-gray-400 mt-1">Ladda upp dina kvitton för att få bättre skatterådgivning</p>
        </div>
      ) : (
        <div className="space-y-4">
          {receipts.map((receipt) => (
            <div key={receipt.id} className="border border-gray-600 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-white">{receipt.fileName}</h4>
                  <p className="text-sm text-gray-300">{receipt.description || 'Ingen beskrivning'}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(receipt.category)}`}>
                  {getCategoryDisplayName(receipt.category)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Belopp</p>
                  <p className="font-medium text-white">
                    {receipt.amount ? `${receipt.amount.toLocaleString()} kr` : 'Saknas'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Datum</p>
                  <p className="font-medium text-white">
                    {receipt.date ? new Date(receipt.date).toLocaleDateString('sv-SE') : 'Saknas'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Filstorlek</p>
                  <p className="font-medium text-white">{(receipt.fileSize / 1024 / 1024).toFixed(1)} MB</p>
                </div>
                <div>
                  <p className="text-gray-400">Uppladdad</p>
                  <p className="font-medium text-white">{new Date(receipt.uploadedAt).toLocaleDateString('sv-SE')}</p>
                </div>
              </div>
              
              {receipt.extractedData && (
                <div className="mt-3 p-3 bg-gray-800 rounded">
                  <p className="text-sm font-medium text-white mb-1">Extraherad data:</p>
                  <div className="text-sm text-gray-300 space-y-1">
                    {receipt.extractedData.vendor && (
                      <p><span className="font-medium text-white">Leverantör:</span> {receipt.extractedData.vendor}</p>
                    )}
                    {receipt.extractedData.amount && (
                      <p><span className="font-medium text-white">Belopp:</span> {receipt.extractedData.amount} kr</p>
                    )}
                    {receipt.extractedData.date && (
                      <p><span className="font-medium text-white">Datum:</span> {new Date(receipt.extractedData.date).toLocaleDateString('sv-SE')}</p>
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