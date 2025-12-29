import { Check, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PublishingStateImageProps {
  onNavigate: (screen: string) => void;
  selectedPlatforms?: string[];
}

export function PublishingStateImage({ onNavigate, selectedPlatforms: propSelectedPlatforms }: PublishingStateImageProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<'optimizing' | 'connecting' | 'sending' | 'complete'>('optimizing');

  // Read platforms from localStorage if not provided via props
  const selectedPlatforms = propSelectedPlatforms && propSelectedPlatforms.length > 0
    ? propSelectedPlatforms
    : JSON.parse(localStorage.getItem('selectedPlatforms') || '["linkedin"]');

  // Platform data for display
  const platformData: Record<string, { name: string; icon: typeof Linkedin; color: string }> = {
    linkedin: { name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    facebook: { name: 'Facebook', icon: Facebook, color: '#1877F2' },
    instagram: { name: 'Instagram', icon: Instagram, color: '#E4405F' },
    twitter: { name: 'X (Twitter)', icon: Twitter, color: '#000000' },
    x: { name: 'X (Twitter)', icon: Twitter, color: '#000000' }
  };

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Step progression
    const stepTimer1 = setTimeout(() => setCurrentStep('connecting'), 1500);
    const stepTimer2 = setTimeout(() => setCurrentStep('sending'), 3000);
    const stepTimer3 = setTimeout(() => setCurrentStep('complete'), 4500);
    const navigationTimer = setTimeout(() => onNavigate('publishing-results-image'), 5500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      clearTimeout(navigationTimer);
    };
  }, [onNavigate]);

  const steps = [
    { id: 'optimizing', label: 'Image Optimizing', completed: currentStep !== 'optimizing' },
    { id: 'connecting', label: 'API Connecting', completed: currentStep !== 'optimizing' && currentStep !== 'connecting' },
    { id: 'sending', label: 'Sending', completed: currentStep === 'complete' }
  ];

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStep);

    if (stepIndex < currentIndex || currentStep === 'complete') {
      return 'completed';
    } else if (stepIndex === currentIndex) {
      return 'active';
    }
    return 'pending';
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
      {/* Animated Icon */}
      <div
        style={{
          marginBottom: '48px',
          position: 'relative'
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
            animation: 'pulse 2s ease-in-out infinite'
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <rect x="8" y="15" width="44" height="30" rx="4" fill="#8366FF" opacity="0.3" />
            <rect x="12" y="19" width="36" height="22" rx="2" fill="#8366FF">
              <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
            </rect>
            <circle cx="30" cy="30" r="6" fill="#FFFFFF">
              <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Glow Effect */}
        <div
          style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(131, 102, 255, 0.2) 0%, transparent 70%)',
            animation: 'glow 2s ease-in-out infinite',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Title */}
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
        Publishing Your Visual
      </h1>

      <p
        style={{
          fontSize: '14px',
          color: '#6B7280',
          fontFamily: 'Outfit, sans-serif',
          marginBottom: '48px',
          textAlign: 'center'
        }}
      >
        Optimizing and uploading your content...
      </p>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '320px',
          marginBottom: '32px'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '8px',
            background: '#E5E7EB',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
              borderRadius: '4px',
              transition: 'width 0.1s ease-out',
              width: `${progress}%`,
              boxShadow: '0 0 12px rgba(131, 102, 255, 0.6)'
            }}
          />
        </div>
        <div
          style={{
            textAlign: 'center',
            marginTop: '8px'
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#8366FF',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            {progress}%
          </span>
        </div>
      </div>

      {/* Step Sequence */}
      <div
        style={{
          width: '100%',
          maxWidth: '320px',
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          border: '1px solid #F3F4F6'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {steps.map((step) => {
            const status = getStepStatus(step.id);

            return (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                {/* Status Indicator */}
                {status === 'completed' ? (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                      flexShrink: 0
                    }}
                  >
                    <Check size={18} style={{ color: '#FFFFFF', strokeWidth: 3 }} />
                  </div>
                ) : status === 'active' ? (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '3px solid #8366FF',
                      borderTopColor: 'transparent',
                      animation: 'spin 1s linear infinite',
                      flexShrink: 0
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '2px solid #E5E7EB',
                      flexShrink: 0
                    }}
                  />
                )}

                {/* Label */}
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: status === 'active' ? 600 : 400,
                    color: status === 'completed' ? '#10B981' : status === 'active' ? '#8366FF' : '#6B7280',
                    fontFamily: 'Outfit, sans-serif',
                    transition: 'all 0.3s'
                  }}
                >
                  {step.label}
                </span>
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
      `}</style>
    </div>
  );
}
