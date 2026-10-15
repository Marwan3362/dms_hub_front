import { RewardItem, PartnerTier } from '../types';

export interface LeaderboardUser {
  rank: number;
  name: string;
  nameAr: string;
  company: string;
  companyAr: string;
  avatar: string;
  points: number;
  tier: PartnerTier;
  contributions: number;
  badge: string;
  badgeAr: string;
}

export const MONTHLY_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Dr. Mona El-Shazly',
    nameAr: 'د. منى الشاذلي',
    company: 'Delta Medical Systems SAE',
    companyAr: 'دلتا للنظم الطبية',
    avatar: '/src/assets/images/avatar_engineer_dms_1791789009707.jpg',
    points: 1240,
    tier: 'Gold',
    contributions: 19,
    badge: 'Clinical Standards Champion',
    badgeAr: 'بطل المعايير الإكلينيكية'
  },
  {
    rank: 2,
    name: 'Eng. Tarek Abdulrahman',
    nameAr: 'م. طارق عبد الرحمن',
    company: 'Nile Industrial Automation',
    companyAr: 'النيل للأتمتة الصناعية',
    avatar: '/src/assets/images/avatar_engineer_dms_1791789009707.jpg',
    points: 980,
    tier: 'Silver',
    contributions: 14,
    badge: 'OEE Telemetry Pioneer',
    badgeAr: 'رائد حساسات الإنتاج'
  },
  {
    rank: 3,
    name: 'Eng. Karim El-Sayed',
    nameAr: 'م. كريم السيد',
    company: 'Alexandria Heavy Steel Mills',
    companyAr: 'مصانع الإسكندرية للصلب',
    avatar: '/src/assets/images/avatar_engineer_dms_1791789009707.jpg',
    points: 740,
    tier: 'Bronze',
    contributions: 11,
    badge: 'Industrial Integrator',
    badgeAr: 'خبير الربط الصناعي'
  },
  {
    rank: 4,
    name: 'Eng. Hossam Mansour',
    nameAr: 'م. حسام منصور',
    company: 'Mansour Systems',
    companyAr: 'منصور للأنظمة',
    avatar: '/src/assets/images/avatar_engineer_dms_1791789009707.jpg',
    points: 590,
    tier: 'Bronze',
    contributions: 8,
    badge: 'FastReports Architect',
    badgeAr: 'مهندس قوالب التقارير'
  },
  {
    rank: 5,
    name: 'Dr. Sara Helmy',
    nameAr: 'د. سارة حلمي',
    company: 'Nile Valley Health IT',
    companyAr: 'وادي النيل للحلول الصحية',
    avatar: '/src/assets/images/avatar_engineer_dms_1791789009707.jpg',
    points: 460,
    tier: 'Bronze',
    contributions: 7,
    badge: 'HL7 Interop Specialist',
    badgeAr: 'أخصائي ربط الأنظمة الصحية'
  }
];

export const ALL_TIME_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Dr. Mona El-Shazly',
    nameAr: 'د. منى الشاذلي',
    company: 'Delta Medical Systems SAE',
    companyAr: 'دلتا للنظم الطبية',
    avatar: '/src/assets/images/avatar_engineer_dms_1791789009707.jpg',
    points: 4320,
    tier: 'Gold',
    contributions: 82,
    badge: 'Master Solution Partner',
    badgeAr: 'شريك حلول استراتيجي معتمد'
  },
  {
    rank: 2,
    name: 'Eng. Mostafa El-Gohary',
    nameAr: 'م. مصطفى الجوهري',
    company: 'Cairo Industrial Soft',
    companyAr: 'حلول القاهرة الصناعية',
    avatar: '/src/assets/images/avatar_engineer_dms_1791789009707.jpg',
    points: 3840,
    tier: 'Gold',
    contributions: 67,
    badge: 'SCADA Integration Veteran',
    badgeAr: 'خبير مخضرم في أنظمة التحكم'
  },
  {
    rank: 3,
    name: 'Eng. Tarek Abdulrahman',
    nameAr: 'م. طارق عبد الرحمن',
    company: 'Nile Industrial Automation',
    companyAr: 'النيل للأتمتة الصناعية',
    avatar: '/src/assets/images/avatar_engineer_dms_1791789009707.jpg',
    points: 1850,
    tier: 'Silver',
    contributions: 34,
    badge: 'OEE Telemetry Pioneer',
    badgeAr: 'رائد حساسات الإنتاج'
  },
  {
    rank: 4,
    name: 'Eng. Karim El-Sayed',
    nameAr: 'م. كريم السيد',
    company: 'Alexandria Heavy Steel Mills',
    companyAr: 'مصانع الإسكندرية للصلب',
    avatar: '/src/assets/images/avatar_engineer_dms_1791789009707.jpg',
    points: 920,
    tier: 'Bronze',
    contributions: 18,
    badge: 'Industrial Integrator',
    badgeAr: 'خبير الربط الصناعي'
  }
];

