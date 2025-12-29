import { CheckCircle2, Sparkles, Calendar } from 'lucide-react';

interface ScheduleUpdateSuccessProps {
  onNavigate: (screen: string) => void;
}

export function ScheduleUpdateSuccess({ onNavigate }: ScheduleUpdateSuccessProps) {
  // Auto-navigate after 4 seconds
  setTimeout(() => {
    onNavigate('calendar-view');
  }, 4000);

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
      <div
        style={{
          textAlign: 'center',
          marginBottom: '24px',
          animation: 'fadeInUp 0.6s ease-out 0.2s both'
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#000000',
            marginBottom: '12px'
          }}
        >
          Schedule Updated! 🎉
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: '#6B7280',
            lineHeight: '1.6',
            maxWidth: '320px',
            margin: '0 auto'
          }}
        >
          Your post schedule has been successfully updated
        </p>
      </div>

      {/* Calendar Icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
          border: '1px solid rgba(131, 102, 255, 0.2)',
          animation: 'fadeInUp 0.6s ease-out 0.4s both'
        }}
      >
        <Calendar size={20} style={{ color: '#8366FF' }} />
        <span
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#8366FF'
          }}
        >
          Returning to Calendar...
        </span>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
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

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes successGlow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes confetti {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(
              calc(-50% + ${Math.random() * 200 - 100}px),
              calc(-50% + ${Math.random() * 200 - 100}px)
            ) rotate(${Math.random() * 360}deg);
          }
        }
      `}</style>
    </div>
  );
}