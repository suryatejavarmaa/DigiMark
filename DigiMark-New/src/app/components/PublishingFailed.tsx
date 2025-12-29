import { AlertCircle, CheckCircle, RefreshCw, Instagram, Facebook, Linkedin, ExternalLink, Twitter, Copy } from 'lucide-react';
import { useState } from 'react';

interface PublishingFailedProps {
  onNavigate: (screen: string) => void;
}

interface PublishResult {
  platform: string;
  success: boolean;
  postUrl?: string;
  error?: string;
}

// Manual post URLs for each platform
const getManualPostUrl = (platform: string, caption: string): string => {
  const encodedCaption = encodeURIComponent(caption);
  switch (platform.toLowerCase()) {
    case 'twitter':
    case 'x':
      return `https://twitter.com/intent/tweet?text=${encodedCaption}`;
    case 'linkedin':
      return `https://www.linkedin.com/feed/?shareActive=true&text=${encodedCaption}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?quote=${encodedCaption}`;
    case 'instagram':
      return '';
    default:
      return '';
  }
};

// Platform mappings
const platformIcons: Record<string, typeof Linkedin> = {
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  x: Twitter
};

const platformColors: Record<string, string> = {
  linkedin: '#0A66C2',
  facebook: '#1877F2',
  instagram: '#E1306C',
  twitter: '#000000',
  x: '#000000'
};

const platformNames: Record<string, string> = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'Twitter',
  x: 'X (Twitter)'
};

