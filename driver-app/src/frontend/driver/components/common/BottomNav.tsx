import React from 'react';
import { useDriver } from '../../context/DriverContext';
import { 
  Home, 
  MapPin, 
  IndianRupee, 
  Bell, 
  User,
  type LucideIcon 
} from 'lucide-react';

interface NavItem {
  id: 'home' | 'trips' | 'earnings' | 'notifications' | 'profile';
  label: string;
  icon: LucideIcon;
  badge?: number;
}

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, unreadNotifCount, playBeep } = useDriver();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'trips', label: 'Trips', icon: MapPin },
    { id: 'earnings', label: 'Earnings', icon: IndianRupee },
    { id: 'notifications', label: 'Alerts', icon: Bell, badge: unreadNotifCount },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 max-w-md mx-auto">
      <div className="flex items-center justify-around h-16 px-2">
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
              className={`flex-1 flex flex-col items-center justify-center py-1 relative min-h-[44px] rounded-[14px] transition-all duration-150 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 font-[700]' 
                  : 'text-slate-500 dark:text-slate-400 font-[590] hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-900 dark:text-slate-100'
              }`}
            >
              <div className="relative">
                <Icon 
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.5px] text-blue-600 dark:text-blue-400' : 'stroke-[1.75px]'
                  }`} 
                />
                
                {item.badge !== undefined && item.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[9px] font-[700] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
                    {item.badge}
                  </span>
                ) : null}
              </div>

              <span className={`text-[10px] mt-1 tracking-tight leading-none ${
                isActive ? 'font-[700] text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'
              }`}>
                {item.label}
              </span>

              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
