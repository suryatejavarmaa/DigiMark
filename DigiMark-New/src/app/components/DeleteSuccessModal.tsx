import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

interface DeleteSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteSuccessModal({ isOpen, onClose }: DeleteSuccessModalProps) {
  // Auto-close after 2 seconds
  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '24px',
        fontFamily: 'Outfit, sans-serif'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '40px 32px',
          maxWidth: '360px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          animation: 'successSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Success Icon with Animation */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
            animation: 'checkPulse 0.6s ease-out'
          }}
        >
          <CheckCircle2 size={48} style={{ color: '#10B981' }} />
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#000000',
            fontFamily: 'Outfit, sans-serif',
            marginBottom: '12px'
          }}
        >
          Deleted Successfully! 🗑️
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: '15px',
            color: '#6B7280',
            fontFamily: 'Outfit, sans-serif',
            lineHeight: '1.5',
            marginBottom: 0
          }}
        >
          The scheduled post has been removed from your calendar.
        </p>

        {/* Loading Bar Animation */}
        <div
          style={{
            width: '100%',
            height: '4px',
            background: '#F3F4F6',
            borderRadius: '2px',
            marginTop: '24px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
              borderRadius: '2px',
              animation: 'progressBar 2s linear'
            }}
          />
        </div>

        <style>
          {`
            @keyframes successSlideIn {
              from {
                opacity: 0;
                transform: scale(0.8) translateY(30px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }

            @keyframes checkPulse {
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

            @keyframes progressBar {
              from {
                width: 0%;
              }
              to {
                width: 100%;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}