import { CheckCircle2, Sparkles, ExternalLink, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { useState } from 'react';

interface PublishingSuccessProps {
  onNavigate: (screen: string) => void;
}

interface PublishResult {
  platform: string;
  success: boolean;
  postUrl?: string;
  shareUrl?: string;
}

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

export function PublishingSuccess({ onNavigate }: PublishingSuccessProps) {
  // Read publish results from localStorage
  const [publishResults] = useState<PublishResult[]>(() => {
    const stored = localStorage.getItem('publishResults');
    return stored ? JSON.parse(stored) : [];
  });

  // Get all successful results
  const successfulResults = publishResults.filter(r => r.success);
  const failedResults = publishResults.filter(r => !r.success);
  const successCount = successfulResults.length;
  const failedCount = failedResults.length;
  const totalPlatforms = publishResults.length;

  const handleViewLivePost = (postUrl?: string, platform?: string) => {
    // Try to get URL from result or localStorage
    const url = postUrl || (platform ? localStorage.getItem(`postUrl_${platform}`) : null);
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Post URL not available yet. The post may still be processing.');
    }
  };

  const handlePostManually = (shareUrl?: string) => {
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
        fontFamily: 'Outfit, sans-serif',
        padding: '24px'
      }}
    >
      {/* Celebratory Success Icon */}
      <div
        style={{
          marginBottom: '24px',
          animation: 'scaleIn 0.5s ease-out',
          position: 'relative'
        }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 60px rgba(131, 102, 255, 0.5), 0 8px 32px rgba(131, 102, 255, 0.4)',
            position: 'relative'
          }}
        >
          <CheckCircle2
            size={56}
            style={{
              color: '#8366FF',
              strokeWidth: 2.5
            }}
          />

          {/* Sparkle Effects */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 90}deg) translate(70px, -50%)`,
                animation: `sparkle 1.5s ease-in-out ${i * 0.2}s infinite`
              }}
            >
              <Sparkles
                size={16}
                style={{
                  color: '#8366FF',
                  filter: 'drop-shadow(0 0 4px rgba(131, 102, 255, 0.8))'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Success Message */}
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#000000',
          fontFamily: 'Outfit, sans-serif',
          marginBottom: '8px',
          textAlign: 'center',
          animation: 'fadeInUp 0.6s ease-out 0.2s backwards'
        }}
      >
        Success! 🎉
      </h1>

      <p
        style={{
          fontSize: '14px',
          color: '#6B7280',
          fontFamily: 'Outfit, sans-serif',
          marginBottom: '24px',
          textAlign: 'center',
          maxWidth: '320px',
          lineHeight: '1.5',
          animation: 'fadeInUp 0.6s ease-out 0.3s backwards'
        }}
      >
        Your post is now live on {successCount} platform{successCount !== 1 ? 's' : ''}!
        {failedCount > 0 && ` (${failedCount} need manual posting)`}
      </p>

      {/* Published Platforms List */}
      <div
        style={{
          width: '100%',
          maxWidth: '320px',
          background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '20px',
          border: '2px solid #10B98130',
          animation: 'fadeInUp 0.6s ease-out 0.35s backwards'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CheckCircle2 size={18} style={{ color: '#FFFFFF' }} />
          </div>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#059669' }}>
            Published Successfully
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {successfulResults.map((result) => {
            const Icon = platformIcons[result.platform] || ExternalLink;
            const color = platformColors[result.platform] || '#8366FF';
            const name = platformNames[result.platform] || result.platform;

            return (
              <div
                key={result.platform}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '12px',
                  border: '1px solid #D1FAE5'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Icon size={20} style={{ color }} />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#000000', flex: 1 }}>
                    {name}
                  </span>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#059669',
                      padding: '3px 8px',
                      background: '#D1FAE5',
                      borderRadius: '6px'
                    }}
                  >
                    ✓ Live
                  </div>
                </div>

                <button
                  onClick={() => handleViewLivePost(result.postUrl, result.platform)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px',
                    background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    fontFamily: 'Outfit, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 102, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <ExternalLink size={14} />
                  View on {name}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Failed Platforms - Post Manually */}
      {failedResults.length > 0 && (
        <div
          style={{
            width: '100%',
            maxWidth: '320px',
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '20px',
            border: '2px solid #F59E0B30',
            animation: 'fadeInUp 0.6s ease-out 0.4s backwards'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ExternalLink size={18} style={{ color: '#FFFFFF' }} />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#92400E' }}>
              Manual Posting Required
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {failedResults.map((result) => {
              const Icon = platformIcons[result.platform] || ExternalLink;
              const color = platformColors[result.platform] || '#8366FF';
              const name = platformNames[result.platform] || result.platform;

              return (
                <div
                  key={result.platform}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '12px',
                    border: '1px solid #FCD34D'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Icon size={20} style={{ color }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#000000', flex: 1 }}>
                      {name}
                    </span>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#92400E',
                        padding: '3px 8px',
                        background: '#FEF3C7',
                        borderRadius: '6px'
                      }}
                    >
                      ⚠ Manual
                    </div>
                  </div>

                  <button
                    onClick={() => handlePostManually(result.shareUrl)}
                    disabled={!result.shareUrl}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px',
                      background: result.shareUrl ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : '#E5E7EB',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      fontFamily: 'Outfit, sans-serif',
                      cursor: result.shareUrl ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (result.shareUrl) {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <ExternalLink size={14} />
                    Post Manually on {name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Back to Dashboard Button */}
      <div
        style={{
          width: '100%',
          maxWidth: '320px',
          animation: 'fadeInUp 0.6s ease-out 0.4s backwards'
        }}
      >
        <button
          onClick={() => onNavigate('dashboard')}
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
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F8F6FF';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Back to Dashboard
        </button>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
}