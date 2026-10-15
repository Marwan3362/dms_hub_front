export interface PendingListingReview {
  id: string;
  title: string;
  titleAr: string;
  authorName: string;
  company: string;
  submittedAt: string;
  category: string;
  price: number;
  codeSecurityScanStatus: 'CLEARED' | 'WARNING' | 'PENDING';
  manifestValidated: boolean;
}

export interface PendingKeyRequest {
  id: string;
  companyName: string;
  taxRegistrationNumber: string;
  applicantName: string;
  justification: string;
  requestedRps: number;
  environment: 'production';
  submittedAt: string;
  complianceChecked: boolean;
}

export const PENDING_LISTINGS: PendingListingReview[] = [
  {
    id: 'rev-list-01',
    title: 'Automated Factory Shift Handover Report Template',
    titleAr: 'قالب التقرير التلقائي لتسليم ورديات عمال المصانع',
    authorName: 'Eng. Hossam Mansour',
    company: 'Mansour Systems',
    submittedAt: '2026-10-11T16:00:00Z',
    category: 'reports',
    price: 90,
    codeSecurityScanStatus: 'CLEARED',
    manifestValidated: true
  },
  {
    id: 'rev-list-02',
    title: 'Hospital Central Oxygen Tank Telemetry Listener',
    titleAr: 'مستشعر ومراقب مخزون خزانات الأكسجين المركزي بالمستشفيات',
    authorName: 'Dr. Mona El-Shazly',
    company: 'Delta Medical Systems SAE',
    submittedAt: '2026-10-12T02:30:00Z',
    category: 'integrations',
    price: 320,
    codeSecurityScanStatus: 'CLEARED',
    manifestValidated: true
  }
];

export const PENDING_KEY_REQUESTS: PendingKeyRequest[] = [
  {
    id: 'req-key-01',
    companyName: 'El-Sewedy Industrial Cables SAE',
    taxRegistrationNumber: '100-249-812',
    applicantName: 'Eng. Sherif Hegazy (Chief Automation Engineer)',
    justification: 'Connecting 4 continuous wire extrusion lines directly with DMS Industrial ERP production orders to automate raw copper weight consumption in real time.',
    requestedRps: 150,
    environment: 'production',
    submittedAt: '2026-10-11T11:45:00Z',
    complianceChecked: true
  },
  {
    id: 'req-key-02',
    companyName: 'Cleopatra Hospital Group - Heliopolis Branch',
    taxRegistrationNumber: '201-942-550',
    applicantName: 'Dr. Ramy Wahba (Director of Clinical Informatics)',
    justification: 'Automating insurance claims verification and electronic prescriptions dispensing via DMS HMS secure FHIR gateway for 320 inpatient beds.',
    requestedRps: 80,
    environment: 'production',
    submittedAt: '2026-10-12T05:20:00Z',
    complianceChecked: true
  }
];

export const ADMIN_ANALYTICS_DATA = {
  monthlyGrowth: [
    { month: 'May 2026', registeredDevs: 410, activeDevs: 230, sandboxRuns: 34000, certifications: 45 },
    { month: 'Jun 2026', registeredDevs: 490, activeDevs: 290, sandboxRuns: 42000, certifications: 62 },
    { month: 'Jul 2026', registeredDevs: 580, activeDevs: 360, sandboxRuns: 58000, certifications: 88 },
    { month: 'Aug 2026', registeredDevs: 670, activeDevs: 440, sandboxRuns: 79000, certifications: 115 },
    { month: 'Sep 2026', registeredDevs: 780, activeDevs: 530, sandboxRuns: 104000, certifications: 148 },
    { month: 'Oct 2026', registeredDevs: 864, activeDevs: 610, sandboxRuns: 132000, certifications: 192 }
  ],
  productDistribution: [
    { name: 'Industrial ERP APIs', nameAr: 'واجهات الصناعي ERP', percentage: 54, color: '#1E5BB8' },
    { name: 'HMS Healthcare APIs', nameAr: 'واجهات المستشفيات HMS', percentage: 34, color: '#2E9445' },
    { name: 'Common & Tax Connectors', nameAr: 'الفاتورة والخدمات المشتركة', percentage: 12, color: '#F5C518' }
  ],
  listingsByCategory: [
    { category: 'Integrations', categoryAr: 'وحدات التكامل', count: 32 },
    { category: 'BI Dashboards', categoryAr: 'لوحات BI', count: 24 },
    { category: 'Reports', categoryAr: 'التقارير', count: 48 },
    { category: 'AI Add-ons', categoryAr: 'إضافات الذكاء الاصطناعي', count: 18 }
  ]
};
