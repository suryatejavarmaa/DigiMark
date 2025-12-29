import { ArrowLeft, Sparkles, Sun, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface AIGraphicAdvancedProps {
  onNavigate: (screen: string) => void;
  onGenerate: (style: string, ratio: string, lighting: string, color: string) => void;
}

export function AIGraphicAdvanced({ onNavigate, onGenerate }: AIGraphicAdvancedProps) {
  const [selectedStyle, setSelectedStyle] = useState<string>('photorealistic');
  const [selectedLighting, setSelectedLighting] = useState<string>('cinematic');
  const [selectedColor, setSelectedColor] = useState<string>('#8366FF');

  const [aspectRatio, setAspectRatio] = useState<string>('1:1'); // Add state if needed or default

  // ... (existing constants)

  const handleGenerateClick = () => {
    onGenerate(selectedStyle, aspectRatio, selectedLighting, selectedColor);
  };

  const styles = [
    {
      id: 'photorealistic',
      name: 'Photorealistic',
      description: 'Lifelike & professional',
      image: 'https://images.unsplash.com/photo-1671875579704-48f4bdc31699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBob3RvcmVhbGlzdGljfGVufDF8fHx8MTc2NjA2MDg5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'digital-art',
      name: 'Digital Art',
      description: 'Modern & creative',
      image: 'https://images.unsplash.com/photo-1765445774062-05c27b1bfa7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwbW9kZXJuJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzY2MDYwODk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'oil-painting',
      name: 'Oil Painting',
      description: 'Artistic & elegant',
      image: 'https://images.unsplash.com/photo-1581593439227-0ecc0b35293b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBwYWludGluZyUyMGFydGlzdGljfGVufDF8fHx8MTc2NjA2MDg5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const lightingOptions = [
    { id: 'cinematic', name: 'Cinematic', icon: Sun },
    { id: 'studio', name: 'Studio', icon: Lightbulb }
  ];

  const colorSwatches = [
    '#8366FF',
    '#FF6B6B',
    '#4ECDC4',
    '#FFD93D',
    '#6BCF7F',
    '#FF8E53',
    '#A78BFA',
    '#EC4899'
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
      <div
        className="px-6 py-6"
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #F3F4F6'
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('create-business-poster')}
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
          <div>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#000000',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Advanced Options
            </h1>
            <p
              style={{
                fontSize: '13px',
                color: '#6B7280',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Customize your AI-generated poster
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Style Selection */}
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
            Art Style
          </label>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {styles.map((style) => {
              const isSelected = selectedStyle === style.id;

              return (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: '#FFFFFF',
                    border: isSelected ? '3px solid #8366FF' : '2px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isSelected ? '0 8px 24px rgba(131, 102, 255, 0.2)' : 'none'
                  }}
                >
                  {/* Gradient Preview */}
                  <div
                    style={{
                      width: '100%',
                      height: '100px',
                      borderRadius: '12px',
                      background: `url(${style.image}) no-repeat center center/cover`,
                      marginBottom: '16px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />

                  <div style={{ textAlign: 'left' }}>
                    <h3
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#000000',
                        fontFamily: 'Outfit, sans-serif',
                        marginBottom: '4px'
                      }}
                    >
                      {style.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#6B7280',
                        fontFamily: 'Outfit, sans-serif'
                      }}
                    >
                      {style.description}
                    </p>
                  </div>

                  {/* Selected Badge */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: '#8366FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(131, 102, 255, 0.4)'
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3333 4L6 11.3333L2.66667 8"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lighting Options */}
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
            Lighting
          </label>
          <div
            style={{
              display: 'flex',
              gap: '12px'
            }}
          >
            {lightingOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedLighting === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedLighting(option.id)}
                  style={{
                    flex: 1,
                    padding: '16px',
                    borderRadius: '12px',
                    background: isSelected
                      ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
                      : '#FFFFFF',
                    border: isSelected ? 'none' : '2px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: isSelected ? '0 4px 12px rgba(131, 102, 255, 0.3)' : 'none'
                  }}
                >
                  <Icon size={20} style={{ color: isSelected ? '#FFFFFF' : '#8366FF' }} />
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: isSelected ? '#FFFFFF' : '#000000',
                      fontFamily: 'Outfit, sans-serif'
                    }}
                  >
                    {option.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Palette */}
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
            Primary Color
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '12px'
            }}
          >
            {colorSwatches.map((color) => {
              const isSelected = selectedColor === color;

              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '12px',
                    background: color,
                    border: isSelected ? '3px solid #000000' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    boxShadow: isSelected
                      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                      : '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {isSelected && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <path
                        d="M13.3333 4L6 11.3333L2.66667 8"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #F8F6FF 0%, #EDE9FE 100%)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #8366FF20'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Sparkles size={20} style={{ color: '#8366FF', marginTop: '2px' }} />
            <div>
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#000000',
                  fontFamily: 'Outfit, sans-serif',
                  marginBottom: '4px'
                }}
              >
                AI Generation Tips
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: '#6B7280',
                  fontFamily: 'Outfit, sans-serif',
                  lineHeight: '1.5'
                }}
              >
                We'll create 3 unique variations based on your selections. You can regenerate or customize any design.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
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
          onClick={handleGenerateClick}
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
          <Sparkles size={20} />
          Generate 3 Variations
        </button>
      </div>
    </div>
  );
}