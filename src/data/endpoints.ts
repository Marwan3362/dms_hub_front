import { ApiEndpoint } from '../types';

export const API_ENDPOINTS: ApiEndpoint[] = [
  // 1. Industrial ERP - Production Orders
  {
    id: 'erp-prod-orders-list',
    title: 'List Production Orders',
    titleAr: 'استعلام أوامر الإنتاج والتصنيع',
    product: 'industrial_erp',
    category: 'Production Control',
    categoryAr: 'مراقبة خطوط الإنتاج',
    method: 'GET',
    path: '/api/v2/erp/production-orders',
    description: 'Retrieves active and completed manufacturing production orders from DMS Industrial ERP with line status and BOM progress.',
    descriptionAr: 'استرجاع قائمة أوامر تصنيع المنتجات في المصانع وحالة خطوط التجميع وتتبع إنجاز قوائم المواد (BOM).',
    version: 'v2.4 LTS',
    rateLimit: '2,000 req/min',
    parameters: [
      {
        name: 'plantId',
        type: 'string',
        required: true,
        description: 'Plant or factory facility identifier (e.g., PLANT-10TH-RAMADAN-A)',
        descriptionAr: 'معرف المصنع أو المنشأة الصناعية (مثل: PLANT-10TH-RAMADAN-A)',
        in: 'query'
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: 'Filter by order status: IN_PROGRESS | COMPLETED | HOLD | PLANNED',
        descriptionAr: 'تصفية حسب الحالة: قيد التنفيذ | مكتمل | معلق | مخطط',
        in: 'query'
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: 'Number of records to return (default: 25, max: 100)',
        descriptionAr: 'الحد الأقصى لعدد السجلات المسترجعة (افتراضي: 25)',
        in: 'query'
      }
    ],
    responseExample: {
      status: 'success',
      facility: 'PLANT-10TH-RAMADAN-A',
      totalCount: 48,
      data: [
        {
          orderId: 'PO-2026-9041',
          itemCode: 'EGY-ALU-COIL-400',
          itemName: 'Industrial Aluminum Coils 4.0mm',
          workCenter: 'LINE-04-ROLLING',
          quantityPlanned: 12000,
          quantityProduced: 8450,
          unit: 'KG',
          oeeScore: 88.4,
          status: 'IN_PROGRESS',
          shiftLeader: 'Eng. Hany Mostafa',
          scheduledCompletion: '2026-10-14T18:00:00Z'
        },
        {
          orderId: 'PO-2026-9042',
          itemCode: 'PVC-PIPE-HIGH-PRESS',
          itemName: 'Reinforced High-Pressure PVC Pipes',
          workCenter: 'LINE-02-EXTRUSION',
          quantityPlanned: 3500,
          quantityProduced: 3500,
          unit: 'METERS',
          oeeScore: 94.2,
          status: 'COMPLETED',
          shiftLeader: 'Eng. Ashraf Zaki',
          scheduledCompletion: '2026-10-12T04:30:00Z'
        }
      ]
    },
    errorCodes: [
      { code: 400, description: 'Invalid plantId or unsupported query filters.', descriptionAr: 'معرف المصنع غير صالح أو معايير البحث غير مدعومة.' },
      { code: 401, description: 'Missing or expired Bearer authorization token.', descriptionAr: 'رمز التفويض مفقود أو منتهي الصلاحية.' },
      { code: 403, description: 'API Key lacks ERP:Production:Read permission.', descriptionAr: 'المفتاح لا يمتلك صلاحية قراءة أوامر الإنتاج.' },
      { code: 429, description: 'Rate limit exceeded (2,000 req/min).', descriptionAr: 'تم تجاوز الحد المسموح للاستدعاء.' }
    ]
  },

  // 2. Industrial ERP - OPC-UA Read-only Bridge
  {
    id: 'erp-opc-ua-nodes',
    title: 'OPC-UA Live Telemetry Node Value',
    titleAr: 'قراءة قيم حساسات OPC-UA الحية للمعدات',
    product: 'industrial_erp',
    category: 'SCADA & OPC-UA',
    categoryAr: 'ربط أنظمة SCADA والتحكم الصناعي',
    method: 'GET',
    path: '/api/v2/erp/opc-ua/nodes/{nodeId}/value',
    description: 'Reads instantaneous telemetry, vibration, rotational RPM, and thermal values from DMS industrial edge PLC/SCADA bridge.',
    descriptionAr: 'قراءة فورية لبيانات الحساسات الصناعية (الاهتزاز، الحرارة، سرعة الدوران) مباشرة من أجهزة PLC عبر جسر DMS الآمن.',
    version: 'v2.4 LTS',
    rateLimit: '10,000 req/min',
    parameters: [
      {
        name: 'nodeId',
        type: 'string',
        required: true,
        description: 'OPC-UA Node Identifier (e.g. ns=2;s=Line4.ChamberPump.Temperature)',
        descriptionAr: 'معرف عقدة الحساس في نظام OPC-UA (مثال: ns=2;s=Line4.ChamberPump.Temperature)',
        in: 'path'
      }
    ],
    responseExample: {
      nodeId: 'ns=2;s=Line4.ChamberPump.Temperature',
      workStation: 'STAMPING-PRESS-HYDRAULIC-01',
      serverTimestamp: '2026-10-12T07:15:33.204Z',
      value: 68.42,
      engineeringUnits: '°C',
      quality: 'Good_NonSpecific (0x00000000)',
      status: 'NORMAL_OPERATING_RANGE',
      thresholds: {
        warningHigh: 75.0,
        criticalTrip: 85.0
      }
    },
    errorCodes: [
      { code: 404, description: 'OPC-UA node ID does not exist in PLC register catalog.', descriptionAr: 'معرف عقدة الحساس غير مسجل في سجلات الـ PLC.' },
      { code: 503, description: 'Edge gateway bridge unreachable or offline.', descriptionAr: 'بوابة الاتصال الميداني غير متصلة أو خارج الخدمة.' }
    ]
  },

  // 3. Industrial ERP - SQL Reporting View
  {
    id: 'erp-sql-cost-deviation',
    title: 'Production Cost Deviation View (v_prod_cost_deviation)',
    titleAr: 'عرض انحراف تكاليف التصنيع (v_prod_cost_deviation)',
    product: 'industrial_erp',
    category: 'SQL Views & Costing',
    categoryAr: 'تقارير التكاليف وحساب الانحراف',
    method: 'POST',
    path: '/api/v2/erp/sql/views/v_prod_cost_deviation',
    description: 'Executes parametric financial calculation against DMS indexed views comparing standard cost (BOM) vs actual scrap, raw materials, and energy tariffs.',
    descriptionAr: 'تنفيذ استعلام مالي تحليلي لحساب الفرق بين التكلفة المعيارية والتكلفة الفعلية بما يشمل الهالك وفواتير الطاقة.',
    version: 'v2.4 LTS',
    rateLimit: '500 req/min',
    parameters: [
      {
        name: 'fiscalPeriod',
        type: 'string',
        required: true,
        description: 'Fiscal period in YYYY-MM format',
        descriptionAr: 'الفترة المالية بصيغة YYYY-MM',
        in: 'body'
      }
    ],
    requestBodyExample: JSON.stringify(
      {
        fiscalPeriod: '2026-09',
        costCenter: 'CC-FABRICATION-MAIN',
        includeScrapOverhead: true
      },
      null,
      2
    ),
    responseExample: {
      period: '2026-09',
      costCenter: 'CC-FABRICATION-MAIN',
      currency: 'EGP',
      totals: {
        standardBudgetEgp: 4850000.0,
        actualMaterialEgp: 5040000.0,
        energyOverheadEgp: 680000.0,
        variancePercentage: '+4.53%'
      },
      flaggedLines: [
        {
          lineId: 'LINE-04-ROLLING',
          costVarianceEgp: 190000.0,
          rootCause: 'Raw Material Sheet Thickness Tolerance Fluctuation',
          rootCauseAr: 'تفاوت في سماكة ألواح الصاج الواردة من المورد'
        }
      ]
    },
    errorCodes: [
      { code: 400, description: 'Invalid fiscal period format.', descriptionAr: 'صيغة الفترة المالية غير صحيحة.' }
    ]
  },

  // 4. HMS - Patient Inpatient Admission (Synthetic)
  {
    id: 'hms-patient-admissions',
    title: 'Inpatient Admissions & Bed Allocation (Synthetic)',
    titleAr: 'إدخال وتسكين المرضى في الأقسام الداخلية (بيانات اصطناعية)',
    product: 'hms',
    category: 'Patient Administration',
    categoryAr: 'شؤون المرضى والتسكين',
    method: 'GET',
    path: '/api/v2/hms/admissions',
    description: 'Retrieves current inpatient hospital admission records, attending consultants, ward bed assignments, and medical insurance approval codes.',
    descriptionAr: 'استرجاع سجلات دخول المرضى الحالية، وأرقام الأسرة في الأقسام، واستشاري العلاج، وكود موافقة التأمين الطبي.',
    version: 'v2.4 LTS',
    rateLimit: '3,000 req/min',
    parameters: [
      {
        name: 'wardCode',
        type: 'string',
        required: false,
        description: 'Hospital ward (e.g. ICU-SURGICAL, CARDIO-FLOOR-3, PEDIATRICS)',
        descriptionAr: 'رمز العنبر أو القسم الطبي (مثال: ICU-SURGICAL, CARDIO-FLOOR-3)',
        in: 'query'
      },
      {
        name: 'dischargeStatus',
        type: 'string',
        required: false,
        description: 'ACTIVE | DISCHARGED | TRANSFERRED',
        descriptionAr: 'حالة الإقامة: نشط | خرج | تم نقله',
        in: 'query'
      }
    ],
    responseExample: {
      hospitalCode: 'DMS-CAIRO-CENTRAL-HOSP',
      disclaimer: 'Sandbox – Synthetic Data (Not real medical records)',
      disclaimerAr: 'بيئة تجريبية – بيانات مرضى اصطناعية غير حقيقية',
      activeInpatients: 184,
      data: [
        {
          admissionNumber: 'ADM-2026-0819',
          syntheticPatientId: 'PT-EGY-SYNTH-8812',
          patientDisplayName: 'A. M. Hassan (Synthetic)',
          patientDisplayNameAr: 'أ. م. حسن (مريض اصطناعي)',
          age: 54,
          gender: 'Male',
          ward: 'ICU-SURGICAL',
          bedNumber: 'BED-ICU-08',
          admissionDate: '2026-10-10T14:20:00Z',
          attendingPhysician: 'Prof. Dr. Sameh Adel',
          primaryDiagnosisIcd10: 'I21.9 - Acute myocardial infarction',
          insuranceProvider: 'Misr Healthcare Syndicate (Synthetic)',
          triageLevel: 1
        },
        {
          admissionNumber: 'ADM-2026-0820',
          syntheticPatientId: 'PT-EGY-SYNTH-4491',
          patientDisplayName: 'N. S. Ibrahim (Synthetic)',
          patientDisplayNameAr: 'ن. س. إبراهيم (مريضة اصطناعية)',
          age: 39,
          gender: 'Female',
          ward: 'CARDIO-FLOOR-3',
          bedNumber: 'ROOM-312-A',
          admissionDate: '2026-10-11T09:15:00Z',
          attendingPhysician: 'Dr. Reem El-Mahdy',
          primaryDiagnosisIcd10: 'I48.0 - Paroxysmal atrial fibrillation',
          insuranceProvider: 'National Universal Health Insurance (Synthetic)',
          triageLevel: 2
        }
      ]
    },
    errorCodes: [
      { code: 401, description: 'Invalid clinical access credential.', descriptionAr: 'بيانات اعتماد الوصول السريري غير صالحة.' },
      { code: 403, description: 'Lacks Medical:Inpatient:Read scope.', descriptionAr: 'غير مصرح بقراءة بيانات المرضى.' }
    ]
  },

  // 5. HMS - FHIR R4 Patient Resource
  {
    id: 'hms-fhir-r4-patient',
    title: 'HL7 FHIR R4 Patient Endpoint',
    titleAr: 'واجهة مريض متوافقة مع معيار HL7 FHIR R4 الدولي',
    product: 'hms',
    category: 'HL7 & FHIR Standards',
    categoryAr: 'معايير الربط الدولي HL7 و FHIR',
    method: 'GET',
    path: '/api/v2/hms/fhir/Patient/{id}',
    description: 'Returns standard FHIR R4 compliant Patient JSON representation for international clinical interoperability.',
    descriptionAr: 'استرجاع ملف المريض بالصيغة القياسية الدولية FHIR R4 لتمكين التكامل مع الأجهزة والمنصات الطبية العالمية.',
    version: 'FHIR R4 v4.0.1',
    rateLimit: '5,000 req/min',
    parameters: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'FHIR Patient Resource ID (Synthetic)',
        descriptionAr: 'معرف مورد المريض بالمعيار الدولي (اصطناعي)',
        in: 'path'
      }
    ],
    responseExample: {
      resourceType: 'Patient',
      id: 'synth-fhir-pt-8812',
      meta: {
        versionId: '1',
        lastUpdated: '2026-10-11T12:00:00Z',
        profile: ['http://hl7.org/fhir/StructureDefinition/Patient']
      },
      text: {
        status: 'generated',
        div: '<div xmlns="http://www.w3.org/1999/xhtml">Synthetic Patient for Sandbox Interoperability</div>'
      },
      identifier: [
        {
          use: 'usual',
          system: 'urn:oid:2.16.818.1.10.dms.patient',
          value: 'PT-EGY-SYNTH-8812'
        }
      ],
      active: true,
      name: [
        {
          use: 'official',
          family: 'Hassan',
          given: ['A.', 'M.']
        }
      ],
      gender: 'male',
      birthDate: '1972-04-18',
      managingOrganization: {
        reference: 'Organization/dms-hospital-cairo',
        display: 'DMS Cairo Central Hospital'
      }
    },
    errorCodes: [
      { code: 404, description: 'FHIR resource not found in synthetic repository.', descriptionAr: 'المورد غير موجود في مستودع البيانات الاصطناعية.' }
    ]
  },

  // 6. HMS - DICOM Metadata Service
  {
    id: 'hms-dicom-studies',
    title: 'DICOM Studies & Series Metadata (WADO-RS compatible)',
    titleAr: 'واجهة بيانات دراسات الأشعة DICOM (متوافقة مع WADO-RS)',
    product: 'hms',
    category: 'Radiology & PACS',
    categoryAr: 'نظم أرشفة ونقل الصور الطبية (PACS)',
    method: 'GET',
    path: '/api/v2/hms/dicom/studies/{studyUid}',
    description: 'Retrieves study metadata, modality (CT, MRI, X-RAY), slice series count, and PACS viewer access URLs for medical imaging add-ons.',
    descriptionAr: 'استرجاع البيانات الوصفية لدراسات الأشعة ونوع الفحص (رنين مغناطيسي، مقطعية) وروابط المعاينة لبرمجيات التحليل الطبي.',
    version: 'DICOM PS3.18',
    rateLimit: '1,500 req/min',
    parameters: [
      {
        name: 'studyUid',
        type: 'string',
        required: true,
        description: 'DICOM Study Instance UID (Synthetic format)',
        descriptionAr: 'المعرف الفريد لدراسة الأشعة (بصيغة اصطناعية)',
        in: 'path'
      }
    ],
    responseExample: {
      studyInstanceUid: '1.2.826.0.1.3680043.8.498.20261011.8901',
      patientId: 'PT-EGY-SYNTH-8812',
      modality: 'CT',
      studyDescription: 'Chest CT with IV Contrast (Synthetic Protocol)',
      numberOfSeries: 3,
      numberOfInstances: 420,
      radiologistName: 'Dr. Tamer Bahaa',
      pacsViewerUrl: 'https://pacs-sandbox.dms-sae.com/viewer?studyUid=1.2.826.0.1.3680043.8.498.20261011.8901'
    },
    errorCodes: [
      { code: 404, description: 'Study UID not found.', descriptionAr: 'معرف دراسة الأشعة غير موجود.' }
    ]
  },

  // 7. Common - Webhook Subscriptions
  {
    id: 'common-webhooks-subscribe',
    title: 'Create Webhook Event Subscription',
    titleAr: 'إنشاء اشتراك بأحداث الـ Webhooks الفورية',
    product: 'common',
    category: 'Webhooks & Events',
    categoryAr: 'الإشعارات والأحداث اللحظية',
    method: 'POST',
    path: '/api/v2/webhooks/subscriptions',
    description: 'Subscribes your external application to real-time events like machine breakdown, urgent lab results, or stock min thresholds.',
    descriptionAr: 'ربط تطبيقك الخارجي لتلقي إشعارات لحظية مثل توقف خط الإنتاج أو صدور نتائج تحاليل حرجة في المستشفى.',
    version: 'v2.4 LTS',
    rateLimit: '500 req/min',
    parameters: [],
    requestBodyExample: JSON.stringify(
      {
        targetUrl: 'https://partner-gateway.example.com/dms/webhook-listener',
        secretHmacKey: 'whsec_98f48e239a0b81c2',
        subscribedEvents: [
          'erp.production.machine_downtime_alert',
          'hms.lab.critical_pathology_flagged'
        ],
        retryPolicy: {
          maxRetries: 5,
          backoffStrategy: 'EXPONENTIAL'
        }
      },
      null,
      2
    ),
    responseExample: {
      subscriptionId: 'sub_wh_2026_8819',
      status: 'ACTIVE',
      secretHmacKeyMasked: 'whsec_98f4************81c2',
      targetUrl: 'https://partner-gateway.example.com/dms/webhook-listener',
      subscribedEventsCount: 2,
      createdAt: '2026-10-12T07:18:00Z'
    },
    errorCodes: [
      { code: 400, description: 'Invalid HTTPS target URL or unsupported event topics.', descriptionAr: 'رابط الاستقبال غير صالح (يشترط HTTPS) أو الأحداث غير مدعومة.' }
    ]
  },

  // 8. Common - Egypt ETA e-Invoicing Connector
  {
    id: 'common-eta-einvoicing',
    title: 'Validate & Prepare Egyptian ETA e-Invoice',
    titleAr: 'التحقق وتجهيز الفاتورة الإلكترونية لمصلحة الضرائب المصرية (ETA)',
    product: 'common',
    category: 'Tax & Compliance',
    categoryAr: 'الامتثال الضريبي والفاتورة الإلكترونية',
    method: 'POST',
    path: '/api/v2/tax/eta/invoices/validate',
    description: 'Validates invoice JSON structure against Egyptian Tax Authority (ETA) requirements, validates Egyptian Tax ID and prepares digital seal payload.',
    descriptionAr: 'التحقق من صحة الفاتورة وتوافقها مع منظومة الفاتورة الإلكترونية المصرية والتحقق من الرقم الضريبي وتجهيز الختم الإلكتروني.',
    version: 'v1.0 (ETA API v1.0 / UBL 2.1)',
    rateLimit: '2,000 req/min',
    parameters: [],
    requestBodyExample: JSON.stringify(
      {
        internalInvoiceNumber: 'INV-2026-EGY-4401',
        receiverTaxId: '100234567',
        receiverName: 'El-Sewedy Electric SAE',
        receiverType: 'B',
        issueDate: '2026-10-12T07:00:00Z',
        totalSalesAmountEgp: 150000.0,
        totalTaxAmountEgp: 21000.0,
        taxType: 'T1',
        subType: 'V009'
      },
      null,
      2
    ),
    responseExample: {
      validationResult: 'VALID',
      uuidCandidate: '2c918084-7e89-42b1-b991-89e472a81234',
      etaDocumentType: 'I',
      taxComplianceStatus: 'COMPLIANT_WITH_ETA_STANDARDS',
      readyForDigitalSignature: true
    },
    errorCodes: [
      { code: 422, description: 'Egyptian Tax ID format is invalid or mismatch in VAT percentage.', descriptionAr: 'الرقم الضريبي المصري غير صالح أو نسبة ضريبة القيمة المضافة غير متطابقة.' }
    ]
  }
];
