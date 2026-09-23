import React, { useState } from 'react';
import { useDriver } from '../../context/DriverContext';
import { PhoneOff, Mic, MicOff, Volume2, User } from 'lucide-react';

export const CallCustomerModal: React.FC = () => {
  const { callModal, setCallModal, playBeep } = useDriver();
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const callDuration = '00:14';

  if (!callModal || !callModal.open) return null;

  const handleEndCall = () => {
    playBeep('tap');
    setCallModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] flex flex-col items-center">
        {/* Call Status */}
        <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-[14px] text-xs font-[590] tracking-wider uppercase mb-4 animate-pulse">
          Call In Progress • {callDuration}
        </span>

        {/* Customer Avatar & Info */}
        <div className="w-24 h-24 rounded-full bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-center mb-4 relative">
          <User className="w-12 h-12 text-slate-500 dark:text-slate-400" />
        </div>

        <h3 className="text-xl font-[700] text-slate-900 dark:text-slate-100 tracking-tight">
          {callModal.name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-mono">
          {callModal.phone}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Connecting via ABC Travels In-App Masked Line
        </p>

        {/* Call in-cab controls */}
        <div className="grid grid-cols-2 gap-4 w-full my-8">
          <button
            onClick={() => {
              playBeep('tap');
              setIsMuted(!isMuted);
            }}
            className={`min-h-[44px] px-4 py-2 rounded-[14px] flex flex-col items-center justify-center gap-1.5 transition ${
              isMuted ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-500/40' : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            <span className="text-xs font-[700]">{isMuted ? 'Muted' : 'Mute'}</span>
          </button>

          <button
            onClick={() => {
              playBeep('tap');
              setIsSpeaker(!isSpeaker);
            }}
            className={`min-h-[44px] px-4 py-2 rounded-[14px] flex flex-col items-center justify-center gap-1.5 transition ${
              isSpeaker ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700' : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700'
            }`}
          >
            <Volume2 className="w-6 h-6" />
            <span className="text-xs font-[700]">{isSpeaker ? 'Speaker ON' : 'Speaker'}</span>
          </button>
        </div>

        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="w-full min-h-[44px] bg-rose-500 text-white font-[700] rounded-[14px] flex items-center justify-center gap-2 transition text-base"
        >
          <PhoneOff className="w-5 h-5" />
          End Call
        </button>
      </div>
    </div>
  );
};
