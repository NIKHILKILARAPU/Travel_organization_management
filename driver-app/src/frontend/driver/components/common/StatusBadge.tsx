import React from 'react';
import type { DriverStatus } from '../../types';

interface StatusBadgeProps {
  status: DriverStatus;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  showSubtitle = false 
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'ONLINE':
      case 'AVAILABLE':
        return {
          bg: 'bg-emerald-500/10 dark:bg-emerald-500/15 border-[#34C759]/30 text-emerald-500',
          dot: 'bg-emerald-500',
          label: 'ONLINE',
          subtitle: "You're available for trips",
          pulse: true,
        };
      case 'ON TRIP':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/30 dark:bg-blue-600/15 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400',
          dot: 'bg-blue-600',
          label: 'ON TRIP',
          subtitle: 'Active passenger trip in progress',
          pulse: true,
        };
      case 'BREAK':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/40 dark:bg-amber-500/15 border-amber-500/30 text-amber-500',
          dot: 'bg-amber-500',
          label: 'BREAK',
          subtitle: 'Temporarily paused from receiving trips',
          pulse: false,
        };
      case 'VEHICLE ISSUE':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/40 dark:bg-rose-500/15 border-[#FF3B30]/30 text-rose-500',
          dot: 'bg-rose-500',
          label: 'VEHICLE ISSUE',
          subtitle: 'Inspection or maintenance required',
          pulse: false,
        };
      case 'OFFLINE':
      default:
        return {
          bg: 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:border-slate-700 text-slate-500 dark:text-slate-400',
          dot: 'bg-[#86868B]',
          label: 'OFFLINE',
          subtitle: 'Go online to receive trips',
          pulse: false,
        };
    }
  };

  const config = getBadgeConfig();

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[14px] border text-xs font-[590] tracking-wide ${config.bg}`}>
        <span className={`w-2 h-2 rounded-full ${config.dot} ${config.pulse ? 'animate-pulse' : ''}`} />
        {config.label}
      </span>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`p-4 rounded-[14px] border ${config.bg} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className={`w-3.5 h-3.5 rounded-full ${config.dot}`} />
            {config.pulse && (
              <span className={`absolute w-3.5 h-3.5 rounded-full ${config.dot} animate-ping opacity-75`} />
            )}
          </div>
          <div>
            <div className="text-base font-[700] tracking-tight leading-none">
              {config.label}
            </div>
            {showSubtitle && (
              <div className="text-xs mt-1 text-slate-500 dark:text-slate-400 font-[400]">
                {config.subtitle}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-[14px] border text-xs font-[590] tracking-wide ${config.bg}`}>
      <span className="relative flex items-center justify-center">
        <span className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
        {config.pulse && (
          <span className={`absolute w-2.5 h-2.5 rounded-full ${config.dot} animate-ping opacity-75`} />
        )}
      </span>
      <span>{config.label}</span>
    </div>
  );
};
