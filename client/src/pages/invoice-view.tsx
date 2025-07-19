import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer } from 'lucide-react';
import { useLocation } from 'wouter';
import { ElectricalInvoice } from '@/components/electrical-invoice';
import { WaterInvoice } from '@/components/water-invoice';
import type { Invoice } from '@shared/schema';

export default function InvoiceView() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: invoice, isLoading, error } = useQuery<Invoice>({
    queryKey: [`/api/invoices/${id}`],
    enabled: !!id,
  });

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="outline"
            onClick={() => setLocation('/history')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Invoice History
          </Button>
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-red-600">Invoice not found</p>
          </div>
        </div>
      </div>
    );
  }

  // Reconstruct the invoice data from stored JSON
  const invoiceData = invoice.formData ? 
    // Use saved form data if available (new invoices)
    invoice.formData :
    // Fallback for old invoices without form data
    (invoice.invoiceType === 'electrical' ? {
      landlordName: invoice.landlordData.name,
      landlordAddress: invoice.landlordData.address,
      landlordPhone: invoice.landlordData.phone,
      tenantName: invoice.tenantData.name,
      propertyAddress: invoice.tenantData.address,
      billingPeriod: {
        startDate: null,
        endDate: null,
      },
      totalKwh: 0,
      mainBillAmount: 0,
      aduKwh: 0,
    } : {
      landlordName: invoice.landlordData.name,
      landlordAddress: invoice.landlordData.address,
      landlordPhone: invoice.landlordData.phone,
      tenantName: invoice.tenantData.name,
      propertyAddress: invoice.tenantData.address,
      billingPeriod: {
        startDate: null,
        endDate: null,
      },
      totalSqFt: 0,
      tenantSqFt: 0,
      monthlyAllowance: 0,
      quarterlyBill: 0,
    });

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white">
      {/* Header (hidden during print) */}
      <div className="sticky top-0 z-10 bg-white shadow-sm print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setLocation('/history')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to History
            </Button>
            <Button
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print Invoice
            </Button>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:py-0 print:px-0 print:max-w-none">
        {invoice.invoiceType === 'electrical' ? (
          <ElectricalInvoice 
            data={invoiceData}
            calculation={invoice.calculationData}
            viewOnly={true}
          />
        ) : (
          <WaterInvoice 
            data={invoiceData}
            calculation={invoice.calculationData}
            viewOnly={true}
          />
        )}
      </div>
    </div>
  );
}