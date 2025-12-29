import { ArrowLeft, Menu, Linkedin, Facebook, Instagram, Twitter, Calendar, Clock, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { PublishService } from '../../services/PublishService';

interface SchedulePreviewProps {
  onNavigate: (screen: string) => void;
  scheduledDate?: string;
  scheduledTime?: string;
  caption?: string;
  selectedPlatforms?: string[];
  imageUrl?: string;
  userId?: string | null;
  onScheduleComplete?: (result: any) => void;
}

const platformConfig: Record<string, { name: string; icon: any; color: string }> = {
  linkedin: { name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
  facebook: { name: 'Facebook', icon: Facebook, color: '#1877F2' },
  instagram: { name: 'Instagram', icon: Instagram, color: '#E4405F' },
  x: { name: 'X (Twitter)', icon: Twitter, color: '#000000' },
  twitter: { name: 'X (Twitter)', icon: Twitter, color: '#000000' },
};

export function SchedulePreview({
  onNavigate,
  scheduledDate = 'Select a date',
  scheduledTime = 'Select time',
  caption: propCaption,
  selectedPlatforms: propPlatforms,
  imageUrl: propImageUrl,
  userId,
  onScheduleComplete
}: SchedulePreviewProps) {
  const [isScheduling, setIsScheduling] = useState(false);

  // Read from localStorage if props not provided (unified flow)
  const caption = propCaption || localStorage.getItem('publishCaption') || 'No caption provided';
  const storedPlatforms = localStorage.getItem('selectedPlatforms');
  console.log('[SchedulePreview] localStorage selectedPlatforms:', storedPlatforms);
  // ALWAYS use localStorage for platforms (props can be stale)
  const selectedPlatformIds = storedPlatforms ? JSON.parse(storedPlatforms) : ['linkedin'];
  console.log('[SchedulePreview] Using platform IDs:', selectedPlatformIds);
  const imageUrl = propImageUrl || localStorage.getItem('publishImageUrl') || undefined;

  // Map platform IDs to display data
  const selectedPlatforms = selectedPlatformIds.map((id: string) => platformConfig[id] || { name: id, icon: Linkedin, color: '#6B7280' });
  console.log('[SchedulePreview] Mapped platforms for display:', selectedPlatforms);

  const characterCount = caption.length;
  const hashtagCount = (caption.match(/#/g) || []).length;
  const platformCount = selectedPlatforms.length;

  const handleSchedule = async () => {
    if (!scheduledDate || scheduledDate === 'Select a date') {
      alert('Please select a date first');
      return;
    }

    setIsScheduling(true);
    try {
      // Build ISO date from scheduledDate + scheduledTime
      // Format from SchedulePicker: "December 20, 2024 at 10:00 AM"
      const fullDateTime = `${scheduledDate} at ${scheduledTime}`;
      const scheduledAt = new Date(fullDateTime.replace(' at ', ' ')).toISOString();

      const result = await PublishService.schedulePost(
        userId || localStorage.getItem('digimark_user_id') || '',
        selectedPlatformIds,
        caption,
        scheduledAt,
        imageUrl
      );

      if (result.success) {
        // Store result for confirmation screen
        localStorage.setItem('scheduleResult', JSON.stringify(result));
        if (onScheduleComplete) onScheduleComplete(result);
        onNavigate('schedule-confirmation');
      } else {
        alert(result.error || 'Failed to schedule post');
      }
    } catch (error) {
      console.error('Schedule error:', error);
      alert('Failed to schedule post');
    } finally {
      setIsScheduling(false);
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
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <button
          onClick={() => onNavigate('schedule-picker')}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ArrowLeft size={24} style={{ color: '#000000' }} />
        </button>

        <h1
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#000000',
            margin: 0
          }}
        >
          Preview Post
        </h1>

        <button
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(131, 102, 255, 0.3)'
          }}
        >
          <Menu size={20} style={{ color: '#FFFFFF' }} />
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '24px 20px' }}>
        {/* Subtitle */}
        <p
          style={{
            fontSize: '14px',
            color: '#8366FF',
            fontWeight: 600,
            marginBottom: '24px'
          }}
        >
          Review your post before scheduling
        </p>

        {/* Preview Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 8px 24px rgba(131, 102, 255, 0.12)',
            marginBottom: '20px'
          }}
        >
          {/* Platform Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: '#F0F4FF',
              borderRadius: '20px',
              marginBottom: '16px'
            }}
          >
            {selectedPlatforms.map((platform: { name: string; icon: any; color: string }) => {
              const Icon = platform.icon;
              return (
                <div key={platform.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon size={16} style={{ color: platform.color }} />
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: platform.color
                    }}
                  >
                    {platform.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Scheduled Date & Time */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px',
              padding: '12px',
              background: '#F8F6FF',
              borderRadius: '12px',
              border: '1px solid #E9E3FF'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} style={{ color: '#8366FF' }} />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#8366FF'
                }}
              >
                {scheduledDate}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} style={{ color: '#8366FF' }} />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#8366FF'
                }}
              >
                {scheduledTime}
              </span>
            </div>
          </div>

          {/* Caption Preview */}
          <div
            style={{
              padding: '16px',
              background: '#FAFAFA',
              borderRadius: '12px',
              marginBottom: '20px',
              border: '1px solid #F0F0F0'
            }}
          >
            <p
              style={{
                fontSize: '14px',
                color: '#1F2937',
                lineHeight: '1.6',
                margin: 0,
                whiteSpace: 'pre-wrap'
              }}
            >
              {caption}
            </p>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '16px',
              background: '#F8F6FF',
              borderRadius: '12px'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#8366FF',
                  marginBottom: '4px'
                }}
              >
                {characterCount}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#6B7280',
                  fontWeight: 500
                }}
              >
                Characters
              </div>
            </div>

            <div
              style={{
                width: '1px',
                height: '40px',
                background: '#E9E3FF'
              }}
            />

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#8366FF',
                  marginBottom: '4px'
                }}
              >
                {hashtagCount}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#6B7280',
                  fontWeight: 500
                }}
              >
                Hashtags
              </div>
            </div>

            <div
              style={{
                width: '1px',
                height: '40px',
                background: '#E9E3FF'
              }}
            />

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#8366FF',
                  marginBottom: '4px'
                }}
              >
                {platformCount}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#6B7280',
                  fontWeight: 500
                }}
              >
                Platforms
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tip */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            borderRadius: '16px',
            padding: '16px',
            border: '2px solid #FDE68A',
            display: 'flex',
            gap: '12px'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              flexShrink: 0
            }}
          >
            <Lightbulb size={24} style={{ color: '#F59E0B' }} />
          </div>
          <div>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#92400E',
                marginBottom: '6px'
              }}
            >
              Pro Tip
            </h4>
            <p
              style={{
                fontSize: '13px',
                color: '#78350F',
                lineHeight: '1.5',
                margin: 0
              }}
            >
              Posts with 3-5 hashtags typically get 12% more engagement than those without.
            </p>
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
          onClick={handleSchedule}
          disabled={isScheduling}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: isScheduling ? '#9CA3AF' : 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
            fontFamily: 'Outfit, sans-serif',
            cursor: isScheduling ? 'not-allowed' : 'pointer',
            boxShadow: isScheduling ? 'none' : '0 8px 24px rgba(131, 102, 255, 0.4)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!isScheduling) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(131, 102, 255, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isScheduling) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(131, 102, 255, 0.4)';
            }
          }}
        >
          {isScheduling ? 'Scheduling...' : 'Schedule Post'}
        </button>
      </div>
    </div>
  );
}