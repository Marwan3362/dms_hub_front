import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const SyntheticBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => {
  const { t } = useLanguage();

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded border border-stone-200 dark:border-night-800 bg-stone-100 dark:bg-night-900 text-stone-600 dark:text-stone-400 select-none ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      }`}
      title={t('syntheticDisclaimer')}
    >
      <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" strokeWidth={1.5} />
      <span>{t('syntheticBadge')}</span>
    </span>
  );
};
