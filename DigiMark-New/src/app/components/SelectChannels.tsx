import { ArrowLeft, Check, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useState } from 'react';
import { ConnectAccountModal } from './ConnectAccountModal';
import { SocialService } from '../../services/SocialService';

export interface Platform {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  icon: typeof Linkedin;
}

interface SelectChannelsProps {
  onNavigate: (screen: string) => void;
  onConnectOAuth?: (platform: string) => void;
  caption?: string;
}

export function SelectChannels({ onNavigate, onConnectOAuth, caption }: SelectChannelsProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showConnectModal, setShowConnectModal] = useState(false);
  // Use SocialService to check which platforms are connected
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>(() => {
    const connected: string[] = [];
    ['linkedin', 'facebook', 'instagram', 'x', 'twitter'].forEach(p => {
      if (SocialService.isConnected(p)) {
        connected.push(p);
      }
    });
    return connected;
  });
  const [platformToConnect, setPlatformToConnect] = useState<string>('');

  const platforms: Platform[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      color: '#0A66C2',
      bgColor: '#EDF3F8',
      icon: Linkedin
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      color: '#000000',
      bgColor: '#F3F4F6',
      icon: Twitter
    },
    {
      id: 'facebook',
      name: 'Facebook',
      color: '#1877F2',
      bgColor: '#EBF3FF',
      icon: Facebook
    },
    {
      id: 'instagram',
      name: 'Instagram',
      color: '#E4405F',
      bgColor: '#FDEEF2',
      icon: Instagram
    }
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handlePublishNow = () => {
    // Store selected platforms and caption in localStorage for preview
    localStorage.setItem('selectedPlatforms', JSON.stringify(selectedPlatforms));
    if (caption) localStorage.setItem('publishCaption', caption);

    // Check if selected platforms have connected accounts using SocialService
    const unconnectedPlatforms = selectedPlatforms.filter(
      id => !SocialService.isConnected(id) && !SocialService.isConnected(id === 'x' ? 'twitter' : id)
    );

    if (unconnectedPlatforms.length > 0) {
      setPlatformToConnect(unconnectedPlatforms[0]);
      setShowConnectModal(true);
    } else {
      onNavigate('preview-post');
    }
  };

  const handleConnectAccounts = () => {
    // Trigger real OAuth redirect if callback provided
    if (onConnectOAuth) {
      const oauthPlatform = platformToConnect === 'x' ? 'twitter' : platformToConnect;
      setShowConnectModal(false);
      onConnectOAuth(oauthPlatform);
      return;
    }

    // Fallback: Just mark as connected locally (demo mode)
    SocialService.connect(platformToConnect);
    setConnectedAccounts(prev => [
      ...prev,
      ...selectedPlatforms.filter(id => !prev.includes(id))
    ]);
    setShowConnectModal(false);
    onNavigate('preview-post');
  };

  const getSelectedPlatformsData = () => {
    return platforms.filter(p => selectedPlatforms.includes(p.id));
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: '#FFFFFF',
        fontFamily: 'Outfit, sans-serif'
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-6"
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #F3F4F6'
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('generated-caption')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: '#F9FAFB',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={20} style={{ color: '#000000' }} />
          </button>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Post to Socials
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Instruction Text */}
        <p
          style={{
            fontSize: '14px',
            color: '#3B3A47',
            fontFamily: 'Outfit, sans-serif',
            marginBottom: '24px'
          }}
        >
          Select the platforms where you want to post your content
        </p>

        {/* Platform Selection */}
        <div className="space-y-4">
          {platforms.map((platform) => {
            const isSelected = selectedPlatforms.includes(platform.id);
            return (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                style={{
                  width: '100%',
                  padding: '20px',
                  borderRadius: '16px',
                  background: isSelected
                    ? 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)'
                    : '#FFFFFF',
                  border: isSelected ? '2px solid #8366FF' : '2px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: isSelected
                    ? '0 4px 16px rgba(131, 102, 255, 0.2)'
                    : '0 2px 8px rgba(0, 0, 0, 0.05)',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#8366FF';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 102, 255, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                  }
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Platform Icon */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: platform.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <platform.icon size={24} style={{ color: platform.color }} />
                  </div>

                  {/* Platform Name */}
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#000000',
                      fontFamily: 'Outfit, sans-serif'
                    }}
                  >
                    {platform.name}
                  </span>
                </div>

                {/* Toggle Switch */}
                <div
                  style={{
                    width: '52px',
                    height: '28px',
                    borderRadius: '14px',
                    background: isSelected ? '#8366FF' : '#E5E7EB',
                    position: 'relative',
                    transition: 'all 0.2s',
                    boxShadow: isSelected ? '0 2px 8px rgba(131, 102, 255, 0.3)' : 'none'
                  }}
                >
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      position: 'absolute',
                      top: '3px',
                      left: isSelected ? '27px' : '3px',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {isSelected && <Check size={14} style={{ color: '#8366FF' }} />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Count */}
        {selectedPlatforms.length > 0 && (
          <div
            style={{
              marginTop: '24px',
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #EDE9FE 0%, #F8F6FF 100%)',
              border: '1px solid #8366FF20'
            }}
          >
            <p
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#8366FF',
                fontFamily: 'Outfit, sans-serif',
                textAlign: 'center'
              }}
            >
              {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''} selected
            </p>
          </div>
        )}
      </div>

      {/* Fixed Bottom Actions */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: '480px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid #F3F4F6',
          padding: '20px 24px'
        }}
      >
        <div className="flex gap-3">
          {/* Schedule Button - Secondary */}
          <button
            onClick={() => {
              // Save selected platforms before navigating
              console.log('[SelectChannels] Saving platforms to localStorage:', selectedPlatforms);
              localStorage.setItem('selectedPlatforms', JSON.stringify(selectedPlatforms));
              if (caption) localStorage.setItem('publishCaption', caption);
              console.log('[SelectChannels] Saved successfully, navigating to schedule-picker');
              onNavigate('schedule-picker');
            }}
            disabled={selectedPlatforms.length === 0}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: '12px',
              background: '#FFFFFF',
              border: '2px solid #8366FF',
              fontSize: '16px',
              fontWeight: 600,
              color: '#8366FF',
              fontFamily: 'Outfit, sans-serif',
              cursor: selectedPlatforms.length === 0 ? 'not-allowed' : 'pointer',
              opacity: selectedPlatforms.length === 0 ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (selectedPlatforms.length > 0) {
                e.currentTarget.style.background = '#F8F6FF';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 102, 255, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedPlatforms.length > 0) {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            Schedule
          </button>

          {/* Publish Now Button - Primary */}
          <button
            onClick={handlePublishNow}
            disabled={selectedPlatforms.length === 0}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: '12px',
              background:
                selectedPlatforms.length === 0
                  ? '#E5E7EB'
                  : 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
              border: 'none',
              fontSize: '16px',
              fontWeight: 600,
              color: '#FFFFFF',
              fontFamily: 'Outfit, sans-serif',
              cursor: selectedPlatforms.length === 0 ? 'not-allowed' : 'pointer',
              boxShadow:
                selectedPlatforms.length === 0 ? 'none' : '0 8px 24px rgba(131, 102, 255, 0.4)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (selectedPlatforms.length > 0) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(131, 102, 255, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedPlatforms.length > 0) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(131, 102, 255, 0.4)';
              }
            }}
          >
            Publish Now
          </button>
        </div>
      </div>

      {/* Connect Account Modal */}
      <ConnectAccountModal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        onConnect={handleConnectAccounts}
        selectedPlatforms={getSelectedPlatformsData()}
      />
    </div>
  );
}