import { CheckCircle2, Sparkles } from 'lucide-react';

interface PublishingResultsImageProps {
  onNavigate: (screen: string) => void;
}

export function PublishingResultsImage({ onNavigate }: PublishingResultsImageProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
        fontFamily: 'Outfit, sans-serif',
        padding: '24px'
      }}
    >
      {/* Celebratory Success Icon */}
      <div
        style={{
          marginBottom: '32px',
          animation: 'scaleIn 0.5s ease-out',
          position: 'relative'
        }}
      >
        <div
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 60px rgba(131, 102, 255, 0.5), 0 8px 32px rgba(131, 102, 255, 0.4)',
            position: 'relative'
          }}
        >
          <CheckCircle2
            size={72}
            style={{
              color: '#8366FF',
              strokeWidth: 2.5
            }}
          />

          {/* Sparkle Effects */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 90}deg) translate(80px, -50%)`,
                animation: `sparkle 1.5s ease-in-out ${i * 0.2}s infinite`
              }}
            >
              <Sparkles
                size={20}
                style={{
                  color: '#8366FF',
                  filter: 'drop-shadow(0 0 4px rgba(131, 102, 255, 0.8))'
                }}
              />
            </div>
          ))}

          {/* Success Glow */}
          <div
            style={{
              position: 'absolute',
              inset: '-40px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(131, 102, 255, 0.3) 0%, transparent 70%)',
              pointerEvents: 'none',
              animation: 'successGlow 2s ease-in-out infinite'
            }}
          />
        </div>

        {/* Confetti particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`confetti-${i}`}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              background: ['#8366FF', '#A78BFA', '#DDD6FE'][i % 3],
              borderRadius: i % 2 === 0 ? '50%' : '2px',
              top: '50%',
              left: '50%',
              animation: `confetti 1.5s ease-out ${i * 0.1}s forwards`,
              opacity: 0
            }}
          />
        ))}
      </div>

      {/* Success Message */}
      <h1
        style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#000000',
          fontFamily: 'Outfit, sans-serif',
          marginBottom: '12px',
          textAlign: 'center',
          animation: 'fadeInUp 0.6s ease-out 0.2s backwards'
        }}
      >
        Success! 🎉
      </h1>

      <p
        style={{
          fontSize: '15px',
          color: '#6B7280',
          fontFamily: 'Outfit, sans-serif',
          marginBottom: '48px',
          textAlign: 'center',
          maxWidth: '320px',
          lineHeight: '1.5',
          animation: 'fadeInUp 0.6s ease-out 0.3s backwards'
        }}
      >
        Your brand visual is now live! Your audience will love this stunning design.
      </p>

      {/* Action Buttons */}
      <div
        style={{
          width: '100%',
          maxWidth: '320px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          animation: 'fadeInUp 0.6s ease-out 0.4s backwards'
        }}
      >
        {/* Back to Dashboard - Primary */}
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
          Back to Dashboard
        </button>

        {/* View Live Post - Secondary */}
        <button
          onClick={() => alert('View Live Post - Opens external link')}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: '#FFFFFF',
            border: '2px solid #8366FF',
            fontSize: '16px',
            fontWeight: 600,
            color: '#8366FF',
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F8F6FF';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 102, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          View Live Post
        </button>

        {/* View Analytics - Tertiary */}
        <button
          onClick={() => alert('View Analytics - Feature coming soon!')}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            background: 'transparent',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            color: '#6B7280',
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#8366FF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#6B7280';
          }}
        >
          View Performance Analytics
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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes successGlow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.15);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }

        @keyframes confetti {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) 
              translate(
                ${Math.random() * 200 - 100}px, 
                ${Math.random() * 200 - 100}px
              ) 
              rotate(${Math.random() * 360}deg);
          }
        }
      `}</style>
    </div>
  );
}