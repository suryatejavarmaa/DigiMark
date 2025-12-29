import { ArrowLeft, Sparkles, RefreshCw, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GeneratedImagesProps {
  onNavigate: (screen: string) => void;
  posterDescription?: string;
  images?: string[];
  prompts?: string[];
  onSelectImage?: (index: number, imageUrl?: string) => void;
  selectedIndex?: number;
  onRegenerate?: () => void;
}

export function GeneratedImages({
  onNavigate,
  posterDescription = 'Create a professional poster for Summer Sale Discount with modern design elements and eye-catching visuals',
  images: externalImages,
  prompts: externalPrompts,
  onSelectImage: externalOnSelectImage,
  selectedIndex: externalSelectedIndex,
  onRegenerate
}: GeneratedImagesProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(externalSelectedIndex ?? null);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);

  // Default images if none provided from API
  const defaultImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1579779866825-b598bf3ab783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Variation 1',
      description: 'Photorealistic style'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1608908271310-57a24a9447db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Variation 2',
      description: 'Cinematic lighting'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1653661323280-496e75d9fc61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Variation 3',
      description: 'Bold colors'
    }
  ];

  // Use external images if provided, otherwise use defaults
  const generatedImages = (externalImages && externalImages.length > 0)
    ? externalImages.map((url, index) => ({
      id: index + 1,
      url,
      title: `Variation ${index + 1}`,
      description: externalPrompts?.[index] || `AI Generated Style ${index + 1}`
    }))
    : defaultImages;

  // Sync with external selectedIndex
  useEffect(() => {
    if (externalSelectedIndex !== undefined) {
      setSelectedImageIndex(externalSelectedIndex);
    }
  }, [externalSelectedIndex]);

  const handleSelectImage = (index: number) => {
    setSelectedImageIndex(index);
    if (externalOnSelectImage) {
      // Pass the actual image URL from our local derived list
      externalOnSelectImage(index, generatedImages[index]?.url);
    }
    setTimeout(() => {
      onNavigate('select-channels-image');
    }, 300);
  };

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate();
    } else {
      onNavigate('generating-images');
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
        <div className="flex items-center justify-between" style={{ gap: '20px' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('ai-graphic-advanced')}
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
              Your Designs
            </h1>
          </div>

          {/* Regenerate Button */}
          <button
            onClick={handleRegenerate}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              background: '#F8F6FF',
              border: '1px solid #8366FF',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#EDE9FE';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F8F6FF';
            }}
          >
            <RefreshCw size={16} style={{ color: '#8366FF' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#8366FF',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Regenerate
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Success Message */}
        <div
          style={{
            background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '24px',
            border: '1px solid #10B98120',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Sparkles size={20} style={{ color: '#FFFFFF' }} />
          </div>
          <div>
            <h3
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#000000',
                fontFamily: 'Outfit, sans-serif',
                marginBottom: '2px'
              }}
            >
              3 Variations Generated!
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: '#6B7280',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Select your favorite to continue
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {generatedImages.map((image, index) => (
            <div
              key={image.id}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '2px solid #E5E7EB',
                background: '#FFFFFF',
                transition: 'all 0.3s',
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#8366FF';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(131, 102, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '280px',
                  overflow: 'hidden'
                }}
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {/* Variation Label */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 600,
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Variation {image.id}
                </div>
              </div>

              {/* Select Button */}
              <div style={{ padding: '16px' }}>
                <button
                  onClick={() => handleSelectImage(index)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                    border: 'none',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    fontFamily: 'Outfit, sans-serif',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(131, 102, 255, 0.3)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(131, 102, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 102, 255, 0.3)';
                  }}
                >
                  Select This Design
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Customize Option */}
        <button
          onClick={() => setShowCustomizeModal(true)}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: '#FFFFFF',
            border: '2px solid #8366FF',
            fontSize: '15px',
            fontWeight: 600,
            color: '#8366FF',
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            marginTop: '16px',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F8F6FF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFFFFF';
          }}
        >
          <Sparkles size={18} />
          Customize with AI
        </button>
      </div>

      {/* CSS Animations */}
      <style>{`
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
      `}</style>

      {/* Customize Modal */}
      {showCustomizeModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setShowCustomizeModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '28px',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Sparkles size={20} style={{ color: '#FFFFFF' }} />
                </div>
                <h2
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#000000',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Your Poster Idea
                </h2>
              </div>
              <button
                onClick={() => setShowCustomizeModal(false)}
                style={{
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
                <X size={18} style={{ color: '#6B7280' }} />
              </button>
            </div>

            {/* Description */}
            <div
              style={{
                background: '#F9FAFB',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px',
                border: '1px solid #E5E7EB'
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
                {posterDescription}
              </p>
            </div>

            {/* Info Text */}
            <p
              style={{
                fontSize: '13px',
                color: '#6B7280',
                fontFamily: 'Outfit, sans-serif',
                marginBottom: '20px',
                lineHeight: '1.5'
              }}
            >
              AI will use this description to customize and regenerate your poster with new variations.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowCustomizeModal(false)}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '10px',
                  background: '#FFFFFF',
                  border: '2px solid #E5E7EB',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#6B7280',
                  fontFamily: 'Outfit, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F9FAFB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCustomizeModal(false);
                  onNavigate('generating-images');
                }}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  fontFamily: 'Outfit, sans-serif',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(131, 102, 255, 0.3)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(131, 102, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 102, 255, 0.3)';
                }}
              >
                Regenerate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}