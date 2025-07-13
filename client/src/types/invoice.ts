export interface PartyInformation {
  landlordName: string;
  landlordAddress: string;
  landlordPhone: string;
  tenantName: string;
  propertyAddress: string;
}

export interface BillingPeriod {
  startDate: Date | null;
  endDate: Date | null;
}

export interface ElectricalData extends PartyInformation {
  mainBillAmount: number;
  totalKwh: number;
  aduKwh: number;
  billingPeriod: BillingPeriod;
}

export interface WaterData extends PartyInformation {
  quarterlyBill: number;
  monthlyAllowance: number;
  totalSqFt: number;
  tenantSqFt: number;
  billingPeriod: BillingPeriod;
}

export interface ElectricalCalculation {
  effectiveRate: number;
  mainHouseKwh: number;
  aduCost: number;
  mainHouseCost: number;
  isValid: boolean;
}

export interface WaterCalculation {
  quarterlyAllowance: number;
  totalOverage: number;
  sharePercentage: number;
  tenantOwes: number;
  isValid: boolean;
}

export type UtilityType = 'electric' | 'water';
