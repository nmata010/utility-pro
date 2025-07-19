import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { isUnauthorizedError } from '@/lib/authUtils';
import type { LandlordSettings as DBLandlordSettings } from '@shared/schema';

export interface LandlordSettings {
  landlordName: string;
  landlordAddress: string;
  landlordPhone: string;
}

const DEFAULT_SETTINGS: LandlordSettings = {
  landlordName: '',
  landlordAddress: '',
  landlordPhone: '',
};

export function useLandlordSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<LandlordSettings>(DEFAULT_SETTINGS);

  // Fetch settings from database
  const { data: dbSettings } = useQuery<DBLandlordSettings | null>({
    queryKey: ['/api/settings/landlord'],
  });

  // Update local state when database settings are loaded
  useEffect(() => {
    if (dbSettings) {
      setSettings({
        landlordName: dbSettings.landlordName || '',
        landlordAddress: dbSettings.landlordAddress || '',
        landlordPhone: dbSettings.landlordPhone || '',
      });
    }
  }, [dbSettings]);

  // Save settings to database
  const saveMutation = useMutation({
    mutationFn: async (newSettings: LandlordSettings) => {
      await apiRequest('/api/settings/landlord', {
        method: 'POST',
        body: JSON.stringify(newSettings),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings/landlord'] });
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
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Save settings (for compatibility)
  const saveSettings = useCallback((newSettings: LandlordSettings) => {
    setSettings(newSettings);
    saveMutation.mutate(newSettings);
  }, [saveMutation]);

  // Update a single field
  const updateField = useCallback((field: keyof LandlordSettings, value: string) => {
    const newSettings = { ...settings, [field]: value };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  // Clear all settings
  const clearSettings = useCallback(() => {
    const clearedSettings = DEFAULT_SETTINGS;
    saveSettings(clearedSettings);
  }, [saveSettings]);

  return {
    settings,
    updateField,
    saveSettings,
    clearSettings,
    isSaving: saveMutation.isPending,
  };
}