import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Settings, User, Trash2, Save } from 'lucide-react';
import { useLocation } from 'wouter';
import { useLandlordSettings } from '@/hooks/use-landlord-settings';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const [, setLocation] = useLocation();
  const { settings, updateField, clearSettings } = useLandlordSettings();
  const { toast } = useToast();

  const handleClearSettings = () => {
    clearSettings();
    toast({
      title: "Settings Cleared",
      description: "Landlord information has been removed from storage.",
    });
  };

  const handleSaveNotification = () => {
    toast({
      title: "Settings Saved",
      description: "Landlord information is automatically saved and will pre-fill future invoices.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setLocation('/')}
            className="w-10 h-10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Settings className="h-4 w-4 text-slate-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          </div>
        </div>

        <div className="space-y-6">
          {/* Landlord Information Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Landlord Information</h2>
                <p className="text-sm text-slate-600">This information will automatically pre-fill in your invoices</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder=" "
                    value={settings.landlordName}
                    onChange={(e) => updateField('landlordName', e.target.value)}
                    className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                  <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                    Landlord Name
                  </Label>
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder=" "
                    value={settings.landlordAddress}
                    onChange={(e) => updateField('landlordAddress', e.target.value)}
                    className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                  <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                    Landlord Address
                  </Label>
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder=" "
                    value={settings.landlordPhone}
                    onChange={(e) => updateField('landlordPhone', e.target.value)}
                    className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                  <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                    Landlord Phone
                  </Label>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-medium text-slate-800 mb-2">Auto-Save Enabled</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Changes are automatically saved to your browser and will pre-fill future invoices.
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSaveNotification}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Test Save
                    </Button>
                    <Button
                      onClick={handleClearSettings}
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear All
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-1">Privacy Note</h4>
                  <p className="text-sm text-blue-700">
                    Information is stored locally in your browser only. No data is sent to external servers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}