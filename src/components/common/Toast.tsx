import React from 'react';
import { useLaundry } from '../../context/LaundryContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useLaundry();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />;
            case 'error':
              return <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />;
            case 'warning':
              return <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />;
            default:
              return <Info className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />;
          }
        };

        const getBorder = () => {
          switch (toast.type) {
            case 'success': return 'border-emerald-200 bg-white/95';
            case 'error': return 'border-rose-200 bg-white/95';
            case 'warning': return 'border-amber-200 bg-white/95';
            default: return 'border-sage-200 bg-white/95';
          }
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-card backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-200 ${getBorder()}`}
          >
            {getIcon()}
            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-sm font-semibold text-charcoal">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-charcoal-muted mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-charcoal-muted hover:text-charcoal p-1 rounded-lg hover:bg-black/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
