import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GeneratingImagesProps {
  onNavigate: (screen: string) => void;
}

export function GeneratingImages({ onNavigate }: GeneratingImagesProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Spinner animation
    const animationInterval = setInterval(() => {
      setRotation((prev) => (prev + 2) % 360);
    }, 16);

    // Auto-navigate to generated images after 4 seconds
    const timer = setTimeout(() => {
      onNavigate('generated-images');
    }, 4000);

    return () => {
      clearInterval(animationInterval);
      clearTimeout(timer);
    };
  }, [onNavigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F6FF 100%)',
        fontFamily: 'Outfit, sans-serif'
      }}
    >
      {/* Spinner Container */}
      <div
        style={{
          position: 'relative',
          width: '120px',
          height: '120px',
          marginBottom: '32px'
        }}
      >
        {/* Outer Spinning Ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '4px solid transparent',
            borderTopColor: '#8366FF',
            borderRightColor: '#8366FF',
            transform: `rotate(${rotation}deg)`,
            boxShadow: '0 0 24px rgba(131, 102, 255, 0.3)'
          }}
        />

        {/* Inner Circle with Sparkles Icon */}
        <div
          style={{
            position: 'absolute',
            inset: '12px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(131, 102, 255, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.2)'
          }}
        >
          <Sparkles size={48} style={{ color: '#FFFFFF' }} />
        </div>

        {/* Pulsing Glow */}
        <div
          style={{
            position: 'absolute',
            inset: '-12px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(131, 102, 255, 0.2) 0%, rgba(131, 102, 255, 0) 70%)',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
      </div>

      {/* Main Text */}
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
        Creating Your Posters
      </h1>

      {/* Subtext */}
      <p
        style={{
          fontSize: '16px',
          color: '#3B3A47',
          fontFamily: 'Outfit, sans-serif',
          textAlign: 'center'
        }}
      >
        Our AI Artist is painting your ideas...
      </p>

      {/* CSS Animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
