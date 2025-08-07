import { z } from 'zod';

export const createTaxDeclarationSchema = z.object({
  year: z.number().min(2020).max(new Date().getFullYear()),
  personalInfo: z.object({
    name: z.string().min(1).max(100),
    maritalStatus: z.enum(['single', 'married', 'cohabiting', 'divorced', 'widowed']),
    livedAbroad: z.boolean().optional(),
  }),
  employment: z.object({
    hasSelfEmployment: z.boolean(),
    hasPension: z.boolean(),
    hasUnemploymentBenefit: z.boolean(),
  }),
  commute: z.object({
    hasCommute: z.boolean(),
    distance: z.string().optional(),
    transportMethod: z.string().optional(),
    savesTwoHours: z.boolean(),
    hasParkingCosts: z.boolean(),
    parkingCostPerMonth: z.string().optional(),
  }),
  workEquipment: z.object({
    hasWorkEquipment: z.boolean(),
    computer: z.string().optional(),
    mobilePhone: z.string().optional(),
    internet: z.string().optional(),
    protectiveGear: z.string().optional(),
    tools: z.string().optional(),
    uniform: z.string().optional(),
    selfFunded: z.boolean(),
  }),
  housing: z.object({
    propertyType: z.string().optional(),
    hasMortgage: z.boolean(),
    mortgageInterest: z.string().optional(),
    soldProperty: z.boolean(),
    propertyGainLoss: z.string().optional(),
    hadSellingCosts: z.boolean(),
    hasDoubleResidence: z.boolean(),
    secondResidenceCost: z.string().optional(),
    travelCostBetweenResidences: z.string().optional(),
  }),
  rotRut: z.object({
    hasRotRutWork: z.boolean(),
    hasRotWork: z.boolean(),
    rotWorkType: z.string().optional(),
    rotAmount: z.string().optional(),
    hasRutWork: z.boolean(),
    rutWorkType: z.string().optional(),
    rutAmount: z.string().optional(),
  }),
  businessTravel: z.object({
    hasBusinessTravel: z.boolean(),
    businessTravelDays: z.string().optional(),
    businessTravelCost: z.string().optional(),
    hasPerDiem: z.boolean(),
    perDiemAmount: z.string().optional(),
    hasAccommodationCosts: z.boolean(),
    accommodationCost: z.string().optional(),
  }),
  temporaryWork: z.object({
    hasTemporaryWork: z.boolean(),
    temporaryWorkLocation: z.string().optional(),
    temporaryWorkDistance: z.string().optional(),
    temporaryWorkDuration: z.string().optional(),
    temporaryWorkAccommodationCost: z.string().optional(),
    temporaryWorkPerDiem: z.string().optional(),
  }),
  homeOffice: z.object({
    hasHomeOffice: z.boolean(),
    homeOfficeArea: z.string().optional(),
    homeOfficeHeatingCost: z.string().optional(),
    homeOfficeElectricityCost: z.string().optional(),
    homeOfficeOnlyForWork: z.boolean(),
    employerProvidesOffice: z.boolean(),
  }),
  professionalServices: z.object({
    hasLegalCosts: z.boolean(),
    legalCostsAmount: z.string().optional(),
    legalCostsDescription: z.string().optional(),
    hasProfessionalFees: z.boolean(),
    professionalFeesAmount: z.string().optional(),
    professionalFeesDescription: z.string().optional(),
    hasAgentCosts: z.boolean(),
    agentCostsAmount: z.string().optional(),
  }),
  professionalLiterature: z.object({
    hasProfessionalLiterature: z.boolean(),
    literatureCost: z.string().optional(),
    literatureDescription: z.string().optional(),
    hasJobRelatedEducation: z.boolean(),
    educationCost: z.string().optional(),
    educationDescription: z.string().optional(),
  }),
  specificProfessions: z.object({
    isArtistOrAthlete: z.boolean(),
    artistAthleteEquipmentCost: z.string().optional(),
    useSchablonAmount: z.boolean(),
    hasServiceDog: z.boolean(),
    serviceDogMonths: z.string().optional(),
    isDaycareProfessional: z.boolean(),
    daycareChildren: z.string().optional(),
  }),
  capitalTransactions: z.object({
    hasCapitalLosses: z.boolean(),
    capitalLossesAmount: z.string().optional(),
    capitalLossesDescription: z.string().optional(),
    hasCurrencyLosses: z.boolean(),
    currencyLossesAmount: z.string().optional(),
    hasInvestmentInterest: z.boolean(),
    investmentInterestAmount: z.string().optional(),
    loanHasCollateral: z.boolean(),
  }),
  pensionContributions: z.object({
    hasPensionContributions: z.boolean(),
    pensionContributionsAmount: z.string().optional(),
    hasEmployerPension: z.boolean(),
    employmentIncome: z.string().optional(),
  }),
  hobbyBusiness: z.object({
    hasHobbyBusiness: z.boolean(),
    hobbyBusinessIncome: z.string().optional(),
    hobbyBusinessExpenses: z.string().optional(),
    hobbyBusinessPreviousLosses: z.string().optional(),
  }),
  jobSearchCosts: z.object({
    hasJobSearchCosts: z.boolean(),
    jobSearchTravelCost: z.string().optional(),
    jobSearchCommunicationCost: z.string().optional(),
    jobSearchDocumentCost: z.string().optional(),
    receivedUnemploymentBenefit: z.boolean(),
  }),
  donations: z.object({
    hasCharitableDonations: z.boolean(),
    donationAmount: z.string().optional(),
    donationRecipient: z.string().optional(),
    hasUnionMembership: z.boolean(),
    unionFee: z.string().optional(),
    hasUnemploymentInsurance: z.boolean(),
    unemploymentInsuranceFee: z.string().optional(),
  }),
  education: z.object({
    hasStartedEducation: z.boolean(),
    hasPaidForEducation: z.boolean(),
    isJobRelevant: z.boolean(),
  }),
  rental: z.object({
    hasRentalIncome: z.boolean(),
    rentalIncome: z.string().optional(),
    hasRentalCosts: z.boolean(),
    rentalCosts: z.string().optional(),
  }),
  greenTech: z.object({
    hasGreenTech: z.boolean(),
    hasSolarPanels: z.boolean(),
    solarPanelsCost: z.string().optional(),
    hasChargingStation: z.boolean(),
    chargingStationCost: z.string().optional(),
    hasBatteryStorage: z.boolean(),
    batteryStorageCost: z.string().optional(),
  }),
  other: z.object({
    description: z.string().optional(),
  }),
});

export const uploadReceiptSchema = z.object({
  declarationId: z.string(),
  category: z.enum(['work', 'home', 'travel', 'education', 'charity', 'medical', 'other']),
  amount: z.number().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
});

export const createPaymentSessionSchema = z.object({
  amount: z.number().min(1),
  currency: z.string().default('SEK'),
  paymentMethod: z.string().optional(),
});

export const getTaxDeclarationSchema = z.object({
  id: z.string(),
});

export const getReceiptsSchema = z.object({
  declarationId: z.string(),
});

export const generateAdviceSchema = z.object({
  declarationId: z.string(),
});

export type CreateTaxDeclarationInput = z.infer<typeof createTaxDeclarationSchema>;
export type UploadReceiptInput = z.infer<typeof uploadReceiptSchema>;
export type CreatePaymentSessionInput = z.infer<typeof createPaymentSessionSchema>;
export type GetTaxDeclarationInput = z.infer<typeof getTaxDeclarationSchema>;
export type GetReceiptsInput = z.infer<typeof getReceiptsSchema>;
export type GenerateAdviceInput = z.infer<typeof generateAdviceSchema>;