import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  Headphones, 
  Share2, 
  Check, 
  X, 
  AlertTriangle,
  Info 
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const EmergencyModal: React.FC = () => {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, activeTrip } = useCustomer();
  const [copied, setCopied] = useState(false);
  const [pendingAction, setPendingAction] = useState<'police' | 'support' | null>(null);

  if (!isEmergencyModalOpen) return null;

  const handleShareTrip = () => {
    const tripText = `[EMERGENCY ASSISTANCE] I am currently on ABC Travels Ride #${activeTrip?.tripId || 'TRP-10248'}. Driver: ${activeTrip?.driver.name || 'Rahul Kumar'} (${activeTrip?.driver.vehicleRegistration || 'AP 39 XX 1234'}). Tracking link: https://abctravels.in/track/${activeTrip?.tripId || 'TRP-10248'}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(tripText);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const executeAction = () => {
    if (pendingAction === 'police') {
      window.open('tel:112');
    } else if (pendingAction === 'support') {
      window.open('tel:18004259999');
    }
    setPendingAction(null);
    setIsEmergencyModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-[14px] max-w-md w-full p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] border border-slate-200 dark:border-slate-800 dark:border-slate-700 relative overflow-hidden">
        {/* Top Warning Strip */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-rose-500" />

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[14px] bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-500">
              <ShieldAlert className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-[700] text-slate-900 dark:text-slate-100">Safety & Emergency SOS</h3>
              <p className="text-xs text-rose-500 font-[590]">24x7 Rapid Assistance Active</p>
            </div>
          </div>
          <button
            onClick={() => {
              setPendingAction(null);
              setIsEmergencyModalOpen(false);
            }}
            className="p-1 rounded-[14px] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Stage if action selected */}
        {pendingAction ? (
          <div className="bg-rose-500/5 border border-rose-200 dark:border-rose-800 rounded-[14px] p-4 mb-4">
            <div className="flex items-start gap-2.5 mb-3">
              <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-[700] text-rose-500">
                  Are you sure you want to trigger emergency assistance?
                </h4>
                <p className="text-xs text-slate-900 dark:text-slate-100 mt-1">
                  {pendingAction === 'police'
                    ? 'This will dial national emergency response 112 (Police & Ambulance) and alert our dispatch safety team with your live GPS location.'
                    : 'This will dial ABC Travels 24x7 Emergency Desk (Toll Free: 1800-425-9999).'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setPendingAction(null)}
                className="flex-1 min-h-[44px] px-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:bg-[#E5E5EA] dark:hover:bg-slate-800 text-xs font-[590] rounded-[14px] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={executeAction}
                className="flex-1 min-h-[44px] px-3 bg-rose-500 text-white text-xs font-[590] rounded-[14px] transition-all flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Yes, Call Now
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
              Your safety is our priority. Choose an emergency action below. Confirmation is required before any outgoing call is placed.
            </p>

            {/* Emergency Action Buttons */}
            <div className="space-y-3 mb-5">
              {/* 1. Call Emergency Services (112) */}
              <button
                onClick={() => setPendingAction('police')}
                className="w-full flex items-center justify-between p-3.5 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-rose-50 dark:bg-rose-950/40 dark:hover:bg-rose-50 dark:bg-rose-950/40 border border-slate-200 dark:border-slate-800 dark:border-slate-700 transition-all text-left group min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[14px] bg-rose-500 text-white flex items-center justify-center font-[700] text-sm">
                    112
                  </div>
                  <div>
                    <h4 className="text-xs font-[700] text-slate-900 dark:text-slate-100">
                      Call Emergency Services (Police / 112)
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Instant connection to local police control room</p>
                  </div>
                </div>
                <PhoneCall className="w-4 h-4 text-rose-500 flex-shrink-0" />
              </button>

              {/* 2. Contact Organization Support */}
              <button
                onClick={() => setPendingAction('support')}
                className="w-full flex items-center justify-between p-3.5 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-blue-50 dark:bg-blue-900/30 dark:hover:bg-blue-50 dark:bg-blue-900/30 border border-slate-200 dark:border-slate-800 dark:border-slate-700 transition-all text-left group min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[14px] bg-blue-600 text-white flex items-center justify-center">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-[700] text-slate-900 dark:text-slate-100">
                      Contact Organization Support Desk
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">ABC Travels 24x7 control tower helpline</p>
                  </div>
                </div>
                <PhoneCall className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              </button>

              {/* 3. Share Trip Details */}
              <button
                onClick={handleShareTrip}
                className="w-full flex items-center justify-between p-3.5 rounded-[14px] bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 hover:bg-[#D2D2D7] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 dark:border-slate-700 transition-all text-left min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[14px] bg-blue-600 text-white flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-[700] text-slate-900 dark:text-slate-100">Share Live Trip with Family</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {copied ? 'Link & details copied to clipboard!' : 'Copy tracking link and driver vehicle details'}
                    </p>
                  </div>
                </div>
                {copied ? (
                  <span className="flex items-center gap-1 text-[11px] font-[700] text-emerald-500">
                    <Check className="w-4 h-4" /> Copied
                  </span>
                ) : (
                  <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                )}
              </button>
            </div>

            {/* Current Active Trip Snapshot */}
            {activeTrip && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center justify-between font-[700] text-slate-900 dark:text-slate-100 mb-1">
                  <span>Current Ride: {activeTrip.tripId}</span>
                  <span className="text-blue-600 dark:text-blue-400">{activeTrip.driver.vehicleRegistration}</span>
                </div>
                <p className="truncate">Driver: {activeTrip.driver.name} ({activeTrip.driver.phone})</p>
                <p className="truncate">Route: {activeTrip.pickupLocation} → {activeTrip.destinationLocation}</p>
              </div>
            )}
          </>
        )}

        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Calls will not be placed automatically without your confirmation.</span>
        </div>
      </div>
    </div>
  );
};
