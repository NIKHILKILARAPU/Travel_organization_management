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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center text-white shadow-2xl flex flex-col items-center">
        {/* Call Status */}
        <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 animate-pulse">
          Call In Progress • {callDuration}
        </span>

        {/* Customer Avatar & Info */}
        <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700/60 flex items-center justify-center mb-4 relative shadow-lg">
          <User className="w-12 h-12 text-slate-300" />
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight">
          {callModal.name}
        </h3>
        <p className="text-sm text-slate-400 mt-1 font-mono">
          {callModal.phone}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          Connecting via ABC Travels In-App Masked Line
        </p>

        {/* Call in-cab controls */}
        <div className="grid grid-cols-2 gap-4 w-full my-8">
          <button
            onClick={() => {
              playBeep('tap');
              setIsMuted(!isMuted);
            }}
            className={`py-3.5 px-4 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition active-press ${
              isMuted ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            <span className="text-xs font-bold">{isMuted ? 'Muted' : 'Mute'}</span>
          </button>

          <button
            onClick={() => {
              playBeep('tap');
              setIsSpeaker(!isSpeaker);
            }}
            className={`py-3.5 px-4 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition active-press ${
              isSpeaker ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Volume2 className="w-6 h-6" />
            <span className="text-xs font-bold">{isSpeaker ? 'Speaker ON' : 'Speaker'}</span>
          </button>
        </div>

        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 active-press transition shadow-lg shadow-rose-900/40 text-base"
        >
          <PhoneOff className="w-5 h-5" />
          End Call
        </button>
      </div>
    </div>
  );
};