export const REWARDS_CATALOG: RewardItem[] = [
  {
    id: 'rew-cloud-sandbox',
    title: '$150 DMS Cloud Sandbox Compute Credits',
    titleAr: 'رصيد ١٥٠ دولار لخوادم الـ Sandbox السحابية',
    pointsCost: 500,
    description: 'Deploys dedicated containerized instances for high-throughput load and stress testing.',
    descriptionAr: 'حاويات مخصصة لاختبارات الضغط والتحميل العالي لواجهات البرمجة في بيئة معزولة.',
    category: 'cloud'
  },
  {
    id: 'rew-license-discount',
    title: '50% Enterprise Developer License Voucher',
    titleAr: 'قسيمة خصم ٥٠٪ على رخصة التطوير المؤسسية',
    pointsCost: 1200,
    description: 'Valid for full 12-month access to local DMS ERP & HMS on-premise development instances.',
    descriptionAr: 'خصم سنوي كامل على بيئة العمل المحلية لتطوير واختبار منتجات DMS.',
    category: 'license'
  },
  {
    id: 'rew-l3-support',
    title: 'Priority Level-3 Dedicated Architect Support Token',
    titleAr: 'جلسة دعم استشاري مباشر من المستوى الثالث (L3)',
    pointsCost: 800,
    description: '1-on-1 four-hour architectural review session with DMS Core Chief Technology Architect.',
    descriptionAr: 'جلسة استشارية فنية لمدة ٤ ساعات مع رئيس قطاع التكنولوجيا في DMS لمراجعة تصميم تطبيقك.',
    category: 'support'
  },
  {
    id: 'rew-tier-upgrade',
    title: 'Fast-Track Partner Tier Upgrade Assessment',
    titleAr: 'مراجعة تسريع الترقية لفئة الشريك الأعلى',
    pointsCost: 2000,
    description: 'Direct expedited security & commercial evaluation to jump to Silver or Gold tier.',
    descriptionAr: 'تقييم تجاري وأمني فوري لتخطي شروط الانتظار والترقية للفئة الفضية أو الذهبية.',
    category: 'tier'
  }
];

export const POINT_ACTIVITIES = [
  { activity: 'Post an accepted technical answer in the community forum', activityAr: 'كتابة إجابة تقنية مقبولة في منتدى المطورين', points: 50 },
  { activity: 'Submit a helpful forum answer', activityAr: 'تقديم إجابة مفيدة في المنتدى', points: 15 },
  { activity: 'Publish an approved module or report template in Marketplace', activityAr: 'نشر إضافة أو قالب تقرير معتمد في المتجر', points: 200 },
  { activity: 'Successfully complete a DMS Certification Track Exam', activityAr: 'اجتياز اختبار مسار شهادة معتمدة بنجاح', points: 250 },
  { activity: 'Responsible disclosure of security or sandbox vulnerability', activityAr: 'الإبلاغ المسؤول عن ثغرة أمنية في بيئة الـ Sandbox', points: 500 }
];
