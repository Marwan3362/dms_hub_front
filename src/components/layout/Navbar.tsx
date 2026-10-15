import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Globe,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
  Code2,
  Terminal,
  Cpu,
  ShoppingBag,
  Award,
  MessageSquare,
  BarChart3,
  ShieldAlert,
  UserCheck,
  Check
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Logo } from '../ui/Logo';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, switchUserRole, allSampleUsers } = useAuth();
  const location = useLocation();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const roleLabels: Record<UserRole, string> = {
    developer: t('developerRole'),
    partner: t('partnerRole'),
    customer_it: t('customerItRole'),
    admin: t('adminRole')
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-navy text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/"
            className="flex items-center gap-3 text-base sm:text-lg font-bold tracking-tight text-white hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          >
            <Logo height={40} />
            <span className="hidden xl:inline-block ps-3 border-s border-white/25 text-sm font-semibold text-white/90">
              {t('brandName')}
            </span>
          </Link>
        </div>

        {/* 4–5 Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/75">
          <Link
            to="/docs"
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              isActive('/docs')
                ? 'text-white font-semibold border-b-2 border-white'
                : 'hover:text-white'
            }`}
          >
            {t('navDocs')}
          </Link>

          <Link
            to="/sandbox"
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              isActive('/sandbox')
                ? 'text-white font-semibold border-b-2 border-white'
                : 'hover:text-white'
            }`}
          >
            {t('navSandbox')}
          </Link>

          <Link
            to="/marketplace"
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              isActive('/marketplace')
                ? 'text-white font-semibold border-b-2 border-white'
                : 'hover:text-white'
            }`}
          >
            {t('navMarketplace')}
          </Link>

          <Link
            to="/academy"
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              isActive('/academy')
                ? 'text-white font-semibold border-b-2 border-white'
                : 'hover:text-white'
            }`}
          >
            {t('navAcademy')}
          </Link>

          <Link
            to="/forum"
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              isActive('/forum')
                ? 'text-white font-semibold border-b-2 border-white'
                : 'hover:text-white'
            }`}
          >
            {t('navForum')}
          </Link>

          {/* More menu */}
          <div className="relative">
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              onBlur={() => setTimeout(() => setMoreMenuOpen(false), 200)}
              className="flex items-center gap-1 hover:text-white text-white/75 py-1 transition-colors whitespace-nowrap shrink-0 text-sm"
            >
              <span>{language === 'ar' ? 'المزيد' : 'More'}</span>
              <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>

            {moreMenuOpen && (
              <div className="absolute top-full start-0 mt-2 w-56 rounded-lg bg-white dark:bg-night-900 border border-stone-200 dark:border-night-800 shadow-lg p-1.5 z-50 flex flex-col gap-0.5 text-xs">
                <Link
                  to="/query-runner"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-stone-100 dark:hover:bg-night-800 text-stone-700 dark:text-stone-300"
                >
                  <Terminal className="w-4 h-4 text-stone-500 shrink-0" strokeWidth={1.5} />
                  <span>{t('navQueryRunner')}</span>
                </Link>
                <Link
                  to="/ai-hub"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-stone-100 dark:hover:bg-night-800 text-stone-700 dark:text-stone-300"
                >
                  <Cpu className="w-4 h-4 text-stone-500 shrink-0" strokeWidth={1.5} />
                  <span>{t('navAiHub')}</span>
                </Link>
                <Link
                  to="/calculator"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-stone-100 dark:hover:bg-night-800 text-stone-700 dark:text-stone-300"
                >
                  <BarChart3 className="w-4 h-4 text-stone-500 shrink-0" strokeWidth={1.5} />
                  <span>{t('navCalculator')}</span>
                </Link>
                <Link
                  to="/gamification"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-stone-100 dark:hover:bg-night-800 text-stone-700 dark:text-stone-300"
                >
                  <Award className="w-4 h-4 text-stone-500 shrink-0" strokeWidth={1.5} />
                  <span>{t('navGamification')}</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-stone-100 dark:hover:bg-night-800 text-stone-700 dark:text-stone-300"
                >
                  <UserCheck className="w-4 h-4 text-stone-500 shrink-0" strokeWidth={1.5} />
                  <span>{t('navDashboard')}</span>
                </Link>
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-stone-100 dark:hover:bg-night-800 text-stone-700 dark:text-stone-300"
                >
                  <ShieldAlert className="w-4 h-4 text-stone-500 shrink-0" strokeWidth={1.5} />
                  <span>{t('navAdmin')}</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors whitespace-nowrap shrink-0"
            title="Toggle Arabic / English"
          >
            <Globe className="w-3.5 h-3.5 text-white/80" strokeWidth={1.5} />
            <span>{t('switchLang')}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
            title={theme === 'dark' ? t('themeToggleLight') : t('themeToggleDark')}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-brand-yellow" strokeWidth={1.5} />
            ) : (
              <Moon className="w-4 h-4 text-white" strokeWidth={1.5} />
            )}
          </button>

          {/* Account Profile Simulation Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 ps-2 pe-1.5 py-1 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition-colors text-xs text-white"
            >
              <div className="w-5 h-5 rounded-full bg-white text-brand-navy font-bold text-[10px] flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
              <span className="hidden lg:inline max-w-[110px] truncate font-medium">
                {language === 'ar' ? user.nameAr : user.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-white/70" strokeWidth={1.5} />
            </button>

            {roleMenuOpen && (
              <div className="absolute top-full end-0 mt-2 w-72 rounded-xl bg-white dark:bg-night-900 border border-stone-200 dark:border-night-800 shadow-xl p-2.5 z-50 text-xs">
                <div className="px-3 py-2 border-b border-stone-100 dark:border-night-800/80 mb-2">
                  <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                    {language === 'ar' ? user.nameAr : user.name}
                  </div>
                  <div className="text-stone-500 dark:text-stone-400 truncate mt-0.5">
                    {language === 'ar' ? user.companyAr : user.company}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-stone-600 dark:text-stone-400">
                    <span className="text-accent font-semibold">{user.points} pts</span>
                    <span>·</span>
                    <span className="font-medium">{user.tier} Tier</span>
                  </div>
                </div>

                <div className="px-3 py-1 font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider text-[10px]">
                  {t('switchRole')}
                </div>

                {(Object.keys(allSampleUsers) as UserRole[]).map((roleKey) => {
                  const roleUser = allSampleUsers[roleKey];
                  const isCurrent = user.role === roleKey;
                  return (
                    <button
                      key={roleKey}
                      onClick={() => {
                        switchUserRole(roleKey);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-start transition-colors ${
                        isCurrent
                          ? 'bg-stone-100 dark:bg-night-800 text-accent font-semibold'
                          : 'hover:bg-stone-50 dark:hover:bg-night-800/50 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs">{roleLabels[roleKey]}</span>
                        <span className="text-[11px] text-stone-500">{roleUser.name}</span>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-accent shrink-0" strokeWidth={1.5} />}
                    </button>
                  );
                })}

                <div className="pt-2 mt-2 border-t border-stone-100 dark:border-night-800/80">
                  <Link
                    to="/profile"
                    onClick={() => setRoleMenuOpen(false)}
                    className="block text-center w-full py-1.5 rounded bg-stone-100 dark:bg-night-800 hover:bg-stone-200 dark:hover:bg-night-700 text-stone-800 dark:text-stone-200 font-medium transition-colors"
                  >
                    {t('profileTitle')}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg border border-white/20 bg-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div className="brand-bar" aria-hidden="true" />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 dark:border-night-800 bg-white dark:bg-night-950 px-4 pt-2 pb-6 space-y-1.5 text-sm">
          <Link
            to="/docs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-night-800 text-stone-800 dark:text-stone-200"
          >
            <Code2 className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <span>{t('navDocs')}</span>
          </Link>
          <Link
            to="/sandbox"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-night-800 text-stone-800 dark:text-stone-200"
          >
            <Terminal className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <span>{t('navSandbox')}</span>
          </Link>
          <Link
            to="/marketplace"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-night-800 text-stone-800 dark:text-stone-200"
          >
            <ShoppingBag className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <span>{t('navMarketplace')}</span>
          </Link>
          <Link
            to="/academy"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-night-800 text-stone-800 dark:text-stone-200"
          >
            <Award className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <span>{t('navAcademy')}</span>
          </Link>
          <Link
            to="/forum"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-night-800 text-stone-800 dark:text-stone-200"
          >
            <MessageSquare className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <span>{t('navForum')}</span>
          </Link>
          <Link
            to="/query-runner"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-night-800 text-stone-800 dark:text-stone-200"
          >
            <Terminal className="w-4 h-4 text-stone-400" strokeWidth={1.5} />
            <span>{t('navQueryRunner')}</span>
          </Link>
          <Link
            to="/ai-hub"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-night-800 text-stone-800 dark:text-stone-200"
          >
            <Cpu className="w-4 h-4 text-stone-400" strokeWidth={1.5} />
            <span>{t('navAiHub')}</span>
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-night-800 text-stone-800 dark:text-stone-200"
          >
            <UserCheck className="w-4 h-4 text-stone-400" strokeWidth={1.5} />
            <span>{t('navDashboard')}</span>
          </Link>
        </div>
      )}
    </header>
  );
};
