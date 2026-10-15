import React, { useState } from 'react';
import { API_ENDPOINTS } from '../../data/endpoints';
import { ApiEndpoint } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { SyntheticBadge } from '../../components/ui/SyntheticBadge';
import { useToast } from '../../context/ToastContext';
import {
  Search,
  Server,
  Activity,
  Layers,
  Play,
  Copy,
  Clock,
  CheckCircle,
  FileCode,
  Zap
} from 'lucide-react';

export const DocsHub: React.FC = () => {
  const { language, t } = useLanguage();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(API_ENDPOINTS[0]);
  const [activeCodeTab, setActiveCodeTab] = useState<'curl' | 'js' | 'python' | 'csharp'>('curl');

  // Try it simulator state
  const [simulatorLoading, setSimulatorLoading] = useState(false);
  const [simulatorResponse, setSimulatorResponse] = useState<Record<string, any> | null>(null);
  const [simulatorLatency, setSimulatorLatency] = useState<number | null>(null);
  const [simulatorStatus, setSimulatorStatus] = useState<number | null>(null);

  // Filter endpoints
  const filteredEndpoints = API_ENDPOINTS.filter((ep) => {
    const q = searchQuery.toLowerCase();
    const title = language === 'ar' ? ep.titleAr : ep.title;
    return (
      title.toLowerCase().includes(q) ||
      ep.path.toLowerCase().includes(q) ||
      ep.method.toLowerCase().includes(q) ||
      ep.category.toLowerCase().includes(q)
    );
  });

  // Group by product
  const erpEndpoints = filteredEndpoints.filter((ep) => ep.product === 'industrial_erp');
  const hmsEndpoints = filteredEndpoints.filter((ep) => ep.product === 'hms');
  const commonEndpoints = filteredEndpoints.filter((ep) => ep.product === 'common');

  // Generate dynamic code snippets
  const generateSnippet = (ep: ApiEndpoint, lang: 'curl' | 'js' | 'python' | 'csharp') => {
    const baseUrl = 'https://api-sandbox.dms-sae.com';
    const fullUrl = `${baseUrl}${ep.path}`;

    if (lang === 'curl') {
      let snippet = `curl -X ${ep.method} "${fullUrl}" \\\n  -H "Authorization: Bearer dms_live_token_sec" \\\n  -H "Accept: application/json"`;
      if (ep.requestBodyExample) {
        snippet += ` \\\n  -H "Content-Type: application/json" \\\n  -d '${ep.requestBodyExample.replace(/\n/g, ' ')}'`;
      }
      return snippet;
    }

    if (lang === 'js') {
      let snippet = `import axios from 'axios';\n\nconst client = axios.create({\n  baseURL: '${baseUrl}',\n  headers: {\n    'Authorization': 'Bearer dms_live_token_sec',\n    'Content-Type': 'application/json'\n  }\n});\n\nasync function execute() {\n  const response = await client.${ep.method.toLowerCase()}('${ep.path}'`;
      if (ep.requestBodyExample) {
        snippet += `, ${ep.requestBodyExample}`;
      }
      snippet += `);\n  console.log(response.data);\n}\n\nexecute();`;
      return snippet;
    }

    if (lang === 'python') {
      let snippet = `import requests\n\nheaders = {\n    "Authorization": "Bearer dms_live_token_sec",\n    "Content-Type": "application/json"\n}\n\nurl = "${fullUrl}"\n`;
      if (ep.requestBodyExample) {
        snippet += `payload = ${ep.requestBodyExample}\n\nresponse = requests.${ep.method.toLowerCase()}(url, headers=headers, json=payload)\n`;
      } else {
        snippet += `response = requests.${ep.method.toLowerCase()}(url, headers=headers)\n`;
      }
      snippet += `print(response.status_code, response.json())`;
      return snippet;
    }

    if (lang === 'csharp') {
      let snippet = `using System.Net.Http;\nusing System.Net.Http.Headers;\n\nusing var client = new HttpClient();\nclient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "dms_live_token_sec");\n\nvar response = await client.${
        ep.method === 'GET' ? 'GetAsync' : ep.method === 'POST' ? 'PostAsync' : 'SendAsync'
      }("${fullUrl}");\nvar content = await response.Content.ReadAsStringAsync();\nSystem.Console.WriteLine(content);`;
      return snippet;
    }

    return '';
  };

  // Run mock simulation
  const handleRunSimulator = () => {
    setSimulatorLoading(true);
    setSimulatorResponse(null);
    setSimulatorLatency(null);
    setSimulatorStatus(null);

    const simulatedDelay = Math.floor(Math.random() * 45) + 25; // 25-70ms realistic latency

    setTimeout(() => {
      setSimulatorLoading(false);
      setSimulatorResponse(selectedEndpoint.responseExample);
      setSimulatorLatency(simulatedDelay);
      setSimulatorStatus(200);
      addToast(
        language === 'ar'
          ? `تم تنفيذ الاستدعاء بنجاح (200 OK) في ${simulatedDelay}ms`
          : `Mock API call returned 200 OK in ${simulatedDelay}ms`,
        'success'
      );
    }, simulatedDelay);
  };

  const getMethodBadgeClass = (method: string) => {
    switch (method) {
      case 'GET':
        return 'text-info border-stone-300 dark:border-night-700 bg-stone-100 dark:bg-night-900';
      case 'POST':
        return 'text-stone-800 dark:text-stone-200 border-stone-300 dark:border-night-700 bg-stone-100 dark:bg-night-900 font-bold';
      case 'PUT':
      case 'PATCH':
        return 'text-warn border-stone-300 dark:border-night-700 bg-stone-100 dark:bg-night-900';
      case 'DELETE':
        return 'text-err border-stone-300 dark:border-night-700 bg-stone-100 dark:bg-night-900';
      default:
        return 'text-stone-600 dark:text-stone-400 border-stone-300 dark:border-night-700 bg-stone-100 dark:bg-night-900';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-night-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
              {t('docsTitle')}
            </h1>
            <SyntheticBadge size="sm" />
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            {t('docsSubtitle')}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute start-3 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('docsSearchPlaceholder')}
            className="w-full ps-9 pe-3 py-2 text-xs rounded-lg bg-white dark:bg-night-900 border border-stone-200 dark:border-night-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-link"
          />
        </div>
      </div>

      {/* Main Layout: Left Sidebar + Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Product Groups */}
        <div className="lg:col-span-4 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 p-3 space-y-4 max-h-[820px] overflow-y-auto">
          {/* Group 1: Industrial ERP */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
              <Server className="w-3.5 h-3.5 text-tag-erp" strokeWidth={1.5} />
              <span>{t('productIndustrial')}</span>
            </div>
            <div className="space-y-0.5">
              {erpEndpoints.map((ep) => {
                const isSelected = selectedEndpoint.id === ep.id;
                return (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setSelectedEndpoint(ep);
                      setSimulatorResponse(null);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-start transition-all text-xs ${
                      isSelected
                        ? 'bg-stone-100 dark:bg-night-800 text-stone-900 dark:text-stone-100 font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-850'
                    }`}
                  >
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold border ${getMethodBadgeClass(
                        ep.method
                      )}`}
                    >
                      {ep.method}
                    </span>
                    <span className="truncate flex-1">
                      {language === 'ar' ? ep.titleAr : ep.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: HMS Healthcare */}
          <div className="space-y-1 pt-3 border-t border-stone-100 dark:border-night-800/80">
            <div className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-tag-hms" strokeWidth={1.5} />
              <span>{t('productHms')}</span>
            </div>
            <div className="space-y-0.5">
              {hmsEndpoints.map((ep) => {
                const isSelected = selectedEndpoint.id === ep.id;
                return (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setSelectedEndpoint(ep);
                      setSimulatorResponse(null);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-start transition-all text-xs ${
                      isSelected
                        ? 'bg-stone-100 dark:bg-night-800 text-stone-900 dark:text-stone-100 font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-850'
                    }`}
                  >
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold border ${getMethodBadgeClass(
                        ep.method
                      )}`}
                    >
                      {ep.method}
                    </span>
                    <span className="truncate flex-1">
                      {language === 'ar' ? ep.titleAr : ep.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 3: Common & Webhooks */}
          <div className="space-y-1 pt-3 border-t border-stone-100 dark:border-night-800/80">
            <div className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
              <span>{t('productCommon')}</span>
            </div>
            <div className="space-y-0.5">
              {commonEndpoints.map((ep) => {
                const isSelected = selectedEndpoint.id === ep.id;
                return (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setSelectedEndpoint(ep);
                      setSimulatorResponse(null);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-start transition-all text-xs ${
                      isSelected
                        ? 'bg-stone-100 dark:bg-night-800 text-stone-900 dark:text-stone-100 font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-850'
                    }`}
                  >
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold border ${getMethodBadgeClass(
                        ep.method
                      )}`}
                    >
                      {ep.method}
                    </span>
                    <span className="truncate flex-1">
                      {language === 'ar' ? ep.titleAr : ep.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Content: Endpoint Documentation & Simulator */}
        <div className="lg:col-span-8 space-y-6">
          {/* Endpoint Header Card */}
          <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold font-mono-code border ${getMethodBadgeClass(
                    selectedEndpoint.method
                  )}`}
                >
                  {selectedEndpoint.method}
                </span>
                <span className="text-stone-500 text-xs font-mono-code">
                  {selectedEndpoint.version}
                </span>
                <span className="text-stone-400">·</span>
                <span className="text-xs text-stone-500 font-mono-code">
                  {selectedEndpoint.rateLimit}
                </span>
              </div>
              <div className="text-xs text-stone-500">
                {language === 'ar' ? selectedEndpoint.categoryAr : selectedEndpoint.category}
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              {language === 'ar' ? selectedEndpoint.titleAr : selectedEndpoint.title}
            </h2>

            <div className="p-3 rounded-lg bg-stone-50 dark:bg-night-950 border border-stone-200 dark:border-night-800 text-stone-800 dark:text-stone-200 font-mono-code text-xs sm:text-sm flex items-center justify-between">
              <span className="break-all">{selectedEndpoint.path}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedEndpoint.path);
                  addToast(t('copied'), 'success');
                }}
                className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                title={t('copy')}
              >
                <Copy className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {language === 'ar' ? selectedEndpoint.descriptionAr : selectedEndpoint.description}
            </p>
          </div>

          {/* Parameters Table */}
          {selectedEndpoint.parameters.length > 0 && (
            <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
                {t('docsParameters')}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-night-800 text-stone-500 font-medium">
                      <th className="py-2.5 px-3 text-start">Name</th>
                      <th className="py-2.5 px-3 text-start">Type</th>
                      <th className="py-2.5 px-3 text-start">In</th>
                      <th className="py-2.5 px-3 text-start">Required</th>
                      <th className="py-2.5 px-3 text-start">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-night-800/80 font-mono-code">
                    {selectedEndpoint.parameters.map((param) => (
                      <tr key={param.name} className="hover:bg-stone-50 dark:hover:bg-night-800/30">
                        <td className="py-2.5 px-3 font-semibold text-accent">
                          {param.name}
                        </td>
                        <td className="py-2.5 px-3 text-stone-500">{param.type}</td>
                        <td className="py-2.5 px-3 text-stone-500">{param.in}</td>
                        <td className="py-2.5 px-3">
                          {param.required ? (
                            <span className="text-err font-semibold">Yes</span>
                          ) : (
                            <span className="text-stone-400">No</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 font-sans text-stone-600 dark:text-stone-300">
                          {language === 'ar' ? param.descriptionAr : param.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Request Body Example (if present) */}
          {selectedEndpoint.requestBodyExample && (
            <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-3">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
                {t('docsRequestBody')}
              </h3>
              <CodeBlock
                code={selectedEndpoint.requestBodyExample}
                language="json"
                filename="payload.json"
              />
            </div>
          )}

          {/* Code Generator Snippets */}
          <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
                {t('docsCodeGenerator')}
              </h3>
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-stone-100 dark:bg-night-900 border border-stone-200 dark:border-night-800 text-xs">
                {(['curl', 'js', 'python', 'csharp'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveCodeTab(lang)}
                    className={`px-2.5 py-1 rounded transition-colors uppercase font-mono-code text-[11px] ${
                      activeCodeTab === lang
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold'
                        : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                    }`}
                  >
                    {lang === 'csharp' ? 'C#' : lang}
                  </button>
                ))}
              </div>
            </div>

            <CodeBlock
              code={generateSnippet(selectedEndpoint, activeCodeTab)}
              language={activeCodeTab}
            />
          </div>

          {/* Interactive Try-It Simulator Panel */}
          <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" strokeWidth={1.5} />
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
                  {t('docsSimulator')}
                </h3>
              </div>
              <button
                onClick={handleRunSimulator}
                disabled={simulatorLoading}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" strokeWidth={1.5} />
                <span>{simulatorLoading ? t('running') : t('docsRunRequest')}</span>
              </button>
            </div>

            {simulatorLoading && (
              <div className="p-8 text-center text-stone-400 text-xs space-y-2 animate-pulse">
                <div className="inline-block w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <div>{t('loading')}</div>
              </div>
            )}

            {simulatorResponse && !simulatorLoading && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono-code border-b border-stone-200 dark:border-night-800 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-ok font-bold">HTTP {simulatorStatus} OK</span>
                    <span className="text-stone-400">·</span>
                    <span className="text-stone-600 dark:text-stone-400">
                      Latency: <strong className="text-stone-900 dark:text-stone-100">{simulatorLatency}ms</strong>
                    </span>
                  </div>
                  <span className="text-stone-500">X-DMS-Gateway-Region: EG-CAIRO-NORTH</span>
                </div>

                <CodeBlock
                  code={JSON.stringify(simulatorResponse, null, 2)}
                  language="json"
                  filename="response_200.json"
                />
              </div>
            )}

            {!simulatorResponse && !simulatorLoading && (
              <div className="p-6 text-center text-stone-500 text-xs border border-dashed border-stone-200 dark:border-night-800 rounded-lg">
                Click "{t('docsRunRequest')}" to dispatch a test call to the DMS Mock Gateway.
              </div>
            )}
          </div>

          {/* Error Codes */}
          <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-3">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-base">
              {t('docsErrorCodes')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-code">
              {selectedEndpoint.errorCodes.map((err) => (
                <div
                  key={err.code}
                  className="p-3 rounded-lg bg-stone-50 dark:bg-night-900 border border-stone-200 dark:border-night-800 space-y-1"
                >
                  <span
                    className={`font-bold ${
                      err.code >= 500 || err.code === 401 || err.code === 403 ? 'text-err' : err.code >= 400 ? 'text-warn' : 'text-ok'
                    }`}
                  >
                    {err.code}
                  </span>
                  <p className="font-sans text-stone-600 dark:text-stone-400">
                    {language === 'ar' ? err.descriptionAr : err.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
