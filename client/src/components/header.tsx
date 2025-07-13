import { Button } from '@/components/ui/button';
import { Zap, Printer } from 'lucide-react';

export function Header() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="no-print bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <Zap className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">UtilityPro</h1>
              <p className="text-sm text-slate-500">Professional Invoice Generator</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Made for Landlords & Property Managers</span>
            <Button 
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print Invoice
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
