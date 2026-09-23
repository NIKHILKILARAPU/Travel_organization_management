import React from 'react';
import { useDriver } from '../../context/DriverContext';
import { 
  X, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Circle
} from 'lucide-react';

export const TripDetailsModal: React.FC = () => {
  const { 
    selectedTripForDetail, 
    closeTripDetails, 
    setCallModal, 
    setMessageModal,
    startEnRouteToPickup,
    markArrivedAtPickup,
    startTripRide,
    completeTripRide,
    playBeep
  } = useDriver();

  if (!selectedTripForDetail) return null;
  const trip = selectedTripForDetail;

  const handleAction = () => {
    if (trip.status === 'Assigned') {
      startEnRouteToPickup(trip.id);
      closeTripDetails();
    } else if (trip.status === 'En Route to Pickup') {
      markArrivedAtPickup(trip.id);
    } else if (trip.status === 'Arrived at Pickup') {
      startTripRide(trip.id);
      closeTripDetails();
    } else if (trip.status === 'In Progress') {
      completeTripRide(trip.id);
      closeTripDetails();
    }
  };

  const getPrimaryButtonText = () => {
    switch (trip.status) {
      case 'Assigned':
        return 'ACCEPT & NAVIGATE TO PICKUP';
      case 'En Route to Pickup':
        return 'I HAVE ARRIVED AT PICKUP';
      case 'Arrived at Pickup':
        return 'START TRIP';
      case 'In Progress':
        return 'END TRIP & COLLECT CASH';
      case 'Completed':
        return 'TRIP COMPLETED';
      default:
        return 'BACK';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[14px] sm:rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 min-h-[44px] py-2 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-[700] text-slate-900 dark:text-slate-100 tracking-tight">
                Trip #{trip.tripNumber}
              </h2>
              <span className={`text-[11px] font-[700] px-2 py-0.5 rounded-[14px] ${
                trip.status === 'Completed' 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : trip.status === 'In Progress'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : trip.status === 'Cancelled'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-500'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-500'
              }`}>
                {trip.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Scheduled: {trip.date}, {trip.pickupTime}
            </p>
          </div>
          <button 
            onClick={closeTripDetails}
            className="w-8 min-h-[44px] rounded-full hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Customer Card */}
          <div className="p-4 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex items-center justify-center font-[700] text-base border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                {trip.customer.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-[700] text-slate-900 dark:text-slate-100 leading-tight">
                  {trip.customer.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-[590] text-amber-500 flex items-center">
                    ⭐ {trip.customer.rating}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">•</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {trip.customer.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playBeep('tap');
                  setCallModal({
                    open: true,
                    name: trip.customer.name,
                    phone: trip.customer.phone,
                  });
                }}
                className="w-10 min-h-[44px] rounded-[14px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-[#34C759]/30 flex items-center justify-center transition"
                title="Call Customer"
              >
                <Phone className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playBeep('tap');
                  setMessageModal({
                    open: true,
                    name: trip.customer.name,
                    tripId: trip.tripNumber,
                  });
                }}
                className="w-10 min-h-[44px] rounded-[14px] bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center transition"
                title="Message Customer"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Route Section */}
          <div className="p-4 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-3">
            <div className="text-xs font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Trip Route
            </div>

            <div className="relative pl-6 space-y-4">
              <div className="absolute left-[9px] top-2 bottom-3 w-0.5 bg-[#D2D2D7] dark:bg-[#38383A]" />

              <div className="relative">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-[#0071E3]/20" />
                <div className="text-xs text-slate-500 dark:text-slate-400 font-[590]">Pickup Point</div>
                <div className="text-sm font-[700] text-slate-900 dark:text-slate-100">
                  {trip.pickupLocation}
                </div>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-white dark:bg-slate-800/60 ring-4 ring-slate-400/20 dark:ring-slate-500/20" />
                <div className="text-xs text-slate-500 dark:text-slate-400 font-[590]">Destination</div>
                <div className="text-sm font-[700] text-slate-900 dark:text-slate-100">
                  {trip.destinationLocation}
                </div>
              </div>
            </div>

            {trip.notes && (
              <div className="mt-2 text-xs bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-500 dark:text-slate-400 p-2.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
                <span className="font-[700] text-slate-900 dark:text-slate-100">Driver Note:</span> {trip.notes}
              </div>
            )}
          </div>

          {/* Trip Info Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-[590]">Distance</div>
              <div className="text-base font-[700] text-slate-900 dark:text-slate-100 mt-0.5">
                {trip.distanceKm} km
              </div>
            </div>

            <div className="p-3 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-center">
              <div className="text-[11px] text-blue-600 dark:text-blue-400 font-[590]">Estimated Fare</div>
              <div className="text-base font-[700] text-blue-600 dark:text-blue-400 mt-0.5">
                ₹{trip.estimatedFare}
              </div>
            </div>

            <div className="p-3 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-[590]">Payment</div>
              <div className="text-sm font-[700] text-slate-900 dark:text-slate-100 mt-1 truncate">
                {trip.paymentMode}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-4 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900">
            <div className="text-xs font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Trip Timeline
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-xs font-[590] text-slate-900 dark:text-slate-100">Booking confirmed</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-xs font-[590] text-slate-900 dark:text-slate-100">Driver assigned</span>
              </div>
              <div className="flex items-center gap-3">
                {trip.timeline.driverArrived ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-[#D2D2D7] dark:text-[#38383A] flex-shrink-0" />
                )}
                <span className={`text-xs ${trip.timeline.driverArrived ? 'font-[590] text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  Driver arrived at pickup
                </span>
              </div>
              <div className="flex items-center gap-3">
                {trip.timeline.tripStarted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-[#D2D2D7] dark:text-[#38383A] flex-shrink-0" />
                )}
                <span className={`text-xs ${trip.timeline.tripStarted ? 'font-[590] text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  Trip started
                </span>
              </div>
              <div className="flex items-center gap-3">
                {trip.timeline.tripCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-[#D2D2D7] dark:text-[#38383A] flex-shrink-0" />
                )}
                <span className={`text-xs ${trip.timeline.tripCompleted ? 'font-[590] text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  Trip completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Button */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700">
          {trip.status !== 'Completed' && trip.status !== 'Cancelled' ? (
            <button
              onClick={handleAction}
              className="w-full min-h-[44px] px-6 bg-blue-600 text-white font-[700] text-sm tracking-wide rounded-[14px] transition"
            >
              {getPrimaryButtonText()}
            </button>
          ) : (
            <button
              onClick={closeTripDetails}
              className="w-full min-h-[44px] px-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 font-[700] text-sm rounded-[14px] transition"
            >
              Close Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
