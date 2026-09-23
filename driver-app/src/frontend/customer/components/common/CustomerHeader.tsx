import React from 'react';
import { 
  Bell, 
  MapPin, 
  Menu, 
  Sparkles, 
  ShieldAlert,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

interface CustomerHeaderProps {
  onOpenMobileMenu: () => void;
}

export const CustomerHeader: React.FC<CustomerHeaderProps> = ({ 
  onOpenMobileMenu 
}) => {
  const { 
    profile, 
    unreadNotificationsCount, 
    setActiveTab, 
    setIsEmergencyModalOpen,
    setIsAIModalOpen,
    customerStatus
  } = useCustomer();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const isRideActive = customerStatus !== 'IDLE' && customerStatus !== 'TRIP_COMPLETED' && customerStatus !== 'CANCELLED';

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-3 transition-colors flex-shrink-0">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Mobile Menu Toggle + Rider Profile / Org Badge */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-200 dark:ring-slate-700 group-hover:ring-blue-500 transition-all"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400">{getGreeting()},</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {profile.name.split(' ')[0]}
                </span>
                <span className="hidden sm:inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 uppercase tracking-wider">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  Verified Org Pass
                </span>
              </div>

              {/* City / Hub location indicator */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                  <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="truncate max-w-[130px] sm:max-w-[200px]">{profile.city} Hub</span>
                  <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Live Trip Status Indicator on Desktop */}
        {isRideActive && (
          <div 
            onClick={() => setActiveTab('live')}
            className="hidden md:flex items-center gap-2.5 px-3.5 min-h-[38px] rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold cursor-pointer hover:bg-blue-100 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>Active Ride En Route</span>
            <span className="text-[11px] bg-blue-600 text-white px-2 py-0.5 rounded">View Map</span>
          </div>
        )}

        {/* Right: Quick actions, notifications, emergency SOS */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Emergency SOS Button */}
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="flex items-center justify-center gap-1.5 min-w-[38px] px-2.5 sm:px-3 min-h-[38px] bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 rounded-lg text-xs font-bold transition-all active:scale-95"
            title="Emergency SOS Assistance (112)"
          >
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span className="hidden sm:inline">SOS</span>
          </button>

          {/* AI Travel Assistant Quick Button */}
          <button
            onClick={() => setIsAIModalOpen(true)}
            className="flex items-center justify-center gap-1.5 min-w-[38px] px-3 min-h-[38px] bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all active:scale-95 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="hidden md:inline">Travel AI</span>
          </button>


          {/* Notifications Button with unread counter */}
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
