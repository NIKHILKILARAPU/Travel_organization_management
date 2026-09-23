import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Navigation, 
  Search, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  User, 
  Car, 
  CreditCard, 
  Eye, 
  Ban, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import type { ManagementTripRecord, TripStatus } from '../../types';

export const TripManagement: React.FC = () => {
  const { trips, setSelectedTrip, cancelTrip } = useManagement();
  const [activeTab, setActiveTab] = useState<TripStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredTrips = trips.filter(trip => {
    const matchesTab = activeTab === 'ALL' || trip.status === activeTab;
    const matchesDate = !dateFilter || trip.date === dateFilter;
    const matchesSearch = 
      trip.tripId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (trip.driverName && trip.driverName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (trip.vehicleRegistration && trip.vehicleRegistration.toLowerCase().includes(searchQuery.toLowerCase())) ||
      trip.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesDate && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Transit Dispatch Central</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Live transit bookings, telematics streams, fares, dispatch overrides, and audit trails</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60 overflow-x-auto gap-1">
        {(['ALL', 'REQUESTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const).map(tab => {
          const count = tab === 'ALL' ? trips.length : trips.filter(t => t.status === tab).length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                isActive 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.replace('_', ' ')}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filters */}
      <div className="saas-card p-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full md:max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search trip ID, customer, driver, vehicle, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-saas pl-9"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="input-saas w-auto py-2 text-xs"
          />
          {dateFilter && (
            <button
              type="button"
              onClick={() => setDateFilter('')}
              className="btn-ghost py-1 px-2.5 text-xs text-slate-500"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Trips Table */}
      <div className="saas-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="saas-table-header">
                <th className="py-3 px-4">Trip ID</th>
                <th className="py-3 px-4">Passenger</th>
                <th className="py-3 px-4">Chauffeur</th>
                <th className="py-3 px-4">Fleet Asset</th>
                <th className="py-3 px-4">Transit Route</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Fare</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredTrips.map((trip: ManagementTripRecord) => (
                <tr key={trip.id} className="saas-table-row">
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-900 dark:text-white">
                    {trip.tripId}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{trip.customerName}</div>
                    <div className="text-[11px] text-slate-400">{trip.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    {trip.driverName ? (
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{trip.driverName}</div>
                        <div className="text-[11px] text-slate-400">{trip.driverPhone}</div>
                      </div>
                    ) : (
                      <span className="text-amber-500 italic text-[11px]">Dispatch pending</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {trip.vehicleRegistration ? (
                      <span className="font-mono font-semibold text-xs text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 inline-block">
                        {trip.vehicleRegistration}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 max-w-[220px]">
                    <div className="truncate text-slate-800 dark:text-slate-200 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <span className="truncate">{trip.pickup}</span>
                    </div>
                    <div className="truncate text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                      <span className="truncate">{trip.destination}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-700 dark:text-slate-300 font-medium">{trip.date}</div>
                    <div className="text-[11px] text-slate-400">{trip.time}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">₹{trip.fare}</div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase">{trip.paymentMethod}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={trip.status} type="trip" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedTrip(trip)}
                        className="btn-ghost py-1 px-2.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                      >
                        Inspect
                      </button>

                      {trip.status !== 'COMPLETED' && trip.status !== 'CANCELLED' && (
                        <button
                          type="button"
                          onClick={() => {
                            const reason = prompt('Enter trip cancellation reason:');
                            if (reason) cancelTrip(trip.id, reason);
                          }}
                          className="btn-ghost py-1 px-2.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