export function PublishingFailed({ onNavigate }: PublishingFailedProps) {
  // Read publish results from localStorage
  const [publishResults] = useState<PublishResult[]>(() => {
    const stored = localStorage.getItem('publishResults');
    return stored ? JSON.parse(stored) : [];
  });

  const caption = localStorage.getItem('publishCaption') || '';

  // Separate success and failed platforms
  const successPlatforms = publishResults.filter(r => r.success);
  const failedPlatforms = publishResults.filter(r => !r.success);

  // Track selected failed platform for manual posting
  const [selectedFailedPlatform, setSelectedFailedPlatform] = useState<string | null>(
    failedPlatforms.length > 0 ? failedPlatforms[0].platform : null
  );
  const [isCopied, setIsCopied] = useState(false);

  const togglePlatformSelection = (platformId: string) => {
    if (selectedFailedPlatform === platformId) {
      setSelectedFailedPlatform(null);
    } else {
      setSelectedFailedPlatform(platformId);
    }
  };

  const handleManualPost = () => {
    if (!selectedFailedPlatform) return;

    const url = getManualPostUrl(selectedFailedPlatform, caption);

    if (selectedFailedPlatform.toLowerCase() === 'instagram') {
      navigator.clipboard.writeText(caption);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
      window.open('https://www.instagram.com/', '_blank');
    } else if (url) {
      window.open(url, '_blank');
    }
  };

  const handleRetryPublishing = () => {
    const failedPlatformIds = failedPlatforms.map(p => p.platform);
    localStorage.setItem('selectedPlatforms', JSON.stringify(failedPlatformIds));
    onNavigate('publishing-animation');
  };

  const handleViewLivePost = (postUrl?: string) => {
    if (postUrl) {
      window.open(postUrl, '_blank');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
        fontFamily: 'Outfit, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '120px'
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '16px 20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}
      >
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#000000',
            fontFamily: 'Outfit, sans-serif',
            margin: 0,
            textAlign: 'center'
          }}
        >
          Publishing Status
        </h1>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '32px 20px' }}>
        {/* Mixed Status Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{ position: 'relative', width: '100px', height: '100px' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
                border: '3px solid #EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s infinite'
              }}
            >
              <AlertCircle size={48} style={{ color: '#EF4444' }} />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '-5px',
                right: '-5px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                border: '3px solid #FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(131, 102, 255, 0.3)'
              }}
            >
              <CheckCircle size={20} style={{ color: '#FFFFFF' }} />
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#000000', textAlign: 'center', marginBottom: '8px' }}>
          Posting Encountered an Issue
        </h2>
        <p style={{ fontSize: '15px', color: '#6B7280', textAlign: 'center', marginBottom: '32px', lineHeight: '1.5' }}>
          Some platforms published successfully, but {failedPlatforms.length} failed
        </p>

        {/* Success Platforms */}
        {successPlatforms.length > 0 && (
          <div
            style={{
              background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '16px',
              border: '2px solid #10B98130'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CheckCircle size={20} style={{ color: '#FFFFFF' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000000', marginBottom: '2px' }}>
                  Published Successfully
                </h3>
                <p style={{ fontSize: '13px', color: '#059669', margin: 0 }}>
                  {successPlatforms.length} platform{successPlatforms.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {successPlatforms.map((result) => {
                const Icon = platformIcons[result.platform] || Linkedin;
                const color = platformColors[result.platform] || '#0A66C2';
                const name = platformNames[result.platform] || result.platform;
                return (
                  <div
                    key={result.platform}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      padding: '12px',
                      background: '#FFFFFF',
                      borderRadius: '10px',
                      border: '1px solid #D1FAE5'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={20} style={{ color }} />
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#000000', flex: 1 }}>
                        {name}
                      </span>
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#059669',
                          padding: '4px 10px',
                          background: '#D1FAE5',
                          borderRadius: '6px'
                        }}
                      >
                        ✓ Posted
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewLivePost(result.postUrl)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '14px',
                        background: '#FFFFFF',
                        border: '2px solid #8366FF',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#8366FF',
                        fontFamily: 'Outfit, sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <ExternalLink size={16} />
                      View Live Post
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Failed Platforms */}
        {failedPlatforms.length > 0 && (
          <div
            style={{
              background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '32px',
              border: '2px solid #EF444450'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#EF4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <AlertCircle size={20} style={{ color: '#FFFFFF' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000000', marginBottom: '2px' }}>
                  Publishing Failed
                </h3>
                <p style={{ fontSize: '13px', color: '#DC2626', margin: 0 }}>
                  Requires manual intervention
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {failedPlatforms.map((result) => {
                const Icon = platformIcons[result.platform] || ExternalLink;
                const color = platformColors[result.platform] || '#000000';
                const name = platformNames[result.platform] || result.platform;
                const isSelected = selectedFailedPlatform === result.platform;
                return (
                  <div
                    key={result.platform}
                    onClick={() => togglePlatformSelection(result.platform)}
                    style={{
                      padding: '16px',
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #8366FF' : '2px solid #FCA5A5',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Icon size={24} style={{ color }} />
                      <span style={{ fontSize: '16px', fontWeight: 700, color: '#000000', flex: 1 }}>
                        {name}
                      </span>
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#DC2626',
                          padding: '4px 10px',
                          background: '#FEE2E2',
                          borderRadius: '6px'
                        }}
                      >
                        Failed
                      </div>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: isSelected ? '2px solid #8366FF' : '2px solid #D1D5DB',
                          background: isSelected ? '#8366FF' : '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                          flexShrink: 0
                        }}
                      >
                        {isSelected && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                              stroke="#FFFFFF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: '#6B7280',
                        lineHeight: '1.5',
                        padding: '12px',
                        background: '#F9FAFB',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB'
                      }}
                    >
                      <span style={{ fontWeight: 600, color: '#000000' }}>Error: </span>
                      {result.error || 'Publishing failed - please try again'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Help Text */}
        <div
          style={{
            background: '#F9FAFB',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            border: '1px solid #E5E7EB'
          }}
        >
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#000000', marginBottom: '8px' }}>
            What happens next?
          </h4>
          <ul style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.6', margin: 0, paddingLeft: '20px' }}>
            <li>Your post was successfully published to {successPlatforms.length} platform{successPlatforms.length !== 1 ? 's' : ''}</li>
            <li>You can manually post using the button below</li>
            <li>Or retry automatic posting after checking your connection</li>
          </ul>
        </div>

        {/* Caption copied toast */}
        {isCopied && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#10B981',
              color: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 1000
            }}
          >
            ✓ Caption copied! Paste it on Instagram
          </div>
        )}
      </div>

      {/* Bottom Buttons */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#FFFFFF',
          padding: '16px 20px 32px',
          boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.08)'
        }}
      >
        <button
          onClick={handleManualPost}
          disabled={!selectedFailedPlatform}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: selectedFailedPlatform
              ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
              : '#E5E7EB',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: selectedFailedPlatform ? '#FFFFFF' : '#9CA3AF',
            fontFamily: 'Outfit, sans-serif',
            cursor: selectedFailedPlatform ? 'pointer' : 'not-allowed',
            boxShadow: selectedFailedPlatform ? '0 8px 24px rgba(131, 102, 255, 0.4)' : 'none',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '12px',
            opacity: selectedFailedPlatform ? 1 : 0.6
          }}
        >
          <ExternalLink size={20} />
          {selectedFailedPlatform
            ? `Post Manually (${platformNames[selectedFailedPlatform] || selectedFailedPlatform})`
            : 'Select Platform to Post Manually'}
        </button>

        <button
          onClick={handleRetryPublishing}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: '#FFFFFF',
            border: '2px solid #8366FF',
            fontSize: '16px',
            fontWeight: 600,
            color: '#8366FF',
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <RefreshCw size={20} />
          Retry Publishing
        </button>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}