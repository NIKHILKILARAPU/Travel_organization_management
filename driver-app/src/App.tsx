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
import { X } from 'lucide-react';

const DriverAppContent: React.FC = () => {
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
        return <ProfileScreen />;
      default:
        return <DriverHome />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-row font-sans select-none antialiased text-slate-900">
      {/* 1. Desktop Persistent Left Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar />
      </div>

      {/* 2. Mobile Responsive Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 z-10">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* 3. Main Web Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden min-h-screen">
        {/* Top Header Navigation */}
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Scrollable Dynamic Page Content (Full Widescreen Web Experience) */}
        <main className="flex-1 overflow-y-auto bg-slate-100/70">
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

export default function App() {
  return (
    <DriverProvider>
      <DriverAppContent />
    </DriverProvider>
  );
}
