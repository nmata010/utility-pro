import { useState } from 'react';
import { Header } from '@/components/header';
import { TabNavigation } from '@/components/tab-navigation';
import { ElectricalForm } from '@/components/electrical-form';
import { WaterForm } from '@/components/water-form';
import { ElectricalInvoice } from '@/components/electrical-invoice';
import { WaterInvoice } from '@/components/water-invoice';
import { useElectricalCalculator } from '@/hooks/use-electrical-calculator';
import { useWaterCalculator } from '@/hooks/use-water-calculator';
import { UtilityType } from '@/types/invoice';

export default function Home() {
  const [activeTab, setActiveTab] = useState<UtilityType>('electric');
  const electrical = useElectricalCalculator();
  const water = useWaterCalculator();

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="no-print space-y-6">
            {activeTab === 'electric' ? (
              <ElectricalForm 
                data={electrical.data}
                calculation={electrical.calculation}
                onUpdate={electrical.updateField}
              />
            ) : (
              <WaterForm 
                data={water.data}
                calculation={water.calculation}
                onUpdate={water.updateField}
              />
            )}
          </div>

          <div className="space-y-6">
            {activeTab === 'electric' ? (
              <ElectricalInvoice 
                data={electrical.data}
                calculation={electrical.calculation}
              />
            ) : (
              <WaterInvoice 
                data={water.data}
                calculation={water.calculation}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
