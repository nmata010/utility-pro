import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTenantSettings } from "@/hooks/use-tenant-settings";

interface TenantSelectorProps {
  value: string;
  onSelect: (tenantId: string, tenantName: string, propertyAddress: string) => void;
}

export function TenantSelector({ value, onSelect }: TenantSelectorProps) {
  const { tenants } = useTenantSettings();

  const handleValueChange = (tenantId: string) => {
    if (tenantId === 'manual') {
      onSelect('', '', '');
      return;
    }
    
    const tenant = tenants.find(t => t.id === tenantId);
    if (tenant) {
      onSelect(tenantId, tenant.tenantName, tenant.propertyAddress);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-700">
        Select Tenant
      </Label>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full h-12">
          <SelectValue placeholder="Choose a tenant or enter manually" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="manual">
            Enter tenant details manually
          </SelectItem>
          {tenants.length > 0 && (
            <>
              <div className="px-2 py-1.5 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Saved Tenants
              </div>
              {tenants.map((tenant) => (
                <SelectItem key={tenant.id} value={tenant.id}>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{tenant.tenantName}</span>
                    <span className="text-xs text-slate-500">{tenant.propertyAddress}</span>
                  </div>
                </SelectItem>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}