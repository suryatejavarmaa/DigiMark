import { useState, useEffect } from 'react';
import { X, Send, Instagram, Linkedin, Facebook, Twitter, Copy, ExternalLink, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PublishService } from '../../services/PublishService';

interface PreviewPostNowImageProps {
  onNavigate: (screen: string) => void;
  imageUrl?: string;
  caption?: string;
  selectedPlatforms?: string[];
  onPublish?: (platforms: string[], data: { imageUrl?: string; caption?: string }) => Promise<any>;
  isPublishing?: boolean;
  userId?: string | null;
}

export function PreviewPostNowImage({
  onNavigate,
  imageUrl: propImageUrl,
  caption: propCaption,
  selectedPlatforms: propSelectedPlatforms,
  onPublish,
  isPublishing = false,
  userId
}: PreviewPostNowImageProps) {
  const [publishState, setPublishState] = useState<'ready' | 'publishing' | 'success' | 'failed'>('ready');
  const [failedPlatforms, setFailedPlatforms] = useState<string[]>([]);
  const [localImageUrl, setLocalImageUrl] = useState('');
  const [localCaption, setLocalCaption] = useState('');
  const [localPlatforms, setLocalPlatforms] = useState<string[]>([]);
  const [postId, setPostId] = useState('');
  const [publishResult, setPublishResult] = useState<any>(null);

  // Load post data from localStorage on mount (for CalendarView navigation)
  useEffect(() => {
    const postNowData = localStorage.getItem('postNowData');
    if (postNowData) {
      const post = JSON.parse(postNowData);
      setLocalImageUrl(post.mediaUrl || '');
      setLocalCaption(post.content || '');
      setLocalPlatforms(post.platforms || []);
      setPostId(post.id || '');
    }
  }, []);

  const allPlatforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    { id: 'twitter', name: 'X (Twitter)', icon: Twitter, color: '#000000' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E1306C' }
  ];

  // Use props if provided, otherwise fall back to localStorage data
  const selectedPlatforms = propSelectedPlatforms && propSelectedPlatforms.length > 0 ? propSelectedPlatforms : localPlatforms.length > 0 ? localPlatforms : ['linkedin'];
  const platforms = allPlatforms.filter(p => selectedPlatforms.includes(p.id));
  const caption = propCaption || localCaption || `🎉 Join us for our Grand Opening event!\n\nExclusive deals and amazing experiences await you. Don't miss this incredible opportunity!\n\n#GrandOpening #Event #SummerSale`;
  const imageUrl = propImageUrl || localImageUrl;

  // Handle publish now
  const handlePublishNow = async () => {
    if (!userId) {
      onNavigate('calendar-view');
      return;
    }

    // Store data in localStorage for PublishingAnimation
    localStorage.setItem('selectedPlatforms', JSON.stringify(selectedPlatforms));
    localStorage.setItem('publishCaption', caption);
    localStorage.setItem('publishImageUrl', imageUrl);
    localStorage.setItem('digimark_user_id', userId);

    // Store postId to delete after publishing
    if (postId) {
      localStorage.setItem('scheduledPostId', postId);
    }

    // Navigate to publishing animation which will handle the actual publish
    onNavigate('publishing-animation-image');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
        fontFamily: 'Outfit, sans-serif',
        paddingBottom: '100px'
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
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}
      >
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#000000',
            fontFamily: 'Outfit, sans-serif',
            margin: 0
          }}
        >
          Preview Post
        </h1>

        <button
          onClick={() => onNavigate('calendar-view')}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: '#F3F4F6',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#E5E7EB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F3F4F6';
          }}
        >
          <X size={20} style={{ color: '#000000' }} />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 20px' }}>
        {/* Post Image */}
        <div
          style={{
            width: '100%',
            aspectRatio: '1/1',
            borderRadius: '16px',
            marginBottom: '24px',
            overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(131, 102, 255, 0.3)'
          }}
        >
          <ImageWithFallback
            src={imageUrl || "https://images.unsplash.com/photo-1579779866825-b598bf3ab783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"}
            alt="Post Image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Post Info */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            marginBottom: '16px'
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#000000',
              marginBottom: '16px'
            }}
          >
            Post Information
          </h3>

          {/* Platforms */}
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#6B7280',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Publishing To
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <div
                    key={platform.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      background: '#F9FAFB',
                      border: '2px solid #E5E7EB'
                    }}
                  >
                    <Icon size={16} style={{ color: platform.color }} />
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#000000'
                      }}
                    >
                      {platform.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Caption */}
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#6B7280',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Caption
            </div>
            <div
              style={{
                fontSize: '14px',
                color: '#000000',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
                padding: '14px',
                background: '#F9FAFB',
                borderRadius: '10px',
                border: '1px solid #E5E7EB'
              }}
            >
              {caption}
            </div>
          </div>
        </div>

        {/* Publishing Notice */}
        <div
          style={{
            background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid rgba(131, 102, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(131, 102, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Send size={20} style={{ color: '#8366FF' }} />
          </div>
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#8366FF',
                marginBottom: '4px'
              }}
            >
              Ready to Publish
            </div>
            <div
              style={{
                fontSize: '13px',
                color: '#7C3AED',
                lineHeight: '1.4'
              }}
            >
              Your post will be published immediately to all selected platforms
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
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
          onClick={async () => {
            if (onPublish && publishState === 'ready') {
              setPublishState('publishing');
              try {
                const result = await onPublish(selectedPlatforms, { imageUrl, caption });
                if (result?.success || result?.results?.some((r: any) => r.success)) {
                  setPublishState('success');
                  setTimeout(() => onNavigate('post-publish-success'), 1000);
                } else {
                  setPublishState('failed');
                  setFailedPlatforms(selectedPlatforms);
                }
              } catch (error) {
                console.error('Publish failed:', error);
                setPublishState('failed');
                setFailedPlatforms(selectedPlatforms);
              }
            } else if (!onPublish) {
              // Demo mode - just navigate
              onNavigate('post-publish-success');
            }
          }}
          disabled={publishState === 'publishing' || isPublishing}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: publishState === 'publishing' || isPublishing
              ? '#A78BFA'
              : 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
            fontFamily: 'Outfit, sans-serif',
            cursor: publishState === 'publishing' || isPublishing ? 'not-allowed' : 'pointer',
            boxShadow: '0 8px 24px rgba(131, 102, 255, 0.4)',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: publishState === 'publishing' || isPublishing ? 0.8 : 1
          }}
        >
          {publishState === 'publishing' || isPublishing ? (
            <>
              <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
              Publishing...
            </>
          ) : (
            <>
              <Send size={20} />
              Publish Now
            </>
          )}
        </button>
      </div>

      {/* Failure Modal */}
      {publishState === 'failed' && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              width: '100%',
              maxWidth: '360px',
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', textAlign: 'center' }}>
              ❌ Publish Failed
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', textAlign: 'center', marginBottom: '20px' }}>
              We couldn't publish to the selected platforms. You can try again or post manually.
            </p>

            {/* Manual Post Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(caption);
                  alert('Caption copied to clipboard!');
                }}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: '#EDE9FE',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#8366FF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Copy size={18} />
                Copy Caption
              </button>

              {failedPlatforms.includes('linkedin') && (
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(imageUrl || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: '#0A66C2',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none'
                  }}
                >
                  <Linkedin size={18} />
                  Post to LinkedIn
                  <ExternalLink size={14} />
                </a>
              )}

              {failedPlatforms.includes('twitter') && (
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: '#000000',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none'
                  }}
                >
                  <Twitter size={18} />
                  Post to X (Twitter)
                  <ExternalLink size={14} />
                </a>
              )}

              <button
                onClick={() => {
                  setPublishState('ready');
                  setFailedPlatforms([]);
                }}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: '#F3F4F6',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#374151',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#6B7280',
                  cursor: 'pointer'
                }}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
