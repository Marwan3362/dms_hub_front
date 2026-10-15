import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { ShieldCheck, Mail, MapPin } from 'lucide-react';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-stone-200 dark:border-night-800 bg-[#FAFAF9] dark:bg-night-950 text-stone-600 dark:text-stone-400 text-xs py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Enterprise description */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center rounded-lg bg-brand-navy px-3 py-2">
                <Logo height={40} />
              </div>
              <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                {t('brandName')}
              </span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed max-w-lg text-xs">
              {t('footerDesc')}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-stone-200 dark:border-night-800 bg-stone-100 dark:bg-night-900 text-stone-600 dark:text-stone-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
              <span>{t('egyptianEnterprise')}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 font-semibold text-stone-900 dark:text-stone-100 text-xs uppercase tracking-wider">
              <span className="brand-diamond brand-diamond-blue" aria-hidden="true" />{t('footerLinksDocs')}
            </h4>
            <ul className="space-y-1.5 text-stone-600 dark:text-stone-400">
              <li>
                <Link to="/docs" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  {t('navDocs')}
                </Link>
              </li>
              <li>
                <Link to="/sandbox" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  {t('navSandbox')}
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  {t('navMarketplace')}
                </Link>
              </li>
              <li>
                <Link to="/academy" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  {t('navAcademy')}
                </Link>
              </li>
              <li>
                <Link to="/forum" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  {t('navForum')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Status */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 font-semibold text-stone-900 dark:text-stone-100 text-xs uppercase tracking-wider">
              <span className="brand-diamond brand-diamond-green" aria-hidden="true" />{t('footerLinksLegal')}
            </h4>
            <div className="space-y-1.5 text-stone-600 dark:text-stone-400">
              <div className="font-mono-code text-[11px] text-stone-500 dark:text-stone-400">
                {t('footerSystemStatus')}
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" strokeWidth={1.5} />
                <span>developers@dms-sae.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" strokeWidth={1.5} />
                <span>Cairo, Arab Republic of Egypt</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200 dark:border-night-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <div>{t('copyright')}</div>
          <div className="flex items-center gap-3">
            <span className="hover:text-stone-700 dark:hover:text-stone-300 cursor-pointer">{t('footerPrivacy')}</span>
            <span>·</span>
            <span className="hover:text-stone-700 dark:hover:text-stone-300 cursor-pointer">{t('footerTerms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
