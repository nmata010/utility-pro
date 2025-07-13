import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Droplets } from 'lucide-react';
import { WaterData, WaterCalculation } from '@/types/invoice';
import { PartyInformation } from './party-information';

interface WaterFormProps {
  data: WaterData;
  calculation: WaterCalculation;
  onUpdate: (field: keyof WaterData, value: string | number) => void;
}

export function WaterForm({ data, calculation, onUpdate }: WaterFormProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Droplets className="h-4 w-4 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Water Utility Calculator</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-800 border-b border-slate-200 pb-2">Bill & Lease Details</h3>
            
            <div className="relative">
              <Input
                type="number"
                placeholder=" "
                value={data.quarterlyBill || ''}
                onChange={(e) => onUpdate('quarterlyBill', parseFloat(e.target.value) || 0)}
                className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                Quarterly Water Bill ($)
              </Label>
            </div>

            <div className="relative">
              <Input
                type="number"
                placeholder=" "
                value={data.monthlyAllowance || ''}
                onChange={(e) => onUpdate('monthlyAllowance', parseFloat(e.target.value) || 0)}
                className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                Monthly Allowance ($)
              </Label>
            </div>

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
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-800 border-b border-slate-200 pb-2">Property Allocation</h3>
            
            <div className="relative">
              <Input
                type="number"
                placeholder=" "
                value={data.totalSqFt || ''}
                onChange={(e) => onUpdate('totalSqFt', parseFloat(e.target.value) || 0)}
                className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                Total Property Sq. Ft.
              </Label>
            </div>

            <div className="relative">
              <Input
                type="number"
                placeholder=" "
                value={data.tenantSqFt || ''}
                onChange={(e) => onUpdate('tenantSqFt', parseFloat(e.target.value) || 0)}
                className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                Tenant Unit Sq. Ft.
              </Label>
            </div>

            {calculation.isValid && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 calculation-badge">
                <div className="flex items-center space-x-2 mb-3">
                  <Calculator className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Live Calculation</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Property Share:</span>
                    <span className="font-medium text-blue-800">{calculation.sharePercentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Total Overage:</span>
                    <span className="font-medium text-blue-800">${calculation.totalOverage.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-blue-200 pt-2">
                    <span className="font-medium text-blue-800">Amount Due:</span>
                    <span className="font-bold text-blue-900">${calculation.tenantOwes.toFixed(2)}</span>
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
