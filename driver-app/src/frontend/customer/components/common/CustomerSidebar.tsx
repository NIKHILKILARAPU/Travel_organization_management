import React from 'react';
import { 
  Home, 
  Car, 
  Navigation, 
  Clock, 
  CreditCard, 
  Bell, 
  User, 
  HelpCircle, 
  MapPin, 
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useCustomer, type CustomerActiveTab } from '../../context/CustomerContext';

export const CustomerSidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    unreadNotificationsCount, 
    customerStatus,
    setIsAIModalOpen,
    profile 
  } = useCustomer();

  const isRideActive = customerStatus !== 'IDLE' && customerStatus !== 'TRIP_COMPLETED' && customerStatus !== 'CANCELLED';

  const navItems: { 
    id: CustomerActiveTab; 
    label: string; 
    icon: React.ElementType; 
    badge?: number | string; 
    badgeColor?: string;
    section?: string;
  }[] = [
    { id: 'home', label: 'Home', icon: Home, section: 'Main' },
    { id: 'book', label: 'Book a Ride', icon: Car, section: 'Main' },
    { 
      id: 'live', 
      label: 'Live Trip', 
      icon: Navigation, 
      badge: isRideActive ? 'LIVE' : undefined,
      badgeColor: 'bg-emerald-500 text-white',
      section: 'Main'
    },
    { id: 'trips', label: 'My Trips', icon: Clock, section: 'Activity' },
    { id: 'payments', label: 'Payments & Wallet', icon: CreditCard, section: 'Activity' },
    { id: 'saved-places', label: 'Saved Places', icon: MapPin, section: 'Activity' },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: Bell, 
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
      badgeColor: 'bg-rose-500 text-white',
      section: 'Personal'
    },
    { id: 'profile', label: 'Profile Settings', icon: User, section: 'Personal' },
    { id: 'support', label: 'Help & 24/7 Support', icon: HelpCircle, section: 'Personal' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex flex-col justify-between h-screen border-r border-slate-200 dark:border-slate-800 select-none flex-shrink-0 shadow-sm">
      {/* 1. Brand & Organization Header */}
      <div>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm shadow-blue-500/20">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-base tracking-tight text-slate-900 dark:text-white">ABC Travels</h1>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  RIDER
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                <Building2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>Travel Organization</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Navigation items grouped */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full min-h-[40px] flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all relative ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span className="tracking-tight">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${item.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. Bottom Section: AI Card & Organization Pass */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
        {/* Travel AI Assistant Quick Launcher */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">Travel Assistant</span>
            </div>
            <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
              AI Powered
            </span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mb-2 font-normal">
            Ask for fare calculation, status tracking, or cancellations.
          </p>
          <button
            onClick={() => setIsAIModalOpen(true)}
            className="w-full min-h-[36px] px-3 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-[11px] font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 border border-blue-200 dark:border-blue-800/60"
          >
            <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span>Open AI Chat</span>
          </button>
        </div>

        {/* Customer Account & Wallet Pill */}
        <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 min-h-[44px]">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-blue-500/20">
            {profile.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{profile.name}</p>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold truncate">
              Wallet: ₹{profile.walletBalance.toLocaleString('en-IN')}
            </p>
          </div>
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
};
