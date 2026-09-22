import React from 'react';
import { useDriver } from '../../context/DriverContext';
import { StatusBadge } from './StatusBadge';
import { 
  Bell, 
  ShieldAlert, 
  Sparkles, 
  Power, 
  Coffee,
  Radio,
  Clock
} from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { 
    driver, 
    status, 
    setStatus,
    toggleOnline,
    unreadNotifCount, 
    setActiveTab, 
    setShowEmergencyModal, 
    setShowAiAssistant,
    simulateIncomingTrip,
    playBeep 
  } = useDriver();

  const isOnline = status === 'ONLINE' || status === 'AVAILABLE' || status === 'ON TRIP';

  // Dynamic greeting based on current local hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 shadow-xs">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile menu toggle + Greeting & Status */}
        <div className="flex items-center gap-3">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 active-press transition"
              aria-label="Open Navigation Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                {getGreeting()}, {driver.name.split(' ')[0]} 👋
              </h1>
              <StatusBadge status={status} size="sm" />
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
              <span>{driver.organization}</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
                <Clock className="w-3 h-3 text-slate-400" />
                Shift Active (3h 42m)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick In-Cab Web Controls & Status Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Quick Dispatch Alert Simulator Button */}
          <button
            onClick={simulateIncomingTrip}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl transition active-press"
            title="Simulate incoming passenger trip request"
          >
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            Simulate Trip Request
          </button>

          {/* Break toggle button (when online) */}
          {status !== 'ON TRIP' && (
            <button
              onClick={() => {
                playBeep('tap');
                setStatus(status === 'BREAK' ? 'ONLINE' : 'BREAK');
              }}
              className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition active-press ${
                status === 'BREAK'
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="Pause trips for break"
            >
              <Coffee className="w-3.5 h-3.5" />
              {status === 'BREAK' ? 'End Break' : 'Take Break'}
            </button>
          )}

          {/* Online / Offline Quick Button */}
          <button
            onClick={toggleOnline}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black tracking-wide uppercase transition active-press shadow-xs ${
              isOnline
                ? 'bg-slate-900 hover:bg-slate-800 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Power className="w-3.5 h-3.5 stroke-[2.5]" />
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>

          {/* AI In-Cab Copilot Quick Button */}
          <button
            onClick={() => setShowAiAssistant(true)}
            className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center hover:bg-emerald-100 active-press transition border border-emerald-200/80 shadow-2xs"
            title="Driver AI Assistant"
            aria-label="Driver AI Assistant"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
          </button>

          {/* Safety SOS Hub */}
          <button
            onClick={() => setShowEmergencyModal(true)}
            className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 active-press transition border border-slate-200 shadow-2xs"
            title="Emergency & Safety Support"
            aria-label="Emergency & Safety Support"
          >
            <ShieldAlert className="w-4 h-4 text-slate-600 hover:text-rose-600 transition-colors" />
          </button>

          {/* Notifications */}
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 active-press transition border border-slate-200 shadow-2xs"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 border-2 border-white shadow-2xs">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* Driver Profile Link Avatar */}
          <button
            onClick={() => setActiveTab('profile')}
            className="rounded-full ring-2 ring-emerald-500/30 hover:ring-emerald-500 active-press transition ml-1"
            title="View Profile"
          >
            <img 
              src={driver.avatar} 
              alt={driver.name}
              className="w-8 h-8 rounded-full object-cover" 
            />
          </button>
        </div>
      </div>
    </header>
  );
};
