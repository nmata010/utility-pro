import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ElectricalData, ElectricalCalculation, BillingPeriod } from '@/types/invoice';
import type { LandlordSettings } from '@shared/schema';

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

  // Fetch landlord settings from database
  const { data: landlordSettings } = useQuery<LandlordSettings | null>({
    queryKey: ['/api/settings/landlord'],
  });

  // Update landlord fields when settings are loaded
  useEffect(() => {
    if (landlordSettings) {
      setData(prev => ({
        ...prev,
        landlordName: landlordSettings.landlordName || '',
        landlordAddress: landlordSettings.landlordAddress || '',
        landlordPhone: landlordSettings.landlordPhone || '',
      }));
    }
  }, [landlordSettings]);

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
