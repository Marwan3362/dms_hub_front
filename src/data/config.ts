import { PartnerTier } from '../types';

/**
 * EDITABLE PLACEHOLDERS & GLOBAL CONFIGURATION
 * In a real production deployment, these values are fetched from the DMS backend configuration service.
 */

export const PLATFORM_STATS = {
  uptimePercentage: '99.98%',
  liveEndpointsCount: 142,
  registeredPartnersCount: 864,
  monthlyQueriesCount: '14.8M',
  supportedClientsCount: '1,200+',
  countriesCount: 11
};

export const REVENUE_SHARE_TIERS: Record<
  PartnerTier,
  {
    name: string;
    nameAr: string;
    developerShare: number; // e.g. 0.80 = 80%
    dmsShare: number; // e.g. 0.20 = 20%
    minimumPoints: number;
    description: string;
    descriptionAr: string;
  }
> = {
  Bronze: {
    name: 'Bronze Partner',
    nameAr: 'الشريك البرونزي',
    developerShare: 0.70,
    dmsShare: 0.30,
    minimumPoints: 0,
    description: 'Entry tier for registered independent developers and newly enrolled partners.',
    descriptionAr: 'المستوى المبدئي للمطورين المستقلين والشركاء المسجلين حديثاً.'
  },
  Silver: {
    name: 'Silver Partner',
    nameAr: 'الشريك الفضي',
    developerShare: 0.80,
    dmsShare: 0.20,
    minimumPoints: 1500,
    description: 'Requires at least 1 verified certification and active sandbox testing.',
    descriptionAr: 'يتطلب شهادة معتمدة واحدة على الأقل واختبارات دورية في الـ Sandbox.'
  },
  Gold: {
    name: 'Gold Partner',
    nameAr: 'الشريك الذهبي',
    developerShare: 0.85,
    dmsShare: 0.15,
    minimumPoints: 3500,
    description: 'Requires 2+ certifications, verified marketplace modules, and high community rating.',
    descriptionAr: 'يتطلب شهادتين معتمدتين، ونشر وحدات في المتجر، وتقييم مجتمعي مرتفع.'
  },
  Platinum: {
    name: 'Platinum Strategic Partner',
    nameAr: 'الشريك البلاتيني الاستراتيجي',
    developerShare: 0.90,
    dmsShare: 0.10,
    minimumPoints: 7000,
    description: 'Top enterprise solution partners co-selling directly with DMS sales executives.',
    descriptionAr: 'كبار شركاء الحلول المؤسسية بالتعاون التسويقي المباشر مع إدارة مبيعات DMS.'
  }
};

export const SANDBOX_LIMITS = {
  defaultHourlyRateLimit: 10000,
  maxDailyAiInferences: 100,
  simulatedNetworkLatencyMs: 42
};
