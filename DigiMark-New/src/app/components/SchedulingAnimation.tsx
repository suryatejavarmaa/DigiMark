import { Calendar, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SchedulingAnimationProps {
  selectedPlatforms: string[];
  onNavigate: (screen: string) => void;
  scheduledTime?: string;
}

export function SchedulingAnimation({ selectedPlatforms, onNavigate, scheduledTime = '' }: SchedulingAnimationProps) {
  const [platformStatuses, setPlatformStatuses] = useState<{ [key: string]: boolean }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Simulate scheduling to each platform
    const schedulePlatforms = async () => {
      for (let i = 0; i < selectedPlatforms.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1200));
        setPlatformStatuses(prev => ({
          ...prev,
          [selectedPlatforms[i]]: true
        }));
      }

      // Show success state
      setTimeout(() => {
        setShowSuccess(true);
      }, 500);

      // Navigate to calendar view after success
      setTimeout(() => {
        onNavigate('calendar-view');
      }, 2000);
    };

    schedulePlatforms();
  }, [selectedPlatforms, onNavigate]);

  const platformNames: { [key: string]: string } = {
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    instagram: 'Instagram',
    x: 'X (Twitter)'
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
      {/* Animated Calendar Icon */}
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
            background: showSuccess
              ? 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)'
              : 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: showSuccess
              ? '0 0 60px rgba(16, 185, 129, 0.4), 0 8px 32px rgba(16, 185, 129, 0.3)'
              : '0 0 60px rgba(131, 102, 255, 0.4), 0 8px 32px rgba(131, 102, 255, 0.3)',
            animation: 'pulse 2s ease-in-out infinite',
            transition: 'all 0.5s'
          }}
        >
          {showSuccess ? (
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'scaleIn 0.5s ease-out'
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.6667 8L12 22.6667L5.33333 16"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <Calendar
              size={48}
              style={{
                color: '#8366FF',
                animation: 'float 3s ease-in-out infinite'
              }}
            />
          )}
        </div>

        {/* Glow Effect */}
        <div
          style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '50%',
            background: showSuccess
              ? 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(131, 102, 255, 0.2) 0%, transparent 70%)',
            animation: 'glow 2s ease-in-out infinite',
            pointerEvents: 'none',
            transition: 'all 0.5s'
          }}
        />
      </div>

      {/* Scheduling Text */}
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#000000',
          fontFamily: 'Outfit, sans-serif',
          marginBottom: '12px',
          textAlign: 'center',
          transition: 'all 0.3s'
        }}
      >
        {showSuccess ? 'Successfully Scheduled!' : 'Scheduling Your Post'}
      </h1>

      <p
        style={{
          fontSize: '14px',
          color: '#6B7280',
          fontFamily: 'Outfit, sans-serif',
          marginBottom: '16px',
          textAlign: 'center'
        }}
      >
        {showSuccess ? `Post scheduled for ${scheduledTime}` : 'Setting up your scheduled post...'}
      </p>

      {/* Scheduled Time Badge */}
      {!showSuccess && (
        <div
          style={{
            background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
            borderRadius: '12px',
            padding: '12px 20px',
            marginBottom: '48px',
            border: '1px solid rgba(131, 102, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Calendar size={16} style={{ color: '#8366FF' }} />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#8366FF',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            {scheduledTime}
          </span>
        </div>
      )}

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
          {selectedPlatforms.map((platform) => {
            const isScheduled = platformStatuses[platform];
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
                    color: isScheduled ? '#10B981' : '#000000',
                    fontFamily: 'Outfit, sans-serif',
                    transition: 'color 0.3s'
                  }}
                >
                  {platformNames[platform] || platform}
                </span>

                {isScheduled ? (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                      animation: 'scaleIn 0.3s ease-out'
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
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
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

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
