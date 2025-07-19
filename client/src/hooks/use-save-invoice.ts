import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { isUnauthorizedError } from '@/lib/authUtils';
import type { ElectricalData, ElectricalCalculation, WaterData, WaterCalculation } from '@/types/invoice';

interface SaveInvoiceData {
  type: 'electrical' | 'water';
  invoiceNumber: string;
  invoiceDate: Date;
  landlordData: {
    name: string;
    address: string;
    phone: string;
  };
  tenantData: {
    name: string;
    address: string;
  };
  formData: ElectricalData | WaterData;
  calculationData: ElectricalCalculation | WaterCalculation;
  totalAmount: string;
}

export function useSaveInvoice() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: SaveInvoiceData) => {
      const response = await apiRequest('/api/invoices', {
        method: 'POST',
        body: JSON.stringify({
          invoiceType: data.type,
          invoiceNumber: data.invoiceNumber,
          invoiceDate: data.invoiceDate,
          landlordData: data.landlordData,
          tenantData: data.tenantData,
          formData: data.formData,
          calculationData: data.calculationData,
          totalAmount: data.totalAmount,
        }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/invoices'] });
      toast({
        title: "Invoice saved",
        description: "The invoice has been saved to your history.",
      });
    },
    onError: (error) => {
      console.error("Save invoice error:", error);
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to save invoice. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    saveInvoice: mutation.mutate,
    isSaving: mutation.isPending,
  };
}