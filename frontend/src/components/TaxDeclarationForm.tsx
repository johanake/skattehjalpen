import { useState } from "react";
import { trpc } from "../utils/trpc";
import type { CreateTaxDeclarationInput } from "../../../backend/src/validators/taxValidators";

interface TaxDeclarationFormProps {
  onSuccess: (declarationId: string) => void;
}

export const TaxDeclarationForm: React.FC<TaxDeclarationFormProps> = ({
  onSuccess,
}) => {
  const [formData, setFormData] = useState<CreateTaxDeclarationInput>({
    year: new Date().getFullYear(),
    personalInfo: {
      name: "",
      personalNumber: "",
      maritalStatus: "single" as const,
      childrenCount: "",
      municipality: "",
      livedAbroad: false,
    },
    employment: {
      hasEmployment: false,
      employerCount: "",
      hasSelfEmployment: false,
      hasPension: false,
      hasUnemploymentBenefit: false,
    },
    commute: {
      hasCommute: false,
      distance: "",
      transportMethod: "",
      savesTwoHours: false,
      hasParkingCosts: false,
      parkingCostPerMonth: "",
    },
    workEquipment: {
      hasWorkEquipment: false,
      computer: "",
      mobilePhone: "",
      internet: "",
      protectiveGear: "",
      tools: "",
      uniform: "",
      selfFunded: false,
    },
    housing: {
      propertyType: "",
      hasMortgage: false,
      mortgageInterest: "",
      soldProperty: false,
      propertyGainLoss: "",
      hadSellingCosts: false,
      hasDoubleResidence: false,
      secondResidenceCost: "",
      travelCostBetweenResidences: "",
    },
    rotRut: {
      hasRotRutWork: false,
      hasRotWork: false,
      rotWorkType: "",
      rotAmount: "",
      hasRutWork: false,
      rutWorkType: "",
      rutAmount: "",
    },
    businessTravel: {
      hasBusinessTravel: false,
      businessTravelDays: "",
      businessTravelCost: "",
      hasPerDiem: false,
      perDiemAmount: "",
      hasAccommodationCosts: false,
      accommodationCost: "",
    },
    temporaryWork: {
      hasTemporaryWork: false,
      temporaryWorkLocation: "",
      temporaryWorkDistance: "",
      temporaryWorkDuration: "",
      temporaryWorkAccommodationCost: "",
      temporaryWorkPerDiem: "",
    },
    homeOffice: {
      hasHomeOffice: false,
      homeOfficeArea: "",
      homeOfficeHeatingCost: "",
      homeOfficeElectricityCost: "",
      homeOfficeOnlyForWork: false,
      employerProvidesOffice: false,
    },
    professionalServices: {
      hasLegalCosts: false,
      legalCostsAmount: "",
      legalCostsDescription: "",
      hasProfessionalFees: false,
      professionalFeesAmount: "",
      professionalFeesDescription: "",
      hasAgentCosts: false,
      agentCostsAmount: "",
    },
    professionalLiterature: {
      hasProfessionalLiterature: false,
      literatureCost: "",
      literatureDescription: "",
      hasJobRelatedEducation: false,
      educationCost: "",
      educationDescription: "",
    },
    specificProfessions: {
      isArtistOrAthlete: false,
      artistAthleteEquipmentCost: "",
      useSchablonAmount: false,
      hasServiceDog: false,
      serviceDogMonths: "",
      isDaycareProfessional: false,
      daycareChildren: "",
    },
    capitalTransactions: {
      hasCapitalLosses: false,
      capitalLossesAmount: "",
      capitalLossesDescription: "",
      hasCurrencyLosses: false,
      currencyLossesAmount: "",
      hasInvestmentInterest: false,
      investmentInterestAmount: "",
      loanHasCollateral: false,
    },
    pensionContributions: {
      hasPensionContributions: false,
      pensionContributionsAmount: "",
      hasEmployerPension: false,
      employmentIncome: "",
    },
    hobbyBusiness: {
      hasHobbyBusiness: false,
      hobbyBusinessIncome: "",
      hobbyBusinessExpenses: "",
      hobbyBusinessPreviousLosses: "",
    },
    jobSearchCosts: {
      hasJobSearchCosts: false,
      jobSearchTravelCost: "",
      jobSearchCommunicationCost: "",
      jobSearchDocumentCost: "",
      receivedUnemploymentBenefit: false,
    },
    donations: {
      hasCharitableDonations: false,
      donationAmount: "",
      donationRecipient: "",
      hasUnionMembership: false,
      unionFee: "",
      hasUnemploymentInsurance: false,
      unemploymentInsuranceFee: "",
    },
    education: {
      hasStartedEducation: false,
      hasPaidForEducation: false,
      isJobRelevant: false,
    },
    rental: {
      hasRentalIncome: false,
      rentalIncome: "",
      hasRentalCosts: false,
      rentalCosts: "",
    },
    greenTech: {
      hasGreenTech: false,
      hasSolarPanels: false,
      solarPanelsCost: "",
      hasChargingStation: false,
      chargingStationCost: "",
      hasBatteryStorage: false,
      batteryStorageCost: "",
    },
    other: {
      description: "",
    },
  });

  const createDeclaration = trpc.tax.createDeclaration.useMutation({
    onSuccess: (data) => {
      onSuccess(data.id);
      // Navigate to analysis page after successful submission
      window.location.href = '/skatt/inkomstdeklaration/analys';
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const processedData = formData;
    console.log("processedData", processedData);

    createDeclaration.mutate(processedData);
  };

  const handleSectionChange = (
    section: keyof CreateTaxDeclarationInput,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(typeof prev[section] === "object"
          ? (prev[section] as Record<string, string | boolean>)
          : {}),
        [field]: value,
      },
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-bg-white rounded-lg shadow-lg border border-border-light"
    >
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Skattedeklaration
      </h2>

      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          👤 Personuppgifter
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Namn
            </label>
            <input
              type="text"
              value={formData.personalInfo.name}
              onChange={(e) =>
                handleSectionChange("personalInfo", "name", e.target.value)
              }
              className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Personnummer
            </label>
            <input
              type="text"
              value={formData.personalInfo.personalNumber}
              onChange={(e) =>
                handleSectionChange(
                  "personalInfo",
                  "personalNumber",
                  e.target.value
                )
              }
              className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="YYYYMMDD-XXXX"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Civilstånd
            </label>
            <select
              value={formData.personalInfo.maritalStatus}
              onChange={(e) =>
                handleSectionChange(
                  "personalInfo",
                  "maritalStatus",
                  e.target.value
                )
              }
              className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
            >
              <option value="single">Ogift</option>
              <option value="married">Gift</option>
              <option value="cohabiting">Sambo</option>
              <option value="divorced">Skild</option>
              <option value="widowed">Änka/Änkling</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Antal hemmavarande barn
            </label>
            <input
              type="number"
              value={formData.personalInfo.childrenCount}
              onChange={(e) =>
                handleSectionChange(
                  "personalInfo",
                  "childrenCount",
                  e.target.value
                )
              }
              className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Kommun du är folkbokförd i
            </label>
            <input
              type="text"
              value={formData.personalInfo.municipality}
              onChange={(e) =>
                handleSectionChange(
                  "personalInfo",
                  "municipality",
                  e.target.value
                )
              }
              className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.personalInfo.livedAbroad}
                onChange={(e) =>
                  handleSectionChange(
                    "personalInfo",
                    "livedAbroad",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Har du bott utomlands under året?
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Employment */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          💼 Arbetsliv och Inkomst
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.employment.hasEmployment}
                onChange={(e) =>
                  handleSectionChange(
                    "employment",
                    "hasEmployment",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Har du haft en eller flera anställningar under året?
              </span>
            </label>
            {formData.employment.hasEmployment && (
              <input
                type="number"
                value={formData.employment.employerCount}
                onChange={(e) =>
                  handleSectionChange(
                    "employment",
                    "employerCount",
                    e.target.value
                  )
                }
                placeholder="Antal arbetsgivare"
                className="w-full p-2 border border-gray-600 rounded bg-bg-primarytext-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.employment.hasSelfEmployment}
                onChange={(e) =>
                  handleSectionChange(
                    "employment",
                    "hasSelfEmployment",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Inkomst från eget företag
              </span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.employment.hasPension}
                onChange={(e) =>
                  handleSectionChange(
                    "employment",
                    "hasPension",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Inkomst från pension
              </span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.employment.hasUnemploymentBenefit}
                onChange={(e) =>
                  handleSectionChange(
                    "employment",
                    "hasUnemploymentBenefit",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                A-kassa eller sjukersättning
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Commute */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          🚗 Resor till och från arbetet
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.commute.hasCommute}
                onChange={(e) =>
                  handleSectionChange("commute", "hasCommute", e.target.checked)
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Har du pendlat till jobbet minst 5 km enkel väg?
              </span>
            </label>
            {formData.commute.hasCommute && (
              <input
                type="number"
                value={formData.commute.distance}
                onChange={(e) =>
                  handleSectionChange("commute", "distance", e.target.value)
                }
                placeholder="Enkel resa i km"
                className="w-full p-2 border border-gray-600 rounded bg-bg-primarytext-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
          {formData.commute.hasCommute && (
            <>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Färdmedel
                </label>
                <select
                  value={formData.commute.transportMethod}
                  onChange={(e) =>
                    handleSectionChange(
                      "commute",
                      "transportMethod",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
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
                    onChange={(e) =>
                      handleSectionChange(
                        "commute",
                        "savesTwoHours",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    Sparar 2h/dag med bil
                  </span>
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.commute.hasParkingCosts}
                    onChange={(e) =>
                      handleSectionChange(
                        "commute",
                        "hasParkingCosts",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    Parkering vid jobbet
                  </span>
                </label>
                {formData.commute.hasParkingCosts && (
                  <input
                    type="number"
                    value={formData.commute.parkingCostPerMonth}
                    onChange={(e) =>
                      handleSectionChange(
                        "commute",
                        "parkingCostPerMonth",
                        e.target.value
                      )
                    }
                    placeholder="Kostnad per månad (kr)"
                    className="w-full p-2 border border-gray-600 rounded bg-bg-primarytext-white focus:ring-2 focus:ring-green-500 mt-2"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Work Equipment */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          🧰 Arbetsutrustning och skyddsutrustning
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.workEquipment.hasWorkEquipment}
                onChange={(e) =>
                  handleSectionChange(
                    "workEquipment",
                    "hasWorkEquipment",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Har du köpt arbetsutrustning eller skyddsutrustning som du
                betalat själv?
              </span>
            </label>
          </div>
          {formData.workEquipment.hasWorkEquipment && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-bg-secondary rounded-lg border border-border-light">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Dator/mjukvara (kr)
                </label>
                <input
                  type="number"
                  value={formData.workEquipment.computer}
                  onChange={(e) =>
                    handleSectionChange(
                      "workEquipment",
                      "computer",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Mobiltelefon/surfplatta (kr)
                </label>
                <input
                  type="number"
                  value={formData.workEquipment.mobilePhone}
                  onChange={(e) =>
                    handleSectionChange(
                      "workEquipment",
                      "mobilePhone",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Internetkostnad (kr)
                </label>
                <input
                  type="number"
                  value={formData.workEquipment.internet}
                  onChange={(e) =>
                    handleSectionChange(
                      "workEquipment",
                      "internet",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Skyddsskor/skyddskläder (kr)
                </label>
                <input
                  type="number"
                  value={formData.workEquipment.protectiveGear}
                  onChange={(e) =>
                    handleSectionChange(
                      "workEquipment",
                      "protectiveGear",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Verktyg (kr)
                </label>
                <input
                  type="number"
                  value={formData.workEquipment.tools}
                  onChange={(e) =>
                    handleSectionChange(
                      "workEquipment",
                      "tools",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Uniform/yrkesklädsel (kr)
                </label>
                <input
                  type="number"
                  value={formData.workEquipment.uniform}
                  onChange={(e) =>
                    handleSectionChange(
                      "workEquipment",
                      "uniform",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.workEquipment.selfFunded}
                    onChange={(e) =>
                      handleSectionChange(
                        "workEquipment",
                        "selfFunded",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    Har du bekostat detta själv utan ersättning från
                    arbetsgivaren?
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Housing */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          🏡 Bostad och bolån
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Bor du i
            </label>
            <select
              value={formData.housing.propertyType}
              onChange={(e) =>
                handleSectionChange("housing", "propertyType", e.target.value)
              }
              className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
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
                onChange={(e) =>
                  handleSectionChange(
                    "housing",
                    "hasMortgage",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Har bolån
              </span>
            </label>
            {formData.housing.hasMortgage && (
              <input
                type="number"
                value={formData.housing.mortgageInterest}
                onChange={(e) =>
                  handleSectionChange(
                    "housing",
                    "mortgageInterest",
                    e.target.value
                  )
                }
                placeholder="Räntekostnader (kr)"
                className="w-full p-2 border border-gray-600 rounded bg-bg-primarytext-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.housing.soldProperty}
                onChange={(e) =>
                  handleSectionChange(
                    "housing",
                    "soldProperty",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Har sålt bostad under året
              </span>
            </label>
            {formData.housing.soldProperty && (
              <>
                <input
                  type="number"
                  value={formData.housing.propertyGainLoss}
                  onChange={(e) =>
                    handleSectionChange(
                      "housing",
                      "propertyGainLoss",
                      e.target.value
                    )
                  }
                  placeholder="Vinst/förlust (kr)"
                  className="w-full p-2 border border-gray-600 rounded bg-bg-primarytext-white focus:ring-2 focus:ring-green-500 mt-2"
                />
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    checked={formData.housing.hadSellingCosts}
                    onChange={(e) =>
                      handleSectionChange(
                        "housing",
                        "hadSellingCosts",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    Mäklare/styling/renovering
                  </span>
                </label>
              </>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.housing.hasDoubleResidence}
                onChange={(e) =>
                  handleSectionChange(
                    "housing",
                    "hasDoubleResidence",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Dubbelt boende p.g.a. arbete
              </span>
            </label>
            {formData.housing.hasDoubleResidence && (
              <>
                <input
                  type="number"
                  value={formData.housing.secondResidenceCost}
                  onChange={(e) =>
                    handleSectionChange(
                      "housing",
                      "secondResidenceCost",
                      e.target.value
                    )
                  }
                  placeholder="Hyra för andra bostaden (kr/mån)"
                  className="w-full p-2 border border-gray-600 rounded bg-bg-primarytext-white focus:ring-2 focus:ring-green-500 mt-2"
                />
                <input
                  type="number"
                  value={formData.housing.travelCostBetweenResidences}
                  onChange={(e) =>
                    handleSectionChange(
                      "housing",
                      "travelCostBetweenResidences",
                      e.target.value
                    )
                  }
                  placeholder="Resor mellan orterna (kr)"
                  className="w-full p-2 border border-gray-600 rounded bg-bg-primarytext-white focus:ring-2 focus:ring-green-500 mt-2"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Business Travel */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          ✈️ Tjänsteresor
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.businessTravel.hasBusinessTravel}
                onChange={(e) =>
                  handleSectionChange(
                    "businessTravel",
                    "hasBusinessTravel",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Haft tjänsteresor under året (deklarationspunkt 2.2)
              </span>
            </label>
            {formData.businessTravel.hasBusinessTravel && (
              <>
                <input
                  type="number"
                  value={formData.businessTravel.businessTravelDays}
                  onChange={(e) =>
                    handleSectionChange(
                      "businessTravel",
                      "businessTravelDays",
                      e.target.value
                    )
                  }
                  placeholder="Antal dagar"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
                <input
                  type="number"
                  value={formData.businessTravel.businessTravelCost}
                  onChange={(e) =>
                    handleSectionChange(
                      "businessTravel",
                      "businessTravelCost",
                      e.target.value
                    )
                  }
                  placeholder="Resekostnader (kr)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
              </>
            )}
          </div>
          {formData.businessTravel.hasBusinessTravel && (
            <>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.businessTravel.hasPerDiem}
                    onChange={(e) =>
                      handleSectionChange(
                        "businessTravel",
                        "hasPerDiem",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    Traktamente (290 kr/dag)
                  </span>
                </label>
                {formData.businessTravel.hasPerDiem && (
                  <input
                    type="number"
                    value={formData.businessTravel.perDiemAmount}
                    onChange={(e) =>
                      handleSectionChange(
                        "businessTravel",
                        "perDiemAmount",
                        e.target.value
                      )
                    }
                    placeholder="Belopp (kr)"
                    className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                  />
                )}
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.businessTravel.hasAccommodationCosts}
                    onChange={(e) =>
                      handleSectionChange(
                        "businessTravel",
                        "hasAccommodationCosts",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    Logikostnader
                  </span>
                </label>
                {formData.businessTravel.hasAccommodationCosts && (
                  <input
                    type="number"
                    value={formData.businessTravel.accommodationCost}
                    onChange={(e) =>
                      handleSectionChange(
                        "businessTravel",
                        "accommodationCost",
                        e.target.value
                      )
                    }
                    placeholder="Kostnad (kr)"
                    className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Temporary Work */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          🏗️ Tillfälligt arbete på annan ort
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.temporaryWork.hasTemporaryWork}
                onChange={(e) =>
                  handleSectionChange(
                    "temporaryWork",
                    "hasTemporaryWork",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Tillfälligt arbete &gt;50 km från hemorten (deklarationspunkt
                2.3)
              </span>
            </label>
            {formData.temporaryWork.hasTemporaryWork && (
              <>
                <input
                  type="text"
                  value={formData.temporaryWork.temporaryWorkLocation}
                  onChange={(e) =>
                    handleSectionChange(
                      "temporaryWork",
                      "temporaryWorkLocation",
                      e.target.value
                    )
                  }
                  placeholder="Arbetsort"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
                <input
                  type="number"
                  value={formData.temporaryWork.temporaryWorkDistance}
                  onChange={(e) =>
                    handleSectionChange(
                      "temporaryWork",
                      "temporaryWorkDistance",
                      e.target.value
                    )
                  }
                  placeholder="Avstånd från hemorten (km)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
                <input
                  type="text"
                  value={formData.temporaryWork.temporaryWorkDuration}
                  onChange={(e) =>
                    handleSectionChange(
                      "temporaryWork",
                      "temporaryWorkDuration",
                      e.target.value
                    )
                  }
                  placeholder="Tidsperiod (ex. 6 månader)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
              </>
            )}
          </div>
          {formData.temporaryWork.hasTemporaryWork && (
            <>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Boendekostnader (kr)
                </label>
                <input
                  type="number"
                  value={formData.temporaryWork.temporaryWorkAccommodationCost}
                  onChange={(e) =>
                    handleSectionChange(
                      "temporaryWork",
                      "temporaryWorkAccommodationCost",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Traktamente (kr)
                </label>
                <input
                  type="number"
                  value={formData.temporaryWork.temporaryWorkPerDiem}
                  onChange={(e) =>
                    handleSectionChange(
                      "temporaryWork",
                      "temporaryWorkPerDiem",
                      e.target.value
                    )
                  }
                  placeholder="145 kr/dag första månaden"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Home Office */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          🏠 Hemkontor/arbetsrum
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.homeOffice.hasHomeOffice}
                onChange={(e) =>
                  handleSectionChange(
                    "homeOffice",
                    "hasHomeOffice",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Har arbetsrum hemma (deklarationspunkt 2.4)
              </span>
            </label>
            {formData.homeOffice.hasHomeOffice && (
              <>
                <div className="mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.homeOffice.employerProvidesOffice}
                      onChange={(e) =>
                        handleSectionChange(
                          "homeOffice",
                          "employerProvidesOffice",
                          e.target.checked
                        )
                      }
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-text-secondary">
                      Arbetsgivaren tillhandahåller ingen arbetsplats
                    </span>
                  </label>
                </div>
                <div className="mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.homeOffice.homeOfficeOnlyForWork}
                      onChange={(e) =>
                        handleSectionChange(
                          "homeOffice",
                          "homeOfficeOnlyForWork",
                          e.target.checked
                        )
                      }
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-text-secondary">
                      Rummet används endast för arbete
                    </span>
                  </label>
                </div>
              </>
            )}
          </div>
          {formData.homeOffice.hasHomeOffice && (
            <>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Arbetsrummets yta (m²)
                </label>
                <input
                  type="number"
                  value={formData.homeOffice.homeOfficeArea}
                  onChange={(e) =>
                    handleSectionChange(
                      "homeOffice",
                      "homeOfficeArea",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Merkostnad uppvärmning (kr)
                </label>
                <input
                  type="number"
                  value={formData.homeOffice.homeOfficeHeatingCost}
                  onChange={(e) =>
                    handleSectionChange(
                      "homeOffice",
                      "homeOfficeHeatingCost",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Merkostnad el (kr)
                </label>
                <input
                  type="number"
                  value={formData.homeOffice.homeOfficeElectricityCost}
                  onChange={(e) =>
                    handleSectionChange(
                      "homeOffice",
                      "homeOfficeElectricityCost",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Professional Services */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          ⚖️ Professionella tjänster
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.professionalServices.hasLegalCosts}
                onChange={(e) =>
                  handleSectionChange(
                    "professionalServices",
                    "hasLegalCosts",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Advokat/rättegångskostnader
              </span>
            </label>
            {formData.professionalServices.hasLegalCosts && (
              <>
                <input
                  type="number"
                  value={formData.professionalServices.legalCostsAmount}
                  onChange={(e) =>
                    handleSectionChange(
                      "professionalServices",
                      "legalCostsAmount",
                      e.target.value
                    )
                  }
                  placeholder="Belopp (kr)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
                <input
                  type="text"
                  value={formData.professionalServices.legalCostsDescription}
                  onChange={(e) =>
                    handleSectionChange(
                      "professionalServices",
                      "legalCostsDescription",
                      e.target.value
                    )
                  }
                  placeholder="Beskrivning av tvist"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
              </>
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.professionalServices.hasProfessionalFees}
                onChange={(e) =>
                  handleSectionChange(
                    "professionalServices",
                    "hasProfessionalFees",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Auktorisationsavgifter
              </span>
            </label>
            {formData.professionalServices.hasProfessionalFees && (
              <>
                <input
                  type="number"
                  value={formData.professionalServices.professionalFeesAmount}
                  onChange={(e) =>
                    handleSectionChange(
                      "professionalServices",
                      "professionalFeesAmount",
                      e.target.value
                    )
                  }
                  placeholder="Årsavgift (kr)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
                <input
                  type="text"
                  value={
                    formData.professionalServices.professionalFeesDescription
                  }
                  onChange={(e) =>
                    handleSectionChange(
                      "professionalServices",
                      "professionalFeesDescription",
                      e.target.value
                    )
                  }
                  placeholder="Typ av certifiering"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
              </>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.professionalServices.hasAgentCosts}
                onChange={(e) =>
                  handleSectionChange(
                    "professionalServices",
                    "hasAgentCosts",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Agent/managerkostnader (artister/idrottsutövare)
              </span>
            </label>
            {formData.professionalServices.hasAgentCosts && (
              <input
                type="number"
                value={formData.professionalServices.agentCostsAmount}
                onChange={(e) =>
                  handleSectionChange(
                    "professionalServices",
                    "agentCostsAmount",
                    e.target.value
                  )
                }
                placeholder="Kostnad (kr)"
                className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
              />
            )}
          </div>
        </div>
      </div>

      {/* Professional Literature */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          📚 Facklitteratur och fortbildning
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={
                  formData.professionalLiterature.hasProfessionalLiterature
                }
                onChange={(e) =>
                  handleSectionChange(
                    "professionalLiterature",
                    "hasProfessionalLiterature",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Facklitteratur nödvändig för arbetet
              </span>
            </label>
            {formData.professionalLiterature.hasProfessionalLiterature && (
              <>
                <input
                  type="number"
                  value={formData.professionalLiterature.literatureCost}
                  onChange={(e) =>
                    handleSectionChange(
                      "professionalLiterature",
                      "literatureCost",
                      e.target.value
                    )
                  }
                  placeholder="Kostnad (kr)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
                <input
                  type="text"
                  value={formData.professionalLiterature.literatureDescription}
                  onChange={(e) =>
                    handleSectionChange(
                      "professionalLiterature",
                      "literatureDescription",
                      e.target.value
                    )
                  }
                  placeholder="Beskrivning"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
              </>
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.professionalLiterature.hasJobRelatedEducation}
                onChange={(e) =>
                  handleSectionChange(
                    "professionalLiterature",
                    "hasJobRelatedEducation",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Arbetsrelaterad utbildning
              </span>
            </label>
            {formData.professionalLiterature.hasJobRelatedEducation && (
              <>
                <input
                  type="number"
                  value={formData.professionalLiterature.educationCost}
                  onChange={(e) =>
                    handleSectionChange(
                      "professionalLiterature",
                      "educationCost",
                      e.target.value
                    )
                  }
                  placeholder="Kostnad (kr)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
                <input
                  type="text"
                  value={formData.professionalLiterature.educationDescription}
                  onChange={(e) =>
                    handleSectionChange(
                      "professionalLiterature",
                      "educationDescription",
                      e.target.value
                    )
                  }
                  placeholder="Beskrivning av utbildning"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Specific Professions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          🎯 Specifika yrkesgrupper
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.specificProfessions.isArtistOrAthlete}
                onChange={(e) =>
                  handleSectionChange(
                    "specificProfessions",
                    "isArtistOrAthlete",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Artist/idrottsutövare
              </span>
            </label>
            {formData.specificProfessions.isArtistOrAthlete && (
              <>
                <input
                  type="number"
                  value={
                    formData.specificProfessions.artistAthleteEquipmentCost
                  }
                  onChange={(e) =>
                    handleSectionChange(
                      "specificProfessions",
                      "artistAthleteEquipmentCost",
                      e.target.value
                    )
                  }
                  placeholder="Utrustningskostnad (kr)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    checked={formData.specificProfessions.useSchablonAmount}
                    onChange={(e) =>
                      handleSectionChange(
                        "specificProfessions",
                        "useSchablonAmount",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    Använd schablonbelopp 3 000 kr
                  </span>
                </label>
              </>
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.specificProfessions.hasServiceDog}
                onChange={(e) =>
                  handleSectionChange(
                    "specificProfessions",
                    "hasServiceDog",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Tjänstehund (polis/militär)
              </span>
            </label>
            {formData.specificProfessions.hasServiceDog && (
              <input
                type="number"
                value={formData.specificProfessions.serviceDogMonths}
                onChange={(e) =>
                  handleSectionChange(
                    "specificProfessions",
                    "serviceDogMonths",
                    e.target.value
                  )
                }
                placeholder="Antal månader"
                className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
              />
            )}
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.specificProfessions.isDaycareProfessional}
                onChange={(e) =>
                  handleSectionChange(
                    "specificProfessions",
                    "isDaycareProfessional",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Dagbarnvårdare
              </span>
            </label>
            {formData.specificProfessions.isDaycareProfessional && (
              <input
                type="number"
                value={formData.specificProfessions.daycareChildren}
                onChange={(e) =>
                  handleSectionChange(
                    "specificProfessions",
                    "daycareChildren",
                    e.target.value
                  )
                }
                placeholder="Antal barn"
                className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
              />
            )}
          </div>
        </div>
      </div>

      {/* Capital Transactions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          💰 Kapitaltransaktioner
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.capitalTransactions.hasCapitalLosses}
                onChange={(e) =>
                  handleSectionChange(
                    "capitalTransactions",
                    "hasCapitalLosses",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Kapitalförluster (deklarationspunkt 8.2)
              </span>
            </label>
            {formData.capitalTransactions.hasCapitalLosses && (
              <>
                <input
                  type="number"
                  value={formData.capitalTransactions.capitalLossesAmount}
                  onChange={(e) =>
                    handleSectionChange(
                      "capitalTransactions",
                      "capitalLossesAmount",
                      e.target.value
                    )
                  }
                  placeholder="Förlust (kr)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
                <input
                  type="text"
                  value={formData.capitalTransactions.capitalLossesDescription}
                  onChange={(e) =>
                    handleSectionChange(
                      "capitalTransactions",
                      "capitalLossesDescription",
                      e.target.value
                    )
                  }
                  placeholder="Beskrivning (aktier, fastighet, etc.)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
              </>
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.capitalTransactions.hasCurrencyLosses}
                onChange={(e) =>
                  handleSectionChange(
                    "capitalTransactions",
                    "hasCurrencyLosses",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Kursförluster
              </span>
            </label>
            {formData.capitalTransactions.hasCurrencyLosses && (
              <input
                type="number"
                value={formData.capitalTransactions.currencyLossesAmount}
                onChange={(e) =>
                  handleSectionChange(
                    "capitalTransactions",
                    "currencyLossesAmount",
                    e.target.value
                  )
                }
                placeholder="Förlust (kr)"
                className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
              />
            )}
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.capitalTransactions.hasInvestmentInterest}
                onChange={(e) =>
                  handleSectionChange(
                    "capitalTransactions",
                    "hasInvestmentInterest",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Ränteavdrag för investeringslån (deklarationspunkt 8.1)
              </span>
            </label>
            {formData.capitalTransactions.hasInvestmentInterest && (
              <>
                <input
                  type="number"
                  value={formData.capitalTransactions.investmentInterestAmount}
                  onChange={(e) =>
                    handleSectionChange(
                      "capitalTransactions",
                      "investmentInterestAmount",
                      e.target.value
                    )
                  }
                  placeholder="Räntekostnad (kr)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    checked={formData.capitalTransactions.loanHasCollateral}
                    onChange={(e) =>
                      handleSectionChange(
                        "capitalTransactions",
                        "loanHasCollateral",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    Lånet har säkerhet (viktigt för 2025-2026 års regler)
                  </span>
                </label>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Pension Contributions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          🏦 Pensionssparande
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.pensionContributions.hasPensionContributions}
                onChange={(e) =>
                  handleSectionChange(
                    "pensionContributions",
                    "hasPensionContributions",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Privat pensionssparande (deklarationspunkt 3.1)
              </span>
            </label>
            {formData.pensionContributions.hasPensionContributions && (
              <>
                <input
                  type="number"
                  value={
                    formData.pensionContributions.pensionContributionsAmount
                  }
                  onChange={(e) =>
                    handleSectionChange(
                      "pensionContributions",
                      "pensionContributionsAmount",
                      e.target.value
                    )
                  }
                  placeholder="Inbetalt belopp (kr)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
                <input
                  type="number"
                  value={formData.pensionContributions.employmentIncome}
                  onChange={(e) =>
                    handleSectionChange(
                      "pensionContributions",
                      "employmentIncome",
                      e.target.value
                    )
                  }
                  placeholder="Anställningsinkomst (kr)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
              </>
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.pensionContributions.hasEmployerPension}
                onChange={(e) =>
                  handleSectionChange(
                    "pensionContributions",
                    "hasEmployerPension",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Har tjänstepensionsrätter från arbetsgivare
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Hobby Business */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          🎨 Hobbyverksamhet
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.hobbyBusiness.hasHobbyBusiness}
                onChange={(e) =>
                  handleSectionChange(
                    "hobbyBusiness",
                    "hasHobbyBusiness",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Hobbyverksamhet (bilaga T1/T2)
              </span>
            </label>
            {formData.hobbyBusiness.hasHobbyBusiness && (
              <>
                <input
                  type="number"
                  value={formData.hobbyBusiness.hobbyBusinessIncome}
                  onChange={(e) =>
                    handleSectionChange(
                      "hobbyBusiness",
                      "hobbyBusinessIncome",
                      e.target.value
                    )
                  }
                  placeholder="Inkomster (kr)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
                <input
                  type="number"
                  value={formData.hobbyBusiness.hobbyBusinessExpenses}
                  onChange={(e) =>
                    handleSectionChange(
                      "hobbyBusiness",
                      "hobbyBusinessExpenses",
                      e.target.value
                    )
                  }
                  placeholder="Utgifter (kr)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
                <input
                  type="number"
                  value={formData.hobbyBusiness.hobbyBusinessPreviousLosses}
                  onChange={(e) =>
                    handleSectionChange(
                      "hobbyBusiness",
                      "hobbyBusinessPreviousLosses",
                      e.target.value
                    )
                  }
                  placeholder="Tidigare års underskott (kr)"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Job Search Costs */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          🔍 Arbetslöshetskostnader
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.jobSearchCosts.hasJobSearchCosts}
                onChange={(e) =>
                  handleSectionChange(
                    "jobSearchCosts",
                    "hasJobSearchCosts",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Kostnader för arbetssökande (deklarationspunkt 2.4)
              </span>
            </label>
            {formData.jobSearchCosts.hasJobSearchCosts && (
              <>
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    checked={
                      formData.jobSearchCosts.receivedUnemploymentBenefit
                    }
                    onChange={(e) =>
                      handleSectionChange(
                        "jobSearchCosts",
                        "receivedUnemploymentBenefit",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    Erhållit arbetslöshetsersättning
                  </span>
                </label>
              </>
            )}
          </div>
          {formData.jobSearchCosts.hasJobSearchCosts && (
            <>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Resekostnader (kr)
                </label>
                <input
                  type="number"
                  value={formData.jobSearchCosts.jobSearchTravelCost}
                  onChange={(e) =>
                    handleSectionChange(
                      "jobSearchCosts",
                      "jobSearchTravelCost",
                      e.target.value
                    )
                  }
                  placeholder="Arbetsförmedlingsresor"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Kommunikationskostnader (kr)
                </label>
                <input
                  type="number"
                  value={formData.jobSearchCosts.jobSearchCommunicationCost}
                  onChange={(e) =>
                    handleSectionChange(
                      "jobSearchCosts",
                      "jobSearchCommunicationCost",
                      e.target.value
                    )
                  }
                  placeholder="Telefon, internet"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Dokumentavgifter (kr)
                </label>
                <input
                  type="number"
                  value={formData.jobSearchCosts.jobSearchDocumentCost}
                  onChange={(e) =>
                    handleSectionChange(
                      "jobSearchCosts",
                      "jobSearchDocumentCost",
                      e.target.value
                    )
                  }
                  placeholder="Intyg, kopior"
                  className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* ROT/RUT */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          🧾 ROT- och RUT-avdrag
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.rotRut.hasRotRutWork}
                onChange={(e) =>
                  handleSectionChange(
                    "rotRut",
                    "hasRotRutWork",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Har du anlitat företag för ROT- eller RUT-arbete?
              </span>
            </label>
          </div>
          {formData.rotRut.hasRotRutWork && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-bg-secondary rounded-lg border border-border-light">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.rotRut.hasRotWork}
                    onChange={(e) =>
                      handleSectionChange(
                        "rotRut",
                        "hasRotWork",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    ROT (renovering/ombyggnad)
                  </span>
                </label>
                {formData.rotRut.hasRotWork && (
                  <>
                    <input
                      type="text"
                      value={formData.rotRut.rotWorkType}
                      onChange={(e) =>
                        handleSectionChange(
                          "rotRut",
                          "rotWorkType",
                          e.target.value
                        )
                      }
                      placeholder="Typ av arbete"
                      className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                    />
                    <input
                      type="number"
                      value={formData.rotRut.rotAmount}
                      onChange={(e) =>
                        handleSectionChange(
                          "rotRut",
                          "rotAmount",
                          e.target.value
                        )
                      }
                      placeholder="Belopp (kr)"
                      className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                    />
                  </>
                )}
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.rotRut.hasRutWork}
                    onChange={(e) =>
                      handleSectionChange(
                        "rotRut",
                        "hasRutWork",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    RUT (städning/barnpassning)
                  </span>
                </label>
                {formData.rotRut.hasRutWork && (
                  <>
                    <input
                      type="text"
                      value={formData.rotRut.rutWorkType}
                      onChange={(e) =>
                        handleSectionChange(
                          "rotRut",
                          "rutWorkType",
                          e.target.value
                        )
                      }
                      placeholder="Typ av tjänst"
                      className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                    />
                    <input
                      type="number"
                      value={formData.rotRut.rutAmount}
                      onChange={(e) =>
                        handleSectionChange(
                          "rotRut",
                          "rutAmount",
                          e.target.value
                        )
                      }
                      placeholder="Belopp (kr)"
                      className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Donations and Memberships */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          🎁 Gåvor och bidrag
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.donations.hasCharitableDonations}
                onChange={(e) =>
                  handleSectionChange(
                    "donations",
                    "hasCharitableDonations",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Gåvor till välgörenhet (minst 2000 kr)
              </span>
            </label>
            {formData.donations.hasCharitableDonations && (
              <>
                <input
                  type="number"
                  value={formData.donations.donationAmount}
                  onChange={(e) =>
                    handleSectionChange(
                      "donations",
                      "donationAmount",
                      e.target.value
                    )
                  }
                  placeholder="Total gåvosumma (kr)"
                  className="w-full p-2 border border-gray-600 rounded bg-bg-primary text-white focus:ring-2 focus:ring-green-500 mt-2"
                />
                <input
                  type="text"
                  value={formData.donations.donationRecipient}
                  onChange={(e) =>
                    handleSectionChange(
                      "donations",
                      "donationRecipient",
                      e.target.value
                    )
                  }
                  placeholder="Mottagare"
                  className="w-full p-2 border border-gray-600 rounded bg-bg-primarytext-white focus:ring-2 focus:ring-green-500 mt-2"
                />
              </>
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.donations.hasUnemploymentInsurance}
                onChange={(e) =>
                  handleSectionChange(
                    "donations",
                    "hasUnemploymentInsurance",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                A-kassa medlemskap
              </span>
            </label>
            {formData.donations.hasUnemploymentInsurance && (
              <input
                type="number"
                value={formData.donations.unemploymentInsuranceFee}
                onChange={(e) =>
                  handleSectionChange(
                    "donations",
                    "unemploymentInsuranceFee",
                    e.target.value
                  )
                }
                placeholder="Årsavgift (kr)"
                className="w-full p-2 border border-gray-600 rounded bg-bg-primarytext-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.donations.hasUnionMembership}
                onChange={(e) =>
                  handleSectionChange(
                    "donations",
                    "hasUnionMembership",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Fackföreningsavgift
              </span>
            </label>
            {formData.donations.hasUnionMembership && (
              <input
                type="number"
                value={formData.donations.unionFee}
                onChange={(e) =>
                  handleSectionChange("donations", "unionFee", e.target.value)
                }
                placeholder="Årsavgift (kr)"
                className="w-full p-2 border border-gray-600 rounded bg-bg-primarytext-white focus:ring-2 focus:ring-green-500 mt-2"
              />
            )}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          📚 Studier och utbildning
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.education.hasStartedEducation}
                onChange={(e) =>
                  handleSectionChange(
                    "education",
                    "hasStartedEducation",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Påbörjat ny utbildning
              </span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.education.hasPaidForEducation}
                onChange={(e) =>
                  handleSectionChange(
                    "education",
                    "hasPaidForEducation",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Köpt kurslitteratur/avgifter
              </span>
            </label>
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.education.isJobRelevant}
                onChange={(e) =>
                  handleSectionChange(
                    "education",
                    "isJobRelevant",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Utbildning relevant för nuvarande/framtida yrke
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Rental Income */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          📦 Uthyrning och sidoinkomster
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.rental.hasRentalIncome}
                onChange={(e) =>
                  handleSectionChange(
                    "rental",
                    "hasRentalIncome",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Hyrt ut bostad, bil, förråd eller liknande
              </span>
            </label>
            {formData.rental.hasRentalIncome && (
              <>
                <input
                  type="number"
                  value={formData.rental.rentalIncome}
                  onChange={(e) =>
                    handleSectionChange(
                      "rental",
                      "rentalIncome",
                      e.target.value
                    )
                  }
                  placeholder="Intäkter (kr)"
                  className="w-full p-2 border border-gray-600 rounded bg-bg-primarytext-white focus:ring-2 focus:ring-green-500 mt-2"
                />
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    checked={formData.rental.hasRentalCosts}
                    onChange={(e) =>
                      handleSectionChange(
                        "rental",
                        "hasRentalCosts",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    Kostnader för uthyrning
                  </span>
                </label>
                {formData.rental.hasRentalCosts && (
                  <input
                    type="number"
                    value={formData.rental.rentalCosts}
                    onChange={(e) =>
                      handleSectionChange(
                        "rental",
                        "rentalCosts",
                        e.target.value
                      )
                    }
                    placeholder="Kostnader (kr)"
                    className="w-full p-2 border border-gray-600 rounded bg-bg-primary text-white focus:ring-2 focus:ring-green-500 mt-2"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Green Technology */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          ♻️ Grön teknik och energiinvesteringar
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.greenTech.hasGreenTech}
                onChange={(e) =>
                  handleSectionChange(
                    "greenTech",
                    "hasGreenTech",
                    e.target.checked
                  )
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-text-secondary">
                Har du installerat grön teknik (solceller, laddbox,
                batterilagring)?
              </span>
            </label>
          </div>
          {formData.greenTech.hasGreenTech && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-bg-secondary rounded-lg border border-border-light">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.greenTech.hasSolarPanels}
                    onChange={(e) =>
                      handleSectionChange(
                        "greenTech",
                        "hasSolarPanels",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    Solceller (15% skattereduktion)
                  </span>
                </label>
                {formData.greenTech.hasSolarPanels && (
                  <input
                    type="number"
                    value={formData.greenTech.solarPanelsCost}
                    onChange={(e) =>
                      handleSectionChange(
                        "greenTech",
                        "solarPanelsCost",
                        e.target.value
                      )
                    }
                    placeholder="Kostnad (kr)"
                    className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                  />
                )}
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.greenTech.hasChargingStation}
                    onChange={(e) =>
                      handleSectionChange(
                        "greenTech",
                        "hasChargingStation",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    Laddbox till elbil (50% skattereduktion)
                  </span>
                </label>
                {formData.greenTech.hasChargingStation && (
                  <input
                    type="number"
                    value={formData.greenTech.chargingStationCost}
                    onChange={(e) =>
                      handleSectionChange(
                        "greenTech",
                        "chargingStationCost",
                        e.target.value
                      )
                    }
                    placeholder="Kostnad (kr)"
                    className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                  />
                )}
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.greenTech.hasBatteryStorage}
                    onChange={(e) =>
                      handleSectionChange(
                        "greenTech",
                        "hasBatteryStorage",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-text-secondary">
                    Batterilagring (50% skattereduktion)
                  </span>
                </label>
                {formData.greenTech.hasBatteryStorage && (
                  <input
                    type="number"
                    value={formData.greenTech.batteryStorageCost}
                    onChange={(e) =>
                      handleSectionChange(
                        "greenTech",
                        "batteryStorageCost",
                        e.target.value
                      )
                    }
                    placeholder="Kostnad (kr)"
                    className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent mt-2"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Other */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">
          📍 Övrigt att ta upp
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Andra utgifter eller livssituationer
            </label>
            <textarea
              value={formData.other.description}
              onChange={(e) =>
                handleSectionChange("other", "description", e.target.value)
              }
              placeholder="Beskriv kortfattat andra utgifter som kan påverka din deklaration (flytt, vårdkostnader, juridiska tvister, handikapp, arbetslöshet)..."
              rows={3}
              className="w-full p-2 border border-border-default rounded bg-bg-white text-text-primary focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-accent text-text-inverse py-3 px-6 rounded-lg hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
      >
        Skapa skattedeklaration
      </button>

      {createDeclaration.error && (
        <div className="mt-4 p-3 bg-danger-light border border-danger text-danger rounded">
          Fel: {createDeclaration.error.message}
        </div>
      )}
    </form>
  );
};
