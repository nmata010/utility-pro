import { ElectricalData, ElectricalCalculation } from '@/types/invoice';
import { Zap, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface ElectricalInvoiceProps {
  data: ElectricalData;
  calculation: ElectricalCalculation;
}

export function ElectricalInvoice({ data, calculation }: ElectricalInvoiceProps) {
  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const formatBillingPeriod = () => {
    if (data.billingPeriod.startDate && data.billingPeriod.endDate) {
      return `${format(data.billingPeriod.startDate, "MMM dd, yyyy")} - ${format(data.billingPeriod.endDate, "MMM dd, yyyy")}`;
    }
    return '[Enter Billing Period]';
  };

  return (
    <div className="invoice-container bg-white rounded-xl shadow-lg p-8 print-section">
      <header className="flex justify-between items-start mb-8 pb-6 border-b-2 border-slate-200">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Electrical Utility Invoice</h2>
          <p className="text-slate-600">
            For period: {formatBillingPeriod()}
          </p>
        </div>
        <div className="text-right">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg inline-block mb-3">
            <Zap className="mr-2 h-4 w-4 inline" />
            <span className="font-semibold">ELECTRICAL BILL</span>
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
              <th className="p-4 text-right text-sm font-semibold text-slate-700 uppercase tracking-wide">Usage (kWh)</th>
              <th className="p-4 text-right text-sm font-semibold text-slate-700 uppercase tracking-wide">Rate</th>
              <th className="p-4 text-right text-sm font-semibold text-slate-700 uppercase tracking-wide rounded-r-lg">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="p-4 text-slate-700">Total Property Electric Usage</td>
              <td className="p-4 text-right text-slate-700">{data.totalKwh || 0} kWh</td>
              <td className="p-4 text-right text-slate-600" rowSpan={3}>
                <div className="text-xs text-slate-500 mb-1">Effective Rate:</div>
                <div className="font-medium text-slate-700">
                  ${(calculation.effectiveRate || 0).toFixed(4)} / kWh
                </div>
              </td>
              <td className="p-4 text-right text-slate-700">${(data.mainBillAmount || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td className="p-4 text-slate-700">Less: ADU Usage (Submeter)</td>
              <td className="p-4 text-right text-slate-700">({data.aduKwh || 0} kWh)</td>
              <td className="p-4 text-right text-slate-700">(${(calculation.aduCost || 0).toFixed(2)})</td>
            </tr>
            <tr className="bg-emerald-50">
              <td className="p-4 font-semibold text-slate-900">Main House Portion (Your Usage)</td>
              <td className="p-4 text-right font-semibold text-slate-900">{calculation.mainHouseKwh || 0} kWh</td>
              <td className="p-4 text-right font-semibold text-slate-900">${(calculation.mainHouseCost || 0).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-full md:w-1/2 lg:w-1/3 bg-slate-50 rounded-lg p-4">
          <div className="flex justify-between py-2">
            <span className="font-medium text-slate-600">Subtotal:</span>
            <span className="font-medium text-slate-800">${(calculation.mainHouseCost || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-3 border-t-2 border-slate-300">
            <span className="text-xl font-bold text-slate-900">Total Due:</span>
            <span className="text-xl font-bold text-emerald-600">${(calculation.mainHouseCost || 0).toFixed(2)}</span>
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
        <p>
          <strong className="text-slate-800">Calculation Method:</strong> (Total Bill Amount ÷ Total kWh Usage) × Main House kWh Usage as agreed upon in your lease.
        </p>
      </footer>
    </div>
  );
}
