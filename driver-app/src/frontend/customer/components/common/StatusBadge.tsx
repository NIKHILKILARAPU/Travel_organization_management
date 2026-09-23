import React from 'react';
import type { CustomerTripStatus } from '../../types';

interface StatusBadgeProps {
  status: CustomerTripStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  showDot = true 
}) => {
  const getStyle = () => {
    switch (status) {
      case 'IDLE':
        return {
          bg: 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 dark:border-slate-700',
          dot: 'bg-[#86868B]',
          label: 'Ready to Ride',
        };
      case 'SEARCHING_DRIVER':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-500 border-amber-500/20 animate-pulse',
          dot: 'bg-amber-500',
          label: 'Finding Driver',
        };
      case 'DRIVER_ASSIGNED':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
          dot: 'bg-blue-600',
          label: 'Driver Assigned',
        };
      case 'DRIVER_ARRIVING':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
          dot: 'bg-blue-600',
          label: 'Driver Arriving',
        };
      case 'DRIVER_ARRIVED':
        return {
          bg: 'bg-emerald-500/10 text-emerald-500 border-[#34C759]/20 font-[700]',
          dot: 'bg-emerald-500',
          label: 'Driver at Pickup',
        };
      case 'TRIP_IN_PROGRESS':
        return {
          bg: 'bg-emerald-500/10 text-emerald-500 border-[#34C759]/20',
          dot: 'bg-emerald-500 animate-ping',
          label: 'Trip in Progress',
        };
      case 'TRIP_COMPLETED':
      case 'Completed':
      case 'Paid':
      case 'Resolved':
        return {
          bg: 'bg-emerald-500/10 text-emerald-500 border-[#34C759]/20',
          dot: 'bg-emerald-500',
          label: status === 'TRIP_COMPLETED' ? 'Trip Completed' : status,
        };
      case 'CANCELLED':
      case 'Cancelled':
      case 'Failed':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-500 border-rose-200 dark:border-rose-800',
          dot: 'bg-rose-500',
          label: status === 'CANCELLED' ? 'Trip Cancelled' : status,
        };
      case 'Upcoming':
      case 'In Progress':
        return {
          bg: 'bg-emerald-500/10 text-emerald-500 border-[#34C759]/20',
          dot: 'bg-emerald-500',
          label: status,
        };
      case 'Pending':
      case 'Open':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-500 border-amber-500/20',
          dot: 'bg-amber-500',
          label: status,
        };
      default:
        return {
          bg: 'bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 dark:border-slate-700',
          dot: 'bg-[#86868B]',
          label: status,
        };
    }
  };

  const style = getStyle();

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-[590]',
    md: 'text-xs px-2.5 py-1 font-[700]',
    lg: 'text-sm px-3.5 py-1.5 font-[700]',
  }[size];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-[14px] border ${style.bg} ${sizeClasses}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />}
      {style.label}
    </span>
  );
};
