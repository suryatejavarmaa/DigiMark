import { CheckCircle2, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ScheduleConfirmationProps {
  onNavigate: (screen: string) => void;
  scheduledDateTime?: string;
}

export function ScheduleConfirmation({ onNavigate, scheduledDateTime: propDateTime }: ScheduleConfirmationProps) {
  const [displayTime, setDisplayTime] = useState('');

  useEffect(() => {
    if (propDateTime) {
      setDisplayTime(propDateTime);
    } else {
      // Read from localStorage (set by SchedulePreview)
      const scheduleResult = localStorage.getItem('scheduleResult');
      if (scheduleResult) {
        const result = JSON.parse(scheduleResult);
        if (result.scheduledAt) {
          const date = new Date(result.scheduledAt);
          setDisplayTime(date.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          }));
        }
      }
    }
  }, [propDateTime]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
        fontFamily: 'Outfit, sans-serif',
        padding: '24px'
      }}
    >
      {/* Clock with Checkmark Icon */}
      <div
        style={{
          marginBottom: '32px',
          position: 'relative',
          animation: 'scaleIn 0.5s ease-out'
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
            position: 'relative'
          }}
        >
          {/* Clock Icon */}
          <Clock
            size={56}
            style={{
              color: '#8366FF',
              strokeWidth: 2.5
            }}
          />

          {/* Checkmark Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '-4px',
              right: '-4px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
              border: '3px solid #FFFFFF'
            }}
          >
            <CheckCircle2 size={24} style={{ color: '#FFFFFF' }} />
          </div>

          {/* Glow Effect */}
          <div
            style={{
              position: 'absolute',
              inset: '-30px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(131, 102, 255, 0.3) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>

      {/* Success Message */}
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
        Post Scheduled!
      </h1>

      <p
        style={{
          fontSize: '15px',
          color: '#6B7280',
          fontFamily: 'Outfit, sans-serif',
          marginBottom: '8px',
          textAlign: 'center'
        }}
      >
        Your post is scheduled for
      </p>

      {/* Scheduled Date/Time */}
      <div
        style={{
          background: 'linear-gradient(135deg, #F8F6FF 0%, #EDE9FE 100%)',
          borderRadius: '16px',
          padding: '20px 32px',
          marginBottom: '48px',
          border: '2px solid #8366FF20',
          boxShadow: '0 4px 16px rgba(131, 102, 255, 0.15)'
        }}
      >
        <p
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#8366FF',
            fontFamily: 'Outfit, sans-serif',
            textAlign: 'center'
          }}
        >
          {displayTime || 'Scheduled successfully'}
        </p>
      </div>

      {/* Action Button */}
      <div
        style={{
          width: '100%',
          maxWidth: '320px'
        }}
      >
        <button
          onClick={() => onNavigate('calendar-view')}
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
          Got it!
        </button>

        {/* View Calendar Link */}
        <button
          onClick={() => onNavigate('calendar-view')}
          style={{
            width: '100%',
            padding: '16px',
            background: 'transparent',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            color: '#8366FF',
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            marginTop: '8px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#6D4FCC';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#8366FF';
          }}
        >
          View Marketing Calendar
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
      `}</style>
    </div>
  );
}
