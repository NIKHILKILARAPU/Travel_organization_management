import React, { useState } from 'react';
import { ManagementProvider, useManagement } from './context/ManagementContext';
import { ManagementSidebar } from './components/layout/ManagementSidebar';
import { ManagementHeader } from './components/layout/ManagementHeader';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

// Screens
import { DashboardHome } from './components/dashboard/DashboardHome';
import { LiveTripMonitoring } from './components/live/LiveTripMonitoring';
import { DriverManagement } from './components/drivers/DriverManagement';
import { VehicleManagement } from './components/vehicles/VehicleManagement';
import { AssignmentManagement } from './components/assignments/AssignmentManagement';
import { TripManagement } from './components/trips/TripManagement';
import { CustomerManagement } from './components/customers/CustomerManagement';
import { PaymentManagement } from './components/payments/PaymentManagement';
import { DriverEarningsManagement } from './components/earnings/DriverEarningsManagement';
import { MaintenanceManagement } from './components/maintenance/MaintenanceManagement';
import { DocumentExpiryPanel } from './components/documents/DocumentExpiryPanel';
import { ReportsAnalytics } from './components/reports/ReportsAnalytics';
import { VehicleUtilizationView } from './components/utilization/VehicleUtilizationView';
import { DriverPerformanceView } from './components/performance/DriverPerformanceView';
import { ActivityLogView } from './components/activity/ActivityLogView';
import { ManagementNotificationCenter } from './components/notifications/ManagementNotificationCenter';
import { AIManagerScreen } from './components/ai/AIManagerScreen';
import { OrganizationSettings } from './components/settings/OrganizationSettings';

// Modals & Floating Assistant
import { DriverDetailsModal } from './components/drivers/DriverDetailsModal';
import { AddEditDriverModal } from './components/drivers/AddEditDriverModal';
import { VehicleDetailsModal } from './components/vehicles/VehicleDetailsModal';
import { AddEditVehicleModal } from './components/vehicles/AddEditVehicleModal';
import { AssignmentModal } from './components/assignments/AssignmentModal';
import { TripDetailsModal } from './components/trips/TripDetailsModal';
import { CustomerDetailsModal } from './components/customers/CustomerDetailsModal';
import { ScheduleMaintenanceModal } from './components/maintenance/ScheduleMaintenanceModal';
import { FloatingAIAssistant } from './components/ai/FloatingAIAssistant';

interface ManagementAppProps {
  onLogout?: () => void;
}

const ManagementAppContent: React.FC = () => {
  const { activeTab } = useManagement();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'live':
        return <LiveTripMonitoring />;
      case 'drivers':
        return <DriverManagement />;
      case 'vehicles':
        return <VehicleManagement />;
      case 'assignments':
        return <AssignmentManagement />;
      case 'trips':
        return <TripManagement />;
      case 'customers':
        return <CustomerManagement />;
      case 'payments':
        return <PaymentManagement />;
      case 'earnings':
        return <DriverEarningsManagement />;
      case 'maintenance':
        return <MaintenanceManagement />;
      case 'documents':
        return <DocumentExpiryPanel />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'utilization':
        return <VehicleUtilizationView />;
      case 'performance':
        return <DriverPerformanceView />;
      case 'activity':
        return <ActivityLogView />;
      case 'notifications':
        return <ManagementNotificationCenter />;
      case 'ai':
        return <AIManagerScreen />;
      case 'settings':
        return <OrganizationSettings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 antialiased font-sans">
      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar navigation */}
      <div className={`fixed inset-y-0 left-0 z-50 transform lg:static lg:transform-none transition-transform duration-200 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <ManagementSidebar onCloseMobile={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Main Content Area: fixed header, scrollable body */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Fixed Header */}
        <ManagementHeader onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Scrollable Body Content with generous Apple whitespace */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-8 py-8 space-y-8">
          {renderActiveScreen()}
        </main>
      </div>

      {/* Global Modals */}
      <GlobalSearchModal />
      <DriverDetailsModal />
      <AddEditDriverModal />
      <VehicleDetailsModal />
      <AddEditVehicleModal />
      <AssignmentModal />
      <TripDetailsModal />
      <CustomerDetailsModal />
      <ScheduleMaintenanceModal />

      {/* Floating AI Assistant (rendered when not on full AI tab) */}
      {activeTab !== 'ai' && <FloatingAIAssistant />}
    </div>
  );
};

export const ManagementApp: React.FC<ManagementAppProps> = ({ onLogout }) => {
  return (
    <ManagementProvider onLogout={onLogout}>
      <ManagementAppContent />
    </ManagementProvider>
  );
};

export default ManagementApp;
