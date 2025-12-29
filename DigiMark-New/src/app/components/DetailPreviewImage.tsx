import { ArrowLeft, Trash2, Clock, Instagram, Linkedin, Facebook, Twitter, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PublishService } from '../../services/PublishService';

interface DetailPreviewImageProps {
  onNavigate: (screen: string) => void;
  scheduleTime?: string;
  onChangeSchedule?: () => void;
  userId?: string | null;
}

export function DetailPreviewImage({ onNavigate, scheduleTime = '', onChangeSchedule, userId }: DetailPreviewImageProps) {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [displayPlatforms, setDisplayPlatforms] = useState<string[]>([]);
  const [displayScheduleTime, setDisplayScheduleTime] = useState(scheduleTime);
  const [postId, setPostId] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [scheduledAt, setScheduledAt] = useState<string | undefined>(undefined); // Store raw ISO date

  // Load post data from localStorage on mount or when scheduleTime changes
  useEffect(() => {
    const editingPostData = localStorage.getItem('editingPost');
    if (editingPostData) {
      const post = JSON.parse(editingPostData);
      setPostId(post.id || '');
      setCaption(post.content || '');
      setImageUrl(post.mediaUrl || '');
      setDisplayPlatforms(post.platforms || []);
      setScheduledAt(post.scheduledAt); // Store raw scheduledAt for update

      // Format scheduledAt for display
      if (post.scheduledAt) {
        const date = new Date(post.scheduledAt);
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        setDisplayScheduleTime(`${formattedDate} at ${formattedTime}`);
      }
    }
  }, [scheduleTime]); // Reload when scheduleTime changes (after returning from picker)

  const allPlatforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E1306C' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { id: 'twitter', name: 'X (Twitter)', icon: Twitter, color: '#000000' },
    { id: 'x', name: 'X (Twitter)', icon: Twitter, color: '#000000' }
  ];

  const platforms = allPlatforms.filter(p => displayPlatforms.includes(p.id));

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            <ArrowLeft size={20} style={{ color: '#000000' }} />
          </button>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              margin: 0
            }}
          >
            Post Preview
          </h1>
        </div>

        <button
          onClick={() => {
            if (confirm('Are you sure you want to delete this scheduled post?')) {
              alert('Post deleted');
              onNavigate('calendar-view');
            }
          }}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: '#FEF2F2',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FEE2E2';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FEF2F2';
          }}
        >
          <Trash2 size={20} style={{ color: '#EF4444' }} />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 20px' }}>
        {/* Post Image */}
        {imageUrl && (
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
              src={imageUrl}
              alt="Post Image"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        )}

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
            Posting Information
          </h3>

          {/* Schedule Time */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px',
              background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
              borderRadius: '12px',
              marginBottom: '16px',
              border: '1px solid rgba(131, 102, 255, 0.2)'
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
                justifyContent: 'center'
              }}
            >
              <Clock size={20} style={{ color: '#8366FF' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '12px',
                  color: '#8366FF',
                  fontWeight: 600,
                  marginBottom: '2px'
                }}
              >
                Scheduled Time
              </div>
              <div
                style={{
                  fontSize: '15px',
                  color: '#000000',
                  fontWeight: 700
                }}
              >
                {displayScheduleTime}
              </div>
            </div>
          </div>

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
            if (!userId || !postId) {
              alert('Missing user or post information');
              return;
            }
            setIsUpdating(true);
            try {
              // Update the post content and schedule time in Firebase
              const result = await PublishService.updateScheduledPost(userId, postId, scheduledAt, caption);
              if (result.success) {
                onNavigate('schedule-update-success');
              } else {
                alert('Failed to update: ' + (result.error || 'Unknown error'));
              }
            } catch (error) {
              console.error('Update error:', error);
              alert('Failed to update post');
            } finally {
              setIsUpdating(false);
            }
          }}
          disabled={isUpdating}
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
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(131, 102, 255, 0.4)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(131, 102, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(131, 102, 255, 0.4)';
          }}
        >
          {isUpdating ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
              <span>Updating...</span>
            </div>
          ) : (
            'Update Schedule'
          )}
        </button>
      </div>
    </div>
  );
}