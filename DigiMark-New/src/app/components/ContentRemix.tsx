import { ArrowLeft, Link2, RefreshCw, Linkedin, Twitter, Facebook, Instagram, Sparkles, Copy, Check, Send, Calendar } from 'lucide-react';
import { useState } from 'react';

interface ContentRemixProps {
    onNavigate: (screen: string) => void;
    userId?: string | null;
    companyName?: string;
    companySummary?: string;
}

const platforms = [
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: '#000000', bgColor: '#F5F5F5' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2', bgColor: '#E8F1FF' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2', bgColor: '#F0F2F5' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F', bgColor: '#F8F8F8' }
];

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';

export function ContentRemix({ onNavigate, userId, companyName, companySummary }: ContentRemixProps) {
    const [inputMode, setInputMode] = useState<'url' | 'text'>('text'); // Default to text paste
    const [postUrl, setPostUrl] = useState('');
    const [manualContent, setManualContent] = useState(''); // For direct text paste
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractedContent, setExtractedContent] = useState<{
        content: string;
        author: string;
        platform: string;
        imageUrl?: string;
    } | null>(null);

    const [selectedTarget, setSelectedTarget] = useState<string>('linkedin');
    const [isRemixing, setIsRemixing] = useState(false);
    const [remixedContent, setRemixedContent] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    // Detect platform from URL
    const detectPlatform = (url: string) => {
        if (url.includes('linkedin.com')) return 'linkedin';
        if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
        if (url.includes('facebook.com') || url.includes('fb.com')) return 'facebook';
        if (url.includes('instagram.com')) return 'instagram';
        return null;
    };

    const detectedPlatform = detectPlatform(postUrl);

    // Extract content from URL
    const handleExtract = async () => {
        if (!postUrl.trim()) return;

        setIsExtracting(true);
        setExtractedContent(null);
        setRemixedContent('');

        try {
            const response = await fetch(`${API_BASE}/extract-post-content`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postUrl, userId })
            });

            const data = await response.json();

            if (data.success) {
                setExtractedContent({
                    content: data.content,
                    author: data.author,
                    platform: data.platform,
                    imageUrl: data.imageUrl
                });

                // Auto-select a different target platform
                if (data.platform !== 'twitter') {
                    setSelectedTarget('twitter');
                } else {
                    setSelectedTarget('linkedin');
                }
            } else {
                alert(data.error || 'Failed to extract content');
            }
        } catch (error) {
            console.error('Extract error:', error);
            alert('Failed to extract content. Please check the URL and try again.');
        } finally {
            setIsExtracting(false);
        }
    };

    // Use manually pasted content
    const handleUseManualContent = () => {
        if (!manualContent.trim()) return;

        setExtractedContent({
            content: manualContent.trim(),
            author: '',
            platform: 'other',
            imageUrl: ''
        });
        setRemixedContent('');
    };

    // Remix content for target platform
    const handleRemix = async () => {
        if (!extractedContent?.content) return;

        setIsRemixing(true);

        try {
            const response = await fetch(`${API_BASE}/remix-content`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    originalContent: extractedContent.content,
                    sourcePlatform: extractedContent.platform,
                    targetPlatform: selectedTarget,
                    userId,
                    companyName,
                    companySummary
                })
            });

            const data = await response.json();

            if (data.success) {
                setRemixedContent(data.remixedContent);
            } else {
                alert(data.error || 'Failed to remix content');
            }
        } catch (error) {
            console.error('Remix error:', error);
            alert('Failed to remix content. Please try again.');
        } finally {
            setIsRemixing(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(remixedContent);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handlePublish = () => {
        // Save content for publishing flow
        localStorage.setItem('publishCaption', remixedContent);
        localStorage.setItem('selectedPlatforms', JSON.stringify([selectedTarget]));
        localStorage.removeItem('publishImageUrl');
        onNavigate('preview-post');
    };

    const handleSchedule = () => {
        localStorage.setItem('publishCaption', remixedContent);
        localStorage.setItem('selectedPlatforms', JSON.stringify([selectedTarget]));
        localStorage.removeItem('publishImageUrl');
        onNavigate('schedule-picker');
    };

    const getPlatformIcon = (platformId: string) => {
        const p = platforms.find(pl => pl.id === platformId);
        return p ? p.icon : Link2;
    };

    const getPlatformColor = (platformId: string) => {
        const p = platforms.find(pl => pl.id === platformId);
        return p ? p.color : '#6B7280';
    };

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                background: '#FFFFFF',
                fontFamily: 'Outfit, sans-serif'
            }}
        >
            {/* Header */}
            <div
                className="px-6 py-6"
                style={{
                    background: '#FFFFFF',
                    borderBottom: '1px solid #F3F4F6'
                }}
            >
                <div className="flex items-center gap-4">
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
                    <div>
                        <h1
                            style={{
                                fontSize: '24px',
                                fontWeight: 700,
                                color: '#000000',
                                margin: 0
                            }}
                        >
                            Content Remix
                        </h1>
                        <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
                            Transform posts for any platform
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
                {/* Input Mode Tabs */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <button
                        onClick={() => setInputMode('text')}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '10px',
                            background: inputMode === 'text' ? '#8366FF' : '#F3F4F6',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: inputMode === 'text' ? '#FFFFFF' : '#6B7280',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        📝 Paste Text
                    </button>
                    <button
                        onClick={() => setInputMode('url')}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '10px',
                            background: inputMode === 'url' ? '#8366FF' : '#F3F4F6',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: inputMode === 'url' ? '#FFFFFF' : '#6B7280',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        🔗 From URL
                    </button>
                </div>

                {/* Text Paste Mode */}
                {inputMode === 'text' && (
                    <div style={{ marginBottom: '24px' }}>
                        <label
                            style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#374151',
                                marginBottom: '10px'
                            }}
                        >
                            Paste any post content
                        </label>
                        <textarea
                            value={manualContent}
                            onChange={(e) => setManualContent(e.target.value)}
                            placeholder="Paste any social media post, article excerpt, or content you want to remix for your company..."
                            style={{
                                width: '100%',
                                minHeight: '120px',
                                padding: '14px',
                                borderRadius: '12px',
                                border: '2px solid #E5E7EB',
                                fontSize: '15px',
                                fontFamily: 'Outfit, sans-serif',
                                outline: 'none',
                                boxSizing: 'border-box',
                                resize: 'vertical',
                                transition: 'all 0.2s'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#8366FF';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#E5E7EB';
                            }}
                        />
                        <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px' }}>
                            💡 Copy content from competitors, influencers, or trending posts - AI will transform it for your company
                        </p>
                        <button
                            onClick={handleUseManualContent}
                            disabled={!manualContent.trim()}
                            style={{
                                marginTop: '12px',
                                width: '100%',
                                padding: '14px',
                                borderRadius: '12px',
                                background: manualContent.trim()
                                    ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
                                    : '#E5E7EB',
                                border: 'none',
                                fontSize: '15px',
                                fontWeight: 600,
                                color: '#FFFFFF',
                                cursor: manualContent.trim() ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: manualContent.trim()
                                    ? '0 4px 12px rgba(131, 102, 255, 0.3)'
                                    : 'none',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Sparkles size={18} />
                            Use This Content
                        </button>
                    </div>
                )}

                {/* URL Mode */}
                {inputMode === 'url' && (
                    <div style={{ marginBottom: '24px' }}>
                        <label
                            style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#374151',
                                marginBottom: '10px'
                            }}
                        >
                            Paste Social Post URL
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="url"
                                value={postUrl}
                                onChange={(e) => setPostUrl(e.target.value)}
                                placeholder="https://linkedin.com/posts/..."
                                style={{
                                    width: '100%',
                                    padding: '14px 50px 14px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #E5E7EB',
                                    fontSize: '15px',
                                    fontFamily: 'Outfit, sans-serif',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'all 0.2s'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#8366FF';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#E5E7EB';
                                }}
                            />
                            {detectedPlatform && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: platforms.find(p => p.id === detectedPlatform)?.bgColor || '#F3F4F6',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {(() => {
                                        const Icon = getPlatformIcon(detectedPlatform);
                                        return <Icon size={18} style={{ color: getPlatformColor(detectedPlatform) }} />;
                                    })()}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleExtract}
                            disabled={!postUrl.trim() || isExtracting}
                            style={{
                                marginTop: '12px',
                                width: '100%',
                                padding: '14px',
                                borderRadius: '12px',
                                background: postUrl.trim() && !isExtracting
                                    ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
                                    : '#E5E7EB',
                                border: 'none',
                                fontSize: '15px',
                                fontWeight: 600,
                                color: '#FFFFFF',
                                cursor: postUrl.trim() && !isExtracting ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: postUrl.trim() && !isExtracting
                                    ? '0 4px 12px rgba(131, 102, 255, 0.3)'
                                    : 'none',
                                transition: 'all 0.2s'
                            }}
                        >
                            {isExtracting ? (
                                <>
                                    <Sparkles size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                    Extracting...
                                </>
                            ) : (
                                <>
                                    <Link2 size={18} />
                                    Extract Content
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Extracted Content */}
                {extractedContent && (
                    <div style={{ marginBottom: '24px', animation: 'fadeIn 0.3s ease-out' }}>
                        <label
                            style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#374151',
                                marginBottom: '10px'
                            }}
                        >
                            Original Content
                        </label>
                        <div
                            style={{
                                padding: '16px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #F8F6FF 0%, #EDE9FE 100%)',
                                border: '1px solid #E9D5FF'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                {(() => {
                                    const Icon = getPlatformIcon(extractedContent.platform);
                                    return (
                                        <div
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '6px',
                                                background: '#FFFFFF',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Icon size={16} style={{ color: getPlatformColor(extractedContent.platform) }} />
                                        </div>
                                    );
                                })()}
                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#6B7280', textTransform: 'capitalize' }}>
                                    {extractedContent.platform}
                                </span>
                                {extractedContent.author && (
                                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                                        by {extractedContent.author}
                                    </span>
                                )}
                            </div>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: '#374151',
                                    lineHeight: '1.6',
                                    margin: 0,
                                    whiteSpace: 'pre-wrap'
                                }}
                            >
                                {extractedContent.content.length > 500
                                    ? extractedContent.content.substring(0, 500) + '...'
                                    : extractedContent.content}
                            </p>
                        </div>
                    </div>
                )}

                {/* Target Platform Selector */}
                {extractedContent && (
                    <div style={{ marginBottom: '24px', animation: 'fadeIn 0.3s ease-out 0.1s both' }}>
                        <label
                            style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#374151',
                                marginBottom: '10px'
                            }}
                        >
                            Remix For
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                            {platforms
                                .map((platform) => {
                                    const Icon = platform.icon;
                                    const isSelected = selectedTarget === platform.id;

                                    return (
                                        <button
                                            key={platform.id}
                                            onClick={() => {
                                                setSelectedTarget(platform.id);
                                                setRemixedContent(''); // Clear previous remix
                                            }}
                                            style={{
                                                padding: '14px 8px',
                                                borderRadius: '12px',
                                                background: isSelected
                                                    ? `${platform.color}15`
                                                    : '#FFFFFF',
                                                border: isSelected
                                                    ? `2px solid ${platform.color}`
                                                    : '2px solid #E5E7EB',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            <Icon size={22} style={{ color: platform.color }} />
                                            <span
                                                style={{
                                                    fontSize: '11px',
                                                    fontWeight: 600,
                                                    color: isSelected ? platform.color : '#6B7280'
                                                }}
                                            >
                                                {platform.id === 'twitter' ? 'X' : platform.name.split('/')[0]}
                                            </span>
                                        </button>
                                    );
                                })}
                        </div>

                        <button
                            onClick={handleRemix}
                            disabled={isRemixing}
                            style={{
                                marginTop: '14px',
                                width: '100%',
                                padding: '14px',
                                borderRadius: '12px',
                                background: isRemixing
                                    ? '#E5E7EB'
                                    : 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                                border: 'none',
                                fontSize: '15px',
                                fontWeight: 600,
                                color: '#FFFFFF',
                                cursor: isRemixing ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: isRemixing ? 'none' : '0 4px 12px rgba(131, 102, 255, 0.3)',
                                transition: 'all 0.2s'
                            }}
                        >
                            {isRemixing ? (
                                <>
                                    <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                    Remixing...
                                </>
                            ) : (
                                <>
                                    <RefreshCw size={18} />
                                    Remix for {platforms.find(p => p.id === selectedTarget)?.name.split('/')[0] || selectedTarget}
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Remixed Content */}
                {remixedContent && (
                    <div style={{ marginBottom: '24px', animation: 'fadeIn 0.3s ease-out' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <label
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: '#374151'
                                }}
                            >
                                Remixed Content
                            </label>
                            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                                {remixedContent.length} chars
                            </span>
                        </div>
                        <div
                            style={{
                                padding: '16px',
                                borderRadius: '16px',
                                background: '#FFFFFF',
                                border: '2px solid #8366FF',
                                boxShadow: '0 4px 16px rgba(131, 102, 255, 0.15)'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                {(() => {
                                    const Icon = getPlatformIcon(selectedTarget);
                                    return (
                                        <div
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '6px',
                                                background: platforms.find(p => p.id === selectedTarget)?.bgColor || '#F3F4F6',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Icon size={16} style={{ color: getPlatformColor(selectedTarget) }} />
                                        </div>
                                    );
                                })()}
                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#8366FF' }}>
                                    Optimized for {platforms.find(p => p.id === selectedTarget)?.name || selectedTarget}
                                </span>
                            </div>
                            <textarea
                                value={remixedContent}
                                onChange={(e) => setRemixedContent(e.target.value)}
                                style={{
                                    width: '100%',
                                    minHeight: '120px',
                                    padding: '0',
                                    border: 'none',
                                    fontSize: '14px',
                                    fontFamily: 'Outfit, sans-serif',
                                    lineHeight: '1.6',
                                    color: '#000000',
                                    resize: 'none',
                                    outline: 'none',
                                    background: 'transparent',
                                    boxSizing: 'border-box'
                                }}
                            />

                            <button
                                onClick={handleCopy}
                                style={{
                                    marginTop: '12px',
                                    padding: '10px 16px',
                                    borderRadius: '10px',
                                    background: isCopied ? '#8366FF' : '#F3F4F6',
                                    border: 'none',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    color: isCopied ? '#FFFFFF' : '#374151',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                                {isCopied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Action Buttons */}
            {
                remixedContent && (
                    <div
                        style={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            maxWidth: '480px',
                            margin: '0 auto',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            borderTop: '1px solid #F3F4F6',
                            padding: '20px 24px',
                            animation: 'slideUp 0.3s ease-out'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={handleSchedule}
                                style={{
                                    flex: 1,
                                    padding: '16px',
                                    borderRadius: '12px',
                                    background: '#FFFFFF',
                                    border: '2px solid #8366FF',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    color: '#8366FF',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Calendar size={18} />
                                Schedule
                            </button>
                            <button
                                onClick={handlePublish}
                                style={{
                                    flex: 1,
                                    padding: '16px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                                    border: 'none',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    color: '#FFFFFF',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    boxShadow: '0 8px 24px rgba(131, 102, 255, 0.4)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Send size={18} />
                                Publish Now
                            </button>
                        </div>
                    </div>
                )
            }

            {/* CSS Animations */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
        </div >
    );
}
