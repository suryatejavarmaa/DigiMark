import { ArrowLeft, Save, TrendingUp, MousePointer, Eye, Users, DollarSign, Target, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { saveAnalytics } from '../../services/AdsService';
import type { AdsCampaign, CampaignAnalytics } from '../../types/ads';

interface AdsAnalyticsDashboardProps {
    onNavigate: (screen: string, data?: any) => void;
    userId: string;
    campaign: AdsCampaign;
}

export function AdsAnalyticsDashboard({ onNavigate, userId, campaign }: AdsAnalyticsDashboardProps) {
    const [metrics, setMetrics] = useState<CampaignAnalytics>({
        impressions: campaign.analytics?.impressions || 0,
        clicks: campaign.analytics?.clicks || 0,
        leads: campaign.analytics?.leads || 0,
        conversions: campaign.analytics?.conversions || 0,
        spend: campaign.analytics?.spend || 0,
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Calculate derived metrics
    const ctr = metrics.impressions && metrics.impressions > 0
        ? ((metrics.clicks || 0) / metrics.impressions * 100).toFixed(2)
        : '0.00';
    const costPerClick = metrics.clicks && metrics.clicks > 0
        ? ((metrics.spend || 0) / metrics.clicks).toFixed(2)
        : '0.00';
    const costPerLead = metrics.leads && metrics.leads > 0
        ? ((metrics.spend || 0) / metrics.leads).toFixed(2)
        : '0.00';
    const conversionRate = metrics.clicks && metrics.clicks > 0
        ? ((metrics.conversions || 0) / metrics.clicks * 100).toFixed(2)
        : '0.00';

    const handleSave = async () => {
        if (!campaign.id) return;
        setSaving(true);
        try {
            const fullMetrics: CampaignAnalytics = {
                ...metrics,
                ctr: parseFloat(ctr),
                costPerClick: parseFloat(costPerClick),
                costPerLead: parseFloat(costPerLead),
                lastUpdated: new Date().toISOString()
            };
            await saveAnalytics(userId, campaign.id, fullMetrics);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error('Error saving analytics:', error);
        }
        setSaving(false);
    };

    const metricCards = [
        {
            label: 'Impressions',
            key: 'impressions',
            icon: Eye,
            color: '#3B82F6',
            description: 'Total ad views'
        },
        {
            label: 'Clicks',
            key: 'clicks',
            icon: MousePointer,
            color: '#8B5CF6',
            description: 'Total clicks on ad'
        },
        {
            label: 'Leads',
            key: 'leads',
            icon: Users,
            color: '#10B981',
            description: 'Form submissions / signups'
        },
        {
            label: 'Conversions',
            key: 'conversions',
            icon: Target,
            color: '#F59E0B',
            description: 'Completed goals'
        },
        {
            label: 'Spend ($)',
            key: 'spend',
            icon: DollarSign,
            color: '#EF4444',
            description: 'Total amount spent'
        },
    ];

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
                fontFamily: 'Outfit, sans-serif',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Header */}
            <div
                style={{
                    background: '#FFFFFF',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid #F3F4F6',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
            >
                <button
                    onClick={() => onNavigate('ads-campaigns-list')}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: '#F9FAFB',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <ArrowLeft size={20} style={{ color: '#000000' }} />
                </button>
                <h1
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#000000',
                        marginRight: '40px'
                    }}
                >
                    Campaign Analytics
                </h1>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                {/* Campaign Info */}
                <div
                    style={{
                        background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '24px',
                        color: '#FFFFFF'
                    }}
                >
                    <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>
                        {campaign.name || `${campaign.objective} Campaign`}
                    </h2>
                    <p style={{ fontSize: '13px', opacity: 0.9 }}>
                        {campaign.platform?.charAt(0).toUpperCase() + campaign.platform?.slice(1)} • {campaign.audience}
                    </p>
                </div>

                {/* Info Banner */}
                <div
                    style={{
                        background: '#FEF3C7',
                        border: '1px solid #FCD34D',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        marginBottom: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}
                >
                    <RefreshCw size={18} style={{ color: '#D97706', flexShrink: 0 }} />
                    <p style={{ fontSize: '13px', color: '#92400E', lineHeight: '1.4' }}>
                        <strong>Manual Entry Mode:</strong> Enter your metrics from the ad platform. Real-time sync requires API approval.
                    </p>
                </div>

                {/* Metric Input Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                    {metricCards.map(({ label, key, icon: Icon, color, description }) => (
                        <div
                            key={key}
                            style={{
                                background: '#FFFFFF',
                                borderRadius: '16px',
                                padding: '16px 20px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                                border: '1px solid #F3F4F6'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '12px',
                                            background: `${color}15`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Icon size={20} style={{ color }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '14px', fontWeight: 600, color: '#000' }}>{label}</p>
                                        <p style={{ fontSize: '11px', color: '#6B7280' }}>{description}</p>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    min="0"
                                    step={key === 'spend' ? '0.01' : '1'}
                                    value={metrics[key as keyof CampaignAnalytics] || ''}
                                    onChange={(e) => setMetrics(prev => ({
                                        ...prev,
                                        [key]: key === 'spend' ? parseFloat(e.target.value) || 0 : parseInt(e.target.value) || 0
                                    }))}
                                    style={{
                                        width: '100px',
                                        padding: '10px 12px',
                                        borderRadius: '10px',
                                        border: '2px solid #E5E7EB',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        textAlign: 'right',
                                        outline: 'none',
                                        fontFamily: 'Outfit, sans-serif'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#8366FF'}
                                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Calculated Metrics */}
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000', marginBottom: '16px' }}>
                    Calculated Metrics
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                    <div
                        style={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            padding: '16px',
                            border: '1px solid #F3F4F6',
                            textAlign: 'center'
                        }}
                    >
                        <p style={{ fontSize: '24px', fontWeight: 800, color: '#8366FF' }}>{ctr}%</p>
                        <p style={{ fontSize: '12px', color: '#6B7280' }}>CTR</p>
                    </div>
                    <div
                        style={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            padding: '16px',
                            border: '1px solid #F3F4F6',
                            textAlign: 'center'
                        }}
                    >
                        <p style={{ fontSize: '24px', fontWeight: 800, color: '#10B981' }}>${costPerClick}</p>
                        <p style={{ fontSize: '12px', color: '#6B7280' }}>Cost/Click</p>
                    </div>
                    <div
                        style={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            padding: '16px',
                            border: '1px solid #F3F4F6',
                            textAlign: 'center'
                        }}
                    >
                        <p style={{ fontSize: '24px', fontWeight: 800, color: '#F59E0B' }}>${costPerLead}</p>
                        <p style={{ fontSize: '12px', color: '#6B7280' }}>Cost/Lead</p>
                    </div>
                    <div
                        style={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            padding: '16px',
                            border: '1px solid #F3F4F6',
                            textAlign: 'center'
                        }}
                    >
                        <p style={{ fontSize: '24px', fontWeight: 800, color: '#EF4444' }}>{conversionRate}%</p>
                        <p style={{ fontSize: '12px', color: '#6B7280' }}>Conv. Rate</p>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div
                style={{
                    padding: '20px',
                    background: '#FFFFFF',
                    borderTop: '1px solid #F3F4F6',
                    boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.04)'
                }}
            >
                <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                        width: '100%',
                        padding: '16px',
                        borderRadius: '12px',
                        background: saved
                            ? 'linear-gradient(135deg, #10B981 0%, #34D399 100%)'
                            : 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        cursor: saving ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 8px 24px rgba(131, 102, 255, 0.4)',
                        transition: 'all 0.2s'
                    }}
                >
                    <Save size={18} />
                    {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Analytics'}
                </button>
            </div>
        </div>
    );
}
