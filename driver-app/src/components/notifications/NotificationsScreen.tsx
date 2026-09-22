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
        return <Bell className="w-5 h-5 text-emerald-600" />;
      case 'service':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'payment':
        return <IndianRupee className="w-5 h-5 text-emerald-600" />;
      case 'announcement':
      default:
        return <Megaphone className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotifBg = (type: string) => {
    switch (type) {
      case 'trip':
        return 'bg-emerald-50 border-emerald-100';
      case 'service':
        return 'bg-amber-50 border-amber-100';
      case 'payment':
        return 'bg-emerald-50 border-emerald-100';
      case 'announcement':
      default:
        return 'bg-blue-50 border-blue-100';
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
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Notification Center
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Trip dispatches, payment deposits, service warnings, and fleet depot bulletins
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 flex items-center gap-1.5 active-press transition self-start sm:self-auto"
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
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition active-press ${
              filterType === type 
                ? 'bg-slate-900 text-white shadow-xs' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
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
            className={`p-5 rounded-3xl border transition-all cursor-pointer active-press ${
              notif.read 
                ? 'bg-white border-slate-200/80 shadow-2xs hover:border-slate-300' 
                : 'bg-white border-emerald-400 shadow-card ring-1 ring-emerald-400/20'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Type Icon */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border ${getNotifBg(notif.type)}`}>
                {getNotifIcon(notif.type)}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {notif.title}
                  </h4>
                  <span className="text-xs text-slate-400 font-medium flex-shrink-0">
                    {notif.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {notif.message}
                </p>

                {notif.actionTripId && (
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200/60">
                    View Trip Details
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Unread dot */}
              {!notif.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
