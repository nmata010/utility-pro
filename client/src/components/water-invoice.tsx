import { WaterData, WaterCalculation } from '@/types/invoice';
import { Droplets, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WaterInvoiceProps {
  data: WaterData;
  calculation: WaterCalculation;
}

export function WaterInvoice({ data, calculation }: WaterInvoiceProps) {
  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="invoice-container bg-white rounded-xl shadow-lg p-8 print-section">
      <header className="flex justify-between items-start mb-8 pb-6 border-b-2 border-slate-200">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Water Utility Overage Invoice</h2>
          <p className="text-slate-600">
            For period: {data.billingPeriod || '[Enter Billing Period]'}
          </p>
        </div>
        <div className="text-right">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg inline-block mb-3">
            <Droplets className="mr-2 h-4 w-4 inline" />
            <span className="font-semibold">WATER BILL</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {data.landlordName || '[Landlord Name]'}
            </h3>
            <p className="text-sm text-slate-600">
              {data.landlordAddress || '[Landlord Address]'}
            </p>
            <p className="text-sm text-slate-600">
              {data.landlordPhone || '[Landlord Phone]'}
            </p>
          </div>
        </div>
      </header>

      <div className="mb-8">
        <h4 className="text-sm font-semibold uppercase text-slate-500 mb-3 tracking-wide">Bill To:</h4>
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="font-semibold text-slate-900">
            {data.tenantName || '[Tenant Name(s)]'}
          </p>
          <p className="text-slate-700">
            {data.propertyAddress || '[Property Address]'}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-100 to-slate-50">
              <th className="p-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wide rounded-l-lg">Description</th>
              <th className="p-4 text-right text-sm font-semibold text-slate-700 uppercase tracking-wide rounded-r-lg">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="p-4 text-slate-700">Total Quarterly Water Bill</td>
              <td className="p-4 text-right text-slate-700">${(data.quarterlyBill || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td className="p-4 text-slate-700">
                Less: Landlord's Quarterly Allowance (3 months × ${(data.monthlyAllowance || 0).toFixed(2)})
              </td>
              <td className="p-4 text-right text-slate-700">
                (${(calculation.quarterlyAllowance || 0).toFixed(2)})
              </td>
            </tr>
            <tr className="bg-blue-50">
              <td className="p-4 font-semibold text-slate-900">Total Overage for Property</td>
              <td className="p-4 text-right font-semibold text-slate-900">
                ${(calculation.totalOverage || 0).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h4 className="text-lg font-semibold text-slate-800 mb-4 text-center">Overage Allocation Calculation</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Your Unit's Square Footage:</span>
              <span className="font-medium text-slate-800">{(data.tenantSqFt || 0).toLocaleString()} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Total Property Square Footage:</span>
              <span className="font-medium text-slate-800">{(data.totalSqFt || 0).toLocaleString()} sq ft</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Your Share of Property:</span>
              <span className="font-medium text-slate-800">{(calculation.sharePercentage || 0).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-blue-200">
              <span className="font-semibold text-slate-800">Your Portion of Overage:</span>
              <span className="font-bold text-slate-900">${(calculation.tenantOwes || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-full md:w-1/2 lg:w-1/3 bg-slate-50 rounded-lg p-4">
          <div className="flex justify-between py-3 border-t-2 border-slate-300">
            <span className="text-xl font-bold text-slate-900">Total Due:</span>
            <span className="text-xl font-bold text-blue-600">${(calculation.tenantOwes || 0).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <footer className="pt-6 border-t border-slate-200 text-sm text-slate-600 space-y-3">
        <p>
          <strong className="text-slate-800">Payment Terms:</strong> This amount is deemed "Additional Rent" as per your Lease Addendum and is due with your next regularly scheduled rent payment. Please make payment to{' '}
          <span className="font-semibold text-slate-800">
            {data.landlordName || '[Landlord Name]'}
          </span>{' '}
          via the usual method.
        </p>
      </footer>
    </div>
  );
}
