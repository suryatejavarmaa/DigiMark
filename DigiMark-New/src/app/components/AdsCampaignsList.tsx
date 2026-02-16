import { ArrowLeft, Plus, Trash2, BarChart3, ExternalLink, ChevronRight, Target, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCampaigns, deleteCampaign } from '../../services/AdsService';
import type { AdsCampaign } from '../../types/ads';

interface AdsCampaignsListProps {
    onNavigate: (screen: string, data?: any) => void;
    userId: string;
}

export function AdsCampaignsList({ onNavigate, userId }: AdsCampaignsListProps) {
    const [campaigns, setCampaigns] = useState<AdsCampaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        loadCampaigns();
    }, [userId]);

    const loadCampaigns = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const result = await getCampaigns(userId);
            if (result.success && result.campaigns) {
                setCampaigns(result.campaigns);
            }
        } catch (error) {
            console.error('Error loading campaigns:', error);
        }
        setLoading(false);
    };

    const handleDelete = async (campaignId: string) => {
        try {
            const result = await deleteCampaign(userId, campaignId);
            if (result.success) {
                setCampaigns(prev => prev.filter(c => c.id !== campaignId));
                setDeleteConfirm(null);
            }
        } catch (error) {
            console.error('Error deleting campaign:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return { bg: '#ECFDF5', text: '#059669' };
            case 'ready': return { bg: '#EFF6FF', text: '#2563EB' };
            case 'exported': return { bg: '#F5F3FF', text: '#7C3AED' };
            case 'paused': return { bg: '#FEF3C7', text: '#D97706' };
            case 'completed': return { bg: '#F3F4F6', text: '#6B7280' };
            default: return { bg: '#F9FAFB', text: '#9CA3AF' };
        }
    };

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'facebook': return '📘';
            case 'linkedin': return '💼';
            case 'google': return '🔍';
            case 'twitter': return '🐦';
            default: return '📣';
        }
    };

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
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #F3F4F6',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
            >
                <button
                    onClick={() => onNavigate('dashboard')}
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
                <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#000000' }}>
                    My Campaigns
                </h1>
                <button
                    onClick={() => onNavigate('ads-campaign-objective')}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(131, 102, 255, 0.3)'
                    }}
                >
                    <Plus size={20} style={{ color: '#FFFFFF' }} />
                </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                border: '3px solid #F3F4F6',
                                borderTop: '3px solid #8366FF',
                                borderRadius: '50%',
                                margin: '0 auto 16px',
                                animation: 'spin 1s linear infinite'
                            }}
                        />
                        <p style={{ color: '#6B7280' }}>Loading campaigns...</p>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : campaigns.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: '#F3F4F6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px'
                            }}
                        >
                            <Target size={32} style={{ color: '#9CA3AF' }} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#000', marginBottom: '8px' }}>
                            No Campaigns Yet
                        </h3>
                        <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
                            Create your first AI-powered ad campaign
                        </p>
                        <button
                            onClick={() => onNavigate('ads-campaign-objective')}
                            style={{
                                padding: '14px 28px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                                border: 'none',
                                fontSize: '15px',
                                fontWeight: 600,
                                color: '#FFFFFF',
                                cursor: 'pointer',
                                boxShadow: '0 8px 24px rgba(131, 102, 255, 0.3)'
                            }}
                        >
                            Create Campaign
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {campaigns.map((campaign) => {
                            const statusStyle = getStatusColor(campaign.status);
                            return (
                                <div
                                    key={campaign.id}
                                    style={{
                                        background: '#FFFFFF',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                                        border: '1px solid #F3F4F6',
                                        position: 'relative'
                                    }}
                                >
                                    {/* Delete confirmation overlay */}
                                    {deleteConfirm === campaign.id && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'rgba(255, 255, 255, 0.95)',
                                                borderRadius: '16px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '16px',
                                                zIndex: 10
                                            }}
                                        >
                                            <p style={{ fontSize: '14px', color: '#374151', textAlign: 'center' }}>
                                                Delete this campaign?
                                            </p>
                                            <div style={{ display: 'flex', gap: '12px' }}>
                                                <button
                                                    onClick={() => setDeleteConfirm(null)}
                                                    style={{
                                                        padding: '10px 20px',
                                                        borderRadius: '8px',
                                                        border: '1px solid #E5E7EB',
                                                        background: '#FFFFFF',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(campaign.id!)}
                                                    style={{
                                                        padding: '10px 20px',
                                                        borderRadius: '8px',
                                                        border: 'none',
                                                        background: '#EF4444',
                                                        color: '#FFFFFF',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Campaign header */}
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ fontSize: '28px' }}>{getPlatformIcon(campaign.platform)}</span>
                                            <div>
                                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000', marginBottom: '4px' }}>
                                                    {campaign.name || `${campaign.objective} Campaign`}
                                                </h3>
                                                <span
                                                    style={{
                                                        fontSize: '11px',
                                                        fontWeight: 600,
                                                        padding: '4px 10px',
                                                        borderRadius: '20px',
                                                        background: statusStyle.bg,
                                                        color: statusStyle.text,
                                                        textTransform: 'uppercase'
                                                    }}
                                                >
                                                    {campaign.status}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setDeleteConfirm(campaign.id!)}
                                            style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                background: '#FEF2F2',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <Trash2 size={16} style={{ color: '#EF4444' }} />
                                        </button>
                                    </div>

                                    {/* Campaign details */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <DollarSign size={14} style={{ color: '#6B7280' }} />
                                            <span style={{ fontSize: '13px', color: '#6B7280' }}>
                                                ${campaign.budget?.daily || 0}/day
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Calendar size={14} style={{ color: '#6B7280' }} />
                                            <span style={{ fontSize: '13px', color: '#6B7280' }}>
                                                {campaign.schedule?.duration || 'N/A'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button
                                            onClick={() => onNavigate('ads-analytics', { campaignId: campaign.id, campaign })}
                                            style={{
                                                flex: 1,
                                                padding: '12px',
                                                borderRadius: '10px',
                                                border: '1px solid #E5E7EB',
                                                background: '#FFFFFF',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                cursor: 'pointer',
                                                fontSize: '13px',
                                                fontWeight: 600,
                                                color: '#374151'
                                            }}
                                        >
                                            <BarChart3 size={16} />
                                            Analytics
                                        </button>
                                        <button
                                            onClick={() => onNavigate('ads-export', { campaignId: campaign.id, campaign })}
                                            style={{
                                                flex: 1,
                                                padding: '12px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                cursor: 'pointer',
                                                fontSize: '13px',
                                                fontWeight: 600,
                                                color: '#FFFFFF'
                                            }}
                                        >
                                            <ExternalLink size={16} />
                                            Export
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
