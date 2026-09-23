import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  subMessage,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center min-h-[220px] ${className}`}>
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-4 border-blue-200 dark:border-blue-800 border-t-[#0071E3] animate-spin" />
        <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 absolute inset-0 m-auto animate-pulse" />
      </div>
      <p className="text-sm font-[590] text-slate-900 dark:text-slate-100">{message}</p>
      {subMessage && <p className="text-xs text-slate-500 dark:text-slate-400 font-[400] mt-1 max-w-xs">{subMessage}</p>}
    </div>
  );
};
