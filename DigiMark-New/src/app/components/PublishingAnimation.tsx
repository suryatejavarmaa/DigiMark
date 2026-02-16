import { Send, Loader2, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

interface PublishingAnimationProps {
  selectedPlatforms?: string[];
  onNavigate: (screen: string) => void;
  userId?: string | null;
  caption?: string;
  imageUrl?: string;
}

export function PublishingAnimation({ selectedPlatforms: propPlatforms, onNavigate, userId, caption: propCaption, imageUrl }: PublishingAnimationProps) {
  // Read from localStorage if props not provided
  // Read from localStorage to ensure we have the latest selection (props can be stale)
  const [platforms] = useState<string[]>(() => {
    const stored = localStorage.getItem('selectedPlatforms');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.length > 0) return parsed;
    }

    // Fallback to props or default
    if (propPlatforms && propPlatforms.length > 0) return propPlatforms;
    return ['linkedin'];
  });

  const caption = propCaption || localStorage.getItem('publishCaption') || '';

  const [platformStatuses, setPlatformStatuses] = useState<{ [key: string]: 'pending' | 'publishing' | 'success' | 'failed' }>({});
  const [publishResults, setPublishResults] = useState<{ platform: string; success: boolean; postUrl?: string; shareUrl?: string; error?: string }[]>([]);

  useEffect(() => {
    // Actually publish to backend
    const publishToPlatforms = async () => {
      // Cache media URL BEFORE publishing
      const cachedMediaUrl = imageUrl || localStorage.getItem('publishImageUrl') || undefined;
      console.log('[PublishingAnimation] Cached mediaUrl for all platforms:', cachedMediaUrl ? cachedMediaUrl.substring(0, 80) + '...' : 'NULL');

      try {
        // Map 'x' to 'twitter' for API
        const apiPlatforms = platforms.map(p => p === 'x' ? 'twitter' : p);
        const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';

        // Set all platforms to publishing status
        const initialStatuses: { [key: string]: 'pending' | 'publishing' | 'success' | 'failed' } = {};
        platforms.forEach(p => {
          initialStatuses[p] = 'publishing';
        });
        setPlatformStatuses(initialStatuses);

        console.log(`[PublishingAnimation] Publishing to ALL platforms at once:`, platforms);

        // Call /publish ONCE with ALL platforms
        const response = await fetch(`${API_BASE}/publish`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userId || localStorage.getItem('digimark_user_id'),
            platforms: apiPlatforms, // Send all platforms at once
            content: caption,
            mediaUrl: cachedMediaUrl,
            postType: cachedMediaUrl ? 'image' : 'text'
          })
        });

        const data = await response.json();
        console.log('[PublishingAnimation] Response:', data);

        // Process results for each platform
        const results: { platform: string; success: boolean; postUrl?: string; shareUrl?: string; error?: string }[] = [];

        platforms.forEach(platform => {
          const apiPlatform = platform === 'x' ? 'twitter' : platform;
          const platformResult = data.results?.[apiPlatform];
          const success = platformResult?.status === 'success';
          const postUrl = platformResult?.url;
          const shareUrl = platformResult?.shareUrl;
          const error = platformResult?.error;

          results.push({
            platform,
            success,
            postUrl,
            shareUrl,
            error: error || (success ? undefined : 'Publishing failed - please try again')
          });

          setPlatformStatuses(prev => ({ ...prev, [platform]: success ? 'success' : 'failed' }));

          // Store post URL for "View Live Post" button
          if (success && postUrl) {
            localStorage.setItem(`postUrl_${platform}`, postUrl);
          }
        });

        setPublishResults(results);

        // Store results for success/failed page
        localStorage.setItem('publishResults', JSON.stringify(results));

        // Navigate based on results
        const allSuccess = results.every(r => r.success);
        const anySuccess = results.some(r => r.success);

        // Save to livePosts collection for Calendar display (only if at least one platform succeeded)
        if (anySuccess) {
          try {
            const db = getFirestore();
            const effectiveUserId = userId || localStorage.getItem('digimark_user_id');
            const mediaUrl = imageUrl || localStorage.getItem('publishImageUrl') || null;

            // Don't save base64 images to Firestore (too large, >1MB limit)
            // Only save if it's a regular URL (Firebase Storage, Pollinations, etc.)
            const safeImageUrl = mediaUrl && !mediaUrl.startsWith('data:image/') ? mediaUrl : null;

            // Extract URLs for each platform from results
            const linkedInResult = results.find(r => r.platform === 'linkedin' && r.success);
            const twitterResult = results.find(r => (r.platform === 'twitter' || r.platform === 'x') && r.success);
            const facebookResult = results.find(r => r.platform === 'facebook' && r.success);

            await addDoc(collection(db, 'livePosts'), {
              userId: effectiveUserId,
              title: caption.substring(0, 50) + (caption.length > 50 ? '...' : ''),
              caption: caption,
              platforms: platforms,
              publishedAt: new Date().toISOString(),
              linkedInUrl: linkedInResult?.postUrl || null,
              twitterUrl: twitterResult?.postUrl || null,
              facebookUrl: facebookResult?.postUrl || null,
              imageUrl: safeImageUrl,
              type: mediaUrl ? 'image' : 'text',
              hasImage: !!mediaUrl // Track that post had image even if we couldn't save URL
            });
            console.log('[Publishing] Saved to livePosts collection');
          } catch (saveError) {
            console.error('[Publishing] Failed to save to livePosts:', saveError);
          }
        }

        // Delete scheduled post if it was a "Post Now" action
        const scheduledPostId = localStorage.getItem('scheduledPostId');
        if (scheduledPostId && allSuccess) {
          try {
            const API_BASE_DEL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';
            const response = await fetch(`${API_BASE_DEL}/deleteScheduledPost`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: userId || localStorage.getItem('digimark_user_id'),
                postId: scheduledPostId
              })
            });

            if (response.ok) {
              console.log('[Publishing] Deleted scheduled post:', scheduledPostId);
              localStorage.removeItem('scheduledPostId');
            }
          } catch (error) {
            console.error('[Publishing] Failed to delete scheduled post:', error);
          }
        }

        setTimeout(() => {
          if (allSuccess) {
            onNavigate('publishing-success');
          } else {
            // If any failed, go to failed page as requested
            onNavigate('publishing-failed');
          }
        }, 800);
      } catch (error) {
        console.error('[PublishingAnimation] Publishing failed:', error);
        // Set all platforms to failed
        const failedStatuses: { [key: string]: 'failed' } = {};
        platforms.forEach((p: string) => {
          failedStatuses[p] = 'failed';
        });
        setPlatformStatuses(failedStatuses);
        // Navigate to failed page
        setTimeout(() => onNavigate('publishing-failed'), 800);
      }
    };

    publishToPlatforms();
  }, [platforms, onNavigate, userId, caption, imageUrl]);

  const platformNames: { [key: string]: string } = {
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    instagram: 'Instagram',
    x: 'X (Twitter)',
    twitter: 'X (Twitter)'
  };

  const platformIcons: { [key: string]: typeof Linkedin } = {
    linkedin: Linkedin,
    facebook: Facebook,
    instagram: Instagram,
    x: Twitter,
    twitter: Twitter
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
      {/* Animated Rocket/Paper Plane */}
      <div
        style={{
          position: 'relative',
          marginBottom: '48px'
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
            boxShadow: '0 0 60px rgba(131, 102, 255, 0.4), 0 8px 32px rgba(131, 102, 255, 0.3)',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        >
          <Send
            size={48}
            style={{
              color: '#8366FF',
              transform: 'rotate(45deg)',
              animation: 'float 3s ease-in-out infinite'
            }}
          />
        </div>

        {/* Glow Effect */}
        <div
          style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(131, 102, 255, 0.2) 0%, transparent 70%)',
            animation: 'glow 2s ease-in-out infinite',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Publishing Text */}
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#000000',
          fontFamily: 'Outfit, sans-serif',
          marginBottom: '12px',
          textAlign: 'center'
        }}
      >
        Publishing Your Post
      </h1>

      <p
        style={{
          fontSize: '14px',
          color: '#6B7280',
          fontFamily: 'Outfit, sans-serif',
          marginBottom: '48px',
          textAlign: 'center'
        }}
      >
        This will only take a moment...
      </p>

      {/* Platform Progress List */}
      <div
        style={{
          width: '100%',
          maxWidth: '320px',
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          border: '1px solid #F3F4F6'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {platforms.map((platform: string) => {
            const status = platformStatuses[platform];
            const isPublished = status === 'success';
            const isFailed = status === 'failed';
            const isPublishing = status === 'publishing';
            return (
              <div
                key={platform}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: isPublished ? '#10B981' : isFailed ? '#EF4444' : '#000000',
                    fontFamily: 'Outfit, sans-serif',
                    transition: 'color 0.3s'
                  }}
                >
                  {platformNames[platform] || platform}
                </span>

                {isPublished ? (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : isFailed ? (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
                    }}
                  >
                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>×</span>
                  </div>
                ) : (
                  <Loader2
                    size={20}
                    style={{
                      color: '#8366FF',
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: rotate(45deg) translateY(0);
          }
          50% {
            transform: rotate(45deg) translateY(-10px);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
