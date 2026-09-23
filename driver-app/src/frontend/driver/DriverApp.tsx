import React, { useState } from 'react';
import { DriverProvider, useDriver } from './context/DriverContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { DriverHome } from './components/home/DriverHome';
import { TripsScreen } from './components/trips/TripsScreen';
import { EarningsScreen } from './components/earnings/EarningsScreen';
import { VehicleScreen } from './components/vehicle/VehicleScreen';
import { NotificationsScreen } from './components/notifications/NotificationsScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { TripDetailsModal } from './components/trip/TripDetailsModal';
import { IncomingTripRequestModal } from './components/trip/IncomingTripRequestModal';
import { EmergencyModal } from './components/common/EmergencyModal';
import { CallCustomerModal } from './components/common/CallCustomerModal';
import { MessageCustomerModal } from './components/common/MessageCustomerModal';
import { ReportIssueModal } from './components/vehicle/ReportIssueModal';
import { DriverAIAssistant } from './components/ai/DriverAIAssistant';
import { X, LogOut } from 'lucide-react';

interface DriverAppContentProps {
  onLogout?: () => void;
}

const DriverAppContent: React.FC<DriverAppContentProps> = ({ onLogout }) => {
  const { activeTab } = useDriver();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <DriverHome />;
      case 'trips':
        return <TripsScreen />;
      case 'earnings':
        return <EarningsScreen />;
      case 'vehicle':
        return <VehicleScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'profile':
        return <ProfileScreen onLogout={onLogout} />;
      default:
        return <DriverHome />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-row font-sans select-none antialiased text-slate-900 dark:text-slate-100 relative">
      {/* 1. Desktop Persistent Left Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0 h-full">
        <Sidebar />
      </div>

      {/* 2. Mobile Responsive Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-slate-900 z-10">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white p-2 min-h-[44px]"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* 3. Main Web Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* Driver Top Banner (Fixed) */}
        <div className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-900 dark:text-white">ABC Travels — Driver Console</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 py-1 px-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 transition-all active:scale-95 cursor-pointer text-xs font-medium"
              title="Logout to Login Screen"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Top Header Navigation (Fixed) */}
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Scrollable Dynamic Page Content (ONLY this container scrolls) */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-slate-950">
          {renderActiveTab()}
        </main>
      </div>

      {/* 4. Global Modals & In-Cab Overlays */}
      <TripDetailsModal />
      <IncomingTripRequestModal />
      <EmergencyModal />
      <CallCustomerModal />
      <MessageCustomerModal />
      <ReportIssueModal />
      <DriverAIAssistant />
    </div>
  );
};

export interface DriverAppProps {
  onLogout?: () => void;
}

export const DriverApp: React.FC<DriverAppProps> = ({ onLogout }) => {
  return (
    <DriverProvider>
      <DriverAppContent onLogout={onLogout} />
    </DriverProvider>
  );
};

export default DriverApp;
