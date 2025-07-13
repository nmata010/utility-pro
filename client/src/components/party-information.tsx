import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users } from 'lucide-react';

interface PartyInformationProps {
  data: {
    landlordName: string;
    landlordAddress: string;
    landlordPhone: string;
    tenantName: string;
    propertyAddress: string;
  };
  onUpdate: (field: string, value: string) => void;
}

export function PartyInformation({ data, onUpdate }: PartyInformationProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-slate-800 mb-6 flex items-center space-x-2">
        <Users className="h-5 w-5 text-slate-600" />
        <span>Party Information</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-slate-700">Landlord Details</h4>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder=" "
                value={data.landlordName}
                onChange={(e) => onUpdate('landlordName', e.target.value)}
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
                value={data.landlordAddress}
                onChange={(e) => onUpdate('landlordAddress', e.target.value)}
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
                value={data.landlordPhone}
                onChange={(e) => onUpdate('landlordPhone', e.target.value)}
                className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                Landlord Phone
              </Label>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-slate-700">Tenant Details</h4>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder=" "
                value={data.tenantName}
                onChange={(e) => onUpdate('tenantName', e.target.value)}
                className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                Tenant Name(s)
              </Label>
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder=" "
                value={data.propertyAddress}
                onChange={(e) => onUpdate('propertyAddress', e.target.value)}
                className="form-input peer w-full px-4 pt-6 pb-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <Label className="form-floating-label absolute left-4 top-4 text-slate-500 pointer-events-none">
                Property Address
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
