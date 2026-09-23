import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  X, 
  MapPin, 
  Navigation, 
  Clock, 
  User, 
  Car, 
  CreditCard, 
  AlertTriangle, 
  Ban, 
  CheckCircle2 
} from 'lucide-react';

export const TripDetailsModal: React.FC = () => {
  const { selectedTrip, setSelectedTrip, cancelTrip } = useManagement();
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);

  if (!selectedTrip) return null;

  const handleCancel = () => {
    if (!cancelReason.trim()) return;
    cancelTrip(selectedTrip.id, cancelReason.trim());
    setShowCancelPrompt(false);
    setSelectedTrip(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="saas-card max-w-2xl w-full overflow-hidden my-6 shadow-modal">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-mono">{selectedTrip.tripId}</h2>
              <StatusBadge status={selectedTrip.status} type="trip" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Booked on {selectedTrip.date} at {selectedTrip.time}</p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedTrip(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs bg-white dark:bg-slate-900">
          
          {/* Route Card */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Transit Route Waypoints</span>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                  A
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Pickup Origin</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-xs mt-0.5 block">{selectedTrip.pickup}</span>
                </div>
              </div>

              <div className="ml-3.5 pl-4 border-l-2 border-dashed border-slate-300 dark:border-slate-700 py-1 text-xs text-slate-500 flex items-center gap-3">
                <span>Distance: <strong className="text-slate-800 dark:text-slate-200">{selectedTrip.distanceKm} km</strong></span>
                <span>•</span>
                <span>Est. Duration: <strong className="text-slate-800 dark:text-slate-200">{selectedTrip.durationMins} mins</strong></span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center justify-center font-bold text-xs shrink-0">
                  B
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Dropoff Destination</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-xs mt-0.5 block">{selectedTrip.destination}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Driver Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Customer Box */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/30 space-y-1.5">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-500" />
                <span>Passenger Account</span>
              </span>
              <div className="pt-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{selectedTrip.customerName}</h4>
                <p className="text-slate-500 text-xs mt-0.5">{selectedTrip.customerPhone}</p>
                <p className="text-slate-400 text-[10px] font-mono mt-1">ID: {selectedTrip.customerId}</p>
              </div>
            </div>

            {/* Driver Box */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/30 space-y-1.5">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-indigo-500" />
                <span>Assigned Fleet & Chauffeur</span>
              </span>
              {selectedTrip.driverName ? (
                <div className="pt-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{selectedTrip.driverName}</h4>
                  <p className="text-slate-500 text-xs mt-0.5">{selectedTrip.driverPhone}</p>
                  <p className="font-mono font-semibold text-slate-800 dark:text-slate-200 text-xs mt-1">
                    {selectedTrip.vehicleRegistration} ({selectedTrip.vehicleType})
                  </p>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs mt-1">
                  Dispatch awaiting driver acceptance...
                </div>
              )}
            </div>
          </div>

          {/* Payment & Fares */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Trip Fare Amount</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white mt-0.5 block">₹{selectedTrip.fare}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block">{selectedTrip.paymentMethod}</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                {selectedTrip.paymentStatus}
              </span>
            </div>
          </div>

          {/* Cancellation Notice if Cancelled */}
          {selectedTrip.status === 'CANCELLED' && selectedTrip.cancellationReason && (
            <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 space-y-1">
              <span className="font-bold text-[10px] uppercase tracking-wider block text-rose-700 dark:text-rose-400">Cancellation Log</span>
              <p className="text-xs">{selectedTrip.cancellationReason}</p>
            </div>
          )}

          {/* Cancellation Prompt */}
          {showCancelPrompt && (
            <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 space-y-2.5">
              <h4 className="font-bold text-rose-900 dark:text-rose-200 text-xs">Confirm Dispatch Cancellation</h4>
              <textarea
                placeholder="State operational reason for aborting this transit..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="input-saas"
                rows={2}
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowCancelPrompt(false)}
                  className="btn-secondary py-1 px-3 text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-danger py-1 px-3 text-xs"
                >
                  Confirm Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {selectedTrip.status !== 'COMPLETED' && selectedTrip.status !== 'CANCELLED' && !showCancelPrompt ? (
            <button
              type="button"
              onClick={() => setShowCancelPrompt(true)}
              className="btn-ghost text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              Cancel Trip
            </button>
          ) : <div />}

          <button
            type="button"
            onClick={() => setSelectedTrip(null)}
            className="btn-secondary text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
