import { Rocket, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CampaignReadyProps {
  onNavigate: (screen: string) => void;
}

export function CampaignReady({ onNavigate }: CampaignReadyProps) {
  const [scale, setScale] = useState(0.8);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Entry animation
    setTimeout(() => {
      setScale(1);
      setOpacity(1);
    }, 100);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        fontFamily: 'Outfit, sans-serif',
        padding: '20px',
        opacity: opacity,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      <style>
        {`
          @keyframes rocketFloat {
            0%, 100% {
              transform: translateY(0) rotate(-5deg);
            }
            50% {
              transform: translateY(-15px) rotate(5deg);
            }
          }
          @keyframes glowPulse {
            0%, 100% {
              box-shadow: 0 0 30px rgba(131, 102, 255, 0.4), 0 0 60px rgba(131, 102, 255, 0.2);
            }
            50% {
              box-shadow: 0 0 40px rgba(131, 102, 255, 0.6), 0 0 80px rgba(131, 102, 255, 0.3);
            }
          }
          @keyframes sparkle {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(0.8);
            }
          }
        `}
      </style>

      {/* Modal Content */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '40px 24px',
          maxWidth: '380px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
          transform: `scale(${scale})`,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          textAlign: 'center'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => onNavigate('dashboard')}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
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
            e.currentTarget.style.background = '#F3F4F6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F9FAFB';
          }}
        >
          <X size={18} style={{ color: '#6B7280' }} />
        </button>

        {/* 3D Rocket Icon in Lavender Circle */}
        <div
          style={{
            width: '140px',
            height: '140px',
            margin: '0 auto 24px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            animation: 'glowPulse 3s ease-in-out infinite'
          }}
        >
          {/* Decorative Sparkles */}
          <div
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#8366FF',
              animation: 'sparkle 2s ease-in-out infinite'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#8366FF',
              animation: 'sparkle 2s ease-in-out infinite 0.5s'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '10px',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#A78BFA',
              animation: 'sparkle 2s ease-in-out infinite 1s'
            }}
          />

          {/* Rocket Icon */}
          <div
            style={{
              animation: 'rocketFloat 3s ease-in-out infinite'
            }}
          >
            <Rocket
              size={64}
              style={{
                color: '#8366FF',
                filter: 'drop-shadow(0 4px 8px rgba(131, 102, 255, 0.3))'
              }}
            />
          </div>
        </div>

        {/* Success Title */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#000000',
            marginBottom: '12px',
            lineHeight: '1.2'
          }}
        >
          Campaign Ready! 🎉
        </h1>

        {/* Deployment Message */}
        <p
          style={{
            fontSize: '16px',
            color: '#6B7280',
            lineHeight: '1.6',
            marginBottom: '32px',
            maxWidth: '300px',
            margin: '0 auto 32px'
          }}
        >
          Your campaign has been successfully configured and is ready to launch. Start reaching your target audience now!
        </p>

        {/* Status Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            border: '2px solid #10B981',
            marginBottom: '32px'
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981',
              animation: 'sparkle 1.5s ease-in-out infinite'
            }}
          />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#10B981'
            }}
          >
            Deployment Successful
          </span>
        </div>

        {/* Back to Dashboard Button */}
        <button
          onClick={() => onNavigate('dashboard')}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
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
          Back to Dashboard
        </button>

        {/* Additional Info */}
        <p
          style={{
            fontSize: '13px',
            color: '#9CA3AF',
            marginTop: '16px',
            lineHeight: '1.5'
          }}
        >
          You can monitor campaign performance from your dashboard
        </p>
      </div>
    </div>
  );
}
