import React from 'react';
import { useDriver } from '../../context/DriverContext';
import { 
  Home, 
  MapPin, 
  IndianRupee, 
  Car, 
  Bell, 
  User, 
  Sparkles, 
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

interface SidebarNavItem {
  id: 'home' | 'trips' | 'earnings' | 'vehicle' | 'notifications' | 'profile';
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    unreadNotifCount, 
    driver, 
    vehicle, 
    status,
    setShowAiAssistant, 
    setShowEmergencyModal,
    playBeep 
  } = useDriver();

  const navItems: SidebarNavItem[] = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'trips', label: 'My Trips', icon: MapPin },
    { id: 'earnings', label: 'Earnings & Payouts', icon: IndianRupee },
    { id: 'vehicle', label: 'Assigned Vehicle', icon: Car },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifCount },
    { id: 'profile', label: 'Driver Profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex flex-col flex-shrink-0 min-h-screen border-r border-slate-200 dark:border-slate-800 shadow-sm select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-sm shadow-blue-500/20">
          🛺
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
              ABC Travels
            </span>
            <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-1.5 py-0.2 rounded-md">
              DRIVER
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Fleet Driver Console</p>
        </div>
      </div>

      {/* Driver Mini Card */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={driver.avatar} 
              alt={driver.name}
              className="w-11 h-11 rounded-xl object-cover border-2 border-blue-500/30"
            />
            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
              status === 'OFFLINE' ? 'bg-slate-400' : 'bg-emerald-500'
            }`} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {driver.name}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              ID: {driver.id} • ⭐ {driver.rating}
            </div>
            <div className="text-[11px] text-blue-600 dark:text-blue-400 font-mono truncate mt-0.5 font-medium">
              {vehicle.model} • {vehicle.registrationNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                playBeep('tap');
                setActiveTab(item.id);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition duration-150 active:scale-[0.99] min-h-[40px] ${
                isActive 
                  ? 'bg-blue-600 text-white font-semibold shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && item.badge > 0 ? (
                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              ) : (
                isActive && <ChevronRight className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom In-Cab Tools & SOS */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
        {/* AI Assistant Quick Launcher */}
        <button
          onClick={() => {
            playBeep('tap');
            setShowAiAssistant(true);
          }}
          className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500/40 text-left transition active:scale-[0.99] group min-h-[44px]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Driver AI Copilot
            </span>
            <span className="text-[10px] font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">
              Ask
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
            "What are my trips today?"
          </p>
        </button>

        {/* Safety SOS */}
        <button
          onClick={() => {
            playBeep('tap');
            setShowEmergencyModal(true);
          }}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 text-xs font-bold transition flex items-center justify-center gap-2 active:scale-[0.99] min-h-[40px]"
        >
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          Safety SOS & Support
        </button>

        <div className="text-center pt-1 text-[10px] text-slate-400 font-mono">
          ABC Travels v2.4.0 (Web)
        </div>
      </div>
    </aside>
  );
};
