import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Sidebar } from './Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useUserStore } from '@/store/useUserStore';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useUserStore();

  // Don't show navigation on auth pages
  const isAuthPage = location.pathname.includes('/auth');

  if (isAuthPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>

          {/* Mobile Bottom Navigation */}
          {isAuthenticated && (
            <div className="md:hidden">
              <BottomNavigation />
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};