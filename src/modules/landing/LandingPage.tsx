import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { SyntheticBadge } from '../../components/ui/SyntheticBadge';
import {
  ArrowRight,
  ArrowLeft,
  Key,
  BookOpen,
  Terminal,
  Activity,
  Layers,
  ShoppingBag,
  Cpu,
  Award,
  CheckCircle2,
  Server,
  ChevronRight,
  ChevronLeft,
  Check,
  Copy
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const [activeSnippetTab, setActiveSnippetTab] = useState<'curl' | 'python' | 'csharp'>('curl');
  const [activeProductDemo, setActiveProductDemo] = useState<'erp' | 'hms'>('erp');
  const [copied, setCopied] = useState(false);

  const erpSnippets = {
    curl: `curl -X GET "https://api-sandbox.dms-sae.com/api/v2/erp/production-orders?status=IN_PROGRESS" \\
  -H "Authorization: Bearer dms_sb_live_key" \\
  -H "Accept: application/json"`,
    python: `import requests

response = requests.get(
    "https://api-sandbox.dms-sae.com/api/v2/erp/production-orders",
    headers={"Authorization": "Bearer dms_sb_live_key"},
    params={"status": "IN_PROGRESS"}
)
print(response.json())`,
    csharp: `using System.Net.Http;
using var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer dms_sb_live_key");

var res = await client.GetAsync("https://api-sandbox.dms-sae.com/api/v2/erp/production-orders");
var json = await res.Content.ReadAsStringAsync();`
  };

  const erpResponse = `{
  "status": 200,
  "facility": "PLANT-10TH-RAMADAN-A",
  "orderId": "PO-2026-9041",
  "itemCode": "EGY-ALU-COIL-400",
  "quantityPlanned": 12000,
  "quantityProduced": 8450,
  "oeeScore": 88.4,
  "lineStatus": "IN_PROGRESS"
}`;

  const hmsSnippets = {
    curl: `curl -X GET "https://api-sandbox.dms-sae.com/api/v2/hms/fhir/Patient/PT-EGY-SYNTH-8812" \\
  -H "Authorization: Bearer dms_sb_live_key" \\
  -H "Accept: application/fhir+json"`,
    python: `import requests

response = requests.get(
    "https://api-sandbox.dms-sae.com/api/v2/hms/fhir/Patient/PT-EGY-SYNTH-8812",
    headers={"Authorization": "Bearer dms_sb_live_key"}
)
print(response.json())`,
    csharp: `using System.Net.Http;
using var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer dms_sb_live_key");

var res = await client.GetAsync("https://api-sandbox.dms-sae.com/api/v2/hms/fhir/Patient/PT-EGY-SYNTH-8812");
var json = await res.Content.ReadAsStringAsync();`
  };

  const hmsResponse = `{
  "resourceType": "Patient",
  "id": "PT-EGY-SYNTH-8812",
  "identifier": [{ "value": "PT-EGY-SYNTH-8812" }],
  "active": true,
  "name": [{ "family": "Hassan", "given": ["A.", "M."] }],
  "gender": "male",
  "managingOrganization": {
    "display": "DMS Cairo Central Hospital (Synthetic)"
  }
}`;

  const activeCode = activeProductDemo === 'erp' ? erpSnippets[activeSnippetTab] : hmsSnippets[activeSnippetTab];
  const activeJson = activeProductDemo === 'erp' ? erpResponse : hmsResponse;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-24 pb-24">
      {/* 1. LANDING HERO (Clean, Calm, Code Card, No Stock Imagery) */}
      <section className="pt-12 sm:pt-20 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Headline & 2 CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <SyntheticBadge size="sm" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-[1.25]">
              {t('heroTitle')}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal max-w-xl">
              {t('heroSubtitle')}
            </p>

            {/* Exactly Two Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/sandbox"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-sm transition-colors shadow-sm"
              >
                <span>{t('ctaGetKeys')}</span>
                <ArrowIcon className="w-4 h-4" strokeWidth={1.5} />
              </Link>

              <Link
                to="/docs"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 hover:bg-stone-50 dark:hover:bg-night-800 text-stone-800 dark:text-stone-200 font-medium text-sm transition-colors"
              >
                <span>{t('ctaExploreDocs')}</span>
              </Link>
            </div>
          </div>

          {/* Interactive Code Card (Stripe/Linear style) */}
          <div className="lg:col-span-6">
            <div className="rounded-xl border border-stone-200 dark:border-night-800 bg-night-950 shadow-sm overflow-hidden text-left dir-ltr">
              {/* Header Bar: API demo toggle + Language tabs */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0E1431] border-b border-night-800/80 text-xs">
                {/* Product endpoint toggle */}
                <div className="flex items-center gap-1 p-0.5 rounded bg-stone-900 border border-night-800 text-[11px] font-medium text-stone-400">
                  <button
                    onClick={() => setActiveProductDemo('erp')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeProductDemo === 'erp'
                        ? 'bg-stone-800 text-stone-200 font-semibold'
                        : 'hover:text-stone-300'
                    }`}
                  >
                    Industrial ERP
                  </button>
                  <button
                    onClick={() => setActiveProductDemo('hms')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeProductDemo === 'hms'
                        ? 'bg-stone-800 text-stone-200 font-semibold'
                        : 'hover:text-stone-300'
                    }`}
                  >
                    Hospital FHIR
                  </button>
                </div>

                {/* Code language tabs + Copy */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 font-mono-code text-[11px] text-stone-400">
                    {(['curl', 'python', 'csharp'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveSnippetTab(lang)}
                        className={`px-2 py-0.5 rounded transition-colors uppercase ${
                          activeSnippetTab === lang
                            ? 'text-stone-100 font-bold bg-stone-800'
                            : 'hover:text-stone-200'
                        }`}
                      >
                        {lang === 'csharp' ? 'C#' : lang}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="p-1 rounded text-stone-400 hover:text-stone-200 hover:bg-night-800 transition-colors"
                    title="Copy request"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-[#5CC474]" strokeWidth={1.5} />
                    ) : (
                      <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              {/* Request Snippet */}
              <div className="p-4 bg-night-950 font-mono-code text-xs text-stone-300 overflow-x-auto leading-relaxed border-b border-night-800/80">
                <pre className="m-0 whitespace-pre">
                  <code>{activeCode}</code>
                </pre>
              </div>

              {/* Response Header */}
              <div className="px-4 py-1.5 bg-[#0E1431] border-b border-night-800/80 flex items-center justify-between text-[11px] font-mono-code text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[#5CC474] font-semibold">200 OK</span>
                  <span className="text-stone-500">·</span>
                  <span>38ms latency</span>
                </div>
                <span>application/json</span>
              </div>

              {/* Response Body */}
              <div className="p-4 bg-night-950 font-mono-code text-xs text-stone-300 overflow-x-auto leading-relaxed max-h-48">
                <pre className="m-0 whitespace-pre">
                  <code>{activeJson}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP (Quiet, minimal, tabular figures) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-mono-code">
              99.98%
            </div>
            <div className="text-xs text-stone-500 font-medium">
              {t('statsUptime')}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-mono-code">
              142+
            </div>
            <div className="text-xs text-stone-500 font-medium">
              {t('statsEndpoints')}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-mono-code">
              860+
            </div>
            <div className="text-xs text-stone-500 font-medium">
              {t('statsPartners')}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-mono-code">
              14.8M
            </div>
            <div className="text-xs text-stone-500 font-medium">
              {t('statsQueries')}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TWO CLEAN PRODUCT CARDS (Industrial ERP & Hospital System) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
            {language === 'ar' ? 'حلول ومنتجات DMS للمؤسسات' : 'Core Enterprise Platforms'}
          </h2>
          <p className="text-sm text-stone-500">
            {language === 'ar'
              ? 'واجهات برمجة وتكاملات موحدة مصممة للمصانع والمنشآت الطبية الكبرى'
              : 'Standardized integration interfaces for heavy industry and acute healthcare'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Industrial ERP */}
          <div className="p-8 rounded-xl border border-stone-200 dark:border-night-800 border-t-[3px] border-t-brand-blue! bg-white dark:bg-night-900 flex flex-col justify-between gap-6 hover:border-stone-300 dark:hover:border-night-700 transition-colors">
            <div className="space-y-5">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-tag-erp uppercase tracking-wider">
                  Manufacturing & Factory Floor
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  {t('productIndustrial')}
                </h3>
              </div>

              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                {language === 'ar'
                  ? 'اربط أنظمة التحكم الصناعية وخطوط الإنتاج ومحطات الفحص مباشرة بنظام تخطيط موارد المؤسسة.'
                  : 'Interface factory SCADA PLCs, automated packaging lines, and quality inspection units directly with DMS Industrial ERP.'}
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>Machine Telemetry & OPC-UA Read-only Bridge</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>Production Orders & Material Lot Tracking</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>Cost Deviation (BOM vs Actual Scrap & Power Tariffs)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>Egyptian Tax Authority (ETA) e-Invoice Connector</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-night-800/80">
              <Link
                to="/docs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:underline"
              >
                <span>{language === 'ar' ? 'استعراض واجهات الصناعي' : 'View ERP APIs'}</span>
                <ArrowIcon className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* Card 2: Hospital System (HMS) */}
          <div className="p-8 rounded-xl border border-stone-200 dark:border-night-800 border-t-[3px] border-t-brand-green! bg-white dark:bg-night-900 flex flex-col justify-between gap-6 hover:border-stone-300 dark:hover:border-night-700 transition-colors">
            <div className="space-y-5">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-tag-hms uppercase tracking-wider">
                  Clinical & Acute Care
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  {t('productHms')}
                </h3>
              </div>

              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                {language === 'ar'
                  ? 'تكامل آمن مع أجهزة العناية المركزة، ومختبرات التحاليل، وأرشفة الأشعة عبر المعايير الدولية.'
                  : 'Interoperable clinical connectivity across inpatient admission, vital sign telemetry, and laboratory diagnostics.'}
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>HL7 FHIR R4 Patient & Inpatient Encounter Resources</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>ICU Bed Capacity & Bedside Monitor IoT Feeds</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>DICOM Medical Imaging Studies & Series Metadata</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>Clinical Notes ICD-10 Classification & Pharmacy Audits</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-night-800/80">
              <Link
                to="/docs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:underline"
              >
                <span>{language === 'ar' ? 'استعراض واجهات المستشفيات' : 'View HMS APIs'}</span>
                <ArrowIcon className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THREE-STEP "HOW IT WORKS" ROW (Thin line icons, generous whitespace) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
            {t('howItWorksTitle')}
          </h2>
          <p className="text-sm text-stone-500">
            {language === 'ar'
              ? 'خطوات واضحة للتكامل الآمن والاعتماد ونشر الحلول'
              : 'A structured roadmap from sandbox testing to verified client distribution'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-3">
            <div className="w-9 h-9 rounded-lg border border-stone-200 dark:border-night-800 bg-stone-100 dark:bg-night-900 flex items-center justify-center text-stone-700 dark:text-stone-300">
              <Key className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              {t('howItWorksStep1Title')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {t('howItWorksStep1Desc')}
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-3">
            <div className="w-9 h-9 rounded-lg border border-stone-200 dark:border-night-800 bg-stone-100 dark:bg-night-900 flex items-center justify-center text-stone-700 dark:text-stone-300">
              <Terminal className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              {t('howItWorksStep2Title')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {t('howItWorksStep2Desc')}
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 space-y-3">
            <div className="w-9 h-9 rounded-lg border border-stone-200 dark:border-night-800 bg-stone-100 dark:bg-night-900 flex items-center justify-center text-stone-700 dark:text-stone-300">
              <ShoppingBag className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              {t('howItWorksStep3Title')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {t('howItWorksStep3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 5. QUIET QUERY RUNNER & REVENUE SECTION (Lower on page) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-xl border border-stone-200 dark:border-night-800 bg-white dark:bg-night-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-start">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Terminal className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                {language === 'ar' ? 'تشغيل الاستعلامات التحليلية الجاهزة' : 'Interactive Sandbox Query Runner'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl">
              {language === 'ar'
                ? 'اختبر استعلامات انحراف تكاليف التصنيع ومعدلات إشغال الرعاية المركزة على بيانات اصطناعية معزولة تماماً.'
                : 'Execute read-only SQL queries on synthetic OEE anomaly detection and inpatient ICU utilization.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/query-runner"
              className="px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              {t('ctaSandbox')}
            </Link>

            <Link
              to="/calculator"
              className="px-4 py-2 rounded-lg border border-stone-200 dark:border-night-800 hover:bg-stone-100 dark:hover:bg-night-800 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors"
            >
              {t('navCalculator')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
