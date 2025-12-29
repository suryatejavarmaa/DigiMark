import { ArrowLeft, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ComingSoonProps {
  onNavigate: (screen: string) => void;
  title: string;
}

export function ComingSoon({ onNavigate, title }: ComingSoonProps) {
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
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
        fontFamily: 'Outfit, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background Circles */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-150px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}
      />

      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-20px) scale(1.05);
            }
          }
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
          }
          @keyframes sparkle {
            0%, 100% {
              transform: rotate(0deg) scale(1);
              opacity: 1;
            }
            50% {
              transform: rotate(180deg) scale(1.2);
              opacity: 0.6;
            }
          }
        `}
      </style>

      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}
      >
        <button
          onClick={() => onNavigate('ads-campaign-objective')}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          <ArrowLeft size={20} style={{ color: '#FFFFFF' }} />
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          position: 'relative',
          zIndex: 10,
          transform: `scale(${scale})`,
          opacity: opacity,
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Sparkle Icon */}
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '30px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            animation: 'pulse 3s ease-in-out infinite',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Sparkles
            size={60}
            style={{
              color: '#FFFFFF',
              animation: 'sparkle 4s ease-in-out infinite'
            }}
          />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '12px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          {title}
        </h1>

        {/* Coming Soon Badge */}
        <div
          style={{
            padding: '12px 24px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            marginBottom: '20px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
          }}
        >
          <p
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#8366FF',
              margin: 0
            }}
          >
            Coming Soon
          </p>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            lineHeight: '1.6',
            maxWidth: '320px',
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          We're working hard to bring you this amazing feature. Stay tuned for updates!
        </p>

        {/* Animated Dots */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '32px'
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.8)',
                animation: `pulse 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div
        style={{
          padding: '20px',
          position: 'relative',
          zIndex: 10
        }}
      >
        <button
          onClick={() => onNavigate('ads-campaign-objective')}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            fontSize: '16px',
            fontWeight: 600,
            color: '#8366FF',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
          }}
        >
          Back to Campaign Options
        </button>
      </div>
    </div>
  );
}
