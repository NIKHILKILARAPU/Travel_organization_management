import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  ExternalLink, 
  Car, 
  Users, 
  Navigation, 
  CreditCard, 
  Wrench, 
  ShieldAlert 
} from 'lucide-react';
import type { ManagementNotification } from '../../types';

export const ManagementNotificationCenter: React.FC = () => {
  const { notifications, markNotificationRead, setActiveTab } = useManagement();
  const [filterCat, setFilterCat] = useState<string>('ALL');

  const filtered = notifications.filter(n => {
    return filterCat === 'ALL' || n.category === filterCat;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Organization Notification Center</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time telematics alerts, driver requests, and dispatch notices • {unreadCount} unread</p>
        </div>
        <button
          type="button"
          onClick={() => notifications.forEach(n => markNotificationRead(n.id))}
          className="btn-secondary text-xs"
        >
          <CheckCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Mark All Read</span>
        </button>
      </div>

      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700/60 flex-wrap gap-1">
        {(['ALL', 'Vehicle', 'Driver', 'Trip', 'Payment', 'Maintenance', 'System'] as const).map(cat => {
          const count = cat === 'ALL' ? notifications.length : notifications.filter(n => n.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterCat === cat ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.map((item: ManagementNotification) => (
          <div
            key={item.id}
            onClick={() => {
              markNotificationRead(item.id);
              if (item.linkTab) setActiveTab(item.linkTab);
            }}
            className={`saas-card p-4 cursor-pointer transition-all ${
              !item.read ? 'border-blue-500/60 dark:border-blue-500/40 bg-blue-50/20 dark:bg-blue-950/10' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${!item.read ? 'bg-blue-500' : 'bg-transparent'}`}></span>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">{item.title}</h4>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-semibold uppercase">
                  {item.category}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">{item.timestamp}</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">{item.message}</p>
            {item.linkTab && (
              <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  <span>Open {item.linkTab} view</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="saas-card text-center py-12">
            <Bell className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">No notifications match this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
