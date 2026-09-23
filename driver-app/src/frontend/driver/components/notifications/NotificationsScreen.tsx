import React, { useState } from 'react';
import { useDriver } from '../../context/DriverContext';
import { 
  Bell, 
  AlertTriangle, 
  IndianRupee, 
  Megaphone, 
  CheckCheck, 
  ChevronRight
} from 'lucide-react';

export const NotificationsScreen: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    trips, 
    openTripDetails 
  } = useDriver();

  const [filterType, setFilterType] = useState<'all' | 'trip' | 'payment' | 'service'>('all');

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'trip':
        return <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'service':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'payment':
        return <IndianRupee className="w-5 h-5 text-emerald-500" />;
      case 'announcement':
      default:
        return <Megaphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getNotifBg = (type: string) => {
    switch (type) {
      case 'trip':
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
      case 'service':
        return 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/20';
      case 'payment':
        return 'bg-emerald-500/10 border-[#34C759]/20';
      case 'announcement':
      default:
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
    }
  };

  const filteredNotifs = notifications.filter(n => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationAsRead(notif.id);
    if (notif.actionTripId) {
      const match = trips.find(t => t.id === notif.actionTripId || t.tripNumber === notif.actionTripId);
      if (match) {
        openTripDetails(match);
      }
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight">
            Notification Center
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-[400] mt-0.5">
            Trip dispatches, payment deposits, service warnings, and fleet depot bulletins
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="min-h-[44px] text-xs font-[590] text-blue-600 dark:text-blue-400 hover:opacity-80 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-[14px] border border-blue-200 dark:border-blue-800 flex items-center gap-1.5 active-press transition self-start sm:self-auto"
        >
          <CheckCheck className="w-4 h-4" />
          Mark all as read
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['all', 'trip', 'payment', 'service'] as const).map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`min-h-[44px] px-4 py-2 rounded-[14px] text-xs font-[590] capitalize transition active-press ${
              filterType === type 
                ? 'bg-white dark:bg-slate-800/60 text-white dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]' 
                : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800'
            }`}
          >
            {type === 'all' ? 'All Alerts' : type + ' alerts'}
          </button>
        ))}
      </div>

      {/* Notifications Inbox List */}
      <div className="space-y-3">
        {filteredNotifs.map(notif => (
          <div
            key={notif.id}
            onClick={() => handleNotificationClick(notif)}
            className={`p-5 rounded-[14px] border transition-all cursor-pointer active-press ${
              notif.read 
                ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] hover:border-[#86868B]' 
                : 'bg-white dark:bg-slate-900 border-blue-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] ring-1 ring-[#0071E3]/20'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Type Icon */}
              <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0 border ${getNotifBg(notif.type)}`}>
                {getNotifIcon(notif.type)}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-[700] text-slate-900 dark:text-slate-100 truncate">
                    {notif.title}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-[400] flex-shrink-0">
                    {notif.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-[400] mt-1 leading-relaxed">
                  {notif.message}
                </p>

                {notif.actionTripId && (
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-[590] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-[14px] border border-blue-200 dark:border-blue-800">
                    View Trip Details
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Unread dot */}
              {!notif.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
