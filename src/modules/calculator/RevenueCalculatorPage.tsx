import React, { useState } from 'react';
import { REVENUE_SHARE_TIERS } from '../../data/config';
import { PartnerTier } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export const RevenueCalculatorPage: React.FC = () => {
  const { language, t } = useLanguage();

  const [priceUsd, setPriceUsd] = useState(299);
  const [monthlySales, setMonthlySales] = useState(25);
  const [selectedTier, setSelectedTier] = useState<PartnerTier>('Silver');

  const tierConfig = REVENUE_SHARE_TIERS[selectedTier];
  const devSharePct = tierConfig.developerShare; // e.g. 0.80
  const dmsSharePct = tierConfig.dmsShare; // e.g. 0.20

  const monthlyGross = priceUsd * monthlySales;
  const monthlyDevPayout = monthlyGross * devSharePct;
  const monthlyDmsShare = monthlyGross * dmsSharePct;

  const yearlyDevPayout = monthlyDevPayout * 12;
  const yearlyDmsShare = monthlyDmsShare * 12;

  // Approximate EGP calculation (exchange rate ~48.5 EGP/USD)
  const egpRate = 48.5;
  const monthlyDevPayoutEgp = monthlyDevPayout * egpRate;

  // 12-month projected cumulative curve
  const projectionData = Array.from({ length: 12 }, (_, i) => {
    const monthIndex = i + 1;
    const factor = Math.pow(1.03, i);
    const mDev = monthlyDevPayout * factor;
    const mDms = monthlyDmsShare * factor;

    return {
      month: `M${monthIndex}`,
      developer: Math.round(mDev),
      dms: Math.round(mDms)
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-night-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
          {t('calcTitle')}
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          {t('calcSubtitle')}
        </p>
      </div>

      {/* Main Grid: Controls + Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-6">
          <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
            Calculator Parameters
          </h3>

          {/* Price Input */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300">
              {t('calcPriceInput')}
            </label>
            <div className="relative">
              <span className="absolute start-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold">$</span>
              <input
                type="number"
                min={10}
                max={5000}
                step={10}
                value={priceUsd}
                onChange={(e) => setPriceUsd(Math.max(0, Number(e.target.value)))}
                className="w-full ps-8 pe-3 py-2 text-xs rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 font-mono-code focus:outline-none focus:border-link"
              />
            </div>
            <div className="text-[11px] text-stone-500 font-mono-code">
              ≈ {(priceUsd * egpRate).toLocaleString()} EGP per license
            </div>
          </div>

          {/* Monthly Sales Input & Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-stone-700 dark:text-stone-300 font-medium">
              <span>{t('calcSalesInput')}</span>
              <span className="font-mono-code text-stone-900 dark:text-stone-100 font-bold">{monthlySales} licenses</span>
            </div>
            <input
              type="range"
              min={1}
              max={150}
              value={monthlySales}
              onChange={(e) => setMonthlySales(Number(e.target.value))}
              className="w-full accent-link cursor-pointer"
            />
          </div>

          {/* Tier Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300">
              {t('calcTierSelect')}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {(Object.keys(REVENUE_SHARE_TIERS) as PartnerTier[]).map((tierKey) => {
                const isSelected = selectedTier === tierKey;
                const config = REVENUE_SHARE_TIERS[tierKey];
                return (
                  <button
                    key={tierKey}
                    type="button"
                    onClick={() => setSelectedTier(tierKey)}
                    className={`p-3 rounded-lg text-start transition-colors border text-xs flex flex-col gap-1 ${
                      isSelected
                        ? 'border-accent bg-stone-50 dark:bg-night-800/80 text-stone-900 dark:text-stone-100 shadow-xs'
                        : 'border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-night-700 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    <span className="font-bold text-stone-900 dark:text-stone-100">{tierKey}</span>
                    <span className="text-accent font-mono-code font-bold">
                      {Math.round(config.developerShare * 100)}% Dev Share
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="p-3 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-[11px] text-stone-500">
              {language === 'ar' ? tierConfig.descriptionAr : tierConfig.description}
            </div>
          </div>
        </div>

        {/* Results & Projection Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-1">
              <div className="text-xs text-stone-500 font-medium">
                {t('calcMonthlyDevShare')}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-accent font-mono-code">
                ${Math.round(monthlyDevPayout).toLocaleString()}
              </div>
              <div className="text-[11px] text-stone-500 font-mono-code">
                ≈ {Math.round(monthlyDevPayoutEgp).toLocaleString()} EGP / mo
              </div>
            </div>

            <div className="p-5 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-1">
              <div className="text-xs text-stone-500 font-medium">
                {t('calcYearlyDevShare')}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-mono-code">
                ${Math.round(yearlyDevPayout).toLocaleString()}
              </div>
              <div className="text-[11px] text-stone-500">Annual net payout</div>
            </div>

            <div className="p-5 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-1">
              <div className="text-xs text-stone-500 font-medium">
                {t('calcDmsShare')}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-stone-700 dark:text-stone-300 font-mono-code">
                ${Math.round(yearlyDmsShare).toLocaleString()}
              </div>
              <div className="text-[11px] text-stone-400">
                Covers security audit & SLA
              </div>
            </div>
          </div>

          {/* 12-Month Projection Chart Card */}
          <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
                {t('calcProjectionChart')}
              </h3>
              <span className="text-xs font-mono-code text-stone-500">
                Stacked Monthly Forecast (USD)
              </span>
            </div>

            <div className="h-64 w-full dir-ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} className="dark:opacity-20" />
                  <XAxis dataKey="month" stroke="#78716C" fontSize={11} />
                  <YAxis stroke="#78716C" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#141C3D',
                      borderColor: '#33427F',
                      borderRadius: '8px',
                      color: '#FAFAF9',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area
                    type="monotone"
                    dataKey="developer"
                    name="Developer Earnings"
                    stroke="#1E5BB8"
                    fill="#1E5BB8"
                    fillOpacity={0.15}
                  />
                  <Area
                    type="monotone"
                    dataKey="dms"
                    name="DMS Operations Share"
                    stroke="#78716C"
                    fill="#78716C"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
