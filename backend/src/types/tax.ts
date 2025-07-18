export interface TaxDeclaration {
  id: string;
  userId: string;
  year: number;
  personalInfo: {
    name: string;
    personalNumber: string;
    maritalStatus: 'single' | 'married' | 'cohabiting' | 'divorced' | 'widowed';
    childrenCount?: string;
    municipality?: string;
    livedAbroad?: boolean;
  };
  employment: {
    hasEmployment: boolean;
    employerCount?: string;
    hasSelfEmployment: boolean;
    hasPension: boolean;
    hasUnemploymentBenefit: boolean;
  };
  commute: {
    hasCommute: boolean;
    distance?: string;
    transportMethod?: string;
    savesTwoHours: boolean;
    hasParkingCosts: boolean;
    parkingCostPerMonth?: string;
  };
  workEquipment: {
    computer?: string;
    mobilePhone?: string;
    internet?: string;
    protectiveGear?: string;
    tools?: string;
    uniform?: string;
    selfFunded: boolean;
  };
  housing: {
    propertyType?: string;
    hasMortgage: boolean;
    mortgageInterest?: string;
    soldProperty: boolean;
    propertyGainLoss?: string;
    hadSellingCosts: boolean;
    hasDoubleResidence: boolean;
    secondResidenceCost?: string;
    travelCostBetweenResidences?: string;
  };
  rotRut: {
    hasRotWork: boolean;
    rotWorkType?: string;
    rotAmount?: string;
    hasRutWork: boolean;
    rutWorkType?: string;
    rutAmount?: string;
  };
  donations: {
    hasCharitableDonations: boolean;
    donationAmount?: string;
    donationRecipient?: string;
    hasUnionMembership: boolean;
    unionFee?: string;
    hasUnemploymentInsurance: boolean;
    unemploymentInsuranceFee?: string;
  };
  education: {
    hasStartedEducation: boolean;
    hasPaidForEducation: boolean;
    isJobRelevant: boolean;
  };
  rental: {
    hasRentalIncome: boolean;
    rentalIncome?: string;
    hasRentalCosts: boolean;
    rentalCosts?: string;
  };
  greenTech: {
    hasSolarPanels: boolean;
    solarPanelsCost?: string;
    hasChargingStation: boolean;
    chargingStationCost?: string;
    hasBatteryStorage: boolean;
    batteryStorageCost?: string;
  };
  other: {
    description?: string;
  };
  status: 'draft' | 'submitted' | 'processing' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Receipt {
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
}

export interface TaxAdvice {
  id: string;
  declarationId: string;
  suggestedDeductions: {
    category: string;
    currentAmount: number;
    suggestedAmount: number;
    potentialSavings: number;
    confidence: 'high' | 'medium' | 'low';
    explanation: string;
    requiredDocuments: string[];
    relatedReceipts: string[];
  }[];
  totalPotentialSavings: number;
  riskAssessment: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
  };
  recommendations: string[];
  generatedAt: Date;
}

export interface PaymentSession {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod?: string;
  createdAt: Date;
  completedAt?: Date;
}