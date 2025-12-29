import { ArrowLeft, Linkedin, Facebook, Instagram, Twitter, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ConnectAccountModal } from './ConnectAccountModal';
import { SocialService } from '../../services/SocialService';
import { AIService } from '../../services/AIService';

interface SelectChannelsImageProps {
  onNavigate: (screen: string) => void;
  onConnectOAuth?: (platform: string) => void;
  userId?: string | null;
  imageUrl?: string;
  caption?: string;
  companyName?: string;
  companySummary?: string;
  posterDescription?: string;
}

export function SelectChannelsImage({
  onNavigate,
  onConnectOAuth,
  userId,
  imageUrl,
  caption: propCaption,
  companyName,
  companySummary,
  posterDescription
}: SelectChannelsImageProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin']);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState(propCaption || '');
  const [isCopied, setIsCopied] = useState(false);
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
  const [selectedAction, setSelectedAction] = useState<'schedule' | 'publish' | null>(null);
  const [platformToConnect, setPlatformToConnect] = useState<string>('');

  // Fetch caption on mount if not provided
  // Fetch caption on mount or when image/description changes
  useEffect(() => {
    if (userId) {
      handleRegenerateCaption();
    }
  }, [userId, companyName, posterDescription, imageUrl]);

  const handleRegenerateCaption = async () => {
    setIsGeneratingCaption(true);
    try {
      const prompt = `Write a professional social media caption for a business poster about "${posterDescription || 'our services'}". 
      
      Company: ${companyName || 'Our Company'}
      About: ${companySummary || 'We provide excellent services.'}
      
      Keep it engaging, professional, and include relevant hashtags.`;

      // Use the generic generation endpoint or caption endpoint
      // Using generateCaption from AIService which maps to /generate-caption
      const caption = await AIService.generateCaption(
        prompt,
        'linkedin', // Default platform context
        ['Professional', 'Engaging'],
        userId
      );

      setGeneratedCaption(caption);
    } catch (error) {
      console.error('Failed to generate caption:', error);
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2', bgColor: '#E8F1FF' },
    { id: 'x', name: 'X (Twitter)', icon: Twitter, color: '#000000', bgColor: '#F5F5F5' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2', bgColor: '#F0F2F5' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F', bgColor: '#F8F8F8' }
  ];

  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(id => id !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const handleAction = (action: 'schedule' | 'publish') => {
    // Check if selected platforms are connected using SocialService
    const unconnectedPlatforms = selectedPlatforms.filter(
      id => !SocialService.isConnected(id) && !SocialService.isConnected(id === 'x' ? 'twitter' : id)
    );

    // Store selected platforms and content in localStorage for preview
    localStorage.setItem('selectedPlatforms', JSON.stringify(selectedPlatforms));
    localStorage.setItem('publishCaption', generatedCaption);
    if (imageUrl) localStorage.setItem('publishImageUrl', imageUrl);

    if (unconnectedPlatforms.length > 0) {
      // Show connect modal for first unconnected platform
      setPlatformToConnect(unconnectedPlatforms[0]);
      setSelectedAction(action);
      setShowConnectModal(true);
    } else {
      // All platforms connected, proceed based on action
      setSelectedAction(action);
      localStorage.setItem('imagePostAction', action);

      if (action === 'schedule') {
        onNavigate('schedule-picker');
      } else {
        onNavigate('preview-post');
      }
    }
  };

  const handleConnect = () => {
    // Trigger real OAuth redirect if callback provided
    if (onConnectOAuth) {
      // Map 'x' to 'twitter' for OAuth
      const oauthPlatform = platformToConnect === 'x' ? 'twitter' : platformToConnect;
      setShowConnectModal(false);
      onConnectOAuth(oauthPlatform);
      return;
    }

    // Fallback: Just mark as connected locally (demo mode)
    SocialService.connect(platformToConnect);
    setConnectedAccounts([...connectedAccounts, platformToConnect]);
    setShowConnectModal(false);

    // Check if there are more platforms to connect
    const remainingUnconnected = selectedPlatforms.filter(
      id => !connectedAccounts.includes(id) && id !== platformToConnect && !SocialService.isConnected(id)
    );

    if (remainingUnconnected.length > 0) {
      // Connect next platform
      setPlatformToConnect(remainingUnconnected[0]);
      setShowConnectModal(true);
    } else {
      // All platforms connected, proceed based on selected action
      if (selectedAction) {
        localStorage.setItem('imagePostAction', selectedAction);

        if (selectedAction === 'schedule') {
          // Use standard schedule screen
          onNavigate('schedule-post');
        } else {
          // Use standard preview screen which now supports images
          onNavigate('preview-post');
        }
      }
    }
  };

  const getPlatformName = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform ? platform.name : platformId;
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
            onClick={() => onNavigate('generated-images')}
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
            Select Channels
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Image Preview */}
        <div
          style={{
            marginBottom: '24px'
          }}
        >
          <label
            style={{
              display: 'block',
              fontSize: '15px',
              fontWeight: 600,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '12px'
            }}
          >
            Your Selected Design
          </label>
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid #8366FF',
              boxShadow: '0 4px 16px rgba(131, 102, 255, 0.2)'
            }}
          >
            <ImageWithFallback
              src={imageUrl || 'https://images.unsplash.com/photo-1579779866825-b598bf3ab783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'}
              alt="Selected Design"
              style={{
                width: '100%',
                height: '240px',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>

        {/* AI Caption Generation Card */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '15px',
              fontWeight: 600,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '12px'
            }}
          >
            AI Generated Caption
          </label>

          {isGeneratingCaption ? (
            <div
              style={{
                background: 'linear-gradient(135deg, #F8F6FF 0%, #EDE9FE 100%)',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid #E9D5FF',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  animation: 'spin 1s linear infinite',
                  color: '#8366FF'
                }}
              >
                <Sparkles size={20} />
              </div>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#8366FF',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                Generating AI Caption...
              </span>
            </div>
          ) : (
            <div
              style={{
                background: 'linear-gradient(135deg, #F8F6FF 0%, #EDE9FE 100%)',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid #E9D5FF',
                animation: 'fadeIn 0.5s ease-out'
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  color: '#374151',
                  fontFamily: 'Outfit, sans-serif',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}
              >
                {generatedCaption}
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '12px'
                }}
              >
                <button
                  onClick={handleRegenerateCaption}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#374151',
                    fontFamily: 'Outfit, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F9FAFB';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <RefreshCw size={16} />
                  Regenerate
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCaption);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    background: isCopied ? '#8366FF' : '#FFFFFF',
                    border: isCopied ? '1px solid #8366FF' : '1px solid #E5E7EB',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isCopied ? '#FFFFFF' : '#374151',
                    fontFamily: 'Outfit, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: isCopied ? '0 4px 12px rgba(131, 102, 255, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCopied) {
                      e.currentTarget.style.background = '#F9FAFB';
                      e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCopied) {
                      e.currentTarget.style.background = '#FFFFFF';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                    }
                  }}
                >
                  {isCopied ? <Check size={16} /> : <Copy size={16} />}
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Platform Selection */}
        <div style={{ marginBottom: '32px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '15px',
              fontWeight: 600,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '12px'
            }}
          >
            Choose Platforms to Post
          </label>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {platforms.map((platform) => {
              const Icon = platform.icon;
              const isSelected = selectedPlatforms.includes(platform.id);

              return (
                <button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    background: isSelected
                      ? 'linear-gradient(135deg, #F8F6FF 0%, #EDE9FE 100%)'
                      : '#FFFFFF',
                    border: isSelected ? '2px solid #8366FF' : '2px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isSelected ? '0 2px 8px rgba(131, 102, 255, 0.15)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: `${platform.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={22} style={{ color: platform.color }} />
                    </div>
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
                      width: '48px',
                      height: '28px',
                      borderRadius: '14px',
                      background: isSelected
                        ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
                        : '#E5E7EB',
                      position: 'relative',
                      transition: 'all 0.3s',
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
                        left: isSelected ? '23px' : '3px',
                        transition: 'all 0.3s',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Count */}
        {selectedPlatforms.length > 0 && (
          <div
            style={{
              background: 'linear-gradient(135deg, #F8F6FF 0%, #EDE9FE 100%)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid #8366FF20',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                fontSize: '14px',
                color: '#6B7280',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              <span style={{ fontWeight: 600, color: '#8366FF' }}>
                {selectedPlatforms.length}
              </span>
              {' '}platform{selectedPlatforms.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        )}
      </div>

      {/* Fixed Bottom Buttons */}
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
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Schedule Button */}
          <button
            onClick={() => handleAction('schedule')}
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
              cursor: selectedPlatforms.length > 0 ? 'pointer' : 'not-allowed',
              opacity: selectedPlatforms.length > 0 ? 1 : 0.5,
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

          {/* Publish Now Button */}
          <button
            onClick={() => handleAction('publish')}
            disabled={selectedPlatforms.length === 0}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: '12px',
              background: selectedPlatforms.length > 0
                ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
                : '#E5E7EB',
              border: 'none',
              fontSize: '16px',
              fontWeight: 600,
              color: '#FFFFFF',
              fontFamily: 'Outfit, sans-serif',
              cursor: selectedPlatforms.length > 0 ? 'pointer' : 'not-allowed',
              boxShadow: selectedPlatforms.length > 0
                ? '0 8px 24px rgba(131, 102, 255, 0.4)'
                : 'none',
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

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      {/* Connect Account Modal */}
      {showConnectModal && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setShowConnectModal(false)}
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
                maxWidth: '340px',
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '32px 24px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                animation: 'scaleIn 0.3s ease-out',
                fontFamily: 'Outfit, sans-serif',
                position: 'relative'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowConnectModal(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#6B7280',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F3F4F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                ×
              </button>

              {/* Platform Icon(s) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  marginTop: '8px'
                }}
              >
                {(() => {
                  const unconnectedPlatforms = selectedPlatforms.filter(
                    id => !connectedAccounts.includes(id)
                  );

                  if (unconnectedPlatforms.length === 1) {
                    const platform = platforms.find(p => p.id === platformToConnect);
                    if (!platform) return null;
                    const Icon = platform.icon;

                    return (
                      <div
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '16px',
                          background: platform.bgColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Icon size={40} style={{ color: platform.color }} />
                      </div>
                    );
                  } else {
                    // Stack multiple icons
                    return (
                      <div style={{ position: 'relative', width: '100px', height: '80px' }}>
                        {unconnectedPlatforms.slice(0, 4).map((id, index) => {
                          const platform = platforms.find(p => p.id === id);
                          if (!platform) return null;
                          const Icon = platform.icon;

                          return (
                            <div
                              key={id}
                              style={{
                                position: 'absolute',
                                left: `${index * 20}px`,
                                top: 0,
                                width: '64px',
                                height: '64px',
                                borderRadius: '12px',
                                background: platform.bgColor,
                                border: '3px solid #FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                zIndex: 4 - index
                              }}
                            >
                              <Icon size={28} style={{ color: platform.color }} />
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                })()}
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#000000',
                  fontFamily: 'Outfit, sans-serif',
                  marginBottom: '12px',
                  textAlign: 'center'
                }}
              >
                {(() => {
                  const unconnectedPlatforms = selectedPlatforms.filter(
                    id => !connectedAccounts.includes(id)
                  );

                  if (unconnectedPlatforms.length === 1) {
                    return `Connect ${getPlatformName(platformToConnect)}`;
                  } else {
                    return 'Connect Accounts to Post';
                  }
                })()}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  fontFamily: 'Outfit, sans-serif',
                  marginBottom: '24px',
                  textAlign: 'center',
                  lineHeight: '1.5'
                }}
              >
                {(() => {
                  const unconnectedPlatforms = selectedPlatforms.filter(
                    id => !connectedAccounts.includes(id)
                  );

                  if (unconnectedPlatforms.length === 1) {
                    return `To publish on ${getPlatformName(platformToConnect)}, you need to connect your account first.`;
                  } else {
                    return 'You need to connect your accounts to publish content. This will allow DigiMark to post on your behalf.';
                  }
                })()}
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={handleConnect}
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
                  {(() => {
                    const unconnectedPlatforms = selectedPlatforms.filter(
                      id => !connectedAccounts.includes(id)
                    );
                    return unconnectedPlatforms.length === 1 ? 'Connect Account' : 'Connect Now';
                  })()}
                </button>

                <button
                  onClick={() => setShowConnectModal(false)}
                  style={{
                    width: '100%',
                    padding: '12px',
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
                    e.currentTarget.style.color = '#6B7280';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9CA3AF';
                  }}
                >
                  {(() => {
                    const unconnectedPlatforms = selectedPlatforms.filter(
                      id => !connectedAccounts.includes(id)
                    );
                    return unconnectedPlatforms.length === 1 ? 'Cancel' : 'Maybe Later';
                  })()}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}