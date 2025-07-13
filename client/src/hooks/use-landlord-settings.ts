import { useState, useEffect, useCallback } from 'react';

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

const STORAGE_KEY = 'utilitypro-landlord-settings';

export function useLandlordSettings() {
  const [settings, setSettings] = useState<LandlordSettings>(DEFAULT_SETTINGS);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedSettings = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
      }
    } catch (error) {
      console.error('Failed to load landlord settings:', error);
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = useCallback((newSettings: LandlordSettings) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Failed to save landlord settings:', error);
    }
  }, []);

  // Update a single field
  const updateField = useCallback((field: keyof LandlordSettings, value: string) => {
    const newSettings = { ...settings, [field]: value };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  // Clear all settings
  const clearSettings = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSettings(DEFAULT_SETTINGS);
    } catch (error) {
      console.error('Failed to clear landlord settings:', error);
    }
  }, []);

  return {
    settings,
    updateField,
    saveSettings,
    clearSettings,
  };
}