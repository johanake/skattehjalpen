import { useState } from 'react';

interface ReceiptUploadProps {
  declarationId: string;
  onUploadSuccess: () => void;
}

export const ReceiptUpload: React.FC<ReceiptUploadProps> = ({ declarationId, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category: 'work',
    amount: '',
    description: '',
    date: '',
  });

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    const form = e.target as HTMLFormElement;
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      setError('Please select a file');
      setUploading(false);
      return;
    }

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('declarationId', declarationId);
    uploadData.append('category', formData.category);
    if (formData.amount) uploadData.append('amount', formData.amount);
    if (formData.description) uploadData.append('description', formData.description);
    if (formData.date) uploadData.append('date', formData.date);

    try {
      const response = await fetch('http://localhost:3001/api/upload-receipt', {
        method: 'POST',
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      console.log('Upload successful:', result);
      
      // Reset form
      form.reset();
      setFormData({
        category: 'work',
        amount: '',
        description: '',
        date: '',
      });
      
      onUploadSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-bg-white p-6 rounded-lg shadow-lg border border-border-light">
      <h3 className="text-lg font-semibold mb-4 text-text-primary">Ladda upp kvitto</h3>
      
      <form onSubmit={handleFileUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Kvittofil (PDF, PNG, JPG)
          </label>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            required
            className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Kategori</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent"
          >
            <option value="work">Arbetsrelaterat</option>
            <option value="home">Hemmakontor</option>
            <option value="travel">Resor</option>
            <option value="education">Utbildning</option>
            <option value="charity">Välgörenhet</option>
            <option value="medical">Medicinskt</option>
            <option value="other">Övrigt</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Belopp (kr)</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Datum</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Beskrivning</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent"
            placeholder="Beskriv vad köpet gällde..."
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? 'Laddar upp...' : 'Ladda upp kvitto'}
        </button>

        {error && (
          <div className="p-3 bg-danger-light border border-danger text-danger rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};