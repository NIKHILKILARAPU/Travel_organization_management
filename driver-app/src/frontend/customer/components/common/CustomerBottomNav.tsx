import React from 'react';
import { 
  Home, 
  Car, 
  Clock, 
  Bell, 
  User, 
  Navigation 
} from 'lucide-react';
import { useCustomer, type CustomerActiveTab } from '../../context/CustomerContext';

export const CustomerBottomNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    unreadNotificationsCount, 
    customerStatus 
  } = useCustomer();

  const isRideActive = customerStatus !== 'IDLE' && customerStatus !== 'TRIP_COMPLETED' && customerStatus !== 'CANCELLED';

  const tabs: { id: CustomerActiveTab; label: string; icon: React.ElementType; badge?: number | boolean }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'book', label: 'Book', icon: Car },
    { 
      id: isRideActive ? 'live' : 'trips', 
      label: isRideActive ? 'Live' : 'Trips', 
      icon: isRideActive ? Navigation : Clock,
      badge: isRideActive
    },
    { 
      id: 'notifications', 
      label: 'Alerts', 
      icon: Bell, 
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : false 
    },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 px-3 py-2 flex-shrink-0">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] rounded-[14px] transition-all relative ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 font-[700]' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-900 dark:text-slate-100'
              }`}
            >
              {/* Active subtle pill background */}
              <div className={`p-1.5 rounded-[14px] transition-all relative ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-rose-500 text-white text-[9px] font-[700] w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                    {tab.badge}
                  </span>
                )}
                {typeof tab.badge === 'boolean' && tab.badge && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping ring-2 ring-white dark:ring-slate-900" />
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-[590]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
