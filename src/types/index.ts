export type Language = 'ar' | 'en';
export type Theme = 'dark' | 'light';

export type UserRole = 'developer' | 'partner' | 'customer_it' | 'admin';
export type PartnerTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface UserProfile {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  avatar: string;
  role: UserRole;
  company: string;
  companyAr: string;
  tier: PartnerTier;
  points: number;
  certifications: string[];
  skills: string[];
  joinedDate: string;
}

export type ProductLine = 'industrial_erp' | 'hms' | 'common';

export interface ApiEndpoint {
  id: string;
  title: string;
  titleAr: string;
  product: ProductLine;
  category: string;
  categoryAr: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  descriptionAr: string;
  version: string;
  rateLimit: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
    descriptionAr: string;
    in: 'path' | 'query' | 'header' | 'body';
  }[];
  requestBodyExample?: string;
  responseExample: Record<string, any>;
  errorCodes: {
    code: number;
    description: string;
    descriptionAr: string;
  }[];
}

export interface ApiKeyItem {
  id: string;
  name: string;
  keyMasked: string;
  rawKey: string;
  environment: 'sandbox' | 'production';
  status: 'active' | 'pending_approval' | 'revoked';
  createdAt: string;
  lastUsed: string;
  requestsCount: number;
  rateLimit: number;
  projectedRps?: number;
  justification?: string;
}

export interface QueryPreset {
  id: string;
  title: string;
  titleAr: string;
  product: ProductLine;
  description: string;
  descriptionAr: string;
  sqlQuery: string;
  executionTimeMs: number;
  rowsCount: number;
  results: Record<string, any>[];
  chartConfig?: {
    xAxisKey: string;
    yAxisKeys: { key: string; label: string; labelAr: string; color: string }[];
    type: 'bar' | 'line' | 'area';
  };
}

export interface AiModelItem {
  id: string;
  name: string;
  nameAr: string;
  product: ProductLine;
  version: string;
  description: string;
  descriptionAr: string;
  accuracy: string;
  latencyMs: number;
  sampleInput: Record<string, any>;
  sampleOutput: {
    prediction: string;
    predictionAr: string;
    confidenceScores: { label: string; labelAr: string; score: number }[];
    recommendations: string[];
    recommendationsAr: string[];
    metadata: Record<string, any>;
  };
}

export interface MarketplaceListing {
  id: string;
  title: string;
  titleAr: string;
  shortDesc: string;
  shortDescAr: string;
  product: ProductLine;
  category: 'reports' | 'integrations' | 'ai_addons' | 'bi_dashboards';
  categoryAr: string;
  price: number; // 0 for free, in USD (with EGP equivalent)
  currency: string;
  author: {
    name: string;
    company: string;
    isCertified: boolean;
    tier: PartnerTier;
    avatar?: string;
  };
  rating: number;
  reviewsCount: number;
  installsCount: number;
  compatibility: {
    minVersion: string;
    testedOn: string;
  };
  status: 'approved' | 'in_review' | 'draft' | 'rejected';
  rejectionReason?: string;
  featured?: boolean;
  features: string[];
  featuresAr: string[];
  tags: string[];
}

export interface CertificationTrack {
  id: string;
  title: string;
  titleAr: string;
  level: 'Associate' | 'Professional' | 'Master';
  description: string;
  descriptionAr: string;
  durationHours: number;
  modulesCount: number;
  courses: {
    title: string;
    titleAr: string;
    duration: string;
    completed: boolean;
  }[];
  quizQuestions: {
    id: number;
    question: string;
    questionAr: string;
    options: string[];
    optionsAr: string[];
    correctIndex: number;
  }[];
}

export interface ForumQuestion {
  id: string;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  codeSnippet?: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
    tier: PartnerTier;
  };
  product: ProductLine;
  tags: string[];
  votes: number;
  views: number;
  answersCount: number;
  isSolved: boolean;
  createdAt: string;
  answers: {
    id: string;
    author: {
      name: string;
      role: string;
      isDmsStaff?: boolean;
    };
    content: string;
    contentAr: string;
    votes: number;
    isAccepted?: boolean;
    createdAt: string;
  }[];
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: 'api' | 'sandbox' | 'marketplace' | 'billing' | 'security';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved';
  product: ProductLine;
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    sender: string;
    isStaff: boolean;
    message: string;
    timestamp: string;
  }[];
}

export interface RewardItem {
  id: string;
  title: string;
  titleAr: string;
  pointsCost: number;
  description: string;
  descriptionAr: string;
  category: 'cloud' | 'license' | 'support' | 'tier';
}
