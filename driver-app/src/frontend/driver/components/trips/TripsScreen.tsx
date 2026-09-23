import React, { useState } from 'react';
import { useDriver } from '../../context/DriverContext';
import { 
  CheckCircle2, 
  XCircle, 
  Calendar,
  ArrowRight
} from 'lucide-react';

export const TripsScreen: React.FC = () => {
  const { trips, openTripDetails, playBeep } = useDriver();
  const [activeSubTab, setActiveSubTab] = useState<'today' | 'upcoming' | 'completed' | 'cancelled'>('today');

  const tabs = [
    { id: 'today', label: "Today's Schedule" },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ] as const;

  const filteredTrips = trips.filter(trip => {
    if (activeSubTab === 'today') {
      return trip.date === 'Today';
    }
    if (activeSubTab === 'upcoming') {
      return trip.status === 'Upcoming' || trip.status === 'Assigned';
    }
    if (activeSubTab === 'completed') {
      return trip.status === 'Completed';
    }
    if (activeSubTab === 'cancelled') {
      return trip.status === 'Cancelled';
    }
    return true;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight">
            Assigned Trips & Schedule
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-[400] mt-0.5">
            West Godavari route dispatches, customer drop-offs and journey logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-[590] text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            {filteredTrips.length} {filteredTrips.length === 1 ? 'Trip Found' : 'Trips Found'}
          </span>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 p-1 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 gap-1 max-w-xl">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              playBeep('tap');
              setActiveSubTab(tab.id);
            }}
            className={`flex-1 min-h-[44px] py-2 text-xs font-[590] rounded-[14px] transition ${
              activeSubTab === tab.id
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-900 dark:text-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Trips Grid on Desktop (2 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTrips.length > 0 ? (
          filteredTrips.map(trip => {
            const isCompleted = trip.status === 'Completed';
            const isCancelled = trip.status === 'Cancelled';
            const isInProgress = trip.status === 'In Progress' || trip.status === 'En Route to Pickup' || trip.status === 'Arrived at Pickup';

            return (
              <div
                key={trip.id}
                onClick={() => openTripDetails(trip)}
                className="bg-white dark:bg-slate-900 p-5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] hover:border-blue-600 transition cursor-pointer active-press space-y-4"
              >
                {/* Header: Time, ID, Fare, Status */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 flex items-center justify-center font-[700] text-slate-900 dark:text-slate-100 text-sm">
                      {trip.customer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-[700] text-slate-900 dark:text-slate-100">
                          {trip.customer.name}
                        </span>
                        <span className="text-xs text-amber-500 font-[590]">
                          ★ {trip.customer.rating}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        Trip #{trip.tripNumber} • {trip.date} at {trip.pickupTime}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-[700] text-slate-900 dark:text-slate-100">
                      ₹{trip.estimatedFare}
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-[590] px-2.5 py-0.5 rounded-[14px] mt-1 ${
                      isCompleted 
                        ? 'bg-emerald-500/10 text-emerald-500 border border-[#34C759]/20' 
                        : isInProgress
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                        : isCancelled
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-500 border border-rose-200 dark:border-rose-800'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-500/20'
                    }`}>
                      {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                      {isCancelled && <XCircle className="w-3 h-3 text-rose-500" />}
                      {trip.status}
                    </span>
                  </div>
                </div>

                {/* Route Box */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-[590] text-slate-500 dark:text-slate-400">Pickup</span>
                      <p className="text-xs font-[590] text-slate-900 dark:text-slate-100 truncate">
                        {trip.pickupLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1.5 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-[590] text-slate-500 dark:text-slate-400">Drop Off</span>
                      <p className="text-xs font-[590] text-slate-900 dark:text-slate-100 truncate">
                        {trip.destinationLocation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer specs */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-[400] pt-1">
                  <span>Distance: <strong className="text-slate-900 dark:text-slate-100 font-[590]">{trip.distanceKm} km</strong> • {trip.paymentMode}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-[590] flex items-center gap-1">
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 bg-white dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 p-12 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-3">
            <Calendar className="w-10 h-10 text-slate-500 dark:text-slate-400 mx-auto" />
            <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100">
              No trips recorded under this tab
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-[400]">
              Any newly assigned trips or scheduled return journeys will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
