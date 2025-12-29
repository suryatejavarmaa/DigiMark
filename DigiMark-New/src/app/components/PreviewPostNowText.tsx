import { X, Clock, Linkedin, Facebook, Instagram, Twitter, Send, Loader2, ExternalLink, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFirestore, deleteDoc, doc } from 'firebase/firestore';
import { PublishService } from '../../services/PublishService';

// API Base URL - uses environment variable in production, localhost in development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

interface PreviewPostNowTextProps {
  onNavigate: (screen: string) => void;
  userId?: string | null;
}

export function PreviewPostNowText({ onNavigate, userId }: PreviewPostNowTextProps) {
  const [caption, setCaption] = useState('');
  const [postPlatforms, setPostPlatforms] = useState<string[]>([]);
  const [postId, setPostId] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [publishResult, setPublishResult] = useState<any>(null);

  // Load post data from localStorage on mount
  useEffect(() => {
    const postNowData = localStorage.getItem('postNowData');
    if (postNowData) {
      const post = JSON.parse(postNowData);
      setCaption(post.content || '');
      setPostPlatforms(post.platforms || []);
      setPostId(post.id || '');
    }
  }, []);
  // Handle publish now - EXACT copy from original working CalendarView
  const handlePublishNow = async () => {
    if (!userId) {
      return;
    }

    try {
      setIsPublishing(true);

      console.log('[Post Now] Found post data');
      console.log('[Post Now] Sending data:', {
        userId,
        platforms: postPlatforms,
        content: caption,
        mediaUrl: undefined,
        postType: 'text'
      });

      const response = await fetch(`${API_BASE_URL}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          platforms: postPlatforms,
          content: caption,
          mediaUrl: undefined,
          postType: 'text'
        })
      });

      const result = await response.json();
      console.log('[Post Now] Response:', result);

      if (response.ok && result.success) {
        // Delete the scheduled post
        if (postId) {
          const db = getFirestore();
          await deleteDoc(doc(db, 'scheduledPosts', postId));
        }

        // Store results for success page
        const publishResultsArray = postPlatforms.map(platform => ({
          platform,
          success: result.results?.[platform]?.status === 'success',
          postUrl: result.results?.[platform]?.url
        }));

        localStorage.setItem('publishResults', JSON.stringify(publishResultsArray));

        // Navigate to success page
        onNavigate('publishing-success');
      } else {
        throw new Error(result.error || 'Failed to post');
      }
    } catch (error: any) {
      console.error('[Post Now] Error:', error);
      alert('Failed to Post: ' + (error.message || 'An error occurred while posting.'));
    } finally {
      setIsPublishing(false);
    }
  };

  const allPlatforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E1306C' },
    { id: 'x', name: 'X (Twitter)', icon: Twitter, color: '#000000' }
  ];

  const platforms = allPlatforms.filter(p => postPlatforms.includes(p.id));

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
        fontFamily: 'Outfit, sans-serif',
        paddingBottom: '120px'
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

      {/* Success View */}
      {publishSuccess && publishResult && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '32px 24px',
              margin: '0 20px',
              maxWidth: '360px',
              width: '100%',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#000000', marginBottom: '8px' }}>
              Published Successfully!
            </h2>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
              Your post is now live on the selected platforms.
            </p>

            {/* Live Links */}
            {publishResult.results && Object.keys(publishResult.results).length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280', marginBottom: '12px' }}>
                  View Live Posts
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {Object.entries(publishResult.results).map(([platform, data]: [string, any]) => (
                    data.url && (
                      <a
                        key={platform}
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          borderRadius: '10px',
                          background: '#F3F4F6',
                          color: '#8366FF',
                          fontSize: '14px',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}
                      >
                        <ExternalLink size={16} />
                        View on {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => onNavigate('calendar-view')}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                border: 'none',
                fontSize: '15px',
                fontWeight: 600,
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              Back to Calendar
            </button>
          </div>
        </div>
      )}

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
          onClick={handlePublishNow}
          disabled={isPublishing}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
            fontFamily: 'Outfit, sans-serif',
            cursor: isPublishing ? 'wait' : 'pointer',
            boxShadow: '0 8px 24px rgba(131, 102, 255, 0.4)',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: isPublishing ? 0.7 : 1
          }}
          onMouseEnter={(e) => {
            if (!isPublishing) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(131, 102, 255, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(131, 102, 255, 0.4)';
          }}
        >
          {isPublishing ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={20} />}
          {isPublishing ? 'Publishing...' : 'Publish Now'}
        </button>
      </div>
    </div>
  );
}
