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
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
      {/* Top Bar: Trip ID & Status Badge */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-black tracking-widest uppercase">
            ACTIVE TRIP #{activeTrip.tripNumber}
          </span>
          <span className="hidden sm:inline text-xs text-slate-400 font-mono">
            • Route: Bhimavaram Railway Station ➔ Palakollu Town
          </span>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          {isEnRoute ? 'En Route to Pickup' : isArrived ? 'At Pickup Gate' : 'Ride In Progress'}
        </span>
      </div>

      {/* Map Area (Widescreen 300px height for web) */}
      <div className="relative w-full h-72 md:h-80 bg-slate-800 overflow-hidden select-none">
        {/* Vector Map Graphic */}
        <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 600 280" fill="none">
          {/* Background Map Grids */}
          <rect width="600" height="280" fill="#1e293b" />
          
          {/* City blocks / green parks */}
          <rect x="30" y="30" width="120" height="70" rx="10" fill="#334155" opacity="0.4" />
          <rect x="180" y="20" width="160" height="50" rx="10" fill="#15803d" opacity="0.25" />
          <rect x="380" y="35" width="170" height="85" rx="10" fill="#334155" opacity="0.4" />
          <rect x="50" y="140" width="140" height="110" rx="10" fill="#334155" opacity="0.4" />
          <rect x="230" y="180" width="160" height="80" rx="10" fill="#334155" opacity="0.3" />
          <rect x="430" y="150" width="130" height="100" rx="10" fill="#334155" opacity="0.4" />

          {/* Secondary Roads */}
          <path d="M 0 65 Q 300 80 600 60" stroke="#475569" strokeWidth="8" />
          <path d="M 0 210 Q 250 190 600 220" stroke="#475569" strokeWidth="8" />
          <path d="M 130 0 V 280" stroke="#475569" strokeWidth="8" />
          <path d="M 400 0 V 280" stroke="#475569" strokeWidth="8" />

          {/* Main Trip Highway Route with animated dash */}
          <path 
            d="M 70 210 C 140 210, 180 90, 300 85 S 460 160, 530 110" 
            stroke="#10b981" 
            strokeWidth="10" 
            strokeLinecap="round"
            className="route-animate" 
          />

          {/* Pickup Marker (Bhimavaram) */}
          <g transform="translate(70, 210)">
            <circle r="16" fill="#10b981" opacity="0.3" className="animate-ping" />
            <circle r="10" fill="#10b981" stroke="#ffffff" strokeWidth="3" />
            <text x="-24" y="-16" fill="#e2e8f0" fontSize="12" fontWeight="bold">Pickup Point</text>
          </g>

          {/* Driver Location (Bajaj RE Auto moving along highway) */}
          <g transform="translate(295, 87)">
            <circle r="18" fill="#3b82f6" opacity="0.4" className="animate-ping" />
            <circle r="12" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
            {/* Auto Direction Indicator */}
            <polygon points="0,-20 -7,-8 7,-8" fill="#60a5fa" />
          </g>

          {/* Destination Marker (Palakollu) */}
          <g transform="translate(530, 110)">
            <circle r="16" fill="#ef4444" opacity="0.3" />
            <circle r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="3" />
            <text x="-38" y="-16" fill="#f87171" fontSize="12" fontWeight="bold">Palakollu Center</text>
          </g>
        </svg>

        {/* Live Navigation Guidance Pill Overlay */}
        <div className="absolute top-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md text-white rounded-2xl px-5 py-3.5 flex items-center justify-between border border-slate-700/60 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold">
              <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-sm font-black tracking-tight text-white">
                {isInProgress 
                  ? 'In 250 meters, turn right onto Palakollu Main Road' 
                  : 'Navigate toward Railway Station Platform 1 auto bay'}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">
                Next waypoint: Somaram Temple Bypass
              </div>
            </div>
          </div>
          
          <div className="text-right pl-4 border-l border-slate-700/80">
            <span className="text-base font-black text-emerald-400">38</span>
            <span className="text-xs text-slate-400 ml-1">km/h</span>
          </div>
        </div>

        {/* Map Float Info Overlay (Bottom) */}
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white text-xs">
          <span className="bg-slate-900/85 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-slate-700/60 font-medium">
            📍 Bhimavaram Railway Station ➔ Palakollu (12.4 km)
          </span>
          <span className="bg-slate-900/85 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-slate-700/60 font-bold text-emerald-400">
            ETA: 18 mins left (11.2 km)
          </span>
        </div>
      </div>

      {/* Customer & Route Details & Action Section */}
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Customer Info */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-800 text-lg">
                {activeTrip.customer.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-slate-900">
                    {activeTrip.customer.name}
                  </span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    ★ {activeTrip.customer.rating}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Fare: <strong className="text-slate-900">₹{activeTrip.estimatedFare}</strong> • Payment Mode: {activeTrip.paymentMode}
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
                className="w-11 h-11 rounded-2xl bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 flex items-center justify-center text-slate-700 transition active-press shadow-2xs"
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
                className="w-11 h-11 rounded-2xl bg-white hover:bg-blue-50 hover:text-blue-700 border border-slate-200 flex items-center justify-center text-slate-700 transition active-press shadow-2xs"
                title="Message Customer"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Route Overview */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="text-slate-400 font-semibold uppercase">From:</span>
              <span className="font-bold text-slate-800 truncate">{activeTrip.pickupLocation}</span>
            </div>

            <div className="flex items-center gap-2 text-xs pt-1.5 border-t border-slate-200/60">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 flex-shrink-0" />
              <span className="text-slate-400 font-semibold uppercase">To:</span>
              <span className="font-bold text-slate-800 truncate">{activeTrip.destinationLocation}</span>
            </div>
          </div>
        </div>

        {/* Large Primary Action Button */}
        <div>
          {isEnRoute && (
            <button
              onClick={() => markArrivedAtPickup(activeTrip.id)}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active-press text-white font-black text-base tracking-wide rounded-2xl shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition"
            >
              <CheckCircle2 className="w-5 h-5" />
              I HAVE ARRIVED AT PICKUP POINT
            </button>
          )}

          {isArrived && (
            <button
              onClick={() => startTripRide(activeTrip.id)}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active-press text-white font-black text-base tracking-wide rounded-2xl shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition"
            >
              <ArrowUpRight className="w-5 h-5" />
              START PASSENGER TRIP
            </button>
          )}

          {isInProgress && (
            <button
              onClick={handleEndTripClick}
              className="w-full py-4 bg-rose-600 hover:bg-rose-700 active-press text-white font-black text-base tracking-wide rounded-2xl shadow-lg shadow-rose-700/20 flex items-center justify-center gap-2 transition"
            >
              <CheckCircle2 className="w-5 h-5" />
              END TRIP & COLLECT CASH FARE
            </button>
          )}
        </div>
      </div>

      {/* Cash Collection Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 text-center shadow-2xl border border-slate-100 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <IndianRupee className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900">
                Collect Cash Fare
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Please collect trip payment directly from passenger Rahul Kumar
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="text-4xl font-black text-slate-900">
                ₹{activeTrip.estimatedFare}
              </div>
              <div className="text-xs font-semibold text-emerald-700 mt-1">
                Exact Total Fare (Cash Mode)
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl active-press transition"
              >
                Back to Map
              </button>

              <button
                onClick={handleConfirmPayment}
                className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl active-press transition shadow-md shadow-emerald-700/20"
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
