import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';
import { useLocation } from 'wouter';

export default function SettingsPage() {
  const [, setLocation] = useLocation();

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

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center py-12">
            <Settings className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h2 className="text-lg font-medium text-slate-900 mb-2">Settings Coming Soon</h2>
            <p className="text-slate-600">
              This page will contain application settings and preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}