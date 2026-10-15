import { CertificationTrack } from '../types';

export const CERTIFICATION_TRACKS: CertificationTrack[] = [
  {
    id: 'track-report-developer',
    title: 'Certified Report Developer',
    titleAr: 'مطور تقارير معتمد (DMS Certified Report Developer)',
    level: 'Associate',
    description: 'Master DMS relational reporting views, FastReports layout design, and high-performance manufacturing & hospital SQL query optimization.',
    descriptionAr: 'احتراف تصميم التقارير وقوالب FastReports والربط مع عروض SQL المفهرسة في أنظمة DMS الصناعية والطبية.',
    durationHours: 16,
    modulesCount: 4,
    courses: [
      {
        title: 'Architecture of DMS Enterprise SQL Schemas & Indexed Views',
        titleAr: 'معمارية قواعد بيانات DMS وعروض SQL المفهرسة',
        duration: '4h 30m',
        completed: true
      },
      {
        title: 'Mastering FastReports Designer 2026 for Multi-Language Invoices',
        titleAr: 'احتراف مصمم FastReports 2026 للفواتير ثنائية اللغة',
        duration: '4h 00m',
        completed: true
      },
      {
        title: 'Optimizing Complex Cost Deviation & Inpatient Billing Queries',
        titleAr: 'تحسين استعلامات انحراف التكاليف وفواتير المرضى المعقدة',
        duration: '3h 45m',
        completed: true
      },
      {
        title: 'Embedding Dynamic BI Dashboards in DMS Desktop & Web Clients',
        titleAr: 'تضمين لوحات BI التفاعلية في شاشات DMS المكتبية والويب',
        duration: '3h 45m',
        completed: false
      }
    ],
    quizQuestions: [
      {
        id: 1,
        question: 'Which SQL view provides pre-aggregated variance calculation between standard BOM and actual manufacturing costs?',
        questionAr: 'أي من عروض SQL يوفر حساباً مجمعاً مسبقاً للانحراف بين تكلفة قائمة المواد والتكلفة الفعلية؟',
        options: [
          'v_prod_cost_deviation',
          'tbl_raw_materials_ledger',
          'v_inventory_stock_snapshot',
          'sp_calculate_shift_hours'
        ],
        optionsAr: [
          'v_prod_cost_deviation',
          'tbl_raw_materials_ledger',
          'v_inventory_stock_snapshot',
          'sp_calculate_shift_hours'
        ],
        correctIndex: 0
      },
      {
        id: 2,
        question: 'When printing bilingual invoices in FastReports, how should RTL text alignment be enforced?',
        questionAr: 'عند تصميم فواتير ثنائية اللغة في FastReports، كيف يتم ضبط محاذاة النص من اليمين إلى اليسار (RTL)؟',
        options: [
          'Set RightToLeft property to True on memo components',
          'Reverse character strings manually in SQL',
          'Use static image exports for Arabic phrases',
          'FastReports does not support RTL layouts'
        ],
        optionsAr: [
          'تفعيل خاصية RightToLeft = True في مكونات النصوص (Memo)',
          'عكس ترتيب الحروف يدوياً في استعلام SQL',
          'استخدام صور ثابتة للنصوص العربية',
          'برنامج FastReports لا يدعم اتجاه RTL'
        ],
        correctIndex: 0
      },
      {
        id: 3,
        question: 'What is the required index pattern for querying historical machine telemetry across rolling 24-hour windows?',
        questionAr: 'ما هو الفهرس الموصى به لاسترجاع بيانات الحساسات التاريخية على مدار ٢٤ ساعة دون إجهاد الخادم؟',
        options: [
          'Clustered Index on (work_center_id, timestamp_utc)',
          'Non-clustered Index on machine_name only',
          'Table scan without indexing',
          'Trigger on each insert'
        ],
        optionsAr: [
          'فهرس مجمع (Clustered) على (work_center_id, timestamp_utc)',
          'فهرس غير مجمع على اسم الماكينة فقط',
          'مسح كامل للجدول بدون فهرسة',
          'مشغل Trigger مع كل عملية إدخال'
        ],
        correctIndex: 0
      },
      {
        id: 4,
        question: 'In DMS HMS, which synthetic table holds inpatient bed occupancies and attending physician assignments?',
        questionAr: 'في نظام DMS الطبي، أي الجداول الاصطناعية يحوي بيانات تسكين أسرة المرضى واستشاريي العلاج؟',
        options: [
          'syn_hms_wards and syn_hms_admissions',
          'tbl_outpatient_queue',
          'syn_pharmacy_dispense_log',
          'tbl_cafeteria_vouchers'
        ],
        optionsAr: [
          'syn_hms_wards و syn_hms_admissions',
          'tbl_outpatient_queue',
          'syn_pharmacy_dispense_log',
          'tbl_cafeteria_vouchers'
        ],
        correctIndex: 0
      },
      {
        id: 5,
        question: 'What is the recommended export format when generating official Egyptian Tax Authority compliant invoice documents?',
        questionAr: 'ما هي صيغة التصدير المعتمدة عند استخراج وثائق الفواتير المتوافقة مع معايير الضرائب المصرية؟',
        options: [
          'PDF/A with embedded digital signature and ETA UUID metadata',
          'Plain uncompressed CSV',
          'Low-resolution JPEG',
          'Rich Text Format (.rtf)'
        ],
        optionsAr: [
          'PDF/A مع توقيع إلكتروني مدمج وبيانات UUID الخاصة بالضرائب',
          'ملف نصي CSV عادي غير مضغوط',
          'صورة JPEG منخفضة الدقة',
          'ملف Rich Text Format (.rtf)'
        ],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'track-integration-specialist',
    title: 'Certified Integration Specialist',
    titleAr: 'أخصائي تكامل وربط برمجيات معتمد (Integration Specialist)',
    level: 'Professional',
    description: 'Deep dive into RESTful APIs, Webhook security, HMAC signatures, OPC-UA industrial gateways, and HL7 FHIR healthcare standards.',
    descriptionAr: 'دراسة متقدمة في واجهات REST وتأمين الـ Webhooks بتشفير HMAC وربط بروتوكولات OPC-UA الصناعية ومعايير HL7 FHIR الطبية.',
    durationHours: 24,
    modulesCount: 5,
    courses: [
      {
        title: 'OAuth 2.0 & Bearer Token Security Architecture in DMS',
        titleAr: 'معمارية أمان OAuth 2.0 والرموز الرقمية في منظومة DMS',
        duration: '5h 00m',
        completed: true
      },
      {
        title: 'Connecting Factory PLCs via DMS OPC-UA Read-Only Bridge',
        titleAr: 'ربط أجهزة الـ PLC في المصانع عبر جسر OPC-UA الآمن',
        duration: '6h 00m',
        completed: true
      },
      {
        title: 'Building Resilient Webhook Handlers with Exponential Backoff',
        titleAr: 'بناء معالجات Webhooks عالية الموثوقية واستراتيجيات إعادة المحاولة',
        duration: '4h 30m',
        completed: true
      },
      {
        title: 'Interoperability with HL7 v2.5 and FHIR R4 Inpatient Resources',
        titleAr: 'التكامل مع معايير HL7 v2.5 و FHIR R4 للملف الطبي للمريض',
        duration: '5h 30m',
        completed: true
      },
      {
        title: 'Egyptian ETA Tax Authority API v1.0 Packaging & UBL 2.1',
        titleAr: 'حزم الفاتورة الإلكترونية المصرية ومعيار UBL 2.1',
        duration: '3h 00m',
        completed: false
      }
    ],
    quizQuestions: [
      {
        id: 1,
        question: 'How are incoming webhook payloads verified to ensure they originated authentically from DMS servers?',
        questionAr: 'كيف يتم التحقق من صحة حمولة الـ Webhook الواردة والتأكد من صدورها من خوادم DMS الأصلية؟',
        options: [
          'Verifying X-DMS-Signature header with HMAC-SHA256 and shared secret',
          'Checking basic username and password in URL query string',
          'Assuming all incoming HTTP requests are trusted',
          'Matching client IP address against a public list'
        ],
        optionsAr: [
          'التحقق من ترويسة X-DMS-Signature باستخدام HMAC-SHA256 والمفتاح السري',
          'فحص اسم المستخدم وكلمة المرور في رابط الـ URL',
          'افتراض أن كافة طلبات HTTP الواردة موثوقة',
          'مطابقة عنوان IP فقط دون تشفير'
        ],
        correctIndex: 0
      },
      {
        id: 2,
        question: 'Which FHIR R4 resource corresponds to a diagnostic observation such as patient blood pressure or oxygen saturation?',
        questionAr: 'أي من موارد معيار FHIR R4 يعبر عن قياسات العلامات الحيوية مثل ضغط الدم ونسبة الأكسجين؟',
        options: [
          'Observation',
          'Patient',
          'Encounter',
          'Coverage'
        ],
        optionsAr: [
          'Observation',
          'Patient',
          'Encounter',
          'Coverage'
        ],
        correctIndex: 0
      },
      {
        id: 3,
        question: 'What is the default rate limit on DMS Production Tier REST API endpoints?',
        questionAr: 'ما هو الحد الافتراضي لمعدل الاستدعاء في بيئة الإنتاج لواجهات برمجة DMS؟',
        options: [
          '2,000 to 5,000 requests per minute with burst capability',
          '10 requests per hour',
          'Unlimited without any throttling',
          '1 request per second strictly'
        ],
        optionsAr: [
          'من ٢,٠٠٠ إلى ٥,٠٠٠ طلب في الدقيقة مع دعم التدفق اللحظي',
          '١٠ طلبات في الساعة فقط',
          'غير محدود بدون أي قيود',
          'طلب واحد في الثانية بدقة'
        ],
        correctIndex: 0
      },
      {
        id: 4,
        question: 'Why does the DMS OPC-UA bridge operate strictly in read-only mode for partner applications?',
        questionAr: 'لماذا يعمل جسر OPC-UA في DMS في وضع القراءة فقط لبرمجيات الشركاء؟',
        options: [
          'To preserve factory safety standards and prevent unauthorized machine actuator overrides',
          'Because write commands are slower to execute',
          'Because PLCs do not support bidirectional communication',
          'To save cloud storage costs'
        ],
        optionsAr: [
          'لحماية سلامة خطوط الإنتاج ومنع التعديل غير المصرح به على أوامر الآلات',
          'لأن أوامر الكتابة أبطأ في التنفيذ',
          'لأن وحدات الـ PLC لا تدعم الاتصال التفاعلي',
          'لتوفير تكلفة التخزين السحابي'
        ],
        correctIndex: 0
      },
      {
        id: 5,
        question: 'What HTTP status code does the DMS API Gateway return when a client exceeds rate limits?',
        questionAr: 'ما هو رمز الخطأ الذي ترجعه بوابة DMS عند تجاوز الحد المسموح للاستدعاءات؟',
        options: [
          '429 Too Many Requests',
          '500 Internal Server Error',
          '404 Not Found',
          '204 No Content'
        ],
        optionsAr: [
          '429 Too Many Requests',
          '500 Internal Server Error',
          '404 Not Found',
          '204 No Content'
        ],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'track-ai-specialist',
    title: 'AI & Advanced Analytics Specialist',
    titleAr: 'أخصائي الذكاء الاصطناعي والتحليلات المتقدمة (AI Specialist)',
    level: 'Professional',
    description: 'Deploy machine learning inference pipelines, predictive maintenance models, and clinical NLP classification add-ons directly into DMS ecosystems.',
    descriptionAr: 'نشر نماذج التعلم الآلي للتنبؤ بالأعطال الصناعية ومعالجة اللغات الطبيعية للسجلات الطبية السريرية في بيئة DMS.',
    durationHours: 20,
    modulesCount: 4,
    courses: [
      {
        title: 'Industrial Anomaly Detection: FFT and Vibration Spectrum Analysis',
        titleAr: 'كشف الانحرافات الصناعية: تحليل طيف الاهتزازات وتحويلات فورييه',
        duration: '5h 30m',
        completed: false
      },
      {
        title: 'Clinical NLP: Multi-Lingual Arabic/English Medical Concept Extraction',
        titleAr: 'المعالجة اللغوية السريرية: استخراج المفاهيم الطبية بالعربية والإنجليزية',
        duration: '5h 00m',
        completed: false
      },
      {
        title: 'Edge AI Deployment: Running Containerized PyTorch Models on Plant Edge Gateways',
        titleAr: 'نشر الذكاء الاصطناعي على الحافة في بوابات المصانع المحلية',
        duration: '5h 00m',
        completed: false
      },
      {
        title: 'Synthetic Healthcare Data De-Identification & HIPAA/Egyptian Law Compliance',
        titleAr: 'تجريد البيانات الطبية الاصطناعية من الهوية والامتثال للقوانين',
        duration: '4h 30m',
        completed: false
      }
    ],
    quizQuestions: [
      {
        id: 1,
        question: 'Which signal processing metric is primarily used to detect early bearing wear before audible noise occurs?',
        questionAr: 'أي من مؤشرات معالجة الإشارات يُستخدم للكشف المبكر عن تآكل المحامل قبل سماع صوت العطل؟',
        options: [
          'Vibration RMS velocity and envelope acceleration spectrum',
          'Ambient factory room temperature only',
          'Total power grid voltage fluctuation',
          'Operator shift clock-in duration'
        ],
        optionsAr: [
          'معدل جذر متوسط التربيع (RMS) لسرعة الاهتزاز وطيف التسارع',
          'درجة حرارة هواء صالة المصنع فقط',
          'تذبذب جهد شبكة الكهرباء العامة',
          'ساعات دوام مشغل الوردية'
        ],
        correctIndex: 0
      },
      {
        id: 2,
        question: 'When clinical NLP classifies progress notes for billing, what standard classification taxonomy is required in DMS HMS?',
        questionAr: 'عند قيام نموذج الذكاء الاصطناعي بتصنيف الملاحظات الطبية، ما هو نظام الترميز المعتمد في DMS HMS؟',
        options: [
          'ICD-10 (International Classification of Diseases, 10th Revision)',
          'ISBN Book Cataloging Code',
          'Postal ZIP Code System',
          'HTTP Status Codes'
        ],
        optionsAr: [
          'التصنيف الدولي للأمراض الإصدار العاشر (ICD-10)',
          'الرقم المعياري الدولي للكتاب ISBN',
          'نظام الرمز البريدي',
          'أكواد حالات بروتوكول HTTP'
        ],
        correctIndex: 0
      },
      {
        id: 3,
        question: 'Why must healthcare models in the DMS sandbox process only synthetic patient identifiers?',
        questionAr: 'لماذا تشترط منصة DMS معالجة بيانات مرضى اصطناعية بالكامل في بيئة الاختبار؟',
        options: [
          'To guarantee absolute patient privacy and satisfy Egyptian Data Protection Law No. 151 of 2020',
          'Because real healthcare data cannot be stored digitally',
          'Synthetic data produces higher model accuracy than real data',
          'To speed up network bandwidth by 50%'
        ],
        optionsAr: [
          'لضمان الخصوصية التامة للمرضى والامتثال لقانون حماية البيانات الشخصية المصري رقم ١٥١ لسنة ٢٠٢٠',
          'لأنه لا يمكن تخزين البيانات الطبية رقمياً',
          'لأن البيانات الاصطناعية أكثر دقة من البيانات الحقيقية',
          'لتسريع سرعة الإنترنت بنسبة ٥٠٪'
        ],
        correctIndex: 0
      },
      {
        id: 4,
        question: 'What is the primary operational advantage of deploying inference models on plant edge gateways rather than public cloud?',
        questionAr: 'ما هي الميزة التشغيلية الرئيسية لتشغيل نماذج الاستدلال على بوابات الحافة بالمصنع مقارنة بالسحابة العامة؟',
        options: [
          'Sub-10ms response latency and continued operation during plant internet disconnections',
          'Requires zero electrical power',
          'Eliminates the need for sensors',
          'Bypasses PLC firmware security checks'
        ],
        optionsAr: [
          'زمن استجابة فائق السرعة أقل من ١٠ ملي ثانية واستمرار العمل عند انقطاع الإنترنت بالمصنع',
          'عدم استهلاك أي طاقة كهربائية',
          'الاستغناء تماماً عن وجود الحساسات',
          'تجاوز إجراءات أمان نظام PLC'
        ],
        correctIndex: 0
      },
      {
        id: 5,
        question: 'How does DMS AI Gateway communicate confidence scores to downstream consumer applications?',
        questionAr: 'كيف ترجع بوابة DMS للذكاء الاصطناعي درجات الثقة للتطبيقات المستفيدة؟',
        options: [
          'As normalized probability arrays (0.0 to 100.0%) per classified category in JSON response',
          'Via analog acoustic beep sounds',
          'Through unformatted plain text logs only',
          'By restarting the server'
        ],
        optionsAr: [
          'مصفوفة احتمالات قياسية من 0 إلى 100% لكل تصنيف داخل استجابة الـ JSON',
          'عبر نغمات صوتية تحذيرية',
          'من خلال سجلات نصية غير منظمة فقط',
          'بإعادة تشغيل الخادم'
        ],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'track-solution-partner',
    title: 'Certified Solution Partner',
    titleAr: 'شريك حلول مؤسسي معتمد (Certified Solution Partner)',
    level: 'Master',
    description: 'Comprehensive business, architecture, security governance, and multi-tenant scaling training for consulting firms and system integrators.',
    descriptionAr: 'برنامج الاعتماد الشامل للشركات الاستشارية وبيوت البرمجيات لإدارة التكاملات الضخمة والحوكمة الأمنية.',
    durationHours: 32,
    modulesCount: 6,
    courses: [
      {
        title: 'Enterprise Multi-Tenant Data Isolation in Industrial & Medical Deployments',
        titleAr: 'عزل البيانات متعددة المستأجرين في المنشآت الصناعية والطبية',
        duration: '6h 00m',
        completed: false
      },
      {
        title: 'Commercial Models, Marketplace Listing Audits, and SLAs',
        titleAr: 'النماذج التجارية وتدقيق إضافات المتجر واتفاقيات مستوى الخدمة SLAs',
        duration: '5h 30m',
        completed: false
      },
      {
        title: 'Enterprise Disaster Recovery, High Availability, and Cluster Failover',
        titleAr: 'التعافي من الكوارث والجاهزية العالية لخوادم DMS الموزعة',
        duration: '6h 00m',
        completed: false
      },
      {
        title: 'Security Auditing, Penetration Testing & Vulnerability Disclosure',
        titleAr: 'التدقيق الأمني واختبارات الاختراق والإبلاغ عن الثغرات الأمنية',
        duration: '5h 30m',
        completed: false
      },
      {
        title: 'Co-Selling & Pre-Sales Architecture with DMS Regional Account Executives',
        titleAr: 'استراتيجيات البيع المشترك والمعمارية الفنية مع فريق مبيعات DMS',
        duration: '4h 30m',
        completed: false
      },
      {
        title: 'Final Master Capstone Project: End-to-End Enterprise Integration Blueprint',
        titleAr: 'المشروع العملي النهائي: تصميم مخطط تكامل مؤسسي متكامل',
        duration: '4h 30m',
        completed: false
      }
    ],
    quizQuestions: [
      {
        id: 1,
        question: 'What tier status is unlocked upon completing the Certified Solution Partner roadmap with verified marketplace publications?',
        questionAr: 'ما هي رتبة الشريك التي يتم الترقية إليها عند إتمام هذا المسار ونشر حلول معتمدة في المتجر؟',
        options: [
          'Gold or Platinum Partner with 85-90% revenue share',
          'Remains at Bronze tier indefinitely',
          'Trial developer access only',
          'No commercial benefit'
        ],
        optionsAr: [
          'شريك ذهبي أو بلاتيني بنسبة أرباح تتراوح بين ٨٥٪ و ٩٠٪',
          'البقاء في المستوى البرونزي دائماً',
          'حساب تجريبي مؤقت فقط',
          'لا توجد أي ميزة تجارية'
        ],
        correctIndex: 0
      },
      {
        id: 2,
        question: 'Under DMS Security Policy, what is mandatory before deploying an external partner module to a customer hospital server?',
        questionAr: 'وفقاً لسياسة أمان DMS، ما هو الإجراء الإلزامي قبل تثبيت وحدة برمجية لشريك خارجي في مستشفى عميل؟',
        options: [
          'Source code security audit, data isolation verification, and formal DMS sign-off',
          'Simply clicking download without any checks',
          'Asking the receptionist for permission',
          'Waiting 30 days without review'
        ],
        optionsAr: [
          'تدقيق أمني للكود المصدري، والتحقق من عزل البيانات، واعتماد رسمي من مهندسي DMS',
          'التحميل المباشر دون أي فحص',
          'موافقة موظف الاستقبال فقط',
          'الانتظار لمدة شهر دون مراجعة'
        ],
        correctIndex: 0
      },
      {
        id: 3,
        question: 'Which legal framework governs digital healthcare record privacy and client liability in Egypt?',
        questionAr: 'ما هو القانون المصري المنظم لحماية البيانات الشخصية الرقمية والمسؤولية القانونية؟',
        options: [
          'Egyptian Data Protection Law No. 151 of 2020',
          'Maritime Shipping Code of 1990',
          'Agricultural Land Reform Act',
          'General Aviation Treaty'
        ],
        optionsAr: [
          'قانون حماية البيانات الشخصية المصري رقم ١٥١ لسنة ٢٠٢٠',
          'قانون الملاحة البحرية لعام ١٩٩٠',
          'قانون الإصلاح الزراعي',
          'معاهدة الطيران المدني'
        ],
        correctIndex: 0
      },
      {
        id: 4,
        question: 'How do Solution Partners receive priority Level-3 engineering escalations for mission-critical plant incidents?',
        questionAr: 'كيف يحصل شركاء الحلول المعتمدون على دعم فني من المستوى الثالث (L3) عند الطوارئ؟',
        options: [
          'Direct Dedicated Escalation Bridge in Partner Dashboard with 1-hour SLA',
          'Submitting public social media posts',
          'Standard community forum without timeline',
          'No technical support is offered to partners'
        ],
        optionsAr: [
          'قناة تصعيد فورية مخصصة في لوحة تحكم الشريك مع التزام بالرد خلال ساعة واحدة (SLA)',
          'كتابة منشور على وسائل التواصل الاجتماعي',
          'منتدى عام دون أي التزام زمني',
          'لا يتوفر أي دعم تقني للشركاء'
        ],
        correctIndex: 0
      },
      {
        id: 5,
        question: 'What is the minimum recommended redundancy architecture for DMS Industrial ERP on-premise clusters?',
        questionAr: 'ما هي معمارية التكرارية الاحتياطية الموصى بها لمجموعات خوادم DMS الصناعية؟',
        options: [
          'Active-Passive dual node database cluster with synchronous log shipping and witness quorum',
          'Single non-backed-up laptop',
          'USB thumb drive backup once per year',
          'Cloud-only with zero local caching'
        ],
        optionsAr: [
          'خادمان متعاقبان (Active-Passive) مع مزامنة فورية لسجلات المعاملات وخادم مراقبة Quorum',
          'جهاز لابتوب فردي بدون نسخ احتياطي',
          'نسخة على فلاشة USB مرة سنوياً',
          'سحابة فقط دون أي خادم محلي'
        ],
        correctIndex: 0
      }
    ]
  }
];

export const ELIGIBILITY_QUESTIONS = [
  {
    id: 1,
    question: 'What is your primary programming language or technical focus?',
    questionAr: 'ما هي لغة البرمجة أو المجال التقني الأساسي الذي تتقنه؟',
    options: [
      { text: 'SQL, Crystal Reports, FastReports, and PowerBI', textAr: 'استعلامات SQL و FastReports و PowerBI', trackId: 'track-report-developer' },
      { text: 'C#, Python, REST APIs, JSON, and Webhooks', textAr: 'لغات C# و Python وواجهات REST والـ Webhooks', trackId: 'track-integration-specialist' },
      { text: 'PyTorch, Machine Learning, Computer Vision, and NLP', textAr: 'الذكاء الاصطناعي وتعلم الآلة ورؤية الحاسوب', trackId: 'track-ai-specialist' },
      { text: 'Enterprise Architecture, Systems Consulting, and Sales', textAr: 'المعمارية المؤسسية والاستشارات وإدارة الحلول', trackId: 'track-solution-partner' }
    ]
  },
  {
    id: 2,
    question: 'Which DMS product line do you interact with most frequently?',
    questionAr: 'أي من خطوط إنتاج DMS تتعامل معها بشكل متكرر؟',
    options: [
      { text: 'Industrial ERP for manufacturing factories and production lines', textAr: 'حلول Industrial ERP للمصانع وخطوط الإنتاج', trackId: 'track-report-developer' },
      { text: 'Both ERP and HMS equally for custom API connectors', textAr: 'كلا النظامين الصناعي والطبي لبناء موصلات برمجية', trackId: 'track-integration-specialist' },
      { text: 'Hospital Management System (HMS) or IoT sensor equipment', textAr: 'نظام المستشفيات (HMS) أو حساسات إنترنت الأشياء', trackId: 'track-ai-specialist' },
      { text: 'Enterprise deployment projects across major Egyptian clients', textAr: 'مشاريع التحول الرقمي لدى كبرى المؤسسات المصرية', trackId: 'track-solution-partner' }
    ]
  },
  {
    id: 3,
    question: 'What is your primary commercial goal in the DMS Developer Network?',
    questionAr: 'ما هو هدفك التجاري الأساسي من الانضمام لشبكة مطوري DMS؟',
    options: [
      { text: 'Sell custom analytical reports and BI templates on Marketplace', textAr: 'بيع قوالب التقارير ولوحات التحليل في المتجر', trackId: 'track-report-developer' },
      { text: 'Build third-party hardware, PLC, and lab equipment bridges', textAr: 'ربط أجهزة المصانع والمعامل الطبية برمجياً', trackId: 'track-integration-specialist' },
      { text: 'Monetize predictive algorithms and computer vision add-ons', textAr: 'تسويق خوارزميات التنبؤ ونماذج الرؤية الحاسوبية', trackId: 'track-ai-specialist' },
      { text: 'Become an accredited Regional Partner firm with enterprise revenue share', textAr: 'اعتماد شركتنا كشريك استراتيجي إقليمي بحصة أرباح مميزة', trackId: 'track-solution-partner' }
    ]
  },
  {
    id: 4,
    question: 'How comfortable are you with industrial protocols (OPC-UA/SCADA) or medical standards (HL7/FHIR)?',
    questionAr: 'ما مدى خبرتك في البروتوكولات الصناعية (OPC-UA) أو المعايير الطبية (HL7/FHIR)؟',
    options: [
      { text: 'I focus mostly on database queries and reporting schemas', textAr: 'أركز بالأساس على استعلامات قواعد البيانات والتقارير', trackId: 'track-report-developer' },
      { text: 'Highly experienced with bidirectional protocols and JSON payloads', textAr: 'خبرة قوية بالبروتوكولات ونقل البيانات بصيغة JSON', trackId: 'track-integration-specialist' },
      { text: 'I work with data arrays and signal waveforms for ML modeling', textAr: 'أتعامل مع تدفقات الإشارات والبيانات لتدريب النماذج', trackId: 'track-ai-specialist' },
      { text: 'I understand their architectural role in overall client compliance', textAr: 'أفهم دورها المعماري في الامتثال المؤسسي للعميل', trackId: 'track-solution-partner' }
    ]
  },
  {
    id: 5,
    question: 'How much time can you commit to certification training?',
    questionAr: 'كم عدد الساعات التي يمكنك تخصيصها لدراسة الاعتماد؟',
    options: [
      { text: '10 to 16 hours (fast focused certification)', textAr: 'من ١٠ إلى ١٦ ساعة (اعتماد سريع ومركز)', trackId: 'track-report-developer' },
      { text: '20 to 25 hours (hands-on technical integration)', textAr: 'من ٢٠ إلى ٢٥ ساعة (تدريب تقني وتطبيقي عميق)', trackId: 'track-integration-specialist' },
      { text: '18 to 22 hours (advanced predictive modeling)', textAr: 'من ١٨ إلى ٢٢ ساعة (نماذج تنبؤية متقدمة)', trackId: 'track-ai-specialist' },
      { text: '30+ hours (comprehensive enterprise master certification)', textAr: 'أكثر من ٣٠ ساعة (برنامج ماستر مؤسسي متكامل)', trackId: 'track-solution-partner' }
    ]
  }
];
