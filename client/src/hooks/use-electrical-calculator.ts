import { useState, useCallback, useEffect } from 'react';
import { ElectricalData, ElectricalCalculation, BillingPeriod, OccupancyPeriod } from '@/types/invoice';

export function useElectricalCalculator() {
  const [data, setData] = useState<ElectricalData>({
    mainBillAmount: 0,
    totalKwh: 0,
    aduKwh: 0,
    billingPeriod: { startDate: null, endDate: null },
    isProratedEnabled: false,
    occupancyPeriod: { moveInDate: null, moveOutDate: null },
    landlordName: '',
    landlordAddress: '',
    landlordPhone: '',
    tenantName: '',
    propertyAddress: '',
  });

  // Load landlord settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('utilitypro-landlord-settings');
      if (stored) {
        const landlordSettings = JSON.parse(stored);
        setData(prev => ({
          ...prev,
          landlordName: landlordSettings.landlordName || '',
          landlordAddress: landlordSettings.landlordAddress || '',
          landlordPhone: landlordSettings.landlordPhone || '',
        }));
      }
    } catch (error) {
      console.error('Failed to load landlord settings:', error);
    }
  }, []);

  const calculate = useCallback((): ElectricalCalculation => {
    const { mainBillAmount, totalKwh, aduKwh, isProratedEnabled, billingPeriod, occupancyPeriod } = data;
    
    if (mainBillAmount <= 0 || totalKwh <= 0) {
      return {
        effectiveRate: 0,
        mainHouseKwh: 0,
        aduCost: 0,
        mainHouseCost: 0,
        isValid: false,
        totalBillingDays: 0,
        occupancyDays: 0,
        prorationFactor: 1,
        originalAmount: 0,
        proratedAmount: 0,
      };
    }

    const effectiveRate = mainBillAmount / totalKwh;
    const mainHouseKwh = totalKwh - aduKwh;
    const aduCost = aduKwh * effectiveRate;
    const mainHouseCost = mainHouseKwh * effectiveRate;

    // Calculate proration if enabled
    let totalBillingDays = 0;
    let occupancyDays = 0;
    let prorationFactor = 1;
    let proratedAmount = mainHouseCost;

    if (isProratedEnabled && billingPeriod.startDate && billingPeriod.endDate) {
      const billingStart = billingPeriod.startDate;
      const billingEnd = billingPeriod.endDate;
      totalBillingDays = Math.ceil((billingEnd.getTime() - billingStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      if (occupancyPeriod.moveInDate || occupancyPeriod.moveOutDate) {
        const occupancyStart = occupancyPeriod.moveInDate || billingStart;
        const occupancyEnd = occupancyPeriod.moveOutDate || billingEnd;
        
        // Ensure occupancy dates are within billing period
        const validStart = new Date(Math.max(occupancyStart.getTime(), billingStart.getTime()));
        const validEnd = new Date(Math.min(occupancyEnd.getTime(), billingEnd.getTime()));
        
        if (validStart <= validEnd) {
          occupancyDays = Math.ceil((validEnd.getTime() - validStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          prorationFactor = occupancyDays / totalBillingDays;
          proratedAmount = mainHouseCost * prorationFactor;
        }
      }
    }

    return {
      effectiveRate,
      mainHouseKwh,
      aduCost,
      mainHouseCost,
      isValid: true,
      totalBillingDays,
      occupancyDays,
      prorationFactor,
      originalAmount: mainHouseCost,
      proratedAmount,
    };
  }, [data]);

  const updateField = useCallback((field: keyof ElectricalData, value: string | number | boolean | BillingPeriod | OccupancyPeriod) => {
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
