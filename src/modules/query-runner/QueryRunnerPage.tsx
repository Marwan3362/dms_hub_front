import React, { useState } from 'react';
import { SAMPLE_QUERIES } from '../../data/queries';
import { QueryPreset } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { SyntheticBadge } from '../../components/ui/SyntheticBadge';
import {
  Terminal,
  Play,
  Table as TableIcon,
  FileCode,
  BarChart2,
  Clock,
  ShieldCheck,
  Download,
  Server,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export const QueryRunnerPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addToast } = useToast();

  const [selectedPreset, setSelectedPreset] = useState<QueryPreset>(SAMPLE_QUERIES[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(true);
  const [activeTab, setActiveTab] = useState<'table' | 'json' | 'chart'>('table');
  const [lastExecutionMs, setLastExecutionMs] = useState<number>(selectedPreset.executionTimeMs);

  const handleRunQuery = () => {
    setIsRunning(true);
    const delay = Math.floor(Math.random() * 25) + 20; // 20-45ms execution time
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
      setLastExecutionMs(delay);
      addToast(
        language === 'ar'
          ? `تم تنفيذ الاستعلام بنجاح في ${delay}ms`
          : `Query executed successfully in ${delay}ms`,
        'success'
      );
    }, delay);
  };

  const handleExportCsv = () => {
    if (!selectedPreset.results || selectedPreset.results.length === 0) return;
    const headers = Object.keys(selectedPreset.results[0]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        headers.join(','),
        ...selectedPreset.results.map((row) =>
          headers.map((h) => `"${row[h] !== undefined ? row[h] : ''}"`).join(',')
        )
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedPreset.id}_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast(language === 'ar' ? 'تم تنزيل ملف CSV' : 'CSV exported successfully', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-night-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
              {t('queryRunnerTitle')}
            </h1>
            <SyntheticBadge size="sm" />
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            {t('queryRunnerSubtitle')}
          </p>
        </div>
      </div>

      {/* Mandatory Read-Only Sandbox Banner */}
      <div className="p-4 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 text-stone-700 dark:text-stone-300 flex items-center justify-between gap-4 text-xs md:text-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
          <div>
            <strong className="font-semibold block sm:inline text-stone-900 dark:text-stone-100">
              {t('readOnlyNotice')} —{' '}
            </strong>
            <span className="text-stone-600 dark:text-stone-400">{t('syntheticDisclaimer')}</span>
          </div>
        </div>
        <span className="font-mono-code text-[11px] text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-night-800 px-2.5 py-0.5 rounded border border-stone-200 dark:border-night-700 shrink-0 hidden sm:inline">
          READ_ONLY_TXN
        </span>
      </div>

      {/* Preset Query Selector Bar */}
      <div className="p-5 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-3">
        <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
          {t('selectPresetQuery')}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SAMPLE_QUERIES.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPreset(preset);
                  setLastExecutionMs(preset.executionTimeMs);
                }}
                className={`p-3.5 rounded-lg text-start transition-colors text-xs flex flex-col justify-between gap-2.5 border ${
                  isSelected
                    ? 'border-accent bg-stone-50 dark:bg-night-800/80 text-stone-900 dark:text-stone-100 font-semibold shadow-xs'
                    : 'border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-night-700 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between gap-1 w-full">
                  <span className="truncate">
                    {language === 'ar' ? preset.titleAr : preset.title}
                  </span>
                  {preset.product === 'industrial_erp' ? (
                    <Server className="w-3.5 h-3.5 text-tag-erp shrink-0" strokeWidth={1.5} />
                  ) : (
                    <Activity className="w-3.5 h-3.5 text-tag-hms shrink-0" strokeWidth={1.5} />
                  )}
                </div>
                <div className="text-[11px] text-stone-500 font-mono-code">
                  {preset.rowsCount} rows · {preset.executionTimeMs}ms
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terminal Editor Shell */}
      <div className="rounded-xl border border-stone-200 dark:border-night-800 bg-night-950 overflow-hidden shadow-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0E1431] border-b border-night-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="text-stone-400 font-mono-code text-[11px]">
              dms_sql_console://sandbox-readonly.dms.internal
            </span>
          </div>

          <button
            onClick={handleRunQuery}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-medium text-xs transition-colors shadow-sm"
          >
            <Play className="w-3 h-3 fill-current" strokeWidth={1.5} />
            <span>{isRunning ? t('running') : t('runQueryBtn')}</span>
          </button>
        </div>

        {/* SQL Code View */}
        <div className="p-4 text-xs font-mono-code text-stone-300 overflow-x-auto leading-relaxed dir-ltr bg-night-950">
          <pre className="m-0 whitespace-pre">
            <code>{selectedPreset.sqlQuery}</code>
          </pre>
        </div>
      </div>

      {/* Results Section */}
      {hasRun && (
        <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
          {/* Results Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-night-800/80 pb-3">
            <div className="flex items-center gap-3 text-xs font-mono-code text-stone-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" strokeWidth={1.5} />
                <span>
                  {t('executionTime')}: <strong className="text-accent">{lastExecutionMs}ms</strong>
                </span>
              </span>
              <span>·</span>
              <span>
                {t('rowCount')}: <strong className="text-stone-800 dark:text-stone-200">{selectedPreset.rowsCount}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Segmented Tabs */}
              <div className="flex items-center p-0.5 rounded-lg bg-stone-100 dark:bg-night-800 border border-stone-200 dark:border-night-700 text-xs">
                <button
                  onClick={() => setActiveTab('table')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'table'
                      ? 'bg-white dark:bg-night-900 text-accent font-semibold shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{t('tabTable')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('json')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'json'
                      ? 'bg-white dark:bg-night-900 text-accent font-semibold shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{t('tabJson')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('chart')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'chart'
                      ? 'bg-white dark:bg-night-900 text-accent font-semibold shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{t('tabChart')}</span>
                </button>
              </div>

              {/* Export CSV */}
              <button
                onClick={handleExportCsv}
                className="p-1.5 rounded-lg border border-stone-200 dark:border-night-700 bg-white dark:bg-night-800 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                title={t('export')}
              >
                <Download className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Tab 1: Table */}
          {activeTab === 'table' && (
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-night-800 text-stone-500 font-semibold bg-stone-50/50 dark:bg-night-900/30">
                    {Object.keys(selectedPreset.results[0]).map((col) => (
                      <th key={col} className="py-2.5 px-3 text-start whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-night-800/80 font-mono-code">
                  {selectedPreset.results.map((row, idx) => (
                    <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-night-800/40 transition-colors">
                      {Object.keys(row).map((col) => (
                        <td key={col} className="py-2.5 px-3 whitespace-nowrap text-stone-800 dark:text-stone-200">
                          {typeof row[col] === 'number'
                            ? row[col].toLocaleString()
                            : String(row[col])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 2: JSON */}
          {activeTab === 'json' && (
            <CodeBlock
              code={JSON.stringify(selectedPreset.results, null, 2)}
              language="json"
              filename="query_results.json"
            />
          )}

          {/* Tab 3: Chart Visualization */}
          {activeTab === 'chart' && selectedPreset.chartConfig && (
            <div className="p-4 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 dir-ltr">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={selectedPreset.results}
                    margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} className="dark:opacity-20" />
                    <XAxis
                      dataKey={selectedPreset.chartConfig.xAxisKey}
                      stroke="#78716C"
                      fontSize={11}
                    />
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
                    {selectedPreset.chartConfig.yAxisKeys.map((y) => (
                      <Bar
                        key={y.key}
                        dataKey={y.key}
                        name={language === 'ar' ? y.labelAr : y.label}
                        fill={y.key.toLowerCase().includes('actual') || y.key.toLowerCase().includes('occupied') ? '#1E5BB8' : '#78716C'}
                        radius={[3, 3, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
