import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const StatusBadge: React.FC<{
  status:
    | 'active'
    | 'pending'
    | 'approved'
    | 'rejected'
    | 'revoked'
    | 'in_progress'
    | 'resolved'
    | 'open'
    | 'draft'
    | 'in_review';
}> = ({ status }) => {
  const { t } = useLanguage();

  const configMap: Record<string, { labelKey: string; classes: string; dotColor: string }> = {
    active: {
      labelKey: 'active',
      classes: 'text-ok border-brand-green/40 bg-brand-green/10',
      dotColor: 'bg-brand-green'
    },
    approved: {
      labelKey: 'approved',
      classes: 'text-ok border-brand-green/40 bg-brand-green/10',
      dotColor: 'bg-brand-green'
    },
    resolved: {
      labelKey: 'resolved',
      classes: 'text-ok border-brand-green/40 bg-brand-green/10',
      dotColor: 'bg-brand-green'
    },
    pending: {
      labelKey: 'pending',
      classes: 'text-brand-navy-dark border-brand-yellow bg-brand-yellow',
      dotColor: 'bg-brand-navy-dark'
    },
    in_review: {
      labelKey: 'pending',
      classes: 'text-brand-navy-dark border-brand-yellow bg-brand-yellow',
      dotColor: 'bg-brand-navy-dark'
    },
    in_progress: {
      labelKey: 'pending',
      classes: 'text-info border-brand-blue/40 bg-brand-blue/10',
      dotColor: 'bg-brand-blue'
    },
    open: {
      labelKey: 'active',
      classes: 'text-info border-brand-blue/40 bg-brand-blue/10',
      dotColor: 'bg-brand-blue'
    },
    draft: {
      labelKey: 'pending',
      classes: 'text-stone-500 dark:text-stone-400 border-stone-200 dark:border-night-800 bg-stone-50 dark:bg-night-900',
      dotColor: 'bg-stone-400'
    },
    rejected: {
      labelKey: 'rejected',
      classes: 'text-err border-brand-red/40 bg-brand-red/10',
      dotColor: 'bg-brand-red'
    },
    revoked: {
      labelKey: 'revoked',
      classes: 'text-stone-500 dark:text-stone-400 border-stone-200 dark:border-night-800 bg-stone-50 dark:bg-night-900',
      dotColor: 'bg-stone-400'
    }
  };

  const current = configMap[status] || {
    labelKey: status,
    classes: 'text-stone-600 dark:text-stone-400 border-stone-200 dark:border-night-800 bg-stone-50 dark:bg-night-900',
    dotColor: 'bg-stone-400'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border ${current.classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dotColor} shrink-0`} />
      <span>{t(current.labelKey as any, status)}</span>
    </span>
  );
};
