import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, DollarSign, Zap, Droplet } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";
import type { Invoice } from "@shared/schema";

export default function InvoiceHistory() {
  const { data: invoices = [], isLoading } = useQuery<Invoice[]>({
    queryKey: ["/api/invoices"],
  });

  if (isLoading) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Loading invoices...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Invoice History</h1>
          <Link href="/">
            <Button>Create New Invoice</Button>
          </Link>
        </div>

        {invoices.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No invoices yet</h2>
              <p className="text-slate-600 mb-6">
                Create your first invoice to see it here
              </p>
              <Link href="/">
                <Button>Create Invoice</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {invoices.map((invoice) => {
              const landlord = invoice.landlordData as any;
              const tenant = invoice.tenantData as any;
              const calculation = invoice.calculationData as any;
              
              return (
                <Card key={invoice.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {invoice.invoiceType === 'electrical' ? (
                          <div className="p-2 bg-yellow-100 rounded">
                            <Zap className="h-5 w-5 text-yellow-600" />
                          </div>
                        ) : (
                          <div className="p-2 bg-blue-100 rounded">
                            <Droplet className="h-5 w-5 text-blue-600" />
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-lg">
                            Invoice #{invoice.invoiceNumber}
                          </CardTitle>
                          <p className="text-sm text-slate-600 capitalize">
                            {invoice.invoiceType} Utility
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(invoice.invoiceDate), 'MMM dd, yyyy')}</span>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-slate-700">Tenant</p>
                      <p className="text-sm text-slate-600">{tenant.tenantName || 'N/A'}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-slate-600" />
                        <span className="text-lg font-semibold">{invoice.totalAmount}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Here you could implement viewing/reprinting the invoice
                          window.open(`/invoice/${invoice.id}`, '_blank');
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}