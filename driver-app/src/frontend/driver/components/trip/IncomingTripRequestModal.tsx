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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[14px] sm:rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 overflow-hidden flex flex-col">
        {/* Top Dispatch Banner */}
        <div className="bg-blue-600 px-5 min-h-[44px] py-2 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span className="text-xs font-[700] tracking-widest uppercase">
              NEW TRIP REQUEST
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900/20 px-3 py-1 rounded-[14px] font-mono text-sm font-[700]">
            <Clock className="w-3.5 h-3.5" />
            00:{formattedSeconds}
          </div>
        </div>

        {/* Fare Highlight & Customer */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-[700] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Estimated Total Fare
            </div>
            <div className="text-3xl font-[700] text-slate-900 dark:text-slate-100 flex items-center tracking-tight mt-0.5">
              ₹280
              <span className="text-xs font-[590] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-[14px] ml-2 border border-blue-200 dark:border-blue-800">
                Cash
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-[700] text-slate-900 dark:text-slate-100">Rahul Kumar</div>
            <div className="text-xs text-amber-500 font-[590]">⭐ 4.8 Rating</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-[590] mt-0.5">Auto Service</div>
          </div>
        </div>

        {/* Route Details */}
        <div className="p-5 space-y-4">
          <div className="space-y-3 relative pl-6">
            <div className="absolute left-[9px] top-2.5 bottom-2.5 w-0.5 bg-[#D2D2D7] dark:bg-[#38383A]" />

            {/* Pickup */}
            <div className="relative">
              <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-[#0071E3]/20" />
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-[700] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-[14px]">
                  PICKUP (1.4 km away)
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">~ 3 mins</span>
              </div>
              <div className="text-sm font-[700] text-slate-900 dark:text-slate-100 mt-1">
                Bhimavaram Railway Station
              </div>
            </div>

            {/* Destination */}
            <div className="relative pt-1">
              <span className="absolute -left-6 top-2 w-3 h-3 rounded-full bg-white dark:bg-slate-800/60 ring-4 ring-slate-400/20 dark:ring-slate-500/20" />
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-[700] text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 px-2 py-0.5 rounded-[14px]">
                  DROP OFF
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Trip dist: 12.4 km</span>
              </div>
              <div className="text-sm font-[700] text-slate-900 dark:text-slate-100 mt-1">
                Palakollu Town Center
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-[590]">Trip Distance</span>
              <p className="text-base font-[700] text-slate-900 dark:text-slate-100">12.4 km</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-[590]">Pickup Distance</span>
              <p className="text-base font-[700] text-slate-900 dark:text-slate-100">1.4 km</p>
            </div>
          </div>
        </div>

        {/* Large Prominent Action Buttons */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex flex-col gap-3">
          <button
            onClick={acceptIncomingTrip}
            className="w-full min-h-[44px] px-6 bg-blue-600 text-white font-[700] text-lg tracking-wide rounded-[14px] flex items-center justify-center gap-2 transition"
          >
            <CheckCircle2 className="w-6 h-6" />
            ACCEPT TRIP
          </button>

          <button
            onClick={declineIncomingTrip}
            className="w-full min-h-[44px] px-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-[700] text-sm rounded-[14px] transition"
          >
            DECLINE
          </button>
        </div>
      </div>
    </div>
  );
};
