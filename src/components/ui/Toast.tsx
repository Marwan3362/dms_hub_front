import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 start-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = 'text-ok';
        let edgeColor = 'border-s-brand-green';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = 'text-err';
          edgeColor = 'border-s-brand-red';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = 'text-warn';
          edgeColor = 'border-s-brand-yellow';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = 'text-info';
          edgeColor = 'border-s-brand-blue';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border border-s-4 ${edgeColor} border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 text-stone-900 dark:text-stone-100 shadow-lg transition-all`}
          >
            <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${iconColor}`} strokeWidth={1.5} />
            <div className="flex-1 text-xs">
              {toast.title && <div className="font-semibold mb-0.5 text-stone-900 dark:text-stone-100">{toast.title}</div>}
              <div className="text-stone-600 dark:text-stone-300 leading-relaxed">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-0.5 shrink-0"
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
