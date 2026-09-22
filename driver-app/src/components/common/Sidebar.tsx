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
    <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0 min-h-screen border-r border-slate-800 shadow-xl select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/20">
          🛺
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold tracking-tight text-white">
              ABC Travels
            </span>
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded">
              DRIVER
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Fleet Management Console</p>
        </div>
      </div>

      {/* Driver Mini Card */}
      <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={driver.avatar} 
              alt={driver.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/40 shadow-sm"
            />
            <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
              status === 'OFFLINE' ? 'bg-slate-400' : 'bg-emerald-500'
            }`} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-white truncate">
              {driver.name}
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              ID: {driver.id} • ⭐ {driver.rating}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono truncate mt-0.5">
              {vehicle.model} • {vehicle.registrationNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
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
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition duration-150 active-press ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && item.badge > 0 ? (
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                  {item.badge}
                </span>
              ) : (
                isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom In-Cab Tools & SOS */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        {/* AI Assistant Quick Launcher */}
        <button
          onClick={() => {
            playBeep('tap');
            setShowAiAssistant(true);
          }}
          className="w-full p-3 rounded-2xl bg-linear-to-r from-emerald-950/80 to-slate-800/90 border border-emerald-500/30 hover:border-emerald-400/60 text-left transition active-press group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Driver AI Copilot
            </span>
            <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
              Ask
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1 line-clamp-1 font-medium">
            "What are my trips today?"
          </p>
        </button>

        {/* Safety SOS */}
        <button
          onClick={() => {
            playBeep('tap');
            setShowEmergencyModal(true);
          }}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-rose-950/40 hover:text-rose-300 text-slate-300 border border-slate-700 hover:border-rose-800 text-xs font-bold transition flex items-center justify-center gap-2 active-press"
        >
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          Safety SOS & Support
        </button>

        <div className="text-center pt-1 text-[10px] text-slate-400 font-mono">
          ABC Travels v2.4.0 (Web)
        </div>
      </div>
    </aside>
  );
};
