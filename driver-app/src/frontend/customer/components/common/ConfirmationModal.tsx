import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'primary',
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const getTheme = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-500',
          btnBg: 'bg-rose-500 text-white',
        };
      case 'warning':
        return {
          iconBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-500',
          btnBg: 'bg-amber-500 text-white',
        };
      default:
        return {
          iconBg: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
          btnBg: 'bg-blue-600 text-white',
        };
    }
  };

  const theme = getTheme();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 rounded-[14px] max-w-sm w-full p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.24)]">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center ${theme.iconBg}`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-[14px] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-base font-[700] text-slate-900 dark:text-slate-100 mb-1.5">{title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{message}</p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 min-h-[44px] px-4 text-xs font-[590] text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-700 hover:bg-[#E5E5EA] dark:hover:bg-slate-800 rounded-[14px] transition-all"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 min-h-[44px] px-4 text-xs font-[590] rounded-[14px] transition-all ${theme.btnBg}`}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
