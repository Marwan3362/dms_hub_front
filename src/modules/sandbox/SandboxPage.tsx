import React, { useState } from 'react';
import { ApiKeyItem } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { SyntheticBadge } from '../../components/ui/SyntheticBadge';
import { Modal } from '../../components/ui/Modal';
import {
  Key,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  Plus,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const INITIAL_KEYS: ApiKeyItem[] = [
  {
    id: 'key_sb_01',
    name: 'Nile-Plant-SCADA-Dev',
    keyMasked: 'dms_sb_98f4************81c2',
    rawKey: 'dms_sb_98f48e239a0b81c2fe331499a',
    environment: 'sandbox',
    status: 'active',
    createdAt: '2026-09-14',
    lastUsed: '2 minutes ago',
    requestsCount: 14850,
    rateLimit: 10000
  },
  {
    id: 'key_sb_02',
    name: 'Hospital-FHIR-Bridge-Test',
    keyMasked: 'dms_sb_31a9************90bf',
    rawKey: 'dms_sb_31a90c128bd490bf77a012de3',
    environment: 'sandbox',
    status: 'active',
    createdAt: '2026-10-02',
    lastUsed: '1 hour ago',
    requestsCount: 8240,
    rateLimit: 10000
  },
  {
    id: 'key_prod_01',
    name: 'Alexandria-Steel-Production-Core',
    keyMasked: 'dms_live_77e1************44bb',
    rawKey: 'dms_live_77e199df028144bb82ec4128a',
    environment: 'production',
    status: 'pending_approval',
    createdAt: '2026-10-11',
    lastUsed: 'Never (Pending Approval)',
    requestsCount: 0,
    rateLimit: 50000,
    projectedRps: 150,
    justification: 'Connecting 4 continuous wire extrusion lines directly with DMS Industrial ERP production orders to automate raw copper weight consumption in real time.'
  }
];

// 7-day usage chart data
const USAGE_CHART_DATA = [
  { day: 'Mon', requests: 1820, errors: 4 },
  { day: 'Tue', requests: 2450, errors: 12 },
  { day: 'Wed', requests: 3100, errors: 6 },
  { day: 'Thu', requests: 2890, errors: 8 },
  { day: 'Fri', requests: 1400, errors: 2 },
  { day: 'Sat', requests: 850, errors: 0 },
  { day: 'Sun', requests: 2340, errors: 5 }
];

export const SandboxPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addToast } = useToast();

  const [keys, setKeys] = useState<ApiKeyItem[]>(INITIAL_KEYS);
  const [unmaskedKeyIds, setUnmaskedKeyIds] = useState<Record<string, boolean>>({});

  // Modals state
  const [createKeyModalOpen, setCreateKeyModalOpen] = useState(false);
  const [prodKeyModalOpen, setProdKeyModalOpen] = useState(false);

  // Form states
  const [newKeyName, setNewKeyName] = useState('');
  const [prodJustification, setProdJustification] = useState('');
  const [prodRps, setProdRps] = useState(100);
  const [prodComplianceAccepted, setProdComplianceAccepted] = useState(false);

  const toggleMask = (id: string) => {
    setUnmaskedKeyIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyKey = (rawKey: string) => {
    navigator.clipboard.writeText(rawKey);
    addToast(t('copied'), 'success');
  };

  const handleRevoke = (id: string) => {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: 'revoked' as const } : k))
    );
    addToast(language === 'ar' ? 'تم إلغاء المفتاح بنجاح' : 'API Key revoked successfully', 'warning');
  };

  const handleRegenerate = (id: string) => {
    const randomHex = Math.random().toString(36).substring(2, 12);
    setKeys((prev) =>
      prev.map((k) =>
        k.id === id
          ? {
              ...k,
              rawKey: `dms_sb_${randomHex}89ef`,
              keyMasked: `dms_sb_${randomHex.substring(0, 4)}************89ef`,
              status: 'active' as const
            }
          : k
      )
    );
    addToast(language === 'ar' ? 'تم إعادة توليد المفتاح' : 'API Key regenerated', 'success');
  };

  const handleCreateSandboxKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const randomHex = Math.random().toString(36).substring(2, 10);
    const newKey: ApiKeyItem = {
      id: `key_sb_${Date.now()}`,
      name: newKeyName,
      keyMasked: `dms_sb_${randomHex}************99aa`,
      rawKey: `dms_sb_${randomHex}88301199aa`,
      environment: 'sandbox',
      status: 'active',
      createdAt: 'Just now',
      lastUsed: 'Never',
      requestsCount: 0,
      rateLimit: 10000
    };

    setKeys([newKey, ...keys]);
    setNewKeyName('');
    setCreateKeyModalOpen(false);
    addToast(language === 'ar' ? 'تم إنشاء المفتاح التجريبي بنجاح' : 'Sandbox Key generated successfully', 'success');
  };

  const handleRequestProdKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodJustification.trim() || !prodComplianceAccepted) return;

    const newKey: ApiKeyItem = {
      id: `key_prod_${Date.now()}`,
      name: `Prod-${Date.now().toString().slice(-4)}`,
      keyMasked: 'dms_live_req_pending_approval',
      rawKey: 'dms_live_pending_approval',
      environment: 'production',
      status: 'pending_approval',
      createdAt: 'Just now',
      lastUsed: 'Pending Review',
      requestsCount: 0,
      rateLimit: 50000,
      projectedRps: prodRps,
      justification: prodJustification
    };

    setKeys([newKey, ...keys]);
    setProdJustification('');
    setProdComplianceAccepted(false);
    setProdKeyModalOpen(false);
    addToast(t('prodSubmittedNotice'), 'info', 'Pending Security Review');
  };

  const totalCalls = keys.reduce((acc, k) => acc + k.requestsCount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-night-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
              {t('sandboxTitle')}
            </h1>
            <SyntheticBadge size="sm" />
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 font-normal">
            {t('sandboxSubtitle')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCreateKeyModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-xs transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{t('createKeyBtn')}</span>
          </button>

          <button
            onClick={() => setProdKeyModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 hover:bg-stone-50 dark:hover:bg-night-800 text-stone-700 dark:text-stone-300 font-medium text-xs transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-stone-500" strokeWidth={1.5} />
            <span>{t('requestProdKeyBtn')}</span>
          </button>
        </div>
      </div>

      {/* Telemetry Overview & Quota Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Telemetry Chart */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
              {t('keyUsageGraph')}
            </h3>
            <span className="text-xs font-mono-code text-stone-500">
              {totalCalls.toLocaleString()} total requests
            </span>
          </div>

          <div className="h-60 w-full dir-ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={USAGE_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} className="dark:opacity-20" />
                <XAxis dataKey="day" stroke="#78716C" fontSize={11} />
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
                <Bar dataKey="requests" name="API Requests" fill="#1E5BB8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="errors" name="Failed Calls" fill="#D7262E" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rate Limit & Health Gauge Card */}
        <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
                {t('keyRateLimitStatus')}
              </h3>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-stone-600 dark:text-stone-400">
                <span>Hourly Consumption</span>
                <span className="font-mono-code font-bold text-stone-900 dark:text-stone-100">
                  6,820 / 10,000 req
                </span>
              </div>
              <div className="w-full bg-stone-100 dark:bg-night-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: '68.2%' }}
                />
              </div>
              <div className="text-[11px] text-stone-500">
                Burst capacity remaining: 3,180 requests before 429 throttling.
              </div>
            </div>

            <div className="p-3 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
                <span>Sandbox Latency SLA:</span>
                <span className="text-accent font-mono-code">&lt; 50ms</span>
              </div>
              <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
                <span>Gateway Status:</span>
                <span className="text-accent font-mono-code">Operational</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-stone-500 bg-stone-50 dark:bg-night-900 p-2.5 rounded border border-stone-200 dark:border-night-800">
            {t('syntheticDisclaimer')}
          </div>
        </div>
      </div>

      {/* Keys Table Card */}
      <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
        <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
          Registered API Credentials ({keys.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-night-800 text-stone-500 font-medium">
                <th className="py-3 px-3 text-start">{t('keyName')}</th>
                <th className="py-3 px-3 text-start">{t('keyEnvironment')}</th>
                <th className="py-3 px-3 text-start">API Key Token</th>
                <th className="py-3 px-3 text-start">{t('status')}</th>
                <th className="py-3 px-3 text-start">{t('keyLastUsed')}</th>
                <th className="py-3 px-3 text-start">{t('keyRequestsCount')}</th>
                <th className="py-3 px-3 text-start">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-night-800/80 font-mono-code">
              {keys.map((keyItem) => {
                const isUnmasked = unmaskedKeyIds[keyItem.id];
                const displayKey = isUnmasked ? keyItem.rawKey : keyItem.keyMasked;

                return (
                  <tr key={keyItem.id} className="hover:bg-stone-50 dark:hover:bg-night-800/30 transition-colors">
                    <td className="py-3 px-3 font-semibold text-stone-900 dark:text-stone-100 font-sans">
                      {keyItem.name}
                    </td>

                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-stone-200 dark:border-night-800 bg-stone-100 dark:bg-night-900 text-stone-700 dark:text-stone-300">
                        {keyItem.environment}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-stone-700 dark:text-stone-300">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-[200px] select-all">
                          {displayKey}
                        </span>
                        {keyItem.status !== 'revoked' && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => toggleMask(keyItem.id)}
                              className="p-1 hover:text-stone-900 dark:hover:text-stone-100 text-stone-400"
                              title={isUnmasked ? 'Mask key' : 'Show key'}
                            >
                              {isUnmasked ? (
                                <EyeOff className="w-3.5 h-3.5" strokeWidth={1.5} />
                              ) : (
                                <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                              )}
                            </button>
                            <button
                              onClick={() => copyKey(keyItem.rawKey)}
                              className="p-1 hover:text-stone-900 dark:hover:text-stone-100 text-stone-400"
                              title={t('copy')}
                            >
                              <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-3 font-sans">
                      <StatusBadge
                        status={
                          keyItem.status === 'active'
                            ? 'active'
                            : keyItem.status === 'pending_approval'
                            ? 'pending'
                            : 'revoked'
                        }
                      />
                    </td>

                    <td className="py-3 px-3 text-stone-500 font-sans">
                      {keyItem.lastUsed}
                    </td>

                    <td className="py-3 px-3 font-bold text-stone-800 dark:text-stone-200">
                      {keyItem.requestsCount.toLocaleString()}
                    </td>

                    <td className="py-3 px-3 font-sans">
                      {keyItem.status !== 'revoked' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRegenerate(keyItem.id)}
                            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                            title={t('regenerate')}
                          >
                            <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                          <button
                            onClick={() => handleRevoke(keyItem.id)}
                            className="p-1.5 text-stone-400 hover:text-err transition-colors"
                            title={t('revoke')}
                          >
                            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-stone-400 text-[11px]">{t('revoked')}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Create Sandbox Key */}
      <Modal
        isOpen={createKeyModalOpen}
        onClose={() => setCreateKeyModalOpen(false)}
        title={t('modalCreateKeyTitle')}
      >
        <form onSubmit={handleCreateSandboxKey} className="space-y-4 text-xs">
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1.5">
              {t('keyName')}
            </label>
            <input
              type="text"
              required
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="e.g., Cairo-Factory-Line4-Test"
              className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
            />
          </div>

          <div className="p-3 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-600 dark:text-stone-400">
            Sandbox keys are provisioned immediately with 10,000 requests/hour allowance and access to all synthetic endpoints.
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCreateKeyModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium"
            >
              {t('createKeyBtn')}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: Request Production Key */}
      <Modal
        isOpen={prodKeyModalOpen}
        onClose={() => setProdKeyModalOpen(false)}
        title={t('modalProdKeyTitle')}
      >
        <form onSubmit={handleRequestProdKey} className="space-y-4 text-xs">
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1.5">
              {t('prodJustificationLabel')}
            </label>
            <textarea
              required
              rows={3}
              value={prodJustification}
              onChange={(e) => setProdJustification(e.target.value)}
              placeholder="Describe customer manufacturing plant or hospital scope, tenant code, and integration goals..."
              className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link"
            />
          </div>

          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1.5">
              {t('prodRpsLabel')}
            </label>
            <input
              type="number"
              min={10}
              max={1000}
              value={prodRps}
              onChange={(e) => setProdRps(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-link font-mono-code"
            />
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800">
            <input
              type="checkbox"
              id="complianceCheck"
              required
              checked={prodComplianceAccepted}
              onChange={(e) => setProdComplianceAccepted(e.target.checked)}
              className="mt-0.5 rounded border-stone-300 text-accent"
            />
            <label htmlFor="complianceCheck" className="text-stone-600 dark:text-stone-400 cursor-pointer">
              {t('prodComplianceCheckbox')}
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setProdKeyModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-night-800 text-stone-700 dark:text-stone-300"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={!prodComplianceAccepted}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-medium"
            >
              {t('submit')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
