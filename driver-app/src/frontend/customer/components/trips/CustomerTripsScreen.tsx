import React, { useState } from 'react';
import { 
  Clock, 
  ChevronRight, 
  Search 
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { StatusBadge } from '../common/StatusBadge';
import { EmptyState } from '../common/EmptyState';

export const CustomerTripsScreen: React.FC = () => {
  const { trips, setSelectedTripForDetails, startBookingFlow } = useCustomer();
  const [activeSubTab, setActiveSubTab] = useState<'All' | 'Upcoming' | 'Active' | 'Completed' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = ['All', 'Upcoming', 'Active', 'Completed', 'Cancelled'] as const;

  const filteredTrips = trips.filter((t) => {
    // Tab filter
    if (activeSubTab !== 'All' && t.status !== activeSubTab) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.tripId.toLowerCase().includes(q) ||
        t.driver.name.toLowerCase().includes(q) ||
        t.pickupLocation.toLowerCase().includes(q) ||
        t.destinationLocation.toLowerCase().includes(q) ||
        t.driver.vehicleRegistration.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6 pb-24 lg:pb-8">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-[700] text-slate-900 dark:text-slate-100">My Trips</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            View booking status, past invoices, driver details and receipts
          </p>
        </div>
        <button
          onClick={() => startBookingFlow()}
          className="self-start sm:self-auto min-h-[44px] px-4 bg-blue-600 text-white text-xs font-[590] rounded-[14px] transition-all active:scale-95"
        >
          + Book New Ride
        </button>
      </div>

      {/* Search & Tabs Filter Row */}
      <div className="bg-white dark:bg-slate-900 rounded-[14px] p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Filter Tabs: Upcoming, Active, Completed, Cancelled */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {filterTabs.map((tab) => {
            const count = tab === 'All' ? trips.length : trips.filter((t) => t.status === tab).length;
            const isActive = activeSubTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`py-2 px-3.5 rounded-[14px] text-xs font-[590] transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:opacity-80'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-[14px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#D2D2D7] dark:bg-[#38383A] text-slate-900 dark:text-slate-100'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Trip ID, place, driver..."
            className="w-full bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 pl-9 pr-3.5 min-h-[44px] rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 focus:bg-white dark:focus:bg-white dark:bg-slate-900 focus:border-blue-600 outline-none placeholder:text-slate-500 dark:text-slate-400"
          />
        </div>
      </div>

      {/* Trips List */}
      {filteredTrips.length === 0 ? (
        <EmptyState
          icon={Clock}
          title={`No ${activeSubTab === 'All' ? '' : activeSubTab} Trips Found`}
          description="You don't have any trips matching this category. Tap below to book a new ride."
          actionText="Book a Ride"
          onAction={() => startBookingFlow()}
        />
      ) : (
        <div className="space-y-4">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => setSelectedTripForDetails(trip)}
              className="bg-white dark:bg-slate-900 rounded-[14px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:border-blue-600 cursor-pointer transition-all active:scale-[0.99] group"
            >
              {/* Top row: Trip ID, Date/Time, Status badge */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-[700] text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 px-2.5 py-1 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                    {trip.tripId}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-[590]">
                    {trip.date} • {trip.time}
                  </span>
                </div>
                <StatusBadge status={trip.status} size="sm" />
              </div>

              {/* Middle row: Driver & Vehicle + Route */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Driver & Vehicle */}
                <div className="md:col-span-4 flex items-center gap-3">
                  <img
                    src={trip.driver.photo}
                    alt={trip.driver.name}
                    className="w-12 h-12 rounded-[14px] object-cover border border-slate-200 dark:border-slate-800 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-[700] text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:text-blue-400 transition-colors">
                      {trip.driver.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{trip.driver.vehicleModel}</p>
                    <div className="mt-1">
                      <div className="px-2 py-0.2 text-[10px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] inline-block text-slate-900 dark:text-slate-100">
                        <span className="mr-1 font-[700]">IND</span>
                        <span>{trip.driver.vehicleRegistration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route: Pickup -> Destination */}
                <div className="md:col-span-5 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-[590] text-slate-900 dark:text-slate-100">
                    <span className="w-2 h-2 rounded-[14px] bg-blue-600 flex-shrink-0" />
                    <span className="truncate">{trip.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-[590] text-slate-900 dark:text-slate-100">
                    <span className="w-2 h-2 rounded-[14px] bg-rose-500 flex-shrink-0" />
                    <span className="truncate">{trip.destinationLocation}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-4">
                    {trip.distanceKm} km • {trip.durationMins} mins
                  </p>
                </div>

                {/* Fare & Chevron Action */}
                <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800 dark:border-slate-700">
                  <div className="text-left md:text-right">
                    <span className="text-base font-[700] text-slate-900 dark:text-slate-100">₹{trip.fare}</span>
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-[590]">{trip.paymentMethod}</p>
                  </div>

                  <div className="w-8 h-8 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 group-hover:bg-blue-50 dark:bg-blue-900/30 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
