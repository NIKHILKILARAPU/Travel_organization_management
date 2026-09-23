import React, { useState } from 'react';
import { CustomerProvider, useCustomer } from './context/CustomerContext';
import { CustomerHeader } from './components/common/CustomerHeader';
import { CustomerSidebar } from './components/common/CustomerSidebar';
import { CustomerBottomNav } from './components/common/CustomerBottomNav';
import { ConfirmationModal } from './components/common/ConfirmationModal';
import { CallDriverModal } from './components/common/CallDriverModal';
import { MessageDriverModal } from './components/common/MessageDriverModal';
import { EmergencyModal } from './components/common/EmergencyModal';
import { ReceiptModal } from './components/common/ReceiptModal';
import { CustomerAIAssistant } from './components/ai/CustomerAIAssistant';

// Screens
import { CustomerHome } from './components/home/CustomerHome';
import { BookRideScreen } from './components/booking/BookRideScreen';
import { LiveTripScreen } from './components/live/LiveTripScreen';
import { CustomerTripsScreen } from './components/trips/CustomerTripsScreen';
import { PaymentsScreen } from './components/payments/PaymentsScreen';
import { SavedPlacesScreen } from './components/places/SavedPlacesScreen';
import { CustomerNotificationsScreen } from './components/notifications/CustomerNotificationsScreen';
import { CustomerProfileScreen } from './components/profile/CustomerProfileScreen';
import { SupportScreen } from './components/support/SupportScreen';
import { TripDetailsModal } from './components/trips/TripDetailsModal';
import { X } from 'lucide-react';

const CustomerAppContent: React.FC = () => {
  const { 
    activeTab, 
    isCancelModalOpen, 
    setIsCancelModalOpen, 
    cancelCurrentTrip,
  } = useCustomer();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <CustomerHome />;
      case 'book':
        return <BookRideScreen />;
      case 'live':
        return <LiveTripScreen />;
      case 'trips':
        return <CustomerTripsScreen />;
      case 'payments':
        return <PaymentsScreen />;
      case 'saved-places':
        return <SavedPlacesScreen />;
      case 'notifications':
        return <CustomerNotificationsScreen />;
      case 'profile':
        return <CustomerProfileScreen />;
      case 'support':
        return <SupportScreen />;
      default:
        return <CustomerHome />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-row font-sans select-none antialiased">
      {/* 1. Desktop Persistent Left Navigation Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0 h-full">
        <CustomerSidebar />
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
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
            <CustomerSidebar />
          </div>
        </div>
      )}

      {/* 3. Main Web Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* Top Header Navigation (Fixed at top) */}
        <CustomerHeader 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Scrollable Dynamic Page Content (ONLY this container scrolls) */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-slate-950">
          {renderActiveScreen()}
        </main>

        {/* Mobile Fixed Bottom Navigation Bar */}
        <CustomerBottomNav />
      </div>

      {/* 4. Global Modals & AI Floating Assistant */}
      <TripDetailsModal />
      <CallDriverModal />
      <MessageDriverModal />
      <EmergencyModal />
      <ReceiptModal />
      <CustomerAIAssistant />

      {/* Cancellation Confirmation Modal */}
      <ConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() => cancelCurrentTrip('Customer requested cancellation.')}
        title="Cancel Current Ride?"
        message="Are you sure you want to cancel this booking? Free cancellation is guaranteed within 2 minutes of assigning a driver."
        confirmText="Yes, Cancel Ride"
        cancelText="Keep My Ride"
        type="danger"
      />
    </div>
  );
};

export const CustomerApp: React.FC<{ 
  onLogout?: () => void;
}> = ({ onLogout }) => {
  return (
    <CustomerProvider onLogout={onLogout}>
      <CustomerAppContent />
    </CustomerProvider>
  );
};

export default CustomerApp;
