import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, Shield, X } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const CallDriverModal: React.FC = () => {
  const { isCallModalOpen, setIsCallModalOpen, activeTrip } = useCustomer();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [callConnected, setCallConnected] = useState(false);

  const driver = activeTrip?.driver || {
    name: 'Rahul Kumar',
    phone: '+91 98765 43210',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    vehicleModel: 'Bajaj Compact Auto',
    vehicleRegistration: 'AP 39 XX 1234',
  };

  useEffect(() => {
    let timer: any;
    let connTimeout: any;

    if (isCallModalOpen) {
      // Simulate connection after 1.5 seconds
      connTimeout = setTimeout(() => {
        setCallConnected(true);
      }, 1500);

      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
      setCallConnected(false);
    }

    return () => {
      clearTimeout(connTimeout);
      clearInterval(timer);
    };
  }, [isCallModalOpen]);

  if (!isCallModalOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] max-w-sm w-full p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)] relative overflow-hidden">
        {/* Close / Minimize */}
        <button
          onClick={() => setIsCallModalOpen(false)}
          className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 p-2 rounded-[14px] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Call Security Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[14px] bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-600 dark:text-blue-400 font-[590] mb-6">
          <Shield className="w-3.5 h-3.5" />
          <span>Number Masked for Privacy</span>
        </div>

        {/* Driver Photo & Details */}
        <div className="relative mx-auto w-24 h-24 mb-4">
          <img
            src={driver.photo}
            alt={driver.name}
            className="w-full h-full rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)]"
          />
        </div>

        <h3 className="text-xl font-[700] tracking-tight text-slate-900 dark:text-slate-100 mb-1">{driver.name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-[400] mb-1">
          {driver.vehicleModel} • {driver.vehicleRegistration}
        </p>
        <p className="text-xs text-emerald-500 font-[700] mb-8">
          {callConnected ? `Connected (${formatTime(callDuration)})` : 'Ringing...'}
        </p>

        {/* Call Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 min-h-[44px] rounded-[14px] flex items-center justify-center transition-all ${
              isMuted ? 'bg-amber-500 text-white font-[590]' : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700'
            }`}
            title="Mute"
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsCallModalOpen(false)}
            className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center active:scale-95 transition-all"
            title="End Call"
          >
            <PhoneOff className="w-7 h-7" />
          </button>

          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-12 min-h-[44px] rounded-[14px] flex items-center justify-center transition-all ${
              isSpeaker ? 'bg-blue-600 text-white font-[590]' : 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 dark:border-slate-700'
            }`}
            title="Speaker"
          >
            {isSpeaker ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Calls are recorded by ABC Travels dispatch for quality & customer safety.
        </p>
      </div>
    </div>
  );
};
