import { useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { isUnauthorizedError } from '@/lib/authUtils';
import type { Tenant } from '@shared/schema';

export interface TenantInfo {
  id: string;
  tenantName: string;
  propertyAddress: string;
}

export function useTenantSettings() {
  const { toast } = useToast();

  // Fetch tenants from database
  const { data: dbTenants = [], isLoading } = useQuery<Tenant[]>({
    queryKey: ['/api/tenants'],
  });

  // Convert database tenants to TenantInfo format
  const tenants: TenantInfo[] = dbTenants.map(tenant => ({
    id: tenant.id.toString(),
    tenantName: tenant.tenantName,
    propertyAddress: tenant.tenantAddress || '',
  }));

  // Add tenant mutation
  const addMutation = useMutation({
    mutationFn: async (tenant: Omit<TenantInfo, 'id'>) => {
      await apiRequest('/api/tenants', {
        method: 'POST',
        body: JSON.stringify({
          tenantName: tenant.tenantName,
          tenantAddress: tenant.propertyAddress,
          tenantPhone: '',
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tenants'] });
      toast({
        title: "Tenant added",
        description: "The tenant has been added successfully.",
      });
    },
    onError: (error) => {
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
        description: "Failed to add tenant. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update tenant mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Omit<TenantInfo, 'id'>> }) => {
      await apiRequest(`/api/tenants/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          tenantName: updates.tenantName,
          tenantAddress: updates.propertyAddress,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tenants'] });
    },
    onError: (error) => {
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
        description: "Failed to update tenant. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete tenant mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest(`/api/tenants/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tenants'] });
      toast({
        title: "Tenant deleted",
        description: "The tenant has been removed successfully.",
      });
    },
    onError: (error) => {
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
        description: "Failed to delete tenant. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Add a new tenant
  const addTenant = useCallback((tenant: Omit<TenantInfo, 'id'>) => {
    addMutation.mutate(tenant);
  }, [addMutation]);

  // Update an existing tenant
  const updateTenant = useCallback((id: string, updates: Partial<Omit<TenantInfo, 'id'>>) => {
    updateMutation.mutate({ id, updates });
  }, [updateMutation]);

  // Delete a tenant
  const deleteTenant = useCallback((id: string) => {
    deleteMutation.mutate(id);
  }, [deleteMutation]);

  // Clear all tenants (not implemented for database)
  const clearAllTenants = useCallback(() => {
    toast({
      title: "Not available",
      description: "Bulk delete is not available. Delete tenants individually.",
      variant: "destructive",
    });
  }, [toast]);

  // Get tenant by ID
  const getTenantById = useCallback((id: string) => {
    return tenants.find(tenant => tenant.id === id);
  }, [tenants]);

  return {
    tenants,
    addTenant,
    updateTenant,
    deleteTenant,
    clearAllTenants,
    getTenantById,
    isLoading,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}