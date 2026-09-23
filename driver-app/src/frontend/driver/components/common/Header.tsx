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
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile menu toggle + Greeting & Status */}
        <div className="flex items-center gap-3">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition min-h-[40px]"
              aria-label="Open Navigation Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                {getGreeting()}, {driver.name.split(' ')[0]} 👋
              </h1>
              <StatusBadge status={status} size="sm" />
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>{driver.organization}</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
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
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-lg transition active:scale-95 min-h-[38px]"
            title="Simulate incoming passenger trip request"
          >
            <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            Simulate Trip Request
          </button>

          {/* Break toggle button (when online) */}
          {status !== 'ON TRIP' && (
            <button
              onClick={() => {
                playBeep('tap');
                setStatus(status === 'BREAK' ? 'ONLINE' : 'BREAK');
              }}
              className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition active:scale-95 min-h-[38px] ${
                status === 'BREAK'
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
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
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition active:scale-95 min-h-[38px] shadow-sm ${
              isOnline
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Power className="w-3.5 h-3.5 stroke-[2.5]" />
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>

          {/* AI In-Cab Copilot Quick Button */}
          <button
            onClick={() => setShowAiAssistant(true)}
            className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition border border-slate-200 dark:border-slate-700 min-h-[38px] min-w-[38px]"
            title="Driver AI Assistant"
            aria-label="Driver AI Assistant"
          >
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
          </button>

          {/* Safety SOS Hub */}
          <button
            onClick={() => setShowEmergencyModal(true)}
            className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 active:scale-95 transition border border-slate-200 dark:border-slate-700 min-h-[38px] min-w-[38px]"
            title="Emergency & Safety Support"
            aria-label="Emergency & Safety Support"
          >
            <ShieldAlert className="w-4 h-4 text-rose-500 transition-colors" />
          </button>

          {/* Notifications */}
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition border border-slate-200 dark:border-slate-700 min-h-[38px] min-w-[38px]"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Driver mini profile avatar */}
          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800 cursor-pointer group"
          >
            <img 
              src={driver.avatar} 
              alt={driver.name}
              className="w-9 h-9 rounded-lg object-cover ring-2 ring-blue-500/20 group-hover:ring-blue-500 transition"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
