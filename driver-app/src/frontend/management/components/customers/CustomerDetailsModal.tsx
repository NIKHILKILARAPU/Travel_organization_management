import React from 'react';
import { useManagement } from '../../context/ManagementContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  X, 
  User, 
  Building2, 
  Mail, 
  Calendar, 
  MapPin, 
  Star, 
  CreditCard, 
  Bookmark, 
  Clock, 
  ShieldAlert, 
  CheckCircle2 
} from 'lucide-react';

export const CustomerDetailsModal: React.FC = () => {
  const { selectedCustomer, setSelectedCustomer, toggleBlockCustomer, trips } = useManagement();

  if (!selectedCustomer) return null;

  const customerTrips = trips.filter(t => t.customerId === selectedCustomer.customerId || t.customerName === selectedCustomer.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="saas-card max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden my-6 shadow-modal">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {selectedCustomer.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">{selectedCustomer.name}</h2>
                <StatusBadge status={selectedCustomer.status} type="customer" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{selectedCustomer.customerId} • {selectedCustomer.phone}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedCustomer(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider block">Total Rides</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white mt-1 block">{selectedCustomer.totalTrips}</span>
            </div>
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider block">Total Spent</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1 block">₹{selectedCustomer.totalSpent.toLocaleString('en-IN')}</span>
            </div>
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider block">Rating</span>
              <span className="text-lg font-bold text-amber-500 mt-1 block">★ {selectedCustomer.rating.toFixed(1)}</span>
            </div>
            <div className="saas-card p-3 text-center">
              <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider block">Saved Places</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1 block">{selectedCustomer.savedPlacesCount}</span>
            </div>
          </div>

          {/* Account Profile */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Customer Profile Details</span>
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Corporate Organization</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedCustomer.organization}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Email Address</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedCustomer.email}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Member Since</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedCustomer.joinedDate}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Last Transit Date</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedCustomer.lastTripDate}</span>
              </div>
            </div>
          </div>

          {/* Recent Rides */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Recent Dispatch Bookings</span>
            </h4>
            {customerTrips.length > 0 ? (
              <div className="space-y-2">
                {customerTrips.map(t => (
                  <div key={t.id} className="p-3 bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-mono font-semibold text-slate-900 dark:text-white text-xs">{t.tripId} • {t.date}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">{t.pickup} ➔ {t.destination}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900 dark:text-white text-xs">₹{t.fare}</div>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-0.5 block">{t.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-xs italic">No past booking records associated with this account.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              toggleBlockCustomer(selectedCustomer.id);
              setSelectedCustomer(null);
            }}
            className={`btn-ghost text-xs ${
              selectedCustomer.status === 'Blocked' 
                ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40' 
                : 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40'
            }`}
          >
            {selectedCustomer.status === 'Blocked' ? 'Unblock Account' : 'Restrict Account'}
          </button>

          <button
            type="button"
            onClick={() => setSelectedCustomer(null)}
            className="btn-secondary text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
