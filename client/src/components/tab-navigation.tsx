import { Button } from '@/components/ui/button';
import { Zap, Droplets } from 'lucide-react';
import { UtilityType } from '@/types/invoice';

interface TabNavigationProps {
  activeTab: UtilityType;
  onTabChange: (tab: UtilityType) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="no-print mb-8">
      <div className="bg-white rounded-xl shadow-sm p-2 inline-flex space-x-2">
        <Button
          onClick={() => onTabChange('electric')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
            activeTab === 'electric'
              ? 'tab-active text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 bg-transparent'
          }`}
        >
          <Zap className="h-4 w-4" />
          <span>Electrical Utility</span>
        </Button>
        <Button
          onClick={() => onTabChange('water')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
            activeTab === 'water'
              ? 'tab-active text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 bg-transparent'
          }`}
        >
          <Droplets className="h-4 w-4" />
          <span>Water Utility</span>
        </Button>
      </div>
    </div>
  );
}
