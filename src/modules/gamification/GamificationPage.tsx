import React, { useState } from 'react';
import {
  MONTHLY_LEADERBOARD,
  ALL_TIME_LEADERBOARD,
  REWARDS_CATALOG,
  POINT_ACTIVITIES
} from '../../data/gamification';
import { RewardItem } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import {
  Award,
  Trophy,
  Gift,
  Coins
} from 'lucide-react';

export const GamificationPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addToast } = useToast();
  const { user, deductPoints } = useAuth();

  const [leaderboardTab, setLeaderboardTab] = useState<'monthly' | 'allTime'>('monthly');

  const currentLeaderboard =
    leaderboardTab === 'monthly' ? MONTHLY_LEADERBOARD : ALL_TIME_LEADERBOARD;

  const handleRedeem = (reward: RewardItem) => {
    if (user.points < reward.pointsCost) {
      addToast(
        language === 'ar'
          ? `رصيد نقاطك (${user.points}) غير كافٍ. يتطلب هذا العنصر ${reward.pointsCost} نقطة.`
          : `Insufficient points balance (${user.points}). Requires ${reward.pointsCost} points.`,
        'error',
        'Redemption Failed'
      );
      return;
    }

    const success = deductPoints(reward.pointsCost);
    if (success) {
      addToast(
        language === 'ar'
          ? `تم استبدال "${language === 'ar' ? reward.titleAr : reward.title}" بنجاح! تم خصم ${reward.pointsCost} نقطة.`
          : `Successfully redeemed "${reward.title}"! Deducted ${reward.pointsCost} points.`,
        'success',
        'Reward Claimed'
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-night-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            {t('gamificationTitle')}
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            {t('gamificationSubtitle')}
          </p>
        </div>

        {/* User Balance Card */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white dark:bg-night-900 border border-stone-200 dark:border-night-800 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-night-800 flex items-center justify-center text-accent">
            <Coins className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[11px] text-stone-500 font-medium">
              {t('pointsBalance')}
            </div>
            <div className="text-base font-bold text-stone-900 dark:text-stone-100 font-mono-code">
              {user.points.toLocaleString()} <span className="text-xs text-accent">PTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Point Activities Rules Banner */}
      <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
        <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
          How to Earn Contribution Points
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {POINT_ACTIVITIES.map((act, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 flex items-center justify-between text-xs gap-2"
            >
              <span className="text-stone-700 dark:text-stone-300">
                {language === 'ar' ? act.activityAr : act.activity}
              </span>
              <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-night-800 text-accent font-bold font-mono-code border border-stone-200 dark:border-night-700 shrink-0">
                +{act.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column Split: Leaderboard & Rewards Store */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Leaderboard */}
        <div className="lg:col-span-6 p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-night-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">Community Leaderboard</h3>
            </div>

            {/* Toggle Monthly vs All-Time */}
            <div className="flex items-center p-0.5 rounded-lg bg-stone-100 dark:bg-night-800 border border-stone-200 dark:border-night-700 text-xs">
              <button
                onClick={() => setLeaderboardTab('monthly')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  leaderboardTab === 'monthly'
                    ? 'bg-white dark:bg-night-900 text-accent font-semibold shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                {t('leaderboardMonthly')}
              </button>
              <button
                onClick={() => setLeaderboardTab('allTime')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  leaderboardTab === 'allTime'
                    ? 'bg-white dark:bg-night-900 text-accent font-semibold shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                {t('leaderboardAllTime')}
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {currentLeaderboard.map((u) => {
              const isFirst = u.rank === 1;

              return (
                <div
                  key={u.rank}
                  className="p-3.5 rounded-lg border border-stone-200 dark:border-night-800 bg-stone-50/50 dark:bg-night-900 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono-code text-[11px] ${
                        isFirst
                          ? 'bg-primary text-white'
                          : 'bg-stone-200 dark:bg-night-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {u.rank}
                    </div>

                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-7 h-7 rounded-full object-cover border border-stone-200 dark:border-night-700"
                      referrerPolicy="no-referrer"
                    />

                    <div>
                      <div className="font-medium text-stone-900 dark:text-stone-100">
                        {language === 'ar' ? u.nameAr : u.name}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {language === 'ar' ? u.companyAr : u.company}
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <div className="font-bold text-stone-900 dark:text-stone-100 font-mono-code text-sm">
                      {u.points.toLocaleString()} pts
                    </div>
                    <div className="text-[10px] text-stone-500 font-medium">
                      {language === 'ar' ? u.badgeAr : u.badge}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Rewards Catalog */}
        <div className="lg:col-span-6 p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-night-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
                {t('rewardsCatalog')}
              </h3>
            </div>
            <span className="text-xs font-mono-code text-stone-500">
              {REWARDS_CATALOG.length} Rewards Available
            </span>
          </div>

          <div className="space-y-3">
            {REWARDS_CATALOG.map((reward) => {
              const canAfford = user.points >= reward.pointsCost;
              return (
                <div
                  key={reward.id}
                  className="p-4 rounded-xl border border-stone-200 dark:border-night-800 bg-stone-50/50 dark:bg-night-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">
                      {language === 'ar' ? reward.titleAr : reward.title}
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
                      {language === 'ar' ? reward.descriptionAr : reward.description}
                    </p>
                    <div className="text-stone-500 font-medium font-mono-code text-xs pt-1">
                      Cost: {reward.pointsCost} points
                    </div>
                  </div>

                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-lg font-medium text-xs whitespace-nowrap transition-colors shadow-xs ${
                      canAfford
                        ? 'bg-primary hover:bg-primary-hover text-white'
                        : 'bg-stone-100 dark:bg-night-800 text-stone-400 dark:text-stone-500 cursor-not-allowed border border-stone-200 dark:border-night-700'
                    }`}
                  >
                    {canAfford ? t('redeemBtn') : 'Need More Points'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
