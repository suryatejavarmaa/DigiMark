import { CheckCircle, Calendar, Clock } from 'lucide-react';

interface PostScheduledProps {
  onViewCalendar: () => void;
  onBackToDashboard: () => void;
  scheduledDate?: string;
  scheduledTime?: string;
  postTitle?: string;
}

export function PostScheduled({
  onViewCalendar,
  onBackToDashboard,
  scheduledDate = "",
  scheduledTime = "10:00 AM",
  postTitle = "Holiday Sale Announcement"
}: PostScheduledProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F8F7FF 0%, #FFF 100%)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Outfit, sans-serif'
      }}
    >
      {/* Success Icon with Animation */}
      <div
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
          boxShadow: '0 20px 60px rgba(131, 102, 255, 0.4)',
          animation: 'successPulse 2s ease-in-out infinite'
        }}
      >
        <CheckCircle size={64} style={{ color: '#FFFFFF' }} />
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#1F2937',
          marginBottom: '12px',
          textAlign: 'center',
          fontFamily: 'Outfit, sans-serif'
        }}
      >
        Post Scheduled Successfully!
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: '16px',
          color: '#6B7280',
          marginBottom: '32px',
          textAlign: 'center',
          lineHeight: '1.5',
          maxWidth: '320px',
          fontFamily: 'Outfit, sans-serif'
        }}
      >
        Your post has been scheduled and will be published automatically
      </p>

      {/* Schedule Info Card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          width: '100%',
          maxWidth: '340px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Post Title */}
        <div style={{ marginBottom: '20px' }}>
          <p
            style={{
              fontSize: '12px',
              color: '#9CA3AF',
              marginBottom: '6px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 500
            }}
          >
            POST TITLE
          </p>
          <p
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#1F2937',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            {postTitle}
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: '#E5E7EB',
            marginBottom: '20px'
          }}
        />

        {/* Schedule Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#F3F0FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Calendar size={20} style={{ color: '#8366FF' }} />
            </div>
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: '#9CA3AF',
                  marginBottom: '2px',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                Scheduled Date
              </p>
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#1F2937',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                {scheduledDate}
              </p>
            </div>
          </div>

          {/* Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#F3F0FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Clock size={20} style={{ color: '#8366FF' }} />
            </div>
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: '#9CA3AF',
                  marginBottom: '2px',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                Scheduled Time
              </p>
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#1F2937',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                {scheduledTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          maxWidth: '340px'
        }}
      >
        {/* View Calendar Button */}
        <button
          onClick={onViewCalendar}
          style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8366FF 0%, #7C3AED 100%)',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(131, 102, 255, 0.4)',
            transition: 'all 0.3s ease'
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
          View Calendar
        </button>

        {/* Back to Dashboard Button */}
        <button
          onClick={onBackToDashboard}
          style={{
            padding: '16px',
            borderRadius: '12px',
            background: '#F3F4F6',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: '#6B7280',
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#E5E7EB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F3F4F6';
          }}
        >
          Back to Dashboard
        </button>
      </div>

      <style>
        {`
          @keyframes successPulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 20px 60px rgba(131, 102, 255, 0.4);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 25px 70px rgba(131, 102, 255, 0.5);
            }
          }
        `}
      </style>
    </div>
  );
}
