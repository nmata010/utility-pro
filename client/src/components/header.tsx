import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Zap, Printer, Settings, History, LogOut, User } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const handlePrint = () => {
    // Add a small delay to ensure the page is fully rendered
    setTimeout(() => {
      // Create a custom print style for browser header/footer suppression
      const printStyle = document.createElement('style');
      printStyle.textContent = `
        @media print {
          @page { margin: 0.5in; }
        }
      `;
      document.head.appendChild(printStyle);
      
      window.print();
      
      // Clean up the style after printing
      setTimeout(() => {
        document.head.removeChild(printStyle);
      }, 1000);
    }, 100);
  };

  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user?.email 
    ? user.email[0].toUpperCase()
    : 'U';

  return (
    <header className="no-print bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
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
            <Button 
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print Invoice
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setLocation('/history')}
              className="hidden sm:inline-flex items-center"
            >
              <History className="mr-2 h-4 w-4" />
              Invoice History
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.profileImageUrl || ''} alt={user?.email || ''} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user?.firstName && user?.lastName && (
                      <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                    )}
                    {user?.email && (
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLocation('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/history')} className="sm:hidden">
                  <History className="mr-2 h-4 w-4" />
                  Invoice History
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.location.href = '/api/logout'}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
