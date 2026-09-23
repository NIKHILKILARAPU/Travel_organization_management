import React from 'react';
import type { 
  DriverStatus, 
  VehicleStatus, 
  TripStatus, 
  MaintenancePriority, 
  MaintenanceStatus,
  UserRole 
} from '../../types';

interface StatusBadgeProps {
  status: DriverStatus | VehicleStatus | TripStatus | MaintenancePriority | MaintenanceStatus | UserRole | string;
  size?: 'sm' | 'md' | 'lg';
  type?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  className = '' 
}) => {
  const norm = String(status).toUpperCase().replace(/\s+/g, '_');

  // Categorize status
  const isSuccess = [
    'ONLINE', 'AVAILABLE', 'COMPLETED', 'ACTIVE', 'PAID', 'LOW', 'RESOLVED', 'VERIFIED'
  ].includes(norm);

  const isInfo = [
    'ON_TRIP', 'IN_PROGRESS', 'ACCEPTED', 'LIVE', 'DRIVER_ARRIVED', 'DISPATCHED'
  ].includes(norm);

  const isWarning = [
    'BREAK', 'MAINTENANCE', 'IN_MAINTENANCE', 'PENDING', 'MEDIUM', 'SCHEDULED', 'EXPIRING_SOON'
  ].includes(norm);

  const isDanger = [
    'OFFLINE', 'VEHICLE_ISSUE', 'CANCELLED', 'INACTIVE', 'HIGH', 'URGENT', 'FAILED', 'EXPIRED', 'BLOCKED'
  ].includes(norm);

  const getStyle = () => {
    if (isSuccess) {
      return {
        container: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
        dot: 'bg-emerald-500',
        pulse: ['ONLINE', 'LIVE'].includes(norm),
      };
    }
    if (isInfo) {
      return {
        container: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
        dot: 'bg-blue-500',
        pulse: true,
      };
    }
    if (isWarning) {
      return {
        container: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
        dot: 'bg-amber-500',
        pulse: false,
      };
    }
    if (isDanger) {
      return {
        container: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
        dot: 'bg-rose-500',
        pulse: false,
      };
    }
    return {
      container: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
      dot: 'bg-slate-400 dark:bg-slate-500',
      pulse: false,
    };
  };

  const style = getStyle();
  const formatStatus = (s: string) => s.replace(/_/g, ' ');

  const sizeClasses = size === 'sm' 
    ? 'text-[11px] px-2 py-0.5' 
    : size === 'lg' 
    ? 'text-xs px-3 py-1 font-semibold' 
    : 'text-xs px-2.5 py-0.5';

  return (
    <span 
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium uppercase tracking-wider ${sizeClasses} ${style.container} ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {style.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${style.dot}`} />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${style.dot}`} />
      </span>
      <span>{formatStatus(status)}</span>
    </span>
  );
};
