import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Radio, 
  Users, 
  Car, 
  Link2, 
  Navigation, 
  UserCheck, 
  CreditCard, 
  Banknote, 
  Wrench, 
  FileText, 
  BarChart3, 
  Gauge, 
  Award, 
  History, 
  Bell, 
  Sparkles, 
  Settings, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useManagement } from '../../context/ManagementContext';
import type { ManagementTab } from '../../types';

interface NavItem {
  id: ManagementTab;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: 'blue' | 'emerald' | 'amber' | 'rose';
  section: 'Operations' | 'Fleet & People' | 'Finance' | 'Intelligence' | 'System';
}

interface ManagementSidebarProps {
  onCloseMobile?: () => void;
}

export const ManagementSidebar: React.FC<ManagementSidebarProps> = ({ onCloseMobile }) => {
  const { 
    activeTab, 
    setActiveTab, 
    currentOrg, 
    setCurrentOrg, 
    organizations,
    managerName, 
    unreadNotificationsCount, 
    onLogout 
  } = useManagement();

  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);

  const navItems: NavItem[] = [
    // 1. Operations
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'Operations' },
    { id: 'live', label: 'Live Dispatch', icon: Radio, badge: 'Live', badgeColor: 'emerald', section: 'Operations' },
    { id: 'trips', label: 'Trips & Manifests', icon: Navigation, section: 'Operations' },
    { id: 'assignments', label: 'Vehicle Assignments', icon: Link2, section: 'Operations' },

    // 2. Fleet & People
    { id: 'drivers', label: 'Drivers Fleet', icon: Users, section: 'Fleet & People' },
    { id: 'vehicles', label: 'Vehicles Inventory', icon: Car, section: 'Fleet & People' },
    { id: 'customers', label: 'Customers CRM', icon: UserCheck, section: 'Fleet & People' },

    // 3. Finance & Maintenance
    { id: 'payments', label: 'Payments & Revenue', icon: CreditCard, section: 'Finance' },
    { id: 'earnings', label: 'Driver Settlements', icon: Banknote, section: 'Finance' },
    { id: 'maintenance', label: 'Maintenance Ops', icon: Wrench, section: 'Finance' },
    { id: 'documents', label: 'Document Expiries', icon: FileText, badge: '4 Due', badgeColor: 'rose', section: 'Finance' },

    // 4. Intelligence
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, section: 'Intelligence' },
    { id: 'utilization', label: 'Fleet Utilization', icon: Gauge, section: 'Intelligence' },
    { id: 'performance', label: 'Driver Performance', icon: Award, section: 'Intelligence' },
    { id: 'ai', label: 'AI Operations Manager', icon: Sparkles, badge: 'Copilot', badgeColor: 'blue', section: 'Intelligence' },

    // 5. System
    { id: 'notifications', label: 'Alerts & Notices', icon: Bell, badge: unreadNotificationsCount || undefined, badgeColor: 'blue', section: 'System' },
    { id: 'activity', label: 'System Audit Logs', icon: History, section: 'System' },
    { id: 'settings', label: 'Organization Settings', icon: Settings, section: 'System' },
  ];

  // Unified single role: All navigation items are available for Management
  const visibleItems = navItems;
  const sections = Array.from(new Set(visibleItems.map(item => item.section)));

  const getBadgeStyle = (color?: string, active?: boolean) => {
    if (active) return 'bg-white text-blue-600 border-transparent';
    switch (color) {
      case 'emerald':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/70';
      case 'amber':
        return 'bg-amber-950/80 text-amber-300 border-amber-800/70';
      case 'rose':
        return 'bg-rose-950/80 text-rose-300 border-rose-800/70';
      case 'blue':
      default:
        return 'bg-blue-950/80 text-blue-300 border-blue-800/70';
    }
  };

  return (
    <aside className="w-64 bg-[#091e42] text-blue-100 flex flex-col justify-between h-screen border-r border-blue-900/80 select-none shrink-0 transition-colors">
      {/* Top Organization Switcher & Branding */}
      <div>
        <div className="p-3.5 border-b border-blue-900/80 relative">
          <div 
            onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#0c2452] hover:bg-[#102e68] cursor-pointer border border-blue-800/80 transition-all shadow-2xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm shadow-blue-500/20">
                {currentOrg.logo}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xs font-bold text-white truncate leading-tight">{currentOrg.name}</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-blue-300 font-semibold">
                    {currentOrg.code}
                  </span>
                  <span className="text-[10px] text-blue-200/70">• 50 Active</span>
                </div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-blue-300 shrink-0 ml-1" />
          </div>

          {/* Org Switcher Dropdown */}
          {orgDropdownOpen && (
            <div className="absolute top-full left-3.5 right-3.5 mt-1.5 bg-[#0c2452] border border-blue-800 rounded-lg shadow-xl p-1.5 z-50 space-y-0.5 text-white">
              <span className="text-[10px] font-semibold text-blue-300 uppercase tracking-wider px-2 py-1 block">
                Select Fleet Depot
              </span>
              {organizations.map(org => (
                <button
                  key={org.id}
                  type="button"
                  onClick={() => {
                    setCurrentOrg(org);
                    setOrgDropdownOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-2 ${
                    currentOrg.id === org.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-blue-200 hover:bg-[#102e68] hover:text-white'
                  }`}
                >
                  <span className="text-xs">{org.logo}</span>
                  <span className="truncate">{org.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-190px)]">
          {sections.map(section => {
            const sectionItems = visibleItems.filter(item => item.section === section);
            if (sectionItems.length === 0) return null;

            return (
              <div key={section} className="space-y-1">
                <span className="text-[10px] font-bold text-blue-300/70 uppercase tracking-wider px-2.5 py-1 block">
                  {section}
                </span>

                {sectionItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        onCloseMobile?.();
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md font-semibold'
                          : 'text-blue-200 hover:text-white hover:bg-blue-900/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-blue-300'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`px-1.5 py-0.2 text-[10px] font-semibold rounded-full border ${getBadgeStyle(item.badgeColor, isActive)}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Logout */}
      <div className="p-3 border-t border-blue-900/80">
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#0c2452] border border-blue-800/80 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
              VS
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate leading-tight">{managerName}</p>
              <p className="text-[10px] text-blue-300 font-semibold truncate uppercase mt-0.5">Management</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="p-1.5 rounded-md text-blue-300 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
            title="Log out of console"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
