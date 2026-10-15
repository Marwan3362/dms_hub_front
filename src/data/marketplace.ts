import { MarketplaceListing } from '../types';

export const MARKETPLACE_LISTINGS: MarketplaceListing[] = [
  {
    id: 'mod-oee-bi-dashboard',
    title: 'Executive Industrial OEE & Telemetry PowerBI Pack',
    titleAr: 'حزمة لوحات PowerBI التنفيذية لكفاءة المعدات OEE',
    shortDesc: 'Plug-and-play interactive PowerBI executive analytics connecting directly to DMS Industrial ERP SQL views with downtime root cause pareto charts.',
    shortDescAr: 'لوحات قيادة تنفيذية تفاعلية تتصل مباشرة بطبقات SQL في DMS ERP لتحليل أسباب توقف الماكينات ومخططات باريتو.',
    product: 'industrial_erp',
    category: 'bi_dashboards',
    categoryAr: 'لوحات ذكاء الأعمال (BI)',
    price: 349,
    currency: 'USD',
    author: {
      name: 'Eng. Tarek Abdulrahman',
      company: 'Nile Industrial Automation',
      isCertified: true,
      tier: 'Silver'
    },
    rating: 4.9,
    reviewsCount: 38,
    installsCount: 142,
    compatibility: {
      minVersion: 'DMS Industrial ERP v2.1+',
      testedOn: 'v2.4 LTS (Tested 2026)'
    },
    status: 'approved',
    featured: true,
    features: [
      'Live DirectQuery connection to indexed DMS views',
      'Calculated shifts performance and operator productivity',
      'Automated email summaries sent to plant operations directors',
      'Includes 12 pre-configured report templates'
    ],
    featuresAr: [
      'ربط مباشر DirectQuery بقواعد بيانات وعروض DMS ERP المفهرسة',
      'حساب إنتاجية الورديات ومعدل كفاءة المشغلين بدقة',
      'تقارير دورية مجدولة ترسل لمديري المصانع عبر البريد الإلكتروني',
      'تتضمن ١٢ قالباً تحليلياً جاهزاً للطباعة والمشاركة'
    ],
    tags: ['OEE', 'PowerBI', 'Industrial ERP', 'Manufacturing', 'FastReports']
  },
  {
    id: 'mod-fhir-vital-bridge',
    title: 'HL7 / FHIR Inpatient Vitals IoT Bridge',
    titleAr: 'جسر الربط الطبي لأجهزة المراقبة الحيوية HL7 / FHIR',
    shortDesc: 'Bidirectional middleware streaming patient telemetry from bedside monitors (Philips, Mindray, GE) directly into DMS HMS electronic health records.',
    shortDescAr: 'نظام وسيط يربط أجهزة مراقبة العلامات الحيوية بجوار سرير المريض مباشرة بملف المريض الإلكتروني في نظام DMS الطبي.',
    product: 'hms',
    category: 'integrations',
    categoryAr: 'وحدات التكامل والربط',
    price: 590,
    currency: 'USD',
    author: {
      name: 'Dr. Mona El-Shazly',
      company: 'Delta Medical Systems SAE',
      isCertified: true,
      tier: 'Gold'
    },
    rating: 5.0,
    reviewsCount: 29,
    installsCount: 96,
    compatibility: {
      minVersion: 'DMS HMS Core v4.0+',
      testedOn: 'DMS HMS 2026.1 Enterprise'
    },
    status: 'approved',
    featured: true,
    features: [
      'Real-time HL7 v2.5.1 and FHIR R4 standard parser',
      'Zero latency sync of SPO2, Pulse, Blood Pressure, and ECG rhythms',
      'Automatic nurse alert trigger when vital signs breach threshold',
      'Full compliance with Egyptian Universal Health Insurance specs'
    ],
    featuresAr: [
      'معالجة قياسية لحظية لبروتوكولات HL7 v2.5.1 و FHIR R4',
      'مزامنة فورية لنسبة الأكسجين وضغط الدم ومعدل النبض وتخطيط القلب',
      'إطلاق تنبيهات تمريض فورية عند تجاوز المعدلات الطبيعية',
      'مطابقة كاملة لمتطلبات منظومة التأمين الصحي الشامل'
    ],
    tags: ['HL7', 'FHIR', 'HMS', 'ICU', 'Medical IoT', 'Interoperability']
  },
  {
    id: 'mod-eta-tax-einvoice',
    title: 'Egyptian ETA e-Invoice Direct ERP Auto-Filer',
    titleAr: 'الموثّق الآلي للفاتورة الإلكترونية لمصلحة الضرائب المصرية',
    shortDesc: 'Automates digital certificate signing, UUID stamping, and submission of enterprise sales invoices to the Egyptian Tax Authority with reconciliation dashboard.',
    shortDescAr: 'أتمتة توقيع الختم الإلكتروني وإرسال فواتير المبيعات لحظياً لمصلحة الضرائب المصرية مع لوحة مطابقة الفروق الضريبية.',
    product: 'common',
    category: 'integrations',
    categoryAr: 'وحدات التكامل والربط',
    price: 0,
    currency: 'USD',
    author: {
      name: 'DMS Core Solutions Team',
      company: 'Data Management Systems SAE',
      isCertified: true,
      tier: 'Platinum'
    },
    rating: 4.8,
    reviewsCount: 114,
    installsCount: 680,
    compatibility: {
      minVersion: 'DMS ERP & HMS v2.0+',
      testedOn: 'All 2026 Releases'
    },
    status: 'approved',
    featured: false,
    features: [
      'Native USB token and HSM digital seal integration (Egypt Trust, MCDR)',
      'Instant batch validation against ETA schema standards',
      'QR code generation formatted for POS receipt printing',
      'Free community module maintained by DMS engineering'
    ],
    featuresAr: [
      'ربط مباشر مع شهادات التوقيع الإلكتروني (Egypt Trust و MCDR)',
      'فحص دفعي فوري لتوافق الفواتير مع شروط مصلحة الضرائب',
      'توليد رموز الاستجابة السريعة (QR Code) المتوافقة مع الإيصال الإلكتروني',
      'إضافة مجانية معتمدة ومحدثة من فريق مهندسي DMS'
    ],
    tags: ['e-Invoicing', 'Tax Compliance', 'Egypt ETA', 'Free Module', 'FinTech']
  },
  {
    id: 'mod-pred-maint-edge',
    title: 'Edge AI Machine Vibration Anomaly Sentinel',
    titleAr: 'حارس الذكاء الاصطناعي لكشف اهتزاز الماكينات على الحافة',
    shortDesc: 'Edge-deployed neural network classifying motor and bearing stress directly from high-speed OPC-UA sensor telemetry with push notification to maintenance crews.',
    shortDescAr: 'شبكة عصبية تعمل على الحافة لتصنيف إجهاد المحركات والمحامل الصناعية من بيانات OPC-UA مع إشعار فرق الصيانة.',
    product: 'industrial_erp',
    category: 'ai_addons',
    categoryAr: 'إضافات الذكاء الاصطناعي',
    price: 450,
    currency: 'USD',
    author: {
      name: 'Eng. Karim El-Sayed',
      company: 'Alexandria Heavy Steel Mills',
      isCertified: true,
      tier: 'Bronze'
    },
    rating: 4.7,
    reviewsCount: 18,
    installsCount: 54,
    compatibility: {
      minVersion: 'DMS Industrial ERP v2.3+',
      testedOn: 'v2.4 LTS'
    },
    status: 'approved',
    featured: false,
    features: [
      'Pre-trained on over 100,000 industrial operating hours',
      'Runs locally inside plant premises without requiring external cloud connection',
      'Predicts failure 48 to 72 hours before catastrophic gear seizure',
      'Visual thermal heatmap interface embedded in ERP screen'
    ],
    featuresAr: [
      'مدرب مسبقاً على أكثر من ١٠٠ ألف ساعة تشغيل صناعية فعلية',
      'يعمل محلياً داخل مصنع العميل دون الحاجة لاتصال خارجي دائم بالإنترنت',
      'تنبؤ بالأعطال قبل وقوعها بفترة ٤٨ إلى ٧٢ ساعة',
      'خريطة حرارية تفاعلية مدمجة في شاشات خطوط الإنتاج'
    ],
    tags: ['Edge AI', 'Predictive Maintenance', 'OPC-UA', 'Industry 4.0']
  },
  {
    id: 'mod-clinical-pathology-fastreports',
    title: 'Hospital Pathology & Lab FastReports Suite',
    titleAr: 'حزمة قوالب FastReports لمعامل التحاليل الطبية الشاملة',
    shortDesc: 'Over 30 customizable, high-precision laboratory report layouts with dynamic reference ranges, normal/abnormal highlighting, and bilingual doctor sign-offs.',
    shortDescAr: 'أكثر من ٣٠ قالب تقرير معملي دقيق عالي الجودة يدعم النتائج الحرجة واللغتين العربية والإنجليزية وتوقيع الأطباء الرقمي.',
    product: 'hms',
    category: 'reports',
    categoryAr: 'قوالب التقارير والطباعة',
    price: 120,
    currency: 'USD',
    author: {
      name: 'Eng. Hossam Mansour',
      company: 'Mansour Systems',
      isCertified: false,
      tier: 'Bronze'
    },
    rating: 4.6,
    reviewsCount: 42,
    installsCount: 210,
    compatibility: {
      minVersion: 'DMS HMS v3.5+',
      testedOn: 'HMS 2026.1'
    },
    status: 'approved',
    featured: false,
    features: [
      'Fully customizable layouts compatible with FastReports Studio 2026',
      'Color-coded critical abnormal range highlights for medical safety',
      'Barcode & QR code watermarking to prevent forged lab results',
      'Export ready to encrypted PDF and Direct Thermal Printers'
    ],
    featuresAr: [
      'قوالب قابلة للتخصيص الكامل متوافقة مع FastReports Studio 2026',
      'تمييز لوني للنتائج الحرجة وغير الطبيعية لضمان سلامة المرضى',
      'طباعة باركود وQR مشفر لمنع تزوير النتائج المعملية',
      'تصدير فوري إلى ملفات PDF مشفرة وطابعات الباركود الحرارية'
    ],
    tags: ['FastReports', 'Laboratory', 'Pathology', 'HMS', 'Printing']
  },
  {
    id: 'mod-sap-dms-gl-sync',
    title: 'SAP S/4HANA to DMS Industrial General Ledger Sync',
    titleAr: 'موصل المزامنة المالية بين SAP و DMS Industrial ERP',
    shortDesc: 'Enterprise enterprise-grade connector synchronizing multi-currency chart of accounts, journal entries, and asset depreciation schedules between SAP and DMS.',
    shortDescAr: 'موصل مؤسسي متقدم لمزامنة شجرة الحسابات والقيود اليومية متعددة العملات وإهلاك الأصول الثابتة بين نظامي SAP و DMS.',
    product: 'industrial_erp',
    category: 'integrations',
    categoryAr: 'وحدات التكامل والربط',
    price: 890,
    currency: 'USD',
    author: {
      name: 'Dr. Mona El-Shazly',
      company: 'Delta Medical Systems SAE',
      isCertified: true,
      tier: 'Gold'
    },
    rating: 5.0,
    reviewsCount: 15,
    installsCount: 38,
    compatibility: {
      minVersion: 'DMS Industrial ERP v2.2+',
      testedOn: 'v2.4 LTS'
    },
    status: 'approved',
    featured: false,
    features: [
      'RFC and OData v4 secure enterprise authentication',
      'Automatic financial reconciliation error catching and retry queues',
      'Full Egyptian currency float and central bank exchange rate integration',
      'Enterprise transaction rollback on network disconnect'
    ],
    featuresAr: [
      'مصادقة مؤسسية آمنة عبر بروتوكولات RFC و OData v4',
      'كشف آلي لفروق التسوية المالية مع طوابير إعادة المحاولة',
      'دعم كامل لفروق العملات وأسعار صرف البنك المركزي المصري',
      'تراجع تلقائي عن العمليات غير المكتملة لضمان سلامة الدفاتر'
    ],
    tags: ['SAP', 'General Ledger', 'Enterprise ERP', 'Financial Sync']
  }
];
