import { ForumQuestion } from '../types';

export const FORUM_QUESTIONS: ForumQuestion[] = [
  {
    id: 'q-opc-ua-rate-limit',
    title: 'How to handle high-frequency OPC-UA telemetry batching without hitting 429 rate limit?',
    titleAr: 'كيف يمكن تجميع قراءات حساسات OPC-UA عالية التردد دون تجاوز حد الـ 429 Rate Limit؟',
    content: 'We are monitoring 32 PLC nodes on our factory stamping line in 10th of Ramadan City. Sending individual HTTP GET calls per node every second triggers the 10,000 req/min gateway threshold during peak line velocity. Is there an endpoint or batching pattern in DMS Industrial ERP v2.4 to stream multiple node values in a single call?',
    contentAr: 'نقوم بمراقبة ٣٢ حساس PLC على خط المكابس بمصنعنا في مدينة العاشر من رمضان. إرسال طلب HTTP منفصل لكل حساس في الثانية يؤدي لتجاوز حد الاستدعاء عند السرعات القصوى. هل يوجد نمط تجميع أو نقطة نهاية مجمعة في إصدار DMS ERP v2.4 لقراءة عدة حساسات بطلب واحد؟',
    codeSnippet: `// Current individual polling loop triggering rate limits:
for (const nodeId of plcSensorsList) {
  const res = await dmsClient.get('/api/v2/erp/opc-ua/nodes/' + nodeId + '/value');
  console.log(nodeId, res.data.value);
}`,
    author: {
      name: 'Eng. Karim El-Sayed',
      role: 'Customer IT Lead (Alex Steel)',
      tier: 'Bronze'
    },
    product: 'industrial_erp',
    tags: ['OPC-UA', 'Rate-Limiting', 'Industrial ERP', 'Telemetry', 'C#'],
    votes: 24,
    views: 412,
    answersCount: 2,
    isSolved: true,
    createdAt: '2026-10-09T11:30:00Z',
    answers: [
      {
        id: 'ans-staff-01',
        author: {
          name: 'Eng. Ahmed Farouk',
          role: 'DMS Core Architect',
          isDmsStaff: true
        },
        content: 'Yes! In DMS Industrial ERP v2.4 LTS, you should use the batch telemetry endpoint: POST /api/v2/erp/opc-ua/nodes/batch-read passing an array of up to 100 node IDs in the JSON body. This counts as a single API request against your rate limit, executes in under 20ms on the edge gateway, and returns all timestamped values atomically.',
        contentAr: 'نعم بالتأكيد! في إصدار DMS ERP v2.4 LTS، يرجى استخدام نقطة نهاية القراءة المجمعة: POST /api/v2/erp/opc-ua/nodes/batch-read مع تمرير مصفوفة تضم حتى ١٠٠ معرف حساس في جسم الطلب. هذا يحسب كاستدعاء واحد فقط، ويُنفذ في أقل من ٢٠ ملي ثانية على بوابة الحافة.',
        votes: 38,
        isAccepted: true,
        createdAt: '2026-10-09T14:10:00Z'
      },
      {
        id: 'ans-comm-02',
        author: {
          name: 'Eng. Tarek Abdulrahman',
          role: 'Certified Partner',
          isDmsStaff: false
        },
        content: 'We implemented this in the Alexandria stamping plant using a 500ms sliding buffer in C# and our API consumption dropped by 92% immediately.',
        contentAr: 'قمنا بتطبيق هذا الحل في مصنع الإسكندرية باستخدام مخزن مؤقت ٥٠٠ ملي ثانية في C#، وانخفض استهلاك الواجهات بنسبة ٩٢٪ فوراً.',
        votes: 11,
        isAccepted: false,
        createdAt: '2026-10-09T16:45:00Z'
      }
    ]
  },
  {
    id: 'q-fhir-vital-signs',
    title: 'HL7 FHIR R4: Mapping ICU Bedside Monitor SpO2 and Blood Pressure to Observation Resources',
    titleAr: 'HL7 FHIR R4: ربط أجهزة مراقبة العناية المركزة (الأكسجين وضغط الدم) بمورد الملاحظات',
    content: 'We are developing an automated bedside vitals sync module for DMS HMS. What are the specific LOINC codes recognized by the DMS Hospital Core for arterial systolic pressure and peripheral pulse oximetry?',
    contentAr: 'نقوم بتطوير وحدة لمزامنة العلامات الحيوية لأسرة العناية المركزة مع DMS HMS. ما هي أكواد LOINC المعتمدة في النظام الطبي لضغط الدم الشرياني ونسبة تشبع الأكسجين؟',
    codeSnippet: `// Desired FHIR Observation coding block:
"code": {
  "coding": [{
    "system": "http://loinc.org",
    "code": "8867-4", // Heart rate
    "display": "Heart rate"
  }]
}`,
    author: {
      name: 'Dr. Mona El-Shazly',
      role: 'Certified Solution Partner (Delta Medical)',
      tier: 'Gold'
    },
    product: 'hms',
    tags: ['FHIR', 'HL7', 'HMS', 'LOINC', 'ICU', 'Interoperability'],
    votes: 31,
    views: 580,
    answersCount: 1,
    isSolved: true,
    createdAt: '2026-10-08T09:15:00Z',
    answers: [
      {
        id: 'ans-staff-02',
        author: {
          name: 'Dr. Youssef Nabil',
          role: 'DMS Healthcare Standards Lead',
          isDmsStaff: true
        },
        content: 'For DMS HMS v2026.1, the accepted LOINC standards are: 8480-6 (Systolic BP), 8462-4 (Diastolic BP), 59408-5 (Oxygen saturation SpO2 in Arterial blood by Pulse oximetry), and 8867-4 (Heart rate). When submitting bundle transactions, ensure patient reference follows the format "Patient/PT-EGY-SYNTH-XXXX".',
        contentAr: 'في نظام DMS HMS 2026.1، الأكواد المعتمدة هي: 8480-6 (ضغط الدم الانقباضي)، 8462-4 (الانبساطي)، 59408-5 (تشبع الأكسجين SpO2)، و 8867-4 (نبض القلب). تأكد من إسناد معرف المريض بالصيغة "Patient/PT-EGY-SYNTH-XXXX".',
        votes: 45,
        isAccepted: true,
        createdAt: '2026-10-08T11:00:00Z'
      }
    ]
  },
  {
    id: 'q-eta-einvoice-signature',
    title: 'Connecting Egypt Tax Authority (ETA) USB Hardware Tokens with DMS Auto-Filer in Linux Containers',
    titleAr: 'ربط التوكن الإلكتروني لمصلحة الضرائب المصرية (USB Token) مع حاويات لينكس في DMS',
    content: 'We run DMS ERP microservices inside Docker on Ubuntu 24.04 LTS. Our client uses an Egypt Trust hardware USB cryptographic token (PKCS#11). What is the recommended middleware to mount the physical USB dongle into the container without granting root privileges?',
    contentAr: 'نقوم بتشغيل خدمات DMS داخل حاويات Docker على سيرفر Ubuntu 24.04. العميل يمتلك توكن التوقيع الإلكتروني من Egypt Trust (PKCS#11). ما هي الطريقة الموصى بها لتمرير منفذ الـ USB للحاوية بأمان دون صلاحيات root كاملة؟',
    author: {
      name: 'Eng. Hossam Mansour',
      role: 'Senior DevOps Specialist',
      tier: 'Bronze'
    },
    product: 'common',
    tags: ['e-Invoicing', 'ETA', 'Tax', 'Docker', 'PKCS11', 'Linux'],
    votes: 19,
    views: 310,
    answersCount: 1,
    isSolved: false,
    createdAt: '2026-10-10T15:20:00Z',
    answers: [
      {
        id: 'ans-comm-03',
        author: {
          name: 'Eng. Tarek Abdulrahman',
          role: 'Certified Partner',
          isDmsStaff: false
        },
        content: 'You can use pcscd daemon on the host machine and mount the PC/SC UNIX socket /run/pcscd/pcscd.comm into the Docker container. This gives the ETA PKCS#11 driver direct access to smart cards without needing raw USB device mapping.',
        contentAr: 'يمكنك تشغيل خدمة pcscd على السيرفر المضيف ومشاركة مقبس /run/pcscd/pcscd.comm داخل الحاوية، مما يتيح لمكتبة التوقيع الوصول المباشر للتوكن دون الحاجة لصلاحيات أجهزة الـ USB الخام.',
        votes: 14,
        isAccepted: false,
        createdAt: '2026-10-10T17:05:00Z'
      }
    ]
  }
];
