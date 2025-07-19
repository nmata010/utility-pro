import { useState, useCallback, useEffect } from 'react';
import { ElectricalData, ElectricalCalculation, BillingPeriod } from '@/types/invoice';

export function useElectricalCalculator() {
  const [data, setData] = useState<ElectricalData>({
    mainBillAmount: 0,
    totalKwh: 0,
    aduKwh: 0,
    billingPeriod: { startDate: null, endDate: null },
    landlordName: '',
    landlordAddress: '',
    landlordPhone: '',
    tenantName: '',
    propertyAddress: '',
  });

  // Load landlord settings from the database-backed hook
  useEffect(() => {
    // This will be handled by the parent component
    // Remove local storage logic
  }, []);

  const calculate = useCallback((): ElectricalCalculation => {
    const { mainBillAmount, totalKwh, aduKwh } = data;
    
    if (mainBillAmount <= 0 || totalKwh <= 0) {
      return {
        effectiveRate: 0,
        mainHouseKwh: 0,
        aduCost: 0,
        mainHouseCost: 0,
        isValid: false,
      };
    }

    const effectiveRate = mainBillAmount / totalKwh;
    const mainHouseKwh = totalKwh - aduKwh;
    const aduCost = aduKwh * effectiveRate;
    const mainHouseCost = mainHouseKwh * effectiveRate;

    return {
      effectiveRate,
      mainHouseKwh,
      aduCost,
      mainHouseCost,
      isValid: true,
    };
  }, [data]);

  const updateField = useCallback((field: keyof ElectricalData, value: string | number | BillingPeriod) => {
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
