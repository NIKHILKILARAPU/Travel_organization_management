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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-float border border-slate-100 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/90">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Trip #{trip.tripNumber}
              </h2>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                trip.status === 'Completed' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : trip.status === 'In Progress'
                  ? 'bg-blue-100 text-blue-800'
                  : trip.status === 'Cancelled'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {trip.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Scheduled: {trip.date}, {trip.pickupTime}
            </p>
          </div>
          <button 
            onClick={closeTripDetails}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Customer Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-base border-2 border-white shadow-2xs">
                {trip.customer.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {trip.customer.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-semibold text-amber-600 flex items-center">
                    ⭐ {trip.customer.rating}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 font-mono">
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
                className="w-10 h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center transition active-press"
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
                className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center transition active-press"
                title="Message Customer"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Route Section */}
          <div className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Trip Route
            </div>

            <div className="relative pl-6 space-y-4">
              {/* Connecting line */}
              <div className="absolute left-[9px] top-2 bottom-3 w-0.5 bg-slate-200" />

              {/* Pickup */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                <div className="text-xs text-slate-400 font-medium">Pickup Point</div>
                <div className="text-sm font-bold text-slate-800">
                  {trip.pickupLocation}
                </div>
              </div>

              {/* Destination */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-rose-600 ring-4 ring-rose-100" />
                <div className="text-xs text-slate-400 font-medium">Destination</div>
                <div className="text-sm font-bold text-slate-800">
                  {trip.destinationLocation}
                </div>
              </div>
            </div>

            {trip.notes && (
              <div className="mt-2 text-xs bg-slate-50 text-slate-600 p-2.5 rounded-xl border border-slate-200/60">
                <span className="font-bold text-slate-700">Driver Note:</span> {trip.notes}
              </div>
            )}
          </div>

          {/* Trip Info Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
              <div className="text-[11px] text-slate-500 font-medium">Distance</div>
              <div className="text-base font-black text-slate-900 mt-0.5">
                {trip.distanceKm} km
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 text-center">
              <div className="text-[11px] text-emerald-800 font-medium">Estimated Fare</div>
              <div className="text-base font-black text-emerald-700 mt-0.5">
                ₹{trip.estimatedFare}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
              <div className="text-[11px] text-slate-500 font-medium">Payment</div>
              <div className="text-sm font-black text-slate-900 mt-1 truncate">
                {trip.paymentMode}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-4 rounded-2xl border border-slate-200/80 bg-white">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Trip Timeline
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Booking confirmed</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Driver assigned</span>
              </div>
              <div className="flex items-center gap-3">
                {trip.timeline.driverArrived ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                )}
                <span className={`text-xs ${trip.timeline.driverArrived ? 'font-semibold text-slate-700' : 'text-slate-400'}`}>
                  Driver arrived at pickup
                </span>
              </div>
              <div className="flex items-center gap-3">
                {trip.timeline.tripStarted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                )}
                <span className={`text-xs ${trip.timeline.tripStarted ? 'font-semibold text-slate-700' : 'text-slate-400'}`}>
                  Trip started
                </span>
              </div>
              <div className="flex items-center gap-3">
                {trip.timeline.tripCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                )}
                <span className={`text-xs ${trip.timeline.tripCompleted ? 'font-semibold text-slate-700' : 'text-slate-400'}`}>
                  Trip completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Button */}
        <div className="p-4 bg-slate-50 border-t border-slate-100">
          {trip.status !== 'Completed' && trip.status !== 'Cancelled' ? (
            <button
              onClick={handleAction}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm tracking-wide rounded-2xl active-press transition shadow-md shadow-emerald-700/20"
            >
              {getPrimaryButtonText()}
            </button>
          ) : (
            <button
              onClick={closeTripDetails}
              className="w-full py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm rounded-2xl active-press transition"
            >
              Close Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
