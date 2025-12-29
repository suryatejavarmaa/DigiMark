import { ArrowLeft, Calendar, Clock, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useState } from 'react';

interface PreviewPostProps {
  onNavigate: (screen: string) => void;
  backScreen?: string;
}

export function PreviewPost({ onNavigate, backScreen = 'select-channels' }: PreviewPostProps) {
  // Read platforms from localStorage
  const [selectedPlatformIds] = useState<string[]>(() => {
    const stored = localStorage.getItem('selectedPlatforms');
    console.log('[PreviewPost] localStorage selectedPlatforms:', stored);
    const result = stored ? JSON.parse(stored) : ['linkedin'];
    console.log('[PreviewPost] Using platforms:', result);
    return result;
  });

  // Platform data with icons
  const platformData: Record<string, { name: string; color: string; icon: string; IconComponent: typeof Linkedin }> = {
    linkedin: { name: 'LinkedIn', color: '#0A66C2', icon: '💼', IconComponent: Linkedin },
    facebook: { name: 'Facebook', color: '#1877F2', icon: '📘', IconComponent: Facebook },
    instagram: { name: 'Instagram', color: '#E4405F', icon: '📸', IconComponent: Instagram },
    twitter: { name: 'X (Twitter)', color: '#000000', icon: '🐦', IconComponent: Twitter },
    x: { name: 'X (Twitter)', color: '#000000', icon: '🐦', IconComponent: Twitter }
  };

  const selectedPlatforms = selectedPlatformIds.map(id => ({
    id,
    ...platformData[id] || { name: id, color: '#8366FF', icon: '📱', IconComponent: Linkedin }
  }));

  // Read caption from localStorage
  const caption = localStorage.getItem('publishCaption') ||
    "🚀 Excited to announce our new product launch! Our team has been working tirelessly to bring you something truly special. Stay tuned for more updates! #Innovation #ProductLaunch #BusinessGrowth";

  // Read image from localStorage
  const imageUrl = localStorage.getItem('publishImageUrl');

  const postDate = new Date();
  const formattedDate = postDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = postDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

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
            onClick={() => onNavigate(backScreen)}
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
            Preview Post
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
          Review your post before publishing
        </p>

        {/* Preview Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
            border: '2px solid #E5E7EB',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(131, 102, 255, 0.15)'
          }}
        >
          {/* Platform Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedPlatforms.map((platform) => (
              <div
                key={platform.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  background: '#FFFFFF',
                  border: `2px solid ${platform.color} 30`,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              >
                <span style={{ fontSize: '18px' }}>{platform.icon}</span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: platform.color,
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  {platform.name}
                </span>
              </div>
            ))}
          </div>

          {/* Post Image Preview */}
          {imageUrl && (
            <div
              style={{
                marginBottom: '20px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #E5E7EB'
              }}
            >
              <img
                src={imageUrl}
                alt="Post Preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          )}

          {/* Date & Time */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px',
              padding: '12px 16px',
              borderRadius: '12px',
              background: '#F9FAFB'
            }}
          >
            <div className="flex items-center gap-2">
              <Calendar size={16} style={{ color: '#8366FF' }} />
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#3B3A47',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                {formattedDate}
              </span>
            </div>
            <div
              style={{
                width: '1px',
                height: '16px',
                background: '#E5E7EB'
              }}
            />
            <div className="flex items-center gap-2">
              <Clock size={16} style={{ color: '#8366FF' }} />
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#3B3A47',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                {formattedTime}
              </span>
            </div>
          </div>

          {/* Caption Preview */}
          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB'
            }}
          >
            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#000000',
                fontFamily: 'Outfit, sans-serif',
                whiteSpace: 'pre-wrap'
              }}
            >
              {caption}
            </p>
          </div>

          {/* Post Stats Preview */}
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #EDE9FE 0%, #F8F6FF 100%)',
              border: '1px solid #8366FF20'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#8366FF',
                    fontFamily: 'Outfit, sans-serif',
                    marginBottom: '4px'
                  }}
                >
                  {caption.length}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#3B3A47',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Characters
                </div>
              </div>

              <div
                style={{
                  width: '1px',
                  height: '40px',
                  background: '#8366FF30'
                }}
              />

              <div className="text-center flex-1">
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#8366FF',
                    fontFamily: 'Outfit, sans-serif',
                    marginBottom: '4px'
                  }}
                >
                  {caption.split('#').length - 1}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#3B3A47',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Hashtags
                </div>
              </div>

              <div
                style={{
                  width: '1px',
                  height: '40px',
                  background: '#8366FF30'
                }}
              />

              <div className="text-center flex-1">
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#8366FF',
                    fontFamily: 'Outfit, sans-serif',
                    marginBottom: '4px'
                  }}
                >
                  {selectedPlatforms.length}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#3B3A47',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Platforms
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tip */}
        <div
          style={{
            marginTop: '20px',
            padding: '16px 20px',
            borderRadius: '12px',
            background: '#F0FDF4',
            border: '1px solid #86EFAC',
            display: 'flex',
            gap: '12px'
          }}
        >
          <span style={{ fontSize: '20px' }}>💡</span>
          <div>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#166534',
                fontFamily: 'Outfit, sans-serif',
                marginBottom: '4px'
              }}
            >
              Pro Tip
            </p>
            <p
              style={{
                fontSize: '13px',
                color: '#166534',
                fontFamily: 'Outfit, sans-serif',
                lineHeight: '1.5'
              }}
            >
              Posts with 3-5 hashtags typically get 12% more engagement than those without.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
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
        <button
          onClick={() => onNavigate('publishing-animation')}
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
          Continue to Publish
        </button>
      </div>
    </div>
  );
}