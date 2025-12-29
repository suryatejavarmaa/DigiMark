import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface OnboardingStep2Props {
  onNavigate: (screen: string) => void;
  onComplete: (data: any) => void;
}

export function OnboardingStep2({ onNavigate, onComplete }: OnboardingStep2Props) {
  const [brandColors, setBrandColors] = useState(['#8366FF', '#000000', '#FFFFFF']);
  const [selectedStyle, setSelectedStyle] = useState('minimal');
  const [brandVoice, setBrandVoice] = useState(50);

  const styles = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean and simple'
    },
    {
      id: 'luxury',
      name: 'Luxury',
      description: 'Premium and elegant'
    },
    {
      id: 'bold',
      name: 'Bold',
      description: 'Vibrant and energetic'
    }
  ];

  return (
    <>
      <div
        className="min-h-screen flex flex-col"
        style={{
          background: '#FFFFFF',
          fontFamily: 'Outfit, sans-serif',
          paddingBottom: '88px' // Space for fixed button
        }}
      >
        <div
          style={{
            animation: 'slideUpFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards'
          }}
        >
          {/* Header */}
          <div className="px-6 py-4 flex items-center gap-4">
            <button
              onClick={() => onNavigate('onboarding-1b')}
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
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#E5E7EB' }} />
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="px-6 pb-6">
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
              Train Your AI Assistant
            </h1>
            <p
              className="mb-8"
              style={{
                fontSize: '14px',
                color: '#3B3A47',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Customize how your AI creates content
            </p>

            <div className="space-y-8">
              {/* Brand Colors */}
              <div>
                <label
                  className="mb-4"
                  style={{
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#000000',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Brand Colors
                </label>
                <div className="flex gap-4">
                  {brandColors.map((color, index) => (
                    <div key={index} className="flex-1">
                      <div
                        style={{
                          width: '100%',
                          height: '80px',
                          background: color,
                          borderRadius: '12px',
                          border: '2px solid #E5E7EB',
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => {
                            const newColors = [...brandColors];
                            newColors[index] = e.target.value;
                            setBrandColors(newColors);
                          }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            cursor: 'pointer'
                          }}
                        />
                      </div>
                      <p
                        className="mt-2 text-center"
                        style={{
                          fontSize: '12px',
                          color: '#3B3A47',
                          fontFamily: 'Outfit, sans-serif'
                        }}
                      >
                        {color.toUpperCase()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Style */}
              <div>
                <label
                  className="mb-4"
                  style={{
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#000000',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Visual Style
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      style={{
                        padding: '16px 12px',
                        background: selectedStyle === style.id ? '#EDE9FE' : '#FFFFFF',
                        border: selectedStyle === style.id ? '2px solid #8366FF' : '1px solid #E5E7EB',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'center'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: selectedStyle === style.id ? '#8366FF' : '#000000',
                          fontFamily: 'Outfit, sans-serif',
                          marginBottom: '4px'
                        }}
                      >
                        {style.name}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: '#3B3A47',
                          fontFamily: 'Outfit, sans-serif'
                        }}
                      >
                        {style.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Voice Slider */}
              <div>
                <label
                  className="mb-4"
                  style={{
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#000000',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Brand Voice
                </label>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span style={{ fontSize: '12px', color: '#3B3A47', fontFamily: 'Outfit, sans-serif' }}>
                      Professional
                    </span>
                    <span style={{ fontSize: '12px', color: '#3B3A47', fontFamily: 'Outfit, sans-serif' }}>
                      Casual
                    </span>
                  </div>

                  <div style={{ position: 'relative', paddingTop: '20px', paddingBottom: '8px' }}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={brandVoice}
                      onChange={(e) => setBrandVoice(Number(e.target.value))}
                      style={{
                        width: '100%',
                        height: '8px',
                        borderRadius: '20px',
                        background: `linear-gradient(to right, #8366FF 0%, #8366FF ${brandVoice}%, #EDE9FE ${brandVoice}%, #EDE9FE 100%)`,
                        outline: 'none',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        cursor: 'pointer'
                      }}
                      className="custom-slider"
                    />
                  </div>
                </div>

                {/* Current Value Display */}
                <div
                  style={{
                    background: '#F9FAFB',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#8366FF',
                      fontWeight: 600,
                      fontFamily: 'Outfit, sans-serif'
                    }}
                  >
                    {brandVoice < 33 ? 'Professional' : brandVoice < 66 ? 'Balanced' : 'Casual'}
                  </span>
                </div>
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
                  ✨ <strong style={{ color: '#000000' }}>AI Magic:</strong> Your assistant will learn from these preferences to create perfectly branded content every time!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button - Outside main container */}
      <div
        className="px-6 py-4"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#FFFFFF',
          borderTop: '1px solid #F3F4F6',
          zIndex: 1000
        }}
      >
        <button
          onClick={() => {
            onComplete({
              primaryColor: brandColors[0],
              accentColor: brandColors[1],
              selectedStyle,
              brandVoice
            });
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
          Review & Finish
        </button>
      </div>

      <style>{`
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 3px solid #8366FF;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(131, 102, 255, 0.3);
        }
        
        .custom-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 3px solid #8366FF;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(131, 102, 255, 0.3);
        }
        
        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(40px);
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
