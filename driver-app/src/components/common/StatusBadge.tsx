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
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          dot: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
          label: 'ONLINE',
          subtitle: "You're available for trips",
          pulse: true,
        };
      case 'ON TRIP':
        return {
          bg: 'bg-blue-50 border-blue-200 text-blue-800',
          dot: 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)]',
          label: 'ON TRIP',
          subtitle: 'Active passenger trip in progress',
          pulse: true,
        };
      case 'BREAK':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          dot: 'bg-amber-500',
          label: 'BREAK',
          subtitle: 'Temporarily paused from receiving trips',
          pulse: false,
        };
      case 'VEHICLE ISSUE':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-800',
          dot: 'bg-rose-500',
          label: 'VEHICLE ISSUE',
          subtitle: 'Inspection or maintenance required',
          pulse: false,
        };
      case 'OFFLINE':
      default:
        return {
          bg: 'bg-slate-100 border-slate-200 text-slate-700',
          dot: 'bg-slate-400',
          label: 'OFFLINE',
          subtitle: 'Go online to receive trips',
          pulse: false,
        };
    }
  };

  const config = getBadgeConfig();

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold tracking-wide ${config.bg}`}>
        <span className={`w-2 h-2 rounded-full ${config.dot} ${config.pulse ? 'animate-pulse' : ''}`} />
        {config.label}
      </span>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`p-4 rounded-2xl border ${config.bg} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className={`w-3.5 h-3.5 rounded-full ${config.dot}`} />
            {config.pulse && (
              <span className={`absolute w-3.5 h-3.5 rounded-full ${config.dot} radar-ring`} />
            )}
          </div>
          <div>
            <div className="text-base font-bold tracking-wider leading-none">
              {config.label}
            </div>
            {showSubtitle && (
              <div className="text-xs mt-1 text-slate-600 font-medium">
                {config.subtitle}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-wide ${config.bg}`}>
      <span className="relative flex items-center justify-center">
        <span className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
        {config.pulse && (
          <span className={`absolute w-2.5 h-2.5 rounded-full ${config.dot} radar-ring`} />
        )}
      </span>
      <span>{config.label}</span>
    </div>
  );
};
