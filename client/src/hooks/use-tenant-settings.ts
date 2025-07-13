import { useState, useEffect, useCallback } from 'react';

export interface TenantInfo {
  id: string;
  tenantName: string;
  propertyAddress: string;
}

const STORAGE_KEY = 'utilitypro-tenant-settings';

export function useTenantSettings() {
  const [tenants, setTenants] = useState<TenantInfo[]>([]);

  // Load tenants from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedTenants = JSON.parse(stored);
        setTenants(parsedTenants || []);
      }
    } catch (error) {
      console.error('Failed to load tenant settings:', error);
    }
  }, []);

  // Save tenants to localStorage
  const saveTenants = useCallback((newTenants: TenantInfo[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTenants));
      setTenants(newTenants);
    } catch (error) {
      console.error('Failed to save tenant settings:', error);
    }
  }, []);

  // Add a new tenant
  const addTenant = useCallback((tenant: Omit<TenantInfo, 'id'>) => {
    const newTenant: TenantInfo = {
      ...tenant,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    const newTenants = [...tenants, newTenant];
    saveTenants(newTenants);
  }, [tenants, saveTenants]);

  // Update an existing tenant
  const updateTenant = useCallback((id: string, updates: Partial<Omit<TenantInfo, 'id'>>) => {
    const newTenants = tenants.map(tenant =>
      tenant.id === id ? { ...tenant, ...updates } : tenant
    );
    saveTenants(newTenants);
  }, [tenants, saveTenants]);

  // Delete a tenant
  const deleteTenant = useCallback((id: string) => {
    const newTenants = tenants.filter(tenant => tenant.id !== id);
    saveTenants(newTenants);
  }, [tenants, saveTenants]);

  // Clear all tenants
  const clearAllTenants = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setTenants([]);
    } catch (error) {
      console.error('Failed to clear tenant settings:', error);
    }
  }, []);

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
  };
}