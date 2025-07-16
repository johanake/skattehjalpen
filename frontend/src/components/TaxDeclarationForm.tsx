import { useState } from 'react';
import { trpc } from '../utils/trpc';

interface TaxDeclarationFormProps {
  onSuccess: (declarationId: string) => void;
}

export const TaxDeclarationForm: React.FC<TaxDeclarationFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    income: {
      salary: '',
      freelance: '',
      investment: '',
      other: '',
    },
    currentDeductions: {
      workRelated: '',
      homeOffice: '',
      travel: '',
      education: '',
      charitable: '',
      other: '',
    },
    personalInfo: {
      name: '',
      personalNumber: '',
      address: '',
      maritalStatus: 'single' as const,
      hasChildren: false,
      childrenCount: '',
    },
  });

  const createDeclaration = trpc.tax.createDeclaration.useMutation({
    onSuccess: (data) => {
      onSuccess(data.id);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const processedData = {
      ...formData,
      income: {
        salary: formData.income.salary ? parseFloat(formData.income.salary) : undefined,
        freelance: formData.income.freelance ? parseFloat(formData.income.freelance) : undefined,
        investment: formData.income.investment ? parseFloat(formData.income.investment) : undefined,
        other: formData.income.other ? parseFloat(formData.income.other) : undefined,
      },
      currentDeductions: {
        workRelated: formData.currentDeductions.workRelated ? parseFloat(formData.currentDeductions.workRelated) : undefined,
        homeOffice: formData.currentDeductions.homeOffice ? parseFloat(formData.currentDeductions.homeOffice) : undefined,
        travel: formData.currentDeductions.travel ? parseFloat(formData.currentDeductions.travel) : undefined,
        education: formData.currentDeductions.education ? parseFloat(formData.currentDeductions.education) : undefined,
        charitable: formData.currentDeductions.charitable ? parseFloat(formData.currentDeductions.charitable) : undefined,
        other: formData.currentDeductions.other ? parseFloat(formData.currentDeductions.other) : undefined,
      },
      personalInfo: {
        ...formData.personalInfo,
        childrenCount: formData.personalInfo.childrenCount ? parseInt(formData.personalInfo.childrenCount) : undefined,
      },
    };

    createDeclaration.mutate(processedData);
  };

  const handleIncomeChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      income: { ...prev.income, [field]: value }
    }));
  };

  const handleDeductionsChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      currentDeductions: { ...prev.currentDeductions, [field]: value }
    }));
  };

  const handlePersonalInfoChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Skattedeklaration</h2>
      
      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">Personuppgifter</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Fullständigt namn</label>
            <input
              type="text"
              value={formData.personalInfo.name}
              onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Personnummer</label>
            <input
              type="text"
              value={formData.personalInfo.personalNumber}
              onChange={(e) => handlePersonalInfoChange('personalNumber', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
              placeholder="YYYYMMDD-XXXX"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-200 mb-1">Adress</label>
            <input
              type="text"
              value={formData.personalInfo.address}
              onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Civilstånd</label>
            <select
              value={formData.personalInfo.maritalStatus}
              onChange={(e) => handlePersonalInfoChange('maritalStatus', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            >
              <option value="single">Ogift</option>
              <option value="married">Gift</option>
              <option value="divorced">Skild</option>
              <option value="widowed">Änka/Änkling</option>
            </select>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.personalInfo.hasChildren}
                onChange={(e) => handlePersonalInfoChange('hasChildren', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Har barn</span>
            </label>
            {formData.personalInfo.hasChildren && (
              <input
                type="number"
                value={formData.personalInfo.childrenCount}
                onChange={(e) => handlePersonalInfoChange('childrenCount', e.target.value)}
                placeholder="Antal barn"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
        </div>
      </div>

      {/* Income */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">Inkomster ({formData.year})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Lön (kr)</label>
            <input
              type="number"
              value={formData.income.salary}
              onChange={(e) => handleIncomeChange('salary', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Frilansintäkter (kr)</label>
            <input
              type="number"
              value={formData.income.freelance}
              onChange={(e) => handleIncomeChange('freelance', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Kapitalinkomster (kr)</label>
            <input
              type="number"
              value={formData.income.investment}
              onChange={(e) => handleIncomeChange('investment', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Övriga inkomster (kr)</label>
            <input
              type="number"
              value={formData.income.other}
              onChange={(e) => handleIncomeChange('other', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Current Deductions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">Nuvarande avdrag</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Arbetsrelaterat (kr)</label>
            <input
              type="number"
              value={formData.currentDeductions.workRelated}
              onChange={(e) => handleDeductionsChange('workRelated', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Hemmakontor (kr)</label>
            <input
              type="number"
              value={formData.currentDeductions.homeOffice}
              onChange={(e) => handleDeductionsChange('homeOffice', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Resor (kr)</label>
            <input
              type="number"
              value={formData.currentDeductions.travel}
              onChange={(e) => handleDeductionsChange('travel', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Utbildning (kr)</label>
            <input
              type="number"
              value={formData.currentDeductions.education}
              onChange={(e) => handleDeductionsChange('education', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Välgörenhet (kr)</label>
            <input
              type="number"
              value={formData.currentDeductions.charitable}
              onChange={(e) => handleDeductionsChange('charitable', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Övrigt (kr)</label>
            <input
              type="number"
              value={formData.currentDeductions.other}
              onChange={(e) => handleDeductionsChange('other', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={createDeclaration.isLoading}
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {createDeclaration.isLoading ? 'Skapar...' : 'Skapa skattedeklaration'}
      </button>

      {createDeclaration.error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Fel: {createDeclaration.error.message}
        </div>
      )}
    </form>
  );
};