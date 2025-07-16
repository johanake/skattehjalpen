import { useState } from 'react';
import { trpc } from '../utils/trpc';

interface TaxDeclarationFormProps {
  onSuccess: (declarationId: string) => void;
}

export const TaxDeclarationForm: React.FC<TaxDeclarationFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    personalInfo: {
      name: '',
      personalNumber: '',
      maritalStatus: 'single' as const,
      childrenCount: '',
      municipality: '',
      livedAbroad: false,
    },
    employment: {
      hasEmployment: false,
      employerCount: '',
      hasSelfEmployment: false,
      hasPension: false,
      hasUnemploymentBenefit: false,
    },
    commute: {
      hasCommute: false,
      distance: '',
      transportMethod: '',
      savesTwoHours: false,
      hasParkingCosts: false,
      parkingCostPerMonth: '',
    },
    workEquipment: {
      computer: '',
      mobilePhone: '',
      internet: '',
      protectiveGear: '',
      tools: '',
      uniform: '',
      selfFunded: false,
    },
    housing: {
      propertyType: '',
      hasMortgage: false,
      mortgageInterest: '',
      soldProperty: false,
      propertyGainLoss: '',
      hadSellingCosts: false,
      hasDoubleResidence: false,
      secondResidenceCost: '',
      travelCostBetweenResidences: '',
    },
    rotRut: {
      hasRotWork: false,
      rotWorkType: '',
      rotAmount: '',
      hasRutWork: false,
      rutWorkType: '',
      rutAmount: '',
    },
    donations: {
      hasCharitableDonations: false,
      donationAmount: '',
      donationRecipient: '',
      hasUnionMembership: false,
      unionFee: '',
      hasUnemploymentInsurance: false,
      unemploymentInsuranceFee: '',
    },
    education: {
      hasStartedEducation: false,
      hasPaidForEducation: false,
      isJobRelevant: false,
    },
    rental: {
      hasRentalIncome: false,
      rentalIncome: '',
      hasRentalCosts: false,
      rentalCosts: '',
    },
    greenTech: {
      hasSolarPanels: false,
      solarPanelsCost: '',
      hasChargingStation: false,
      chargingStationCost: '',
      hasBatteryStorage: false,
      batteryStorageCost: '',
    },
    other: {
      description: '',
    },
  });

  const createDeclaration = trpc.tax.createDeclaration.useMutation({
    onSuccess: (data) => {
      onSuccess(data.id);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const processedData = formData;

    createDeclaration.mutate(processedData);
  };

  const handleSectionChange = (section: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], [field]: value }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Skattedeklaration</h2>
      
      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">👤 Personuppgifter</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Namn</label>
            <input
              type="text"
              value={formData.personalInfo.name}
              onChange={(e) => handleSectionChange('personalInfo', 'name', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Personnummer</label>
            <input
              type="text"
              value={formData.personalInfo.personalNumber}
              onChange={(e) => handleSectionChange('personalInfo', 'personalNumber', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
              placeholder="YYYYMMDD-XXXX"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Civilstånd</label>
            <select
              value={formData.personalInfo.maritalStatus}
              onChange={(e) => handleSectionChange('personalInfo', 'maritalStatus', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            >
              <option value="single">Ogift</option>
              <option value="married">Gift</option>
              <option value="cohabiting">Sambo</option>
              <option value="divorced">Skild</option>
              <option value="widowed">Änka/Änkling</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Antal hemmavarande barn</label>
            <input
              type="number"
              value={formData.personalInfo.childrenCount}
              onChange={(e) => handleSectionChange('personalInfo', 'childrenCount', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-200 mb-1">Kommun du är folkbokförd i</label>
            <input
              type="text"
              value={formData.personalInfo.municipality}
              onChange={(e) => handleSectionChange('personalInfo', 'municipality', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.personalInfo.livedAbroad}
                onChange={(e) => handleSectionChange('personalInfo', 'livedAbroad', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Har du bott utomlands under året?</span>
            </label>
          </div>
        </div>
      </div>

      {/* Employment */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">💼 Arbetsliv och Inkomst</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.employment.hasEmployment}
                onChange={(e) => handleSectionChange('employment', 'hasEmployment', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Har du haft en eller flera anställningar under året?</span>
            </label>
            {formData.employment.hasEmployment && (
              <input
                type="number"
                value={formData.employment.employerCount}
                onChange={(e) => handleSectionChange('employment', 'employerCount', e.target.value)}
                placeholder="Antal arbetsgivare"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.employment.hasSelfEmployment}
                onChange={(e) => handleSectionChange('employment', 'hasSelfEmployment', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Inkomst från eget företag</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.employment.hasPension}
                onChange={(e) => handleSectionChange('employment', 'hasPension', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Inkomst från pension</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.employment.hasUnemploymentBenefit}
                onChange={(e) => handleSectionChange('employment', 'hasUnemploymentBenefit', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">A-kassa eller sjukersättning</span>
            </label>
          </div>
        </div>
      </div>

      {/* Commute */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">🚗 Resor till och från arbetet</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.commute.hasCommute}
                onChange={(e) => handleSectionChange('commute', 'hasCommute', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Har du pendlat till jobbet minst 5 km enkel väg?</span>
            </label>
            {formData.commute.hasCommute && (
              <input
                type="number"
                value={formData.commute.distance}
                onChange={(e) => handleSectionChange('commute', 'distance', e.target.value)}
                placeholder="Enkel resa i km"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
          {formData.commute.hasCommute && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Färdmedel</label>
                <select
                  value={formData.commute.transportMethod}
                  onChange={(e) => handleSectionChange('commute', 'transportMethod', e.target.value)}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Välj färdmedel</option>
                  <option value="car">Bil</option>
                  <option value="public">Kollektivtrafik</option>
                  <option value="bike">Cykel</option>
                  <option value="moped">Moped</option>
                  <option value="walk">Gång</option>
                </select>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.commute.savesTwoHours}
                    onChange={(e) => handleSectionChange('commute', 'savesTwoHours', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-200">Sparar 2h/dag med bil</span>
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.commute.hasParkingCosts}
                    onChange={(e) => handleSectionChange('commute', 'hasParkingCosts', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-200">Parkering vid jobbet</span>
                </label>
                {formData.commute.hasParkingCosts && (
                  <input
                    type="number"
                    value={formData.commute.parkingCostPerMonth}
                    onChange={(e) => handleSectionChange('commute', 'parkingCostPerMonth', e.target.value)}
                    placeholder="Kostnad per månad (kr)"
                    className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Work Equipment */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">🧰 Arbetsutrustning och skyddsutrustning</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Dator/mjukvara (kr)</label>
            <input
              type="number"
              value={formData.workEquipment.computer}
              onChange={(e) => handleSectionChange('workEquipment', 'computer', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Mobiltelefon/surfplatta (kr)</label>
            <input
              type="number"
              value={formData.workEquipment.mobilePhone}
              onChange={(e) => handleSectionChange('workEquipment', 'mobilePhone', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Internetkostnad (kr)</label>
            <input
              type="number"
              value={formData.workEquipment.internet}
              onChange={(e) => handleSectionChange('workEquipment', 'internet', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Skyddsskor/skyddskläder (kr)</label>
            <input
              type="number"
              value={formData.workEquipment.protectiveGear}
              onChange={(e) => handleSectionChange('workEquipment', 'protectiveGear', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Verktyg (kr)</label>
            <input
              type="number"
              value={formData.workEquipment.tools}
              onChange={(e) => handleSectionChange('workEquipment', 'tools', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Uniform/yrkesklädsel (kr)</label>
            <input
              type="number"
              value={formData.workEquipment.uniform}
              onChange={(e) => handleSectionChange('workEquipment', 'uniform', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.workEquipment.selfFunded}
                onChange={(e) => handleSectionChange('workEquipment', 'selfFunded', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Har du bekostat detta själv utan ersättning?</span>
            </label>
          </div>
        </div>
      </div>

      {/* Housing */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">🏡 Bostad och bolån</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Bor du i</label>
            <select
              value={formData.housing.propertyType}
              onChange={(e) => handleSectionChange('housing', 'propertyType', e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            >
              <option value="">Välj bostadstyp</option>
              <option value="rental">Hyresrätt</option>
              <option value="coop">Bostadsrätt</option>
              <option value="house">Villa</option>
              <option value="vacation">Fritidshus</option>
            </select>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.housing.hasMortgage}
                onChange={(e) => handleSectionChange('housing', 'hasMortgage', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Har bolån</span>
            </label>
            {formData.housing.hasMortgage && (
              <input
                type="number"
                value={formData.housing.mortgageInterest}
                onChange={(e) => handleSectionChange('housing', 'mortgageInterest', e.target.value)}
                placeholder="Räntekostnader (kr)"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.housing.soldProperty}
                onChange={(e) => handleSectionChange('housing', 'soldProperty', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Har sålt bostad under året</span>
            </label>
            {formData.housing.soldProperty && (
              <>
                <input
                  type="number"
                  value={formData.housing.propertyGainLoss}
                  onChange={(e) => handleSectionChange('housing', 'propertyGainLoss', e.target.value)}
                  placeholder="Vinst/förlust (kr)"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
                />
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    checked={formData.housing.hadSellingCosts}
                    onChange={(e) => handleSectionChange('housing', 'hadSellingCosts', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-200">Mäklare/styling/renovering</span>
                </label>
              </>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.housing.hasDoubleResidence}
                onChange={(e) => handleSectionChange('housing', 'hasDoubleResidence', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Dubbelt boende p.g.a. arbete</span>
            </label>
            {formData.housing.hasDoubleResidence && (
              <>
                <input
                  type="number"
                  value={formData.housing.secondResidenceCost}
                  onChange={(e) => handleSectionChange('housing', 'secondResidenceCost', e.target.value)}
                  placeholder="Hyra för andra bostaden (kr/mån)"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
                />
                <input
                  type="number"
                  value={formData.housing.travelCostBetweenResidences}
                  onChange={(e) => handleSectionChange('housing', 'travelCostBetweenResidences', e.target.value)}
                  placeholder="Resor mellan orterna (kr)"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ROT/RUT */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">🧾 ROT- och RUT-avdrag</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.rotRut.hasRotWork}
                onChange={(e) => handleSectionChange('rotRut', 'hasRotWork', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">ROT (renovering/ombyggnad)</span>
            </label>
            {formData.rotRut.hasRotWork && (
              <>
                <input
                  type="text"
                  value={formData.rotRut.rotWorkType}
                  onChange={(e) => handleSectionChange('rotRut', 'rotWorkType', e.target.value)}
                  placeholder="Typ av arbete"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
                />
                <input
                  type="number"
                  value={formData.rotRut.rotAmount}
                  onChange={(e) => handleSectionChange('rotRut', 'rotAmount', e.target.value)}
                  placeholder="Belopp (kr)"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
                />
              </>
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.rotRut.hasRutWork}
                onChange={(e) => handleSectionChange('rotRut', 'hasRutWork', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">RUT (städning/barnpassning)</span>
            </label>
            {formData.rotRut.hasRutWork && (
              <>
                <input
                  type="text"
                  value={formData.rotRut.rutWorkType}
                  onChange={(e) => handleSectionChange('rotRut', 'rutWorkType', e.target.value)}
                  placeholder="Typ av tjänst"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
                />
                <input
                  type="number"
                  value={formData.rotRut.rutAmount}
                  onChange={(e) => handleSectionChange('rotRut', 'rutAmount', e.target.value)}
                  placeholder="Belopp (kr)"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Donations and Memberships */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">🎁 Gåvor och bidrag</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.donations.hasCharitableDonations}
                onChange={(e) => handleSectionChange('donations', 'hasCharitableDonations', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Gåvor till välgörenhet (minst 2000 kr)</span>
            </label>
            {formData.donations.hasCharitableDonations && (
              <>
                <input
                  type="number"
                  value={formData.donations.donationAmount}
                  onChange={(e) => handleSectionChange('donations', 'donationAmount', e.target.value)}
                  placeholder="Total gåvosumma (kr)"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
                />
                <input
                  type="text"
                  value={formData.donations.donationRecipient}
                  onChange={(e) => handleSectionChange('donations', 'donationRecipient', e.target.value)}
                  placeholder="Mottagare"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
                />
              </>
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.donations.hasUnemploymentInsurance}
                onChange={(e) => handleSectionChange('donations', 'hasUnemploymentInsurance', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">A-kassa medlemskap</span>
            </label>
            {formData.donations.hasUnemploymentInsurance && (
              <input
                type="number"
                value={formData.donations.unemploymentInsuranceFee}
                onChange={(e) => handleSectionChange('donations', 'unemploymentInsuranceFee', e.target.value)}
                placeholder="Årsavgift (kr)"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.donations.hasUnionMembership}
                onChange={(e) => handleSectionChange('donations', 'hasUnionMembership', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Fackföreningsavgift</span>
            </label>
            {formData.donations.hasUnionMembership && (
              <input
                type="number"
                value={formData.donations.unionFee}
                onChange={(e) => handleSectionChange('donations', 'unionFee', e.target.value)}
                placeholder="Årsavgift (kr)"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">📚 Studier och utbildning</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.education.hasStartedEducation}
                onChange={(e) => handleSectionChange('education', 'hasStartedEducation', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Påbörjat ny utbildning</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.education.hasPaidForEducation}
                onChange={(e) => handleSectionChange('education', 'hasPaidForEducation', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Köpt kurslitteratur/avgifter</span>
            </label>
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.education.isJobRelevant}
                onChange={(e) => handleSectionChange('education', 'isJobRelevant', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Utbildning relevant för nuvarande/framtida yrke</span>
            </label>
          </div>
        </div>
      </div>

      {/* Rental Income */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">📦 Uthyrning och sidoinkomster</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.rental.hasRentalIncome}
                onChange={(e) => handleSectionChange('rental', 'hasRentalIncome', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Hyrt ut bostad, bil, förråd eller liknande</span>
            </label>
            {formData.rental.hasRentalIncome && (
              <>
                <input
                  type="number"
                  value={formData.rental.rentalIncome}
                  onChange={(e) => handleSectionChange('rental', 'rentalIncome', e.target.value)}
                  placeholder="Intäkter (kr)"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
                />
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    checked={formData.rental.hasRentalCosts}
                    onChange={(e) => handleSectionChange('rental', 'hasRentalCosts', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-200">Kostnader för uthyrning</span>
                </label>
                {formData.rental.hasRentalCosts && (
                  <input
                    type="number"
                    value={formData.rental.rentalCosts}
                    onChange={(e) => handleSectionChange('rental', 'rentalCosts', e.target.value)}
                    placeholder="Kostnader (kr)"
                    className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Green Technology */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">♻️ Grön teknik och energiinvesteringar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.greenTech.hasSolarPanels}
                onChange={(e) => handleSectionChange('greenTech', 'hasSolarPanels', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Solceller</span>
            </label>
            {formData.greenTech.hasSolarPanels && (
              <input
                type="number"
                value={formData.greenTech.solarPanelsCost}
                onChange={(e) => handleSectionChange('greenTech', 'solarPanelsCost', e.target.value)}
                placeholder="Kostnad (kr)"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.greenTech.hasChargingStation}
                onChange={(e) => handleSectionChange('greenTech', 'hasChargingStation', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Laddbox till elbil</span>
            </label>
            {formData.greenTech.hasChargingStation && (
              <input
                type="number"
                value={formData.greenTech.chargingStationCost}
                onChange={(e) => handleSectionChange('greenTech', 'chargingStationCost', e.target.value)}
                placeholder="Kostnad (kr)"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.greenTech.hasBatteryStorage}
                onChange={(e) => handleSectionChange('greenTech', 'hasBatteryStorage', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-200">Batterilagring</span>
            </label>
            {formData.greenTech.hasBatteryStorage && (
              <input
                type="number"
                value={formData.greenTech.batteryStorageCost}
                onChange={(e) => handleSectionChange('greenTech', 'batteryStorageCost', e.target.value)}
                placeholder="Kostnad (kr)"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
        </div>
      </div>

      {/* Other */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">📍 Övrigt att ta upp</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Andra utgifter eller livssituationer</label>
            <textarea
              value={formData.other.description}
              onChange={(e) => handleSectionChange('other', 'description', e.target.value)}
              placeholder="Beskriv kortfattat andra utgifter som kan påverka din deklaration (flytt, vårdkostnader, juridiska tvister, handikapp, arbetslöshet)..."
              rows={3}
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