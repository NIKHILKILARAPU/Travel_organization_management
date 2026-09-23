import React, { useState, useEffect } from 'react';
import { useDriver } from '../../context/DriverContext';
import { 
  ShieldAlert, 
  PhoneCall, 
  AlertTriangle, 
  Wrench, 
  X, 
  CheckCircle2 
} from 'lucide-react';

export const EmergencyModal: React.FC = () => {
  const { 
    showEmergencyModal, 
    setShowEmergencyModal, 
    driver, 
    vehicle, 
    setShowReportIssueModal,
    playBeep 
  } = useDriver();

  const [sosCountingDown, setSosCountingDown] = useState<boolean>(false);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(5);
  const [sosTriggered, setSosTriggered] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (sosCountingDown && countdownSeconds > 0) {
      timer = setTimeout(() => {
        setCountdownSeconds(prev => prev - 1);
        playBeep('alert');
      }, 1000);
    } else if (sosCountingDown && countdownSeconds === 0) {
      setSosCountingDown(false);
      setSosTriggered(true);
      playBeep('success');
    }
    return () => clearTimeout(timer);
  }, [sosCountingDown, countdownSeconds, playBeep]);

  if (!showEmergencyModal) return null;

  const handleStartSos = () => {
    playBeep('alert');
    setSosCountingDown(true);
    setCountdownSeconds(5);
  };

  const handleCancelSos = () => {
    playBeep('tap');
    setSosCountingDown(false);
    setCountdownSeconds(5);
  };

  const handleClose = () => {
    setSosCountingDown(false);
    setSosTriggered(false);
    setShowEmergencyModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[14px] sm:rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-5 min-h-[44px] py-2 border-b border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-[700] text-slate-900 dark:text-slate-100">Safety & Support Hub</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">24/7 ABC Travels Driver Assistance</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 min-h-[44px] rounded-full hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Active SOS Confirmation State */}
          {sosCountingDown && (
            <div className="bg-rose-50 dark:bg-rose-950/40 border border-[#FF3B30]/30 p-5 rounded-[14px] text-center space-y-3 animate-pulse">
              <div className="text-xs font-[700] text-rose-500 uppercase tracking-widest">
                🚨 Triggering Emergency SOS
              </div>
              <div className="text-5xl font-[700] text-rose-500 font-mono">
                00:0{countdownSeconds}
              </div>
              <p className="text-xs text-rose-500 leading-relaxed font-[590]">
                Sending live GPS, Vehicle #{vehicle.registrationNumber}, and Driver #{driver.id} to Police 112 & ABC Dispatch.
              </p>
              <button
                onClick={handleCancelSos}
                className="w-full min-h-[44px] bg-white dark:bg-slate-900 border border-[#FF3B30]/50 text-rose-500 font-[700] rounded-[14px] transition"
              >
                CANCEL EMERGENCY ALERT
              </button>
            </div>
          )}

          {sosTriggered && (
            <div className="bg-emerald-500/10 border border-[#34C759]/30 p-5 rounded-[14px] text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <div className="text-sm font-[700] text-emerald-500">
                Emergency Dispatch Alert Dispatched!
              </div>
              <p className="text-xs text-emerald-500 font-[590]">
                The ABC Travels emergency response team & local dispatch have received your telemetry. Expect a call within 30 seconds.
              </p>
            </div>
          )}

          {!sosCountingDown && !sosTriggered && (
            <>
              {/* Emergency SOS Button with 5s countdown confirmation */}
              <div className="p-4 rounded-[14px] bg-rose-50 dark:bg-rose-950/40 border border-[#FF3B30]/30">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-[700] text-rose-500 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      Emergency SOS
                    </h3>
                    <p className="text-xs text-rose-500/90 mt-0.5 leading-snug">
                      Requires 5-second countdown to avoid accidental presses while driving.
                    </p>
                  </div>
                  <button
                    onClick={handleStartSos}
                    className="min-h-[44px] px-4 bg-rose-500 text-white text-xs font-[700] rounded-[14px] transition flex-shrink-0"
                  >
                    TRIGGER SOS
                  </button>
                </div>
              </div>

              {/* Options list */}
              <div className="space-y-2.5 pt-1">
                {/* Contact Organization */}
                <a
                  href="tel:+918816223344"
                  onClick={() => playBeep('tap')}
                  className="flex items-center justify-between p-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[14px] bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-[700] text-slate-900 dark:text-slate-100">Contact Organization</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">ABC Travels Dispatch Desk (+91 8816 223344)</div>
                    </div>
                  </div>
                  <span className="text-xs font-[700] text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-[14px]">
                    CALL
                  </span>
                </a>

                {/* Report Customer Issue */}
                <button
                  onClick={() => {
                    handleClose();
                    alert("Customer issue report logged. Dispatch team will review your last trip note.");
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900 transition text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[14px] bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-[700] text-slate-900 dark:text-slate-100">Report Customer Issue</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Unruly passenger, wrong address, payment issue</div>
                    </div>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 font-[700] text-sm">›</span>
                </button>

                {/* Report Vehicle Problem */}
                <button
                  onClick={() => {
                    handleClose();
                    setShowReportIssueModal(true);
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-[14px] border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900 transition text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-[700] text-slate-900 dark:text-slate-100">Report Vehicle Problem</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Engine, Tyres, Brakes, or Breakdown</div>
                    </div>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 font-[700] text-sm">›</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 dark:border-slate-700 flex justify-end">
          <button
            onClick={handleClose}
            className="w-full min-h-[44px] px-4 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-[700] rounded-[14px] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
