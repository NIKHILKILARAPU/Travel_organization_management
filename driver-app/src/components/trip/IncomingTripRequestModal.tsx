import React, { useState, useEffect } from 'react';
import { useDriver } from '../../context/DriverContext';
import { 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export const IncomingTripRequestModal: React.FC = () => {
  const { 
    showIncomingModal, 
    acceptIncomingTrip, 
    declineIncomingTrip,
    playBeep 
  } = useDriver();

  const [countdown, setCountdown] = useState<number>(18);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (showIncomingModal) {
      setCountdown(18);
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            declineIncomingTrip();
            return 0;
          }
          if (prev % 3 === 0) {
            playBeep('alert');
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showIncomingModal, declineIncomingTrip, playBeep]);

  if (!showIncomingModal) return null;

  const formattedSeconds = countdown < 10 ? `0${countdown}` : countdown;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Top Dispatch Banner */}
        <div className="bg-emerald-600 px-5 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span className="text-xs font-black tracking-widest uppercase">
              NEW TRIP REQUEST
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full font-mono text-sm font-bold">
            <Clock className="w-3.5 h-3.5" />
            00:{formattedSeconds}
          </div>
        </div>

        {/* Fare Highlight & Customer */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Estimated Total Fare
            </div>
            <div className="text-3xl font-black text-slate-900 flex items-center tracking-tight mt-0.5">
              ₹280
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md ml-2 border border-emerald-200">
                Cash
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-slate-900">Rahul Kumar</div>
            <div className="text-xs text-amber-600 font-semibold">⭐ 4.8 Rating</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Auto Service</div>
          </div>
        </div>

        {/* Route Details */}
        <div className="p-5 space-y-4">
          <div className="space-y-3 relative pl-6">
            <div className="absolute left-[9px] top-2.5 bottom-2.5 w-0.5 bg-slate-200" />

            {/* Pickup */}
            <div className="relative">
              <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  PICKUP (1.4 km away)
                </span>
                <span className="text-xs text-slate-400">~ 3 mins</span>
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">
                Bhimavaram Railway Station
              </div>
            </div>

            {/* Destination */}
            <div className="relative pt-1">
              <span className="absolute -left-6 top-2 w-3 h-3 rounded-full bg-rose-600 ring-4 ring-rose-100" />
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                  DROP OFF
                </span>
                <span className="text-xs text-slate-400">Trip dist: 12.4 km</span>
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">
                Palakollu Town Center
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[11px] text-slate-500 font-medium">Trip Distance</span>
              <p className="text-base font-bold text-slate-900">12.4 km</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[11px] text-slate-500 font-medium">Pickup Distance</span>
              <p className="text-base font-bold text-slate-900">1.4 km</p>
            </div>
          </div>
        </div>

        {/* Large Prominent Action Buttons */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
          <button
            onClick={acceptIncomingTrip}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active-press text-white font-black text-lg tracking-wide rounded-2xl shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 transition"
          >
            <CheckCircle2 className="w-6 h-6" />
            ACCEPT TRIP
          </button>

          <button
            onClick={declineIncomingTrip}
            className="w-full py-3 bg-white border border-slate-300 hover:bg-slate-100 active-press text-slate-700 font-bold text-sm rounded-xl transition"
          >
            DECLINE
          </button>
        </div>
      </div>
    </div>
  );
};
