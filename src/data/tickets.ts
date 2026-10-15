import { SupportTicket } from '../types';

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-2026-081',
    ticketNumber: 'DMS-TCK-9401',
    subject: 'Request for production rate-limit expansion on Alexandria Steel plant gateway',
    category: 'api',
    priority: 'high',
    status: 'in_progress',
    product: 'industrial_erp',
    createdAt: '2026-10-10T08:30:00Z',
    updatedAt: '2026-10-11T14:15:00Z',
    messages: [
      {
        id: 'msg-1',
        sender: 'Eng. Karim El-Sayed',
        isStaff: false,
        message: 'We are rolling out 12 additional rolling mill stands and anticipate peak burst rates of 6,500 req/min starting next Sunday. We currently hit the 2,000 threshold on line 4.',
        timestamp: '2026-10-10T08:30:00Z'
      },
      {
        id: 'msg-2',
        sender: 'DMS Gateway Operations Team',
        isStaff: true,
        message: 'Hello Engineer Karim, we have verified your plant cluster architecture. Please enable HTTP keep-alive connection pooling in your C# daemon. We have temporarily provisioned an interim ceiling of 8,000 req/min for your testing window.',
        timestamp: '2026-10-11T14:15:00Z'
      }
    ]
  },
  {
    id: 'tkt-2026-082',
    ticketNumber: 'DMS-TCK-9388',
    subject: 'Verification of HL7 FHIR Observation LOINC mappings for neonatal incubators',
    category: 'sandbox',
    priority: 'medium',
    status: 'resolved',
    product: 'hms',
    createdAt: '2026-10-07T12:00:00Z',
    updatedAt: '2026-10-08T16:20:00Z',
    messages: [
      {
        id: 'msg-1',
        sender: 'Dr. Mona El-Shazly',
        isStaff: false,
        message: 'In testing our bedside IoT bridge in the sandbox, neonatal incubator temperature codes (LOINC 8328-7) returned a warning. Could you verify if the schema is up to date in the synthetic repository?',
        timestamp: '2026-10-07T12:00:00Z'
      },
      {
        id: 'msg-2',
        sender: 'DMS Healthcare Standards Lead',
        isStaff: true,
        message: 'Dr. Mona, the LOINC dictionary definition on the sandbox was refreshed to version 2.76 yesterday. The incubator telemetry profile is now completely green in your test tenant.',
        timestamp: '2026-10-08T16:20:00Z'
      }
    ]
  }
];

export const AUDIT_LOGS = [
  {
    id: 'log-1',
    action: 'API_KEY_GENERATED',
    actionAr: 'توليد مفتاح API تجريبي',
    description: 'Generated Sandbox Key "Nile-Scada-Dev-2026"',
    descriptionAr: 'تم توليد مفتاح تجريبي "Nile-Scada-Dev-2026"',
    ipAddress: '197.38.12.89 (Cairo, Egypt)',
    timestamp: '2026-10-12T07:14:00Z'
  },
  {
    id: 'log-2',
    action: 'QUERY_RUNNER_EXECUTED',
    actionAr: 'تنفيذ استعلام تجريبي',
    description: 'Executed "OEE Anomaly Detection" query (38ms latency)',
    descriptionAr: 'تنفيذ استعلام "كشف انحرافات الكفاءة OEE" (٣٨ ملي ثانية)',
    ipAddress: '197.38.12.89 (Cairo, Egypt)',
    timestamp: '2026-10-12T06:40:00Z'
  },
  {
    id: 'log-3',
    action: 'MARKETPLACE_INSTALL_REQUESTED',
    actionAr: 'طلب تثبيت إضافة من المتجر',
    description: 'Requested install for "HL7 Inpatient Vitals IoT Bridge" on tenant DMS-HOSP-CAIRO-01',
    descriptionAr: 'طلب تثبيت إضافة "جسر مراقبة العلامات الحيوية" على حساب العميل',
    ipAddress: '156.204.81.14 (Alexandria, Egypt)',
    timestamp: '2026-10-11T19:22:00Z'
  },
  {
    id: 'log-4',
    action: 'CERTIFICATION_PASSED',
    actionAr: 'اجتياز اختبار شهادة معتمدة',
    description: 'Completed Certified Report Developer assessment with 100% score (+250 points)',
    descriptionAr: 'اجتياز اختبار مطور تقارير معتمد بنسبة ١٠٠٪ (إضافة ٢٥٠ نقطة)',
    ipAddress: '197.38.12.89 (Cairo, Egypt)',
    timestamp: '2026-10-10T14:05:00Z'
  }
];
