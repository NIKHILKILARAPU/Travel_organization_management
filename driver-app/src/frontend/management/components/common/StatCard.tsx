import React from 'react';
import { type LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  colorTheme?: 'emerald' | 'blue' | 'purple' | 'amber' | 'slate';
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorTheme = 'blue',
  onClick,
  className = ''
}) => {
  const getIconColor = () => {
    switch (colorTheme) {
      case 'emerald':
        return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-800/60';
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-300/80 dark:border-purple-800/60';
      case 'amber':
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300/80 dark:border-amber-800/60';
      case 'slate':
        return 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700';
      case 'blue':
      default:
        return 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300/80 dark:border-blue-800/60';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`group bg-slate-50/80 dark:bg-slate-900 rounded-xl p-5 border border-slate-300/90 dark:border-slate-800 shadow-sm hover:bg-[#091e42] hover:border-blue-500 dark:hover:bg-[#091e42] dark:hover:border-blue-400 hover:shadow-xl hover:shadow-blue-950/30 transition-all duration-200 ${
        onClick ? 'cursor-pointer active:scale-[0.99]' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-blue-200 uppercase tracking-wider block truncate transition-colors">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-white mt-1.5 tracking-tight font-sans transition-colors">
            {value}
          </div>
        </div>

        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border transition-transform group-hover:scale-110 group-hover:shadow-md ${getIconColor()}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-3.5 pt-3 border-t border-slate-200 dark:border-slate-800/80 group-hover:border-blue-900/60 flex items-center justify-between text-xs transition-colors">
          {subtitle && (
            <span className="text-slate-600 dark:text-slate-400 group-hover:text-blue-200 font-medium truncate transition-colors">
              {subtitle}
            </span>
          )}
          {trend && (
            <span className={`inline-flex items-center gap-1 font-bold ml-auto transition-colors ${
              trend.isPositive 
                ? 'text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-300' 
                : 'text-rose-700 dark:text-rose-400 group-hover:text-rose-300'
            }`}>
              {trend.isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
              <span>{trend.value}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
