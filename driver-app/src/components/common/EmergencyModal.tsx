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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-float border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Safety & Support Hub</h2>
              <p className="text-xs text-slate-500">24/7 ABC Travels Driver Assistance</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Active SOS Confirmation State */}
          {sosCountingDown && (
            <div className="bg-rose-50 border-2 border-rose-400 p-5 rounded-2xl text-center space-y-3 animate-pulse">
              <div className="text-xs font-bold text-rose-700 uppercase tracking-widest">
                🚨 Triggering Emergency SOS
              </div>
              <div className="text-5xl font-black text-rose-600 font-mono">
                00:0{countdownSeconds}
              </div>
              <p className="text-xs text-rose-700 leading-relaxed font-medium">
                Sending live GPS, Vehicle #{vehicle.registrationNumber}, and Driver #{driver.id} to Police 112 & ABC Dispatch.
              </p>
              <button
                onClick={handleCancelSos}
                className="w-full py-3.5 bg-white border border-rose-300 text-rose-700 hover:bg-rose-100 font-bold rounded-xl active-press transition"
              >
                CANCEL EMERGENCY ALERT
              </button>
            </div>
          )}

          {sosTriggered && (
            <div className="bg-emerald-50 border border-emerald-300 p-5 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <div className="text-sm font-bold text-emerald-900">
                Emergency Dispatch Alert Dispatched!
              </div>
              <p className="text-xs text-emerald-700 font-medium">
                The ABC Travels emergency response team & local dispatch have received your telemetry. Expect a call within 30 seconds.
              </p>
            </div>
          )}

          {!sosCountingDown && !sosTriggered && (
            <>
              {/* Emergency SOS Button with 5s countdown confirmation */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-rose-950 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      Emergency SOS
                    </h3>
                    <p className="text-xs text-rose-700/90 mt-0.5 leading-snug">
                      Requires 5-second countdown to avoid accidental presses while driving.
                    </p>
                  </div>
                  <button
                    onClick={handleStartSos}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl active-press transition shadow-xs flex-shrink-0"
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
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition active-press"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Contact Organization</div>
                      <div className="text-xs text-slate-500">ABC Travels Dispatch Desk (+91 8816 223344)</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                    CALL
                  </span>
                </a>

                {/* Report Customer Issue */}
                <button
                  onClick={() => {
                    handleClose();
                    alert("Customer issue report logged. Dispatch team will review your last trip note.");
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition text-left active-press"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Report Customer Issue</div>
                      <div className="text-xs text-slate-500">Unruly passenger, wrong address, payment issue</div>
                    </div>
                  </div>
                  <span className="text-slate-400 font-bold text-sm">›</span>
                </button>

                {/* Report Vehicle Problem */}
                <button
                  onClick={() => {
                    handleClose();
                    setShowReportIssueModal(true);
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition text-left active-press"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Report Vehicle Problem</div>
                      <div className="text-xs text-slate-500">Engine, Tyres, Brakes, or Breakdown</div>
                    </div>
                  </div>
                  <span className="text-slate-400 font-bold text-sm">›</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleClose}
            className="w-full py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs active-press transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
