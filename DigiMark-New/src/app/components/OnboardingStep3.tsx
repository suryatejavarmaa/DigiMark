import { useState } from 'react';
import { ChevronLeft, Linkedin, Twitter, Facebook, Instagram, Check } from 'lucide-react';

interface OnboardingStep3Props {
  onNavigate: (screen: string) => void;
  onComplete?: (data: any) => void;
}

type Channel = 'linkedin' | 'twitter' | 'facebook' | 'instagram';

export function OnboardingStep3({ onNavigate, onComplete }: OnboardingStep3Props) {
  const [connectedChannels, setConnectedChannels] = useState<Set<Channel>>(new Set());

  const toggleChannel = (channel: Channel) => {
    const newConnected = new Set(connectedChannels);
    if (newConnected.has(channel)) {
      newConnected.delete(channel);
    } else {
      newConnected.add(channel);
    }
    setConnectedChannels(newConnected);
  };

  const channels = [
    { id: 'linkedin' as Channel, name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    { id: 'twitter' as Channel, name: 'X (Twitter)', icon: Twitter, color: '#000000' },
    { id: 'facebook' as Channel, name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { id: 'instagram' as Channel, name: 'Instagram', icon: Instagram, color: '#E4405F' }
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: '#FFFFFF',
        fontFamily: 'Outfit, sans-serif'
      }}
    >
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => onNavigate('onboarding-2b')}
          style={{
            width: '40px',
            height: '40px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronLeft size={24} style={{ color: '#000000' }} />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="px-6 mb-8">
        <div className="flex gap-2 justify-center">
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#8366FF' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#8366FF' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#8366FF' }} />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        {/* Title */}
        <h1
          className="mb-2"
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#000000',
            fontFamily: 'Outfit, sans-serif'
          }}
        >
          Connect Your Channels
        </h1>
        <p
          className="mb-8"
          style={{
            fontSize: '14px',
            color: '#3B3A47',
            fontFamily: 'Outfit, sans-serif'
          }}
        >
          Connect your social media accounts to start posting
        </p>

        {/* Channels Grid */}
        <div className="grid grid-cols-2 gap-4">
          {channels.map((channel) => {
            const isConnected = connectedChannels.has(channel.id);
            const Icon = channel.icon;

            return (
              <div
                key={channel.id}
                style={{
                  background: '#FFFFFF',
                  border: isConnected ? '2px solid #22C55E' : '1px solid #E5E7EB',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  position: 'relative',
                  boxShadow: '0 4px 12px rgba(131, 102, 255, 0.08)',
                  transition: 'all 0.2s'
                }}
              >
                {/* Connected Check Badge */}
                {isConnected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#22C55E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Check size={14} style={{ color: '#FFFFFF', strokeWidth: 3 }} />
                  </div>
                )}

                {/* Channel Icon */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: isConnected ? `${channel.color}15` : '#F9FAFB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon
                    size={28}
                    style={{ color: isConnected ? channel.color : '#9CA3AF' }}
                  />
                </div>

                {/* Channel Name */}
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#000000',
                    fontFamily: 'Outfit, sans-serif',
                    textAlign: 'center'
                  }}
                >
                  {channel.name}
                </span>

                {/* Connect/Connected Button */}
                <button
                  onClick={() => toggleChannel(channel.id)}
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    background: isConnected ? '#DCFCE7' : '#8366FF',
                    color: isConnected ? '#16A34A' : '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 700,
                    fontFamily: 'Outfit, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {isConnected ? 'Connected' : 'Connect'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <div
          style={{
            background: '#EDE9FE',
            padding: '16px',
            borderRadius: '12px',
            marginTop: '24px'
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: '#3B3A47',
              fontFamily: 'Outfit, sans-serif',
              lineHeight: '1.6'
            }}
          >
            🔒 <strong style={{ color: '#000000' }}>Secure:</strong> We use OAuth 2.0 to securely connect your accounts. We never store your passwords.
          </p>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div
        className="px-6 py-4"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#FFFFFF',
          borderTop: '1px solid #F3F4F6'
        }}
      >
        {/* Skip for now link */}
        <button
          onClick={() => {
            // Also trigger signup when skipping
            if (onComplete) {
              onComplete({ connectedChannels: [] });
            }
          }}
          style={{
            width: '100%',
            padding: '12px',
            background: 'transparent',
            color: '#8366FF',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            marginBottom: '12px'
          }}
        >
          Skip for now
        </button>

        {/* Primary CTA */}
        <button
          onClick={() => {
            if (onComplete) {
              onComplete({ connectedChannels: Array.from(connectedChannels) });
            }
          }}
          style={{
            width: '100%',
            background: '#8366FF',
            color: '#FFFFFF',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'Outfit, sans-serif',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(131, 102, 255, 0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
