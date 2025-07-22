import mongoose, { Document, Schema } from 'mongoose';

export interface ITaxDeclaration extends Document {
  userId: mongoose.Types.ObjectId | null;
  year: number;
  personalInfo: {
    name: string;
    maritalStatus: 'single' | 'married' | 'cohabiting' | 'divorced' | 'widowed';
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

const taxDeclarationSchema = new Schema<ITaxDeclaration>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
    year: {
      type: Number,
      required: true,
    },
    personalInfo: {
      name: { type: String, required: true },
      maritalStatus: {
        type: String,
        enum: ['single', 'married', 'cohabiting', 'divorced', 'widowed'],
        required: true,
      },
      livedAbroad: Boolean,
    },
    employment: {
      hasEmployment: { type: Boolean, required: true },
      employerCount: String,
      hasSelfEmployment: { type: Boolean, required: true },
      hasPension: { type: Boolean, required: true },
      hasUnemploymentBenefit: { type: Boolean, required: true },
    },
    commute: {
      hasCommute: { type: Boolean, required: true },
      distance: String,
      transportMethod: String,
      savesTwoHours: { type: Boolean, required: true },
      hasParkingCosts: { type: Boolean, required: true },
      parkingCostPerMonth: String,
    },
    workEquipment: {
      computer: String,
      mobilePhone: String,
      internet: String,
      protectiveGear: String,
      tools: String,
      uniform: String,
      selfFunded: { type: Boolean, required: true },
    },
    housing: {
      propertyType: String,
      hasMortgage: { type: Boolean, required: true },
      mortgageInterest: String,
      soldProperty: { type: Boolean, required: true },
      propertyGainLoss: String,
      hadSellingCosts: { type: Boolean, required: true },
      hasDoubleResidence: { type: Boolean, required: true },
      secondResidenceCost: String,
      travelCostBetweenResidences: String,
    },
    rotRut: {
      hasRotWork: { type: Boolean, required: true },
      rotWorkType: String,
      rotAmount: String,
      hasRutWork: { type: Boolean, required: true },
      rutWorkType: String,
      rutAmount: String,
    },
    donations: {
      hasCharitableDonations: { type: Boolean, required: true },
      donationAmount: String,
      donationRecipient: String,
      hasUnionMembership: { type: Boolean, required: true },
      unionFee: String,
      hasUnemploymentInsurance: { type: Boolean, required: true },
      unemploymentInsuranceFee: String,
    },
    education: {
      hasStartedEducation: { type: Boolean, required: true },
      hasPaidForEducation: { type: Boolean, required: true },
      isJobRelevant: { type: Boolean, required: true },
    },
    rental: {
      hasRentalIncome: { type: Boolean, required: true },
      rentalIncome: String,
      hasRentalCosts: { type: Boolean, required: true },
      rentalCosts: String,
    },
    greenTech: {
      hasSolarPanels: { type: Boolean, required: true },
      solarPanelsCost: String,
      hasChargingStation: { type: Boolean, required: true },
      chargingStationCost: String,
      hasBatteryStorage: { type: Boolean, required: true },
      batteryStorageCost: String,
    },
    other: {
      description: String,
    },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'processing', 'completed'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
taxDeclarationSchema.index({ userId: 1 });
taxDeclarationSchema.index({ userId: 1, year: 1 });
taxDeclarationSchema.index({ status: 1 });
taxDeclarationSchema.index({ createdAt: -1 });

export const TaxDeclaration = mongoose.model<ITaxDeclaration>('TaxDeclaration', taxDeclarationSchema);