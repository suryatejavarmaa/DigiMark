/**
 * Ads Campaign Types
 * TypeScript interfaces for the ads campaign feature
 * These are designed to be flexible for future real API integration
 */

// Campaign objective types
export type CampaignObjective =
    | 'awareness'
    | 'traffic'
    | 'engagement'
    | 'leads'
    | 'conversions'
    | 'app_installs';

// Platform types
export type AdsPlatform = 'facebook' | 'linkedin' | 'google' | 'twitter';

// Campaign status
export type CampaignStatus = 'draft' | 'ready' | 'exported' | 'active' | 'paused' | 'completed';

// Targeting configuration
export interface AdsTargeting {
    ageRange: string;
    gender?: 'all' | 'male' | 'female';
    interests: string[];
    behaviors: string[];
    locations?: string[];
    languages?: string[];
}

// Budget configuration
export interface AdsBudget {
    daily: number;
    total?: number;
    currency: string;
}

// Ad copy variation
export interface AdCopyVariation {
    headline: string;
    description: string;
    cta: string;
}

// AI-generated strategy
export interface CampaignStrategy {
    overview: string;
    keyMessages: string[];
    targeting: AdsTargeting;
    bestTimes: string[];
    expectedMetrics: {
        impressions: string;
        clicks: string;
        ctr: string;
        estimatedLeads: string;
    };
    abTestSuggestions: string[];
}

// Manual analytics entry
export interface CampaignAnalytics {
    impressions?: number;
    clicks?: number;
    ctr?: number;
    leads?: number;
    conversions?: number;
    spend?: number;
    costPerClick?: number;
    costPerLead?: number;
    costPerConversion?: number;
    roi?: number;
    lastUpdated?: string;
}

// Complete campaign object
export interface AdsCampaign {
    id?: string;
    userId: string;
    name: string;
    objective: CampaignObjective;
    platform: AdsPlatform;
    audience: string;
    budget: AdsBudget;
    schedule: {
        startDate: string;
        endDate?: string;
        duration: string;
    };
    adCopy: {
        selectedVariation: number;
        variations: AdCopyVariation[];
    };
    strategy: CampaignStrategy;
    targeting: AdsTargeting;
    analytics?: CampaignAnalytics;
    status: CampaignStatus;
    createdAt?: any;
    updatedAt?: any;
    exportedAt?: string;
    exportedTo?: AdsPlatform[];
}

// Export guide for a platform
export interface ExportGuide {
    title: string;
    steps: string[];
    targeting: string;
    adCopy: AdCopyVariation;
}

// API response types
export interface GenerateStrategyResponse {
    success: boolean;
    strategy?: CampaignStrategy;
    error?: string;
}

export interface GenerateAdCopyResponse {
    success: boolean;
    adCopy?: {
        variations: AdCopyVariation[];
    };
    error?: string;
}

export interface SaveCampaignResponse {
    success: boolean;
    campaignId?: string;
    error?: string;
}

export interface GetCampaignsResponse {
    success: boolean;
    campaigns?: AdsCampaign[];
    error?: string;
}

export interface ExportGuideResponse {
    success: boolean;
    guide?: ExportGuide;
    error?: string;
}
