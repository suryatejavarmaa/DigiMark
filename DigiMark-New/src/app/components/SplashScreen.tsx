import { useEffect } from 'react';
import { Hexagon } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        background: 'linear-gradient(to bottom, #FFFFFF, #EDE9FE)',
        fontFamily: 'Outfit, sans-serif'
      }}
    >
      {/* Glowing Hexagonal Logo with Animations */}
      <div className="relative mb-8">
        {/* Pulsing Glow Effect */}
        <div 
          className="absolute inset-0 blur-3xl opacity-60"
          style={{ 
            background: '#8366FF',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
        
        {/* Rotating Outer Ring */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '140px',
            height: '140px',
            border: '2px solid rgba(131, 102, 255, 0.3)',
            borderRadius: '50%',
            animation: 'rotate 3s linear infinite'
          }}
        />
        
        {/* Animated Hexagon Icon */}
        <Hexagon 
          className="relative"
          size={120} 
          strokeWidth={3}
          style={{ 
            color: '#8366FF',
            filter: 'drop-shadow(0 0 40px rgba(131, 102, 255, 0.8))',
            animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite'
          }}
        />
        
        {/* Orbiting Dots */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '8px',
            height: '8px',
            background: '#8366FF',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 2s linear infinite'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '6px',
            height: '6px',
            background: '#A78BFA',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 2s linear infinite reverse',
            animationDelay: '1s'
          }}
        />
      </div>

      {/* App Name with Fade In */}
      <h1 
        className="mb-32"
        style={{
          fontSize: '32px',
          fontWeight: 800,
          color: '#000000',
          fontFamily: 'Outfit, sans-serif',
          letterSpacing: '0.5px',
          animation: 'fadeInUp 1s ease-out'
        }}
      >
        Digi Mark
      </h1>

      {/* Progress Bar */}
      <div className="w-full max-w-xs">
        <div 
          className="h-1.5 overflow-hidden"
          style={{
            background: '#EDE9FE',
            borderRadius: '8px'
          }}
        >
          <div 
            className="h-full animate-[loading_2s_ease-in-out_infinite]"
            style={{
              background: 'linear-gradient(90deg, #8366FF, #A78BFA, #8366FF)',
              backgroundSize: '200% 100%',
              borderRadius: '8px',
              animation: 'loading 2s ease-in-out infinite, shimmer 1.5s ease-in-out infinite'
            }}
          />
        </div>
        <p 
          className="mt-3 text-center"
          style={{
            fontSize: '14px',
            color: '#3B3A47',
            fontFamily: 'Outfit, sans-serif',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        >
          Loading...
        </p>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 0.9;
            transform: scale(1.05);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(-5px) rotate(-5deg);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 40px rgba(131, 102, 255, 0.8));
          }
          50% {
            filter: drop-shadow(0 0 60px rgba(131, 102, 255, 1));
          }
        }
        
        @keyframes rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) translateX(70px) translateY(0);
          }
          25% {
            transform: translate(-50%, -50%) translateX(0) translateY(-70px);
          }
          50% {
            transform: translate(-50%, -50%) translateX(-70px) translateY(0);
          }
          75% {
            transform: translate(-50%, -50%) translateX(0) translateY(70px);
          }
          100% {
            transform: translate(-50%, -50%) translateX(70px) translateY(0);
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
        
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}