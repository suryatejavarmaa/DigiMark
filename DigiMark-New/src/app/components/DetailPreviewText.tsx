import { X, Clock, Linkedin, Facebook, Instagram, Twitter, Send, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PublishService } from '../../services/PublishService';

interface DetailPreviewTextProps {
  onNavigate: (screen: string) => void;
  scheduleTime?: string;
  onChangeSchedule?: () => void;
  userId?: string | null;
}

export function DetailPreviewText({ onNavigate, scheduleTime = '', onChangeSchedule, userId }: DetailPreviewTextProps) {
  const [caption, setCaption] = useState('');
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
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E1306C' },
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
          Post Details
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
        {/* Status Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
            marginBottom: '20px',
            border: '1px solid rgba(131, 102, 255, 0.2)'
          }}
        >
          <Clock size={16} style={{ color: '#8366FF' }} />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#8366FF'
            }}
          >
            Scheduled for {displayScheduleTime}
          </span>
        </div>

        {/* Platform Tags */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#6B7280',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Publishing To
          </h3>
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
                    padding: '8px 14px',
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    border: '2px solid #E5E7EB',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <Icon size={18} style={{ color: platform.color }} />
                  <span
                    style={{
                      fontSize: '14px',
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

        {/* Caption Display */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            marginBottom: '20px'
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
            Caption
          </h3>
          <div
            style={{
              fontSize: '15px',
              color: '#000000',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          >
            {caption}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
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