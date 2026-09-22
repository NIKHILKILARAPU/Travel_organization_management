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
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Assigned Trips & Schedule
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            West Godavari route dispatches, customer drop-offs and journey logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            {filteredTrips.length} {filteredTrips.length === 1 ? 'Trip Found' : 'Trips Found'}
          </span>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex bg-slate-200/80 p-1.5 rounded-2xl gap-1.5 max-w-xl">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              playBeep('tap');
              setActiveSubTab(tab.id);
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${
              activeSubTab === tab.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
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
                className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card hover:border-emerald-400 hover:shadow-lg transition cursor-pointer active-press space-y-4"
              >
                {/* Header: Time, ID, Fare, Status */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-slate-800 text-sm">
                      {trip.customer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-900">
                          {trip.customer.name}
                        </span>
                        <span className="text-xs text-amber-600 font-bold">
                          ★ {trip.customer.rating}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        Trip #{trip.tripNumber} • {trip.date} at {trip.pickupTime}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900">
                      ₹{trip.estimatedFare}
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full mt-1 ${
                      isCompleted 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : isInProgress
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 animate-pulse'
                        : isCancelled
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {isCancelled && <XCircle className="w-3 h-3 text-rose-600" />}
                      {trip.status}
                    </span>
                  </div>
                </div>

                {/* Route Box */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0 ring-4 ring-emerald-100" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Pickup</span>
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {trip.pickupLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1.5 border-t border-slate-200/50">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 flex-shrink-0 ring-4 ring-rose-100" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Drop Off</span>
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {trip.destinationLocation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer specs */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1">
                  <span>Distance: <strong className="text-slate-700">{trip.distanceKm} km</strong> • {trip.paymentMode}</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-card space-y-3">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              No trips recorded under this tab
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Any newly assigned trips or scheduled return journeys will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
