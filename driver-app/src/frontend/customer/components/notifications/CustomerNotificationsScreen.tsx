import React, { useState } from 'react';
import { 
  Bell, 
  Car, 
  CreditCard, 
  Tag, 
  Settings, 
  CheckCheck, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { EmptyState } from '../common/EmptyState';
import type { CustomerNotification } from '../../types';

export const CustomerNotificationsScreen: React.FC = () => {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    unreadNotificationsCount,
    setSelectedTripForDetails,
    trips
  } = useCustomer();

  const [activeCategory, setActiveCategory] = useState<'All' | CustomerNotification['category']>('All');

  const categories = ['All', 'Booking', 'Driver', 'Payment', 'Offers', 'System'] as const;

  const filteredNotifications = notifications.filter((n) => {
    if (activeCategory !== 'All' && n.category !== activeCategory) {
      return false;
    }
    return true;
  });

  const getCategoryIcon = (category: CustomerNotification['category']) => {
    switch (category) {
      case 'Booking':
        return <Car className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'Driver':
        return <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'Payment':
        return <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'Offers':
        return <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'System':
      default:
        return <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
    }
  };

  const handleNotificationClick = (n: CustomerNotification) => {
    markNotificationRead(n.id);
    if (n.tripId) {
      const matchedTrip = trips.find(t => t.tripId === n.tripId);
      if (matchedTrip) setSelectedTripForDetails(matchedTrip);
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6 pb-24 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-[700] text-slate-900 dark:text-slate-100">Notifications</h1>
            {unreadNotificationsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-[700] text-xs">
                {unreadNotificationsCount} unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-[400]">
            Trip updates, driver alerts, fare receipts and organization announcements
          </p>
        </div>

        {unreadNotificationsCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="self-start sm:self-auto min-h-[44px] px-3.5 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-[#E5E5EA] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-[590] rounded-[14px] transition-all flex items-center gap-1.5 active:scale-95"
          >
            <CheckCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Categories Filter Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const count = cat === 'All' ? notifications.length : notifications.filter(n => n.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`min-h-[44px] px-4 rounded-[14px] text-xs font-[590] transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                isActive
                  ? 'bg-white dark:bg-slate-800/60 text-white dark:text-slate-100 border-transparent'
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 dark:border-slate-700'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-[14px] ${
                  isActive ? 'bg-white/20 dark:bg-slate-900/20' : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-500 dark:text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No Notifications"
          description="You're all caught up! Updates regarding your rides, drivers, and payments will appear here."
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-4 rounded-[14px] border transition-all cursor-pointer flex items-start gap-4 ${
                !notif.read
                  ? 'bg-white dark:bg-slate-900 border-blue-600'
                  : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:bg-white dark:hover:bg-white dark:bg-slate-900'
              }`}
            >
              <div className="w-10 h-10 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                {getCategoryIcon(notif.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-xs sm:text-sm font-[700] ${!notif.read ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-[10px] font-[590] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 px-1.5 py-0.5 rounded-[6px]">
                      {notif.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-[400] whitespace-nowrap">
                    {notif.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-900 dark:text-slate-100 font-[400] leading-relaxed">
                  {notif.message}
                </p>

                {notif.tripId && (
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-[590] text-blue-600 dark:text-blue-400 hover:underline">
                    <span>View Trip #{notif.tripId}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {!notif.read && (
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
