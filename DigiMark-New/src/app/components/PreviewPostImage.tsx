import { ArrowLeft, Send, Calendar, Linkedin, Facebook, Instagram, Twitter, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PreviewPostImageProps {
  onNavigate: (screen: string) => void;
  scheduledTime?: string;
  imageUrl?: string;
  caption?: string;
  selectedPlatforms?: string[];
  onPublish?: (platforms: string[], caption: string, imageUrl?: string) => Promise<any>;
  isPublishing?: boolean;
}

export function PreviewPostImage({
  onNavigate,
  scheduledTime = '',
  imageUrl,
  caption: propCaption,
  selectedPlatforms: propSelectedPlatforms,
  onPublish,
  isPublishing = false
}: PreviewPostImageProps) {
  const [actionType, setActionType] = useState<'schedule' | 'publish'>('publish');
  const [publishState, setPublishState] = useState<'ready' | 'publishing' | 'success' | 'failed'>('ready');

  // Read platforms from localStorage if not provided via props
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(() => {
    if (propSelectedPlatforms && propSelectedPlatforms.length > 0) {
      return propSelectedPlatforms;
    }
    const stored = localStorage.getItem('selectedPlatforms');
    return stored ? JSON.parse(stored) : ['linkedin'];
  });

  useEffect(() => {
    // Get the action type from localStorage
    const storedAction = localStorage.getItem('imagePostAction') as 'schedule' | 'publish' | null;
    if (storedAction) {
      setActionType(storedAction);
    }
  }, []);

  // Use prop caption or localStorage or default
  const generatedCaption = propCaption || localStorage.getItem('publishCaption') || "Ready to ignite your summer sales? Our latest poster for Bristle Tech captures the essence of sizzling deals and discounts, showcasing their commitment to growth and customer satisfaction. With AI-driven strategies, they're revolutionizing digital marketing #BristleTech #SummerSale #DigitalMarketing";

  // Use prop imageUrl or localStorage or default
  const displayImageUrl = imageUrl || localStorage.getItem('publishImageUrl') || "https://images.unsplash.com/photo-1579779866825-b598bf3ab783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

  // Platform data for display
  const platformData: Record<string, { name: string; icon: typeof Linkedin; color: string }> = {
    linkedin: { name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    facebook: { name: 'Facebook', icon: Facebook, color: '#1877F2' },
    instagram: { name: 'Instagram', icon: Instagram, color: '#E4405F' },
    twitter: { name: 'X (Twitter)', icon: Twitter, color: '#000000' },
    x: { name: 'X (Twitter)', icon: Twitter, color: '#000000' }
  };

  const handlePrimaryAction = async () => {
    if (actionType === 'schedule') {
      onNavigate('scheduling-animation-image');
    } else {
      if (onPublish) {
        setPublishState('publishing');
        try {
          const result = await onPublish(selectedPlatforms, generatedCaption, displayImageUrl);
          if (result?.success || result?.results?.some((r: any) => r.success)) {
            setPublishState('success');
            onNavigate('publishing-state-image');
          } else {
            setPublishState('failed');
            onNavigate('publishing-results-image');
          }
        } catch (e) {
          setPublishState('failed');
          onNavigate('publishing-results-image');
        }
      } else {
        onNavigate('publishing-state-image');
      }
    }
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
            onClick={() => {
              if (actionType === 'schedule') {
                onNavigate('schedule-post-image');
              } else {
                onNavigate('select-channels-image');
              }
            }}
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
        {/* Image Preview - Large and Centered */}
        <div
          style={{
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              border: '3px solid #8366FF',
              boxShadow: '0 8px 32px rgba(131, 102, 255, 0.3)',
              maxWidth: '100%'
            }}
          >
            <ImageWithFallback
              src={displayImageUrl}
              alt="Post Preview"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '400px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Caption Section */}
        <div>
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
            Caption
          </label>

          <div
            style={{
              background: 'linear-gradient(135deg, #F8F6FF 0%, #EDE9FE 100%)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid #E9D5FF'
            }}
          >
            <p
              style={{
                fontSize: '14px',
                color: '#374151',
                fontFamily: 'Outfit, sans-serif',
                lineHeight: '1.6',
                margin: 0
              }}
            >
              {generatedCaption}
            </p>
          </div>
        </div>

        {/* Platform Badge - Dynamic */}
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            background: '#F9FAFB',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            flexWrap: 'wrap'
          }}
        >
          <span
            style={{
              fontSize: '14px',
              color: '#6B7280',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Publishing to:
          </span>
          {selectedPlatforms.map((platformId, index) => {
            const platform = platformData[platformId];
            if (!platform) return null;
            const Icon = platform.icon;
            return (
              <span
                key={platformId}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: platform.color,
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                <Icon size={16} />
                {platform.name}
                {index < selectedPlatforms.length - 1 && <span style={{ color: '#6B7280', marginLeft: '4px' }}>,</span>}
              </span>
            );
          })}
        </div>
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
        {actionType === 'schedule' ? (
          // Only Schedule button for schedule flow
          <button
            onClick={handlePrimaryAction}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
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
            <Calendar size={18} />
            Schedule Post
          </button>
        ) : (
          // Only Confirm & Post button for publish flow
          <button
            onClick={handlePrimaryAction}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
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
            <Send size={18} />
            Confirm & Post
          </button>
        )}
      </div>
    </div>
  );
}