import { ArrowLeft, Copy, Check, ExternalLink, Facebook, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getExportGuide, formatCampaignForExport, updateCampaign } from '../../services/AdsService';
import type { AdsCampaign, ExportGuide, AdsPlatform } from '../../types/ads';

interface AdsExportGuideProps {
    onNavigate: (screen: string, data?: any) => void;
    userId: string;
    campaign: AdsCampaign;
}

export function AdsExportGuide({ onNavigate, userId, campaign }: AdsExportGuideProps) {
    const [selectedPlatform, setSelectedPlatform] = useState<AdsPlatform>(campaign.platform || 'facebook');
    const [guide, setGuide] = useState<ExportGuide | null>(null);
    const [loading, setLoading] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const platforms: { id: AdsPlatform; name: string; icon: string; color: string }[] = [
        { id: 'facebook', name: 'Facebook', icon: '📘', color: '#1877F2' },
        { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0A66C2' },
        { id: 'google', name: 'Google Ads', icon: '🔍', color: '#4285F4' },
        { id: 'twitter', name: 'X (Twitter)', icon: '🐦', color: '#000000' },
    ];

    useEffect(() => {
        loadGuide();
    }, [selectedPlatform]);

    const loadGuide = async () => {
        setLoading(true);
        try {
            const result = await getExportGuide(selectedPlatform, campaign);
            if (result.success && result.guide) {
                setGuide(result.guide);
            }
        } catch (error) {
            console.error('Error loading export guide:', error);
        }
        setLoading(false);
    };

    const handleCopy = async (text: string, field: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (error) {
            console.error('Copy failed:', error);
        }
    };

    const handleMarkExported = async () => {
        if (!campaign.id) return;
        try {
            await updateCampaign(userId, campaign.id, {
                status: 'exported',
                exportedAt: new Date().toISOString(),
                exportedTo: [...(campaign.exportedTo || []), selectedPlatform]
            });
            onNavigate('ads-campaigns-list');
        } catch (error) {
            console.error('Error marking as exported:', error);
        }
    };

    const adCopy = campaign.adCopy?.variations?.[campaign.adCopy?.selectedVariation || 0];

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
                    Export Campaign
                </h1>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                {/* Platform Selection */}
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
                        Select Platform
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {platforms.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => setSelectedPlatform(p.id)}
                                style={{
                                    padding: '14px',
                                    borderRadius: '12px',
                                    border: selectedPlatform === p.id ? '2px solid #8366FF' : '2px solid #E5E7EB',
                                    background: selectedPlatform === p.id ? '#F5F3FF' : '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <span style={{ fontSize: '22px' }}>{p.icon}</span>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#000' }}>{p.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                border: '3px solid #F3F4F6',
                                borderTop: '3px solid #8366FF',
                                borderRadius: '50%',
                                margin: '0 auto',
                                animation: 'spin 1s linear infinite'
                            }}
                        />
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : (
                    <>
                        {/* Ad Copy Section */}
                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
                                Ad Copy (Copy to Platform)
                            </h3>

                            {/* Headline */}
                            <div
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    marginBottom: '12px',
                                    border: '1px solid #F3F4F6'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>HEADLINE</span>
                                    <button
                                        onClick={() => handleCopy(adCopy?.headline || campaign.strategy?.keyMessages?.[0] || 'Your headline', 'headline')}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            background: copiedField === 'headline' ? '#10B981' : '#8366FF',
                                            color: '#FFFFFF',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}
                                    >
                                        {copiedField === 'headline' ? <Check size={14} /> : <Copy size={14} />}
                                        {copiedField === 'headline' ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                                <p style={{ fontSize: '15px', color: '#000', fontWeight: 600 }}>
                                    {adCopy?.headline || campaign.strategy?.keyMessages?.[0] || 'Transform Your Marketing Today'}
                                </p>
                            </div>

                            {/* Description */}
                            <div
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    marginBottom: '12px',
                                    border: '1px solid #F3F4F6'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>DESCRIPTION</span>
                                    <button
                                        onClick={() => handleCopy(adCopy?.description || campaign.strategy?.overview || 'Your description', 'description')}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            background: copiedField === 'description' ? '#10B981' : '#8366FF',
                                            color: '#FFFFFF',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}
                                    >
                                        {copiedField === 'description' ? <Check size={14} /> : <Copy size={14} />}
                                        {copiedField === 'description' ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                                <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
                                    {adCopy?.description || campaign.strategy?.overview || 'Your ad description here'}
                                </p>
                            </div>

                            {/* CTA */}
                            <div
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    border: '1px solid #F3F4F6'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>CALL TO ACTION</span>
                                </div>
                                <p style={{ fontSize: '14px', color: '#8366FF', fontWeight: 600 }}>
                                    {adCopy?.cta || 'Learn More'}
                                </p>
                            </div>
                        </div>

                        {/* Targeting Section */}
                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
                                Targeting Settings
                            </h3>
                            <div
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    border: '1px solid #F3F4F6'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>RECOMMENDED TARGETING</span>
                                    <button
                                        onClick={() => handleCopy(guide?.targeting || '', 'targeting')}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            background: copiedField === 'targeting' ? '#10B981' : '#8366FF',
                                            color: '#FFFFFF',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}
                                    >
                                        {copiedField === 'targeting' ? <Check size={14} /> : <Copy size={14} />}
                                        {copiedField === 'targeting' ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                                <pre style={{
                                    fontSize: '13px',
                                    color: '#374151',
                                    lineHeight: '1.6',
                                    whiteSpace: 'pre-wrap',
                                    fontFamily: 'Outfit, sans-serif',
                                    margin: 0
                                }}>
                                    {guide?.targeting || `Age: ${campaign.targeting?.ageRange || '25-54'}
Interests: ${campaign.targeting?.interests?.join(', ') || 'marketing, business'}
Audience: ${campaign.audience}`}
                                </pre>
                            </div>
                        </div>

                        {/* Steps Section */}
                        {guide?.steps && (
                            <div style={{ marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
                                    How to Create on {platforms.find(p => p.id === selectedPlatform)?.name}
                                </h3>
                                <div
                                    style={{
                                        background: '#FFFFFF',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        border: '1px solid #F3F4F6'
                                    }}
                                >
                                    {guide.steps.map((step, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                display: 'flex',
                                                gap: '12px',
                                                paddingBottom: index < guide.steps.length - 1 ? '12px' : 0,
                                                marginBottom: index < guide.steps.length - 1 ? '12px' : 0,
                                                borderBottom: index < guide.steps.length - 1 ? '1px solid #F3F4F6' : 'none'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    background: '#8366FF',
                                                    color: '#FFFFFF',
                                                    fontSize: '12px',
                                                    fontWeight: 700,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0
                                                }}
                                            >
                                                {index + 1}
                                            </div>
                                            <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.5' }}>
                                                {step}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Copy All Button */}
                        <button
                            onClick={() => handleCopy(formatCampaignForExport(campaign, selectedPlatform), 'all')}
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '12px',
                                border: '2px solid #8366FF',
                                background: copiedField === 'all' ? '#8366FF' : '#FFFFFF',
                                color: copiedField === 'all' ? '#FFFFFF' : '#8366FF',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginBottom: '16px'
                            }}
                        >
                            {copiedField === 'all' ? <Check size={18} /> : <Copy size={18} />}
                            {copiedField === 'all' ? 'Copied All!' : 'Copy All Campaign Details'}
                        </button>
                    </>
                )}
            </div>

            {/* Bottom Button */}
            <div
                style={{
                    padding: '20px',
                    background: '#FFFFFF',
                    borderTop: '1px solid #F3F4F6',
                    boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.04)'
                }}
            >
                <button
                    onClick={handleMarkExported}
                    style={{
                        width: '100%',
                        padding: '16px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
                    }}
                >
                    <Check size={18} />
                    Mark as Exported & Done
                </button>
            </div>
        </div>
    );
}
