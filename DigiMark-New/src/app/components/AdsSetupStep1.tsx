import { ArrowLeft, ChevronDown, Users, Globe, Facebook, Linkedin } from 'lucide-react';
import { useState } from 'react';

interface AdsSetupStep1Props {
  onNavigate: (screen: string) => void;
}

export function AdsSetupStep1({ onNavigate }: AdsSetupStep1Props) {
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');

  const audiences = [
    'Small Business Owners',
    'Marketing Professionals',
    'Freelancers & Consultants',
    'E-commerce Entrepreneurs',
    'Agency Owners'
  ];

  const platforms = [
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      color: '#0A66C2',
      icon: Linkedin
    },
    { 
      id: 'twitter', 
      name: 'Twitter', 
      color: '#000000',
      icon: null // We'll use a custom X (Twitter) icon
    },
    { 
      id: 'google', 
      name: 'Google Ads', 
      color: '#4285F4',
      icon: null // We'll use a custom Google icon
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      color: '#1877F2',
      icon: Facebook
    }
  ];

  const canProceed = targetAudience && selectedPlatform;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
        fontFamily: 'Outfit, sans-serif',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #F3F4F6',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}
      >
        <button
          onClick={() => onNavigate('ads-campaign-objective')}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
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
          <ArrowLeft size={20} style={{ color: '#000000' }} />
        </button>
        <h1
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 700,
            color: '#000000',
            marginRight: '40px'
          }}
        >
          Setup Campaign
        </h1>
      </div>

      {/* Progress Indicator */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '16px 20px',
          borderBottom: '1px solid #F3F4F6'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700,
              color: '#FFFFFF'
            }}
          >
            1
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#000000', marginBottom: '2px' }}>
              Strategy
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>Step 1 of 3</p>
          </div>
        </div>
        <div
          style={{
            height: '6px',
            background: '#F3F4F6',
            borderRadius: '3px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              width: '33.33%',
              background: 'linear-gradient(90deg, #8366FF 0%, #A78BFA 100%)',
              borderRadius: '3px',
              transition: 'width 0.3s'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Target Audience */}
        <div style={{ marginBottom: '28px' }}>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}
          >
            <Users size={18} style={{ color: '#8366FF' }} />
            Target Audience
          </label>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowAudienceDropdown(!showAudienceDropdown)}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: '2px solid #E5E7EB',
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontSize: '15px',
                fontFamily: 'Outfit, sans-serif',
                color: targetAudience ? '#000000' : '#9CA3AF',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#8366FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              <span>{targetAudience || 'Select target audience'}</span>
              <ChevronDown size={20} style={{ color: '#6B7280' }} />
            </button>

            {/* Dropdown */}
            {showAudienceDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '8px',
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  zIndex: 10,
                  overflow: 'hidden'
                }}
              >
                {audiences.map((audience, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setTargetAudience(audience);
                      setShowAudienceDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: 'none',
                      background: targetAudience === audience ? '#F9FAFB' : '#FFFFFF',
                      fontSize: '15px',
                      fontFamily: 'Outfit, sans-serif',
                      color: '#000000',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderBottom: index < audiences.length - 1 ? '1px solid #F3F4F6' : 'none',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#F9FAFB';
                    }}
                    onMouseLeave={(e) => {
                      if (targetAudience !== audience) {
                        e.currentTarget.style.background = '#FFFFFF';
                      }
                    }}
                  >
                    {audience}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Primary Platform */}
        <div>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}
          >
            <Globe size={18} style={{ color: '#8366FF' }} />
            Primary Platform
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {platforms.map((platform) => {
              const isSelected = selectedPlatform === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid #8366FF' : '2px solid #E5E7EB',
                    background: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isSelected
                      ? '0 4px 16px rgba(131, 102, 255, 0.2)'
                      : '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#8366FF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                    }
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: isSelected ? platform.color : '#F9FAFB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                  >
                    {platform.id === 'twitter' ? (
                      // Twitter/X icon
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={isSelected ? '#FFFFFF' : '#000000'}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ) : platform.id === 'google' ? (
                      // Google Ads "G" icon
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill={isSelected ? '#FFFFFF' : '#4285F4'}
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill={isSelected ? '#FFFFFF' : '#34A853'}
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill={isSelected ? '#FFFFFF' : '#FBBC05'}
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill={isSelected ? '#FFFFFF' : '#EA4335'}
                        />
                      </svg>
                    ) : platform.icon ? (
                      <platform.icon 
                        size={24} 
                        style={{ 
                          color: isSelected ? '#FFFFFF' : platform.color,
                          fill: isSelected ? '#FFFFFF' : platform.color
                        }} 
                      />
                    ) : null}
                  </div>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: isSelected ? '#8366FF' : '#000000'
                    }}
                  >
                    {platform.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div
        style={{
          padding: '20px',
          background: '#FFFFFF',
          borderTop: '1px solid #F3F4F6',
          boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.04)'
        }}
      >
        <button
          onClick={() => canProceed && onNavigate('ads-setup-step2')}
          disabled={!canProceed}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: canProceed
              ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
              : '#E5E7EB',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
            cursor: canProceed ? 'pointer' : 'not-allowed',
            boxShadow: canProceed ? '0 8px 24px rgba(131, 102, 255, 0.4)' : 'none',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (canProceed) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(131, 102, 255, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            if (canProceed) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(131, 102, 255, 0.4)';
            }
          }}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}