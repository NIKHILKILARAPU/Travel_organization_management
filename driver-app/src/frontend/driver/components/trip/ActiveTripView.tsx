import React, { useState } from 'react';
import { useDriver } from '../../context/DriverContext';
import { 
  Phone, 
  MessageSquare, 
  ArrowUpRight, 
  CheckCircle2, 
  IndianRupee
} from 'lucide-react';

export const ActiveTripView: React.FC = () => {
  const { 
    activeTrip, 
    markArrivedAtPickup, 
    startTripRide, 
    completeTripRide, 
    setCallModal, 
    setMessageModal,
    playBeep 
  } = useDriver();

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!activeTrip) return null;

  const isEnRoute = activeTrip.status === 'En Route to Pickup';
  const isArrived = activeTrip.status === 'Arrived at Pickup';
  const isInProgress = activeTrip.status === 'In Progress';

  const handleEndTripClick = () => {
    playBeep('tap');
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = () => {
    setShowPaymentModal(false);
    completeTripRide(activeTrip.id);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] overflow-hidden">
      {/* Top Bar: Trip ID & Status Badge */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 px-6 min-h-[44px] py-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-[700] tracking-widest uppercase">
            ACTIVE TRIP #{activeTrip.tripNumber}
          </span>
          <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400 font-mono">
            • Route: Bhimavaram Railway Station ➔ Palakollu Town
          </span>
        </div>
        <span className="text-xs font-[700] px-3 py-1 rounded-[14px] bg-emerald-500/10 text-emerald-500 border border-[#34C759]/20">
          {isEnRoute ? 'En Route to Pickup' : isArrived ? 'At Pickup Gate' : 'Ride In Progress'}
        </span>
      </div>

      {/* Map Area */}
      <div className="relative w-full h-72 md:h-80 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 overflow-hidden select-none">
        {/* Vector Map Graphic */}
        <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 600 280" fill="none">
          {/* Background Map Grids */}
          <rect width="600" height="280" className="fill-slate-100 dark:fill-slate-900" />
          
          <rect x="30" y="30" width="120" height="70" rx="14" fill="#D2D2D7" opacity="0.4" />
          <rect x="180" y="20" width="160" height="50" rx="14" fill="#34C759" opacity="0.25" />
          <rect x="380" y="35" width="170" height="85" rx="14" fill="#D2D2D7" opacity="0.4" />
          
          <path d="M 0 65 Q 300 80 600 60" stroke="#D2D2D7" strokeWidth="8" />
          <path d="M 0 210 Q 250 190 600 220" stroke="#D2D2D7" strokeWidth="8" />
          <path d="M 130 0 V 280" stroke="#D2D2D7" strokeWidth="8" />
          <path d="M 400 0 V 280" stroke="#D2D2D7" strokeWidth="8" />

          {/* Main Trip Highway Route */}
          <path 
            d="M 70 210 C 140 210, 180 90, 300 85 S 460 160, 530 110" 
            stroke="#2563eb" 
            strokeWidth="10" 
            strokeLinecap="round"
            className="route-animate" 
          />

          {/* Pickup Marker */}
          <g transform="translate(70, 210)">
            <circle r="16" fill="#0071E3" opacity="0.3" className="animate-ping" />
            <circle r="10" fill="#0071E3" stroke="#ffffff" strokeWidth="3" />
          </g>

          {/* Driver Location */}
          <g transform="translate(295, 87)">
            <circle r="18" fill="#3b82f6" opacity="0.4" className="animate-ping" />
            <circle r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="3" />
          </g>

          {/* Destination Marker */}
          <g transform="translate(530, 110)">
            <circle r="16" fill="#3b82f6" opacity="0.3" />
            <circle r="10" fill="#3b82f6" stroke="#ffffff" strokeWidth="3" />
          </g>
        </svg>

        {/* Live Navigation Guidance Pill Overlay */}
        <div className="absolute top-4 left-4 right-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl text-slate-900 dark:text-slate-100 rounded-[14px] px-5 min-h-[44px] flex items-center justify-between border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)]">
          <div className="flex items-center gap-3.5 my-2">
            <div className="w-10 h-10 rounded-[14px] bg-blue-600 text-white flex items-center justify-center font-[700]">
              <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-sm font-[700] tracking-tight">
                {isInProgress 
                  ? 'In 250 meters, turn right onto Palakollu Main Road' 
                  : 'Navigate toward Railway Station Platform 1 auto bay'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-[590] mt-0.5">
                Next waypoint: Somaram Temple Bypass
              </div>
            </div>
          </div>
          
          <div className="text-right pl-4 border-l border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <span className="text-base font-[700] text-blue-600 dark:text-blue-400">38</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">km/h</span>
          </div>
        </div>

        {/* Map Float Info Overlay */}
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs">
          <span className="bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 backdrop-blur-xl px-3.5 py-1.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 font-[590]">
            📍 Bhimavaram Railway Station ➔ Palakollu (12.4 km)
          </span>
          <span className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-3.5 py-1.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 font-[700] text-blue-600 dark:text-blue-400">
            ETA: 18 mins left (11.2 km)
          </span>
        </div>
      </div>

      {/* Customer & Route Details & Action Section */}
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Customer Info */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-center font-[700] text-slate-900 dark:text-slate-100 text-lg">
                {activeTrip.customer.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-[700] text-slate-900 dark:text-slate-100">
                    {activeTrip.customer.name}
                  </span>
                  <span className="text-xs font-[700] text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-[14px] border border-amber-500/20">
                    ★ {activeTrip.customer.rating}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-[590] mt-0.5">
                  Fare: <strong className="text-blue-600 dark:text-blue-400">₹{activeTrip.estimatedFare}</strong> • Payment Mode: {activeTrip.paymentMode}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playBeep('tap');
                  setCallModal({
                    open: true,
                    name: activeTrip.customer.name,
                    phone: activeTrip.customer.phone,
                  });
                }}
                className="w-11 min-h-[44px] rounded-[14px] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-slate-100 transition"
                title="Call Customer"
              >
                <Phone className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  playBeep('tap');
                  setMessageModal({
                    open: true,
                    name: activeTrip.customer.name,
                    tripId: activeTrip.tripNumber,
                  });
                }}
                className="w-11 min-h-[44px] rounded-[14px] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-slate-100 transition"
                title="Message Customer"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Route Overview */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0" />
              <span className="text-slate-500 dark:text-slate-400 font-[590] uppercase">From:</span>
              <span className="font-[700] text-slate-900 dark:text-slate-100 truncate">{activeTrip.pickupLocation}</span>
            </div>

            <div className="flex items-center gap-2 text-xs pt-1.5 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-white dark:bg-slate-800/60 flex-shrink-0" />
              <span className="text-slate-500 dark:text-slate-400 font-[590] uppercase">To:</span>
              <span className="font-[700] text-slate-900 dark:text-slate-100 truncate">{activeTrip.destinationLocation}</span>
            </div>
          </div>
        </div>

        {/* Large Primary Action Button */}
        <div>
          {isEnRoute && (
            <button
              onClick={() => markArrivedAtPickup(activeTrip.id)}
              className="w-full min-h-[44px] px-6 bg-blue-600 text-white font-[700] text-base tracking-wide rounded-[14px] flex items-center justify-center gap-2 transition"
            >
              <CheckCircle2 className="w-5 h-5" />
              I HAVE ARRIVED AT PICKUP POINT
            </button>
          )}

          {isArrived && (
            <button
              onClick={() => startTripRide(activeTrip.id)}
              className="w-full min-h-[44px] px-6 bg-blue-600 text-white font-[700] text-base tracking-wide rounded-[14px] flex items-center justify-center gap-2 transition"
            >
              <ArrowUpRight className="w-5 h-5" />
              START PASSENGER TRIP
            </button>
          )}

          {isInProgress && (
            <button
              onClick={handleEndTripClick}
              className="w-full min-h-[44px] px-6 bg-blue-600 text-white font-[700] text-base tracking-wide rounded-[14px] flex items-center justify-center gap-2 transition"
            >
              <CheckCircle2 className="w-5 h-5" />
              END TRIP & COLLECT CASH FARE
            </button>
          )}
        </div>
      </div>

      {/* Cash Collection Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] space-y-5">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
              <IndianRupee className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-[700] text-slate-900 dark:text-slate-100">
                Collect Cash Fare
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Please collect trip payment directly from passenger
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700">
              <div className="text-4xl font-[700] text-slate-900 dark:text-slate-100">
                ₹{activeTrip.estimatedFare}
              </div>
              <div className="text-xs font-[590] text-blue-600 dark:text-blue-400 mt-1">
                Exact Total Fare (Cash Mode)
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="min-h-[44px] px-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 font-[590] rounded-[14px] transition"
              >
                Back to Map
              </button>

              <button
                onClick={handleConfirmPayment}
                className="min-h-[44px] px-4 bg-blue-600 text-white font-[700] rounded-[14px] transition"
              >
                CASH RECEIVED & COMPLETE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
