import { X, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  icon: typeof Linkedin;
}

interface ConnectAccountModalProps {
  isOpen: boolean;
  selectedPlatforms: Platform[];
  onConnect: () => void;
  onClose: () => void;
}

export function ConnectAccountModal({ isOpen, selectedPlatforms, onConnect, onClose }: ConnectAccountModalProps) {
  if (!isOpen) return null;
  
  const platformText = selectedPlatforms.length === 1 
    ? selectedPlatforms[0].name
    : selectedPlatforms.length === 2
    ? `${selectedPlatforms[0].name} and ${selectedPlatforms[1].name}`
    : `${selectedPlatforms.length} platforms`;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '400px',
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '32px 24px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(131, 102, 255, 0.2)',
            animation: 'slideUp 0.3s ease-out',
            position: 'relative'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
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
            <X size={18} style={{ color: '#000000' }} />
          </button>

          {/* Icon - Stacked Platform Icons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              position: 'relative',
              height: '64px',
              width: selectedPlatforms.length === 1 ? '64px' : `${64 + (selectedPlatforms.length - 1) * 20}px`
            }}
          >
            {selectedPlatforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <div
                  key={platform.id}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: platform.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: '3px solid #FFFFFF',
                    position: selectedPlatforms.length > 1 ? 'absolute' : 'relative',
                    left: selectedPlatforms.length > 1 ? `${index * 20}px` : '0',
                    zIndex: selectedPlatforms.length - index,
                    transition: 'all 0.3s'
                  }}
                >
                  <Icon size={28} style={{ color: platform.color }} />
                </div>
              );
            })}
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              textAlign: 'center',
              marginBottom: '12px'
            }}
          >
            Connect Account to Post
          </h2>

          {/* Message */}
          <p
            style={{
              fontSize: '14px',
              color: '#3B3A47',
              fontFamily: 'Outfit, sans-serif',
              textAlign: 'center',
              marginBottom: '28px',
              lineHeight: '1.6'
            }}
          >
            You need to connect your {platformText} account to publish content. This will allow
            DigiMark to post on your behalf.
          </p>

          {/* Connect Button */}
          <button
            onClick={onConnect}
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
              transition: 'all 0.2s',
              marginBottom: '12px'
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
            Connect Now
          </button>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              background: 'transparent',
              border: 'none',
              fontSize: '14px',
              fontWeight: 600,
              color: '#9CA3AF',
              fontFamily: 'Outfit, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9CA3AF';
            }}
          >
            Maybe Later
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}