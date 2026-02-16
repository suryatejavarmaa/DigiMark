/**
 * Ads Service
 * Frontend service layer for ads campaign functionality
 * 
 * This is MODULAR - designed for easy swap to real Meta/Google APIs later
 * Currently uses AI-generated strategies and manual export
 */

import type {
    AdsCampaign,
    CampaignStrategy,
    AdCopyVariation,
    ExportGuide,
    GenerateStrategyResponse,
    GenerateAdCopyResponse,
    SaveCampaignResponse,
    GetCampaignsResponse,
    ExportGuideResponse,
    CampaignAnalytics
} from '../types/ads';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

/**
 * Generate AI-powered campaign strategy
 */
export async function generateCampaignStrategy(params: {
    objective: string;
    audience: string;
    platform: string;
    budget?: { daily: number };
    duration?: string;
    businessInfo?: string;
}): Promise<GenerateStrategyResponse> {
    try {
        const response = await fetch(`${API_BASE}/api/ads/generate-strategy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[AdsService] Error generating strategy:', error);
        return { success: false, error: (error as Error).message };
    }
}

/**
 * Generate AI-powered ad copy variations
 */
export async function generateAdCopy(params: {
    platform: string;
    objective: string;
    audience: string;
    productInfo?: string;
    tone?: string;
}): Promise<GenerateAdCopyResponse> {
    try {
        const response = await fetch(`${API_BASE}/api/ads/generate-copy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[AdsService] Error generating ad copy:', error);
        return { success: false, error: (error as Error).message };
    }
}

/**
 * Save a campaign to Firestore
 */
export async function saveCampaign(
    userId: string,
    campaign: Partial<AdsCampaign>
): Promise<SaveCampaignResponse> {
    try {
        const response = await fetch(`${API_BASE}/api/ads/campaigns`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, campaign })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[AdsService] Error saving campaign:', error);
        return { success: false, error: (error as Error).message };
    }
}

/**
 * Get all campaigns for a user
 */
export async function getCampaigns(userId: string): Promise<GetCampaignsResponse> {
    try {
        const response = await fetch(`${API_BASE}/api/ads/campaigns/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[AdsService] Error fetching campaigns:', error);
        return { success: false, error: (error as Error).message };
    }
}

/**
 * Get a single campaign
 */
export async function getCampaign(
    userId: string,
    campaignId: string
): Promise<{ success: boolean; campaign?: AdsCampaign; error?: string }> {
    try {
        const response = await fetch(`${API_BASE}/api/ads/campaigns/${userId}/${campaignId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[AdsService] Error fetching campaign:', error);
        return { success: false, error: (error as Error).message };
    }
}

/**
 * Update a campaign
 */
export async function updateCampaign(
    userId: string,
    campaignId: string,
    updates: Partial<AdsCampaign>
): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch(`${API_BASE}/api/ads/campaigns/${userId}/${campaignId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[AdsService] Error updating campaign:', error);
        return { success: false, error: (error as Error).message };
    }
}

/**
 * Delete a campaign
 */
export async function deleteCampaign(
    userId: string,
    campaignId: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch(`${API_BASE}/api/ads/campaigns/${userId}/${campaignId}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[AdsService] Error deleting campaign:', error);
        return { success: false, error: (error as Error).message };
    }
}

/**
 * Get export guide for a platform
 */
export async function getExportGuide(
    platform: string,
    campaign: Partial<AdsCampaign>
): Promise<ExportGuideResponse> {
    try {
        const response = await fetch(`${API_BASE}/api/ads/export-guide`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ platform, campaign })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[AdsService] Error getting export guide:', error);
        return { success: false, error: (error as Error).message };
    }
}

/**
 * Save analytics data (manual entry)
 */
export async function saveAnalytics(
    userId: string,
    campaignId: string,
    metrics: CampaignAnalytics
): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch(`${API_BASE}/api/ads/analytics/${userId}/${campaignId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ metrics })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[AdsService] Error saving analytics:', error);
        return { success: false, error: (error as Error).message };
    }
}

/**
 * Export campaign data to clipboard (formatted for platform)
 */
export function copyToClipboard(text: string): boolean {
    try {
        navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('[AdsService] Error copying to clipboard:', error);
        return false;
    }
}

/**
 * Format campaign for export
 */
export function formatCampaignForExport(campaign: AdsCampaign, platform: string): string {
    const adCopy = campaign.adCopy?.variations?.[campaign.adCopy?.selectedVariation || 0];

    const sections = [
        `📢 Campaign: ${campaign.name}`,
        `🎯 Objective: ${campaign.objective}`,
        ``,
        `📝 AD COPY`,
        `Headline: ${adCopy?.headline || 'N/A'}`,
        `Description: ${adCopy?.description || 'N/A'}`,
        `CTA: ${adCopy?.cta || 'N/A'}`,
        ``,
        `👥 TARGETING`,
        `Audience: ${campaign.audience}`,
        `Age: ${campaign.targeting?.ageRange || 'All ages'}`,
        `Interests: ${campaign.targeting?.interests?.join(', ') || 'N/A'}`,
        ``,
        `💰 BUDGET`,
        `Daily: $${campaign.budget?.daily || 0}`,
        `Duration: ${campaign.schedule?.duration || 'N/A'}`,
        ``,
        `Generated by DigiMark AI`
    ];

    return sections.join('\n');
}
