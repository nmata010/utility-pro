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

export interface OccupancyPeriod {
  moveInDate: Date | null;
  moveOutDate: Date | null;
}

export interface ElectricalData extends PartyInformation {
  mainBillAmount: number;
  totalKwh: number;
  aduKwh: number;
  billingPeriod: BillingPeriod;
  isProratedEnabled: boolean;
  occupancyPeriod: OccupancyPeriod;
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
  // Proration fields
  totalBillingDays: number;
  occupancyDays: number;
  prorationFactor: number;
  originalAmount: number;
  proratedAmount: number;
}

export interface WaterCalculation {
  quarterlyAllowance: number;
  totalOverage: number;
  sharePercentage: number;
  tenantOwes: number;
  isValid: boolean;
}

export type UtilityType = 'electric' | 'water';
