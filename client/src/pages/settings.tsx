import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Settings, User, Trash2, Save, Plus, Edit, Users } from 'lucide-react';
import { useLocation } from 'wouter';
import { useLandlordSettings } from '@/hooks/use-landlord-settings';
import { useTenantSettings, TenantInfo } from '@/hooks/use-tenant-settings';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const [, setLocation] = useLocation();
  const { settings, updateField, clearSettings } = useLandlordSettings();
  const { tenants, addTenant, updateTenant, deleteTenant, clearAllTenants } = useTenantSettings();
  const { toast } = useToast();
  
  // Tenant form state
  const [isAddingTenant, setIsAddingTenant] = useState(false);
  const [editingTenant, setEditingTenant] = useState<string | null>(null);
  const [tenantForm, setTenantForm] = useState({ tenantName: '', propertyAddress: '' });

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

  const handleAddTenant = () => {
    if (tenantForm.tenantName.trim() && tenantForm.propertyAddress.trim()) {
      addTenant(tenantForm);
      setTenantForm({ tenantName: '', propertyAddress: '' });
      setIsAddingTenant(false);
      toast({
        title: "Tenant Added",
        description: "Tenant information has been saved and is available in invoice dropdowns.",
      });
    }
  };

  const handleEditTenant = (tenant: TenantInfo) => {
    setEditingTenant(tenant.id);
    setTenantForm({ tenantName: tenant.tenantName, propertyAddress: tenant.propertyAddress });
  };

  const handleUpdateTenant = () => {
    if (editingTenant && tenantForm.tenantName.trim() && tenantForm.propertyAddress.trim()) {
      updateTenant(editingTenant, tenantForm);
      setEditingTenant(null);
      setTenantForm({ tenantName: '', propertyAddress: '' });
      toast({
        title: "Tenant Updated",
        description: "Tenant information has been updated.",
      });
    }
  };

  const handleDeleteTenant = (id: string) => {
    deleteTenant(id);
    toast({
      title: "Tenant Removed",
      description: "Tenant has been removed from your saved list.",
    });
  };

  const handleClearAllTenants = () => {
    clearAllTenants();
    toast({
      title: "All Tenants Cleared",
      description: "All tenant information has been removed from storage.",
    });
  };

  const cancelTenantForm = () => {
    setIsAddingTenant(false);
    setEditingTenant(null);
    setTenantForm({ tenantName: '', propertyAddress: '' });
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

            {/* Privacy Banner */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-6">
              <h4 className="font-medium text-blue-800 mb-1">Privacy Note</h4>
              <p className="text-sm text-blue-700">
                Information is stored locally in your browser only. No data is sent to external servers.
              </p>
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

              <div className="flex flex-col justify-center">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-medium text-slate-800 mb-2">Auto-Save Enabled</h3>
                  <p className="text-sm text-slate-600">
                    Changes are automatically saved to your browser and will pre-fill future invoices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tenant Management Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Tenant Management</h2>
                  <p className="text-sm text-slate-600">Manage your tenants for quick invoice creation</p>
                </div>
              </div>
              <Button
                onClick={() => setIsAddingTenant(true)}
                disabled={isAddingTenant || editingTenant}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Tenant
              </Button>
            </div>

            {/* Add/Edit Tenant Form */}
            {(isAddingTenant || editingTenant) && (
              <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-200">
                <h3 className="font-medium text-slate-800 mb-4">
                  {isAddingTenant ? 'Add New Tenant' : 'Edit Tenant'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder=" "
                      value={tenantForm.tenantName}
                      onChange={(e) => setTenantForm(prev => ({ ...prev, tenantName: e.target.value }))}
                      className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    />
                    <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                      Tenant Name(s)
                    </Label>
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder=" "
                      value={tenantForm.propertyAddress}
                      onChange={(e) => setTenantForm(prev => ({ ...prev, propertyAddress: e.target.value }))}
                      className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    />
                    <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                      Property Address
                    </Label>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button
                    onClick={isAddingTenant ? handleAddTenant : handleUpdateTenant}
                    disabled={!tenantForm.tenantName.trim() || !tenantForm.propertyAddress.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isAddingTenant ? 'Add Tenant' : 'Update Tenant'}
                  </Button>
                  <Button onClick={cancelTenantForm} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Tenants Table */}
            {tenants.length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-hidden border border-slate-200 rounded-lg">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Tenant Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Property Address
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {tenants.map((tenant) => (
                        <tr key={tenant.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                            {tenant.tenantName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            {tenant.propertyAddress}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button
                                onClick={() => handleEditTenant(tenant)}
                                disabled={isAddingTenant || editingTenant}
                                variant="outline"
                                size="sm"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={() => handleDeleteTenant(tenant.id)}
                                disabled={isAddingTenant || editingTenant}
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleClearAllTenants}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All Tenants
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Tenants Added</h3>
                <p className="text-slate-600 mb-4">
                  Add tenants to quickly populate invoice information with saved details.
                </p>
                <Button
                  onClick={() => setIsAddingTenant(true)}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Tenant
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}