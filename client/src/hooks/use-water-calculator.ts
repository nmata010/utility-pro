import { useState, useCallback } from 'react';
import { WaterData, WaterCalculation, BillingPeriod } from '@/types/invoice';

export function useWaterCalculator() {
  const [data, setData] = useState<WaterData>({
    quarterlyBill: 0,
    monthlyAllowance: 0,
    totalSqFt: 0,
    tenantSqFt: 0,
    billingPeriod: { startDate: null, endDate: null },
    landlordName: '',
    landlordAddress: '',
    landlordPhone: '',
    tenantName: '',
    propertyAddress: '',
  });

  const calculate = useCallback((): WaterCalculation => {
    const { quarterlyBill, monthlyAllowance, totalSqFt, tenantSqFt } = data;
    
    if (quarterlyBill <= 0 || monthlyAllowance <= 0 || totalSqFt <= 0 || tenantSqFt <= 0) {
      return {
        quarterlyAllowance: 0,
        totalOverage: 0,
        sharePercentage: 0,
        tenantOwes: 0,
        isValid: false,
      };
    }

    const quarterlyAllowance = monthlyAllowance * 3;
    const totalOverage = Math.max(0, quarterlyBill - quarterlyAllowance);
    const sharePercentage = (tenantSqFt / totalSqFt) * 100;
    const tenantOwes = totalOverage * (tenantSqFt / totalSqFt);

    return {
      quarterlyAllowance,
      totalOverage,
      sharePercentage,
      tenantOwes: Math.max(0, tenantOwes),
      isValid: true,
    };
  }, [data]);

  const updateField = useCallback((field: keyof WaterData, value: string | number | BillingPeriod) => {
    setData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  return {
    data,
    calculation: calculate(),
    updateField,
  };
}
