import React, { useState } from 'react';
import {
  PENDING_LISTINGS,
  PENDING_KEY_REQUESTS,
  ADMIN_ANALYTICS_DATA,
  PendingListingReview,
  PendingKeyRequest
} from '../../data/adminStats';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldAlert,
  CheckCircle,
  XCircle,
  BarChart3,
  Layers,
  Key
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const AdminPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addToast } = useToast();
  const { user, switchUserRole } = useAuth();

  const [activeTab, setActiveTab] = useState<'listings' | 'keys' | 'analytics'>('listings');

  // Review queues states
  const [pendingListings, setPendingListings] = useState<PendingListingReview[]>(PENDING_LISTINGS);
  const [pendingKeys, setPendingKeys] = useState<PendingKeyRequest[]>(PENDING_KEY_REQUESTS);
  const [adminComments, setAdminComments] = useState<Record<string, string>>({});

  const handleListingAction = (id: string, action: 'approve' | 'reject') => {
    setPendingListings((prev) => prev.filter((item) => item.id !== id));
    addToast(
      action === 'approve'
        ? language === 'ar'
          ? 'تم اعتماد ونشر الإضافة في المتجر بنجاح'
          : 'Marketplace listing approved and published'
        : language === 'ar'
        ? 'تم رفض طلب النشر وإرسال الملاحظات للمطور'
        : 'Listing rejected and feedback returned to developer',
      action === 'approve' ? 'success' : 'warning'
    );
  };

  const handleKeyAction = (id: string, action: 'approve' | 'reject') => {
    setPendingKeys((prev) => prev.filter((item) => item.id !== id));
    addToast(
      action === 'approve'
        ? language === 'ar'
          ? 'تم اعتماد مفتاح الإنتاج المؤسسي وتفعيله للعميل'
          : 'Production API key approved and activated for customer plant'
        : language === 'ar'
        ? 'تم رفض طلب مفتاح الإنتاج'
        : 'Production API key request rejected',
      action === 'approve' ? 'success' : 'warning'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-night-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-accent" strokeWidth={1.5} />
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
              {t('adminTitle')}
            </h1>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            {t('adminSubtitle')}
          </p>
        </div>

        {/* Role Quick Switcher Reminder */}
        {user.role !== 'admin' && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-100 dark:bg-night-800 border border-stone-200 dark:border-night-700 text-stone-600 dark:text-stone-400 text-xs">
            <span>You are viewing in simulated guest view.</span>
            <button
              onClick={() => switchUserRole('admin')}
              className="px-2.5 py-1 rounded bg-primary hover:bg-primary-hover text-white font-medium transition-colors"
            >
              Switch to DMS Admin
            </button>
          </div>
        )}
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-1 p-0.5 rounded-lg bg-stone-100 dark:bg-night-800 border border-stone-200 dark:border-night-700 text-xs w-fit">
        <button
          onClick={() => setActiveTab('listings')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors ${
            activeTab === 'listings'
              ? 'bg-white dark:bg-night-900 text-accent font-semibold shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>{t('tabReviewQueue')} ({pendingListings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('keys')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors ${
            activeTab === 'keys'
              ? 'bg-white dark:bg-night-900 text-accent font-semibold shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <Key className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>{t('tabKeyApprovals')} ({pendingKeys.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors ${
            activeTab === 'analytics'
              ? 'bg-white dark:bg-night-900 text-accent font-semibold shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>{t('tabAnalytics')}</span>
        </button>
      </div>

      {/* Tab 1: Marketplace Review Queue */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          {pendingListings.length > 0 ? (
            pendingListings.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 dark:border-night-800/80 pb-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono-code text-accent uppercase font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                      {language === 'ar' ? item.titleAr : item.title}
                    </h3>
                    <div className="text-xs text-stone-500">
                      Submitted by <strong>{item.authorName}</strong> ({item.company}) on{' '}
                      <span className="font-mono-code">{item.submittedAt}</span>
                    </div>
                  </div>

                  <div className="text-end">
                    <div className="text-stone-900 dark:text-stone-100 font-mono-code font-bold text-sm">
                      Price: ${item.price} USD
                    </div>
                    <div className="text-[11px] text-accent font-medium">
                      Security Scan: {item.codeSecurityScanStatus}
                    </div>
                  </div>
                </div>

                {/* Comment box */}
                <input
                  type="text"
                  placeholder={t('adminCommentPlaceholder')}
                  value={adminComments[item.id] || ''}
                  onChange={(e) =>
                    setAdminComments({ ...adminComments, [item.id]: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
                />

                {/* Review actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => handleListingAction(item.id, 'reject')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-100 dark:bg-night-800 hover:bg-brand-red/10 text-err border border-stone-200 dark:border-night-700 text-xs font-medium transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{t('rejectBtn')}</span>
                  </button>

                  <button
                    onClick={() => handleListingAction(item.id, 'approve')}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-medium shadow-sm transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{t('approveBtn')}</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-stone-500 text-sm border border-stone-200 dark:border-night-800 rounded-xl bg-white dark:bg-night-900">
              All marketplace listing submissions have been reviewed and processed!
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Production API Key Approvals */}
      {activeTab === 'keys' && (
        <div className="space-y-4">
          {pendingKeys.length > 0 ? (
            pendingKeys.map((req) => (
              <div
                key={req.id}
                className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 dark:border-night-800/80 pb-3">
                  <div>
                    <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">{req.companyName}</h3>
                    <div className="text-xs text-stone-500">
                      Tax Registration ID: <strong className="font-mono-code text-stone-700 dark:text-stone-300">{req.taxRegistrationNumber}</strong> · Applicant: {req.applicantName}
                    </div>
                  </div>

                  <div className="text-end">
                    <span className="px-2.5 py-0.5 rounded text-xs font-medium font-mono-code bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-night-700">
                      Target RPS: {req.requestedRps} req/s
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-xs text-stone-600 dark:text-stone-400 space-y-1">
                  <div className="font-medium text-stone-700 dark:text-stone-300">Business Scope & Justification:</div>
                  <p className="leading-relaxed font-normal">{req.justification}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                    <CheckCircle className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                    <span>Egyptian Data Law 151/2020 Compliance Declared</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleKeyAction(req.id, 'reject')}
                      className="px-3.5 py-1.5 rounded-lg bg-stone-100 dark:bg-night-800 hover:bg-brand-red/10 text-err border border-stone-200 dark:border-night-700 text-xs font-medium transition-colors"
                    >
                      {t('rejectBtn')}
                    </button>
                    <button
                      onClick={() => handleKeyAction(req.id, 'approve')}
                      className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-medium shadow-sm transition-colors"
                    >
                      Grant Production Clearance
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-stone-500 text-sm border border-stone-200 dark:border-night-800 rounded-xl bg-white dark:bg-night-900">
              No pending enterprise production key requests at this time.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Platform Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Growth Chart */}
            <div className="lg:col-span-8 p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
                Developer Community Growth & Active Users
              </h3>

              <div className="h-72 w-full dir-ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ADMIN_ANALYTICS_DATA.monthlyGrowth}>
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
                    <Line
                      type="monotone"
                      dataKey="registeredDevs"
                      name="Registered Developers"
                      stroke="#1E5BB8"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="activeDevs"
                      name="Monthly Active Devs"
                      stroke="#78716C"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribution Pie Chart */}
            <div className="lg:col-span-4 p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
                API Calls by Product Line
              </h3>

              <div className="h-56 w-full dir-ltr flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ADMIN_ANALYTICS_DATA.productDistribution}
                      dataKey="percentage"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={75}
                      label={(entry: any) => `${entry.percentage}%`}
                    >
                      {ADMIN_ANALYTICS_DATA.productDistribution.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? '#1E5BB8' : index === 1 ? '#2E9445' : '#78716C'}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5 text-xs">
                {ADMIN_ANALYTICS_DATA.productDistribution.map((entry, index) => (
                  <div key={entry.name} className="flex items-center justify-between text-stone-600 dark:text-stone-400">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: index === 0 ? '#1E5BB8' : index === 1 ? '#2E9445' : '#78716C'
                        }}
                      />
                      <span>{language === 'ar' ? entry.nameAr : entry.name}</span>
                    </div>
                    <span className="font-mono-code font-bold text-stone-900 dark:text-stone-100">{entry.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
