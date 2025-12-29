import { ArrowLeft, Bold, Italic, Link2, Smile, AtSign, Hash, Sparkles, Clock, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AIService } from '../../services/AIService';
import { UserService } from '../../services/UserService';

interface EditScheduledPostTextProps {
  onNavigate: (screen: string) => void;
  scheduleTime?: string;
  onChangeSchedule?: () => void;
  userId?: string | null;
}

export function EditScheduledPostText({ onNavigate, scheduleTime = '', onChangeSchedule, userId }: EditScheduledPostTextProps) {
  const [caption, setCaption] = useState('');
  const [postId, setPostId] = useState('');
  const [displayScheduleTime, setDisplayScheduleTime] = useState(scheduleTime);
  const [isGenerating, setIsGenerating] = useState(false);
  const [platforms, setPlatforms] = useState<string[]>([]);

  // Load post data from localStorage on mount or when scheduleTime changes
  useEffect(() => {
    const editingPostData = localStorage.getItem('editingPost');
    if (editingPostData) {
      const post = JSON.parse(editingPostData);
      setCaption(post.content || '');
      setPostId(post.id || '');
      setPlatforms(post.platforms || ['linkedin']);
      if (post.scheduledAt) {
        const date = new Date(post.scheduledAt);
        setDisplayScheduleTime(date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }));
      }
    }
  }, [scheduleTime]); // Reload when scheduleTime prop changes (after returning from picker)

  // Generate AI Caption using user's business context
  const generateAICaption = async () => {
    if (!userId) {
      alert('Please log in to generate AI captions');
      return;
    }

    setIsGenerating(true);
    try {
      // Fetch user profile for company context
      const profile = await UserService.getUserProfile(userId);
      const businessContext = profile?.businessDescription || profile?.businessName || 'professional business';
      const platform = platforms[0] || 'linkedin';

      // Generate caption with business context
      const newCaption = await AIService.generateCaption(
        businessContext,
        platform,
        ['professional', 'engaging'],
        userId
      );

      setCaption(newCaption);
    } catch (error) {
      console.error('Error generating caption:', error);
      alert('Failed to generate caption. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle schedule time change
  const handleChangeSchedule = () => {
    // Store current post data for schedule picker to use
    const currentData = localStorage.getItem('editingPost');
    if (currentData) {
      // Update the editingPost with the current caption before saving
      const post = JSON.parse(currentData);
      post.content = caption; // Save the current caption state
      localStorage.setItem('editingPost', JSON.stringify(post));
      localStorage.setItem('editScheduleData', JSON.stringify(post));
    }
    // Use onChangeSchedule prop which sets returnScreen correctly
    if (onChangeSchedule) {
      onChangeSchedule();
    } else {
      onNavigate('schedule-picker');
    }
  };

  const formattingTools = [
    { icon: Bold, label: 'Bold', action: () => alert('Bold formatting') },
    { icon: Italic, label: 'Italic', action: () => alert('Italic formatting') },
    { icon: Link2, label: 'Link', action: () => alert('Add link') },
    { icon: Smile, label: 'Emoji', action: () => alert('Add emoji') },
    { icon: AtSign, label: 'Mention', action: () => alert('Add mention') },
    { icon: Hash, label: 'Hashtag', action: () => alert('Add hashtag') }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
        fontFamily: 'Outfit, sans-serif',
        paddingBottom: '180px'
      }}
    >
      {/* Custom Scrollbar Styles */}
      <style>{`
        textarea {
          scrollbar-width: thin;
          scrollbar-color: rgba(131, 102, 255, 0.3) rgba(243, 244, 246, 0.5);
        }
        
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        
        textarea::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.3);
          border-radius: 10px;
        }
        
        textarea::-webkit-scrollbar-thumb {
          background: rgba(131, 102, 255, 0.3);
          border-radius: 10px;
          transition: all 0.2s;
        }
        
        textarea::-webkit-scrollbar-thumb:hover {
          background: rgba(131, 102, 255, 0.5);
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}
      >
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
        <div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              margin: 0
            }}
          >
            Edit Post
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: '#6B7280',
              fontFamily: 'Outfit, sans-serif',
              margin: 0
            }}
          >
            Modify your scheduled content
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 20px' }}>
        {/* Schedule Info */}
        <div
          style={{
            background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            border: '1px solid rgba(131, 102, 255, 0.2)'
          }}
        >
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#8366FF',
              marginBottom: '4px'
            }}
          >
            Scheduled Post
          </div>
          <div
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: '#000000'
            }}
          >
            {displayScheduleTime || 'No scheduled time'}
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '12px',
            marginBottom: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto'
          }}
        >
          {formattingTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.label}
                onClick={tool.action}
                style={{
                  minWidth: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#F9FAFB',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#EDE9FE';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F9FAFB';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                title={tool.label}
              >
                <Icon size={18} style={{ color: '#6B7280' }} />
              </button>
            );
          })}
        </div>

        {/* Caption Editor */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            marginBottom: '20px'
          }}
        >
          <label
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#000000',
              display: 'block',
              marginBottom: '12px'
            }}
          >
            Caption Text
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{
              width: '100%',
              minHeight: '320px',
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid #E5E7EB',
              fontSize: '15px',
              fontFamily: 'Outfit, sans-serif',
              color: '#000000',
              lineHeight: '1.6',
              resize: 'vertical',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#8366FF';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(131, 102, 255, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.boxShadow = 'none';
            }}
            placeholder="Write your caption here..."
          />

          {/* Character Count */}
          <div
            style={{
              marginTop: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                fontSize: '13px',
                color: '#6B7280',
                fontWeight: 500
              }}
            >
              {caption.length} characters
            </div>
            <div
              style={{
                fontSize: '13px',
                color: caption.length > 2000 ? '#EF4444' : '#6B7280',
                fontWeight: 600
              }}
            >
              {caption.length > 2000 ? 'Character limit exceeded' : 'Recommended: Under 2000'}
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            marginBottom: '20px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#000000',
                margin: 0
              }}
            >
              AI Suggestions
            </h3>
            <button
              onClick={() => alert('Regenerate suggestions')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                color: '#8366FF',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              ✨ Improve
            </button>
          </div>
          <p
            style={{
              fontSize: '14px',
              color: '#6B7280',
              lineHeight: '1.5',
              margin: 0
            }}
          >
            Try adding more emojis to increase engagement, or use call-to-action phrases like "Shop Now" or "Learn More".
          </p>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
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
            Quick Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={generateAICaption}
              disabled={isGenerating}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                color: '#8366FF',
                cursor: isGenerating ? 'wait' : 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: isGenerating ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isGenerating) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 102, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isGenerating ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : '✨'}
              {isGenerating ? 'Generating...' : 'Generate AI Caption'}
            </button>
            <button
              onClick={handleChangeSchedule}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: '#F9FAFB',
                border: '2px solid #E5E7EB',
                fontSize: '14px',
                fontWeight: 600,
                color: '#6B7280',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F3F4F6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F9FAFB';
              }}
            >
              ⏰ Change Schedule Time
            </button>
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
          onClick={() => {
            // Save the updated caption to localStorage before navigating
            const currentData = localStorage.getItem('editingPost');
            if (currentData) {
              const updatedPost = JSON.parse(currentData);
              updatedPost.content = caption; // Use the current caption from state
              localStorage.setItem('editingPost', JSON.stringify(updatedPost));
            }
            onNavigate('detail-preview-text');
          }}
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
          Save Changes
        </button>
      </div>
    </div>
  );
}