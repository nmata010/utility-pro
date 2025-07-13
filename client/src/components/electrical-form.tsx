import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Zap } from 'lucide-react';
import { ElectricalData, ElectricalCalculation } from '@/types/invoice';
import { PartyInformation } from './party-information';

interface ElectricalFormProps {
  data: ElectricalData;
  calculation: ElectricalCalculation;
  onUpdate: (field: keyof ElectricalData, value: string | number) => void;
}

export function ElectricalForm({ data, calculation, onUpdate }: ElectricalFormProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <Zap className="h-4 w-4 text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Electrical Utility Calculator</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-800 border-b border-slate-200 pb-2">Main Bill Details</h3>
            
            <div className="relative">
              <Input
                type="number"
                placeholder=" "
                value={data.mainBillAmount || ''}
                onChange={(e) => onUpdate('mainBillAmount', parseFloat(e.target.value) || 0)}
                className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                Total Bill Amount ($)
              </Label>
            </div>

            <div className="relative">
              <Input
                type="number"
                placeholder=" "
                value={data.totalKwh || ''}
                onChange={(e) => onUpdate('totalKwh', parseFloat(e.target.value) || 0)}
                className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                Total Usage (kWh)
              </Label>
            </div>

            <div className="relative">
              <Input
                type="number"
                placeholder=" "
                value={data.aduKwh || ''}
                onChange={(e) => onUpdate('aduKwh', parseFloat(e.target.value) || 0)}
                className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                ADU Usage (kWh)
              </Label>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-800 border-b border-slate-200 pb-2">Billing Information</h3>
            
            <div className="relative">
              <Input
                type="text"
                placeholder=" "
                value={data.billingPeriod}
                onChange={(e) => onUpdate('billingPeriod', e.target.value)}
                className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                Billing Period
              </Label>
            </div>

            {calculation.isValid && (
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200 calculation-badge">
                <div className="flex items-center space-x-2 mb-3">
                  <Calculator className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium text-emerald-800">Live Calculation</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Effective Rate:</span>
                    <span className="font-medium text-emerald-800">${calculation.effectiveRate.toFixed(4)}/kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Main House Usage:</span>
                    <span className="font-medium text-emerald-800">{calculation.mainHouseKwh} kWh</span>
                  </div>
                  <div className="flex justify-between border-t border-emerald-200 pt-2">
                    <span className="font-medium text-emerald-800">Amount Due:</span>
                    <span className="font-bold text-emerald-900">${calculation.mainHouseCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <PartyInformation 
        data={data} 
        onUpdate={onUpdate}
      />
    </div>
  );
}
