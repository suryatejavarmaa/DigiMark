import { useState } from 'react';
import { ChevronLeft, Sparkles, RefreshCw } from 'lucide-react';

interface AIGraphicCreationProps {
  onNavigate: (screen: string) => void;
}

export function AIGraphicCreation({ onNavigate }: AIGraphicCreationProps) {
  const [description, setDescription] = useState('');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('portrait');
  const [selectedStyles, setSelectedStyles] = useState<Set<string>>(new Set());

  const posterIdeas = [
    'Summer Sale Event',
    'New Product Launch',
    'Brisk Winter Sale',
    'Holiday Special',
    'Flash Sale'
  ];

  const aspectRatios = [
    { id: 'square', label: 'Square', subtitle: 'IG Feed', ratio: '1:1' },
    { id: 'portrait', label: 'Portrait', subtitle: 'Stories', ratio: '9:16' },
    { id: 'landscape', label: 'Landscape', subtitle: 'X/LI', ratio: '16:9' }
  ];

  const visualStyles = [
    'Photorealistic',
    '3D Render',
    'Cyberpunk',
    'Minimalist',
    'Watercolor',
    'Oil Painting',
    'Digital Art',
    'Sketch',
    'Abstract',
    'Anime'
  ];

  const addPosterIdea = (idea: string) => {
    setDescription(idea);
  };

  const handleRefresh = () => {
    alert('Refreshing poster ideas...');
  };

  const toggleStyle = (style: string) => {
    const newStyles = new Set(selectedStyles);
    if (newStyles.has(style)) {
      newStyles.delete(style);
    } else {
      newStyles.add(style);
    }
    setSelectedStyles(newStyles);
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
        className="px-6 py-4"
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #F3F4F6'
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
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
          <h1 
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Business Poster
          </h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Description Input */}
        <div className="mb-6">
          <label 
            style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: 600,
              color: '#000000',
              marginBottom: '12px',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Describe Your Image
          </label>
          <div style={{ position: 'relative' }}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., A futuristic cityscape at night with neon lights and flying cars, cyberpunk aesthetic..."
              rows={6}
              style={{
                width: '100%',
                padding: '14px 16px',
                paddingBottom: '40px',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '16px',
                fontSize: '14px',
                color: '#000000',
                fontFamily: 'Outfit, sans-serif',
                outline: 'none',
                resize: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(131, 102, 255, 0.08)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#8366FF';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(131, 102, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(131, 102, 255, 0.08)';
              }}
            />
            <div 
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '16px',
                right: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span 
                style={{
                  fontSize: '12px',
                  color: '#9CA3AF',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                {description.length} characters
              </span>
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <Sparkles size={18} style={{ color: '#8366FF' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Poster Ideas */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} style={{ color: '#8366FF' }} />
              <label 
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#000000',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                Quick Poster Ideas
              </label>
            </div>
            <button
              onClick={handleRefresh}
              style={{
                padding: '6px',
                background: 'transparent',
                color: '#8366FF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'Outfit, sans-serif',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
          <div 
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            className="hide-scrollbar"
          >
            {posterIdeas.map((idea) => (
              <button
                key={idea}
                onClick={() => addPosterIdea(idea)}
                style={{
                  padding: '8px 16px',
                  background: '#EDE9FE',
                  color: '#8366FF',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'Outfit, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8366FF';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#EDE9FE';
                  e.currentTarget.style.color = '#8366FF';
                }}
              >
                {idea}
              </button>
            ))}
          </div>
          <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>

        {/* Aspect Ratio Selection */}
        <div className="mb-6">
          <label 
            style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: 600,
              color: '#000000',
              marginBottom: '12px',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Aspect Ratio
          </label>
          <div className="grid grid-cols-3 gap-3">
            {aspectRatios.map((ratio) => {
              const isSelected = selectedAspectRatio === ratio.id;
              return (
                <button
                  key={ratio.id}
                  onClick={() => setSelectedAspectRatio(ratio.id)}
                  style={{
                    padding: '20px 12px',
                    background: '#FFFFFF',
                    border: isSelected ? '2px solid #8366FF' : '1px solid #E5E7EB',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: isSelected ? '0 0 0 3px rgba(131, 102, 255, 0.1)' : '0 2px 8px rgba(131, 102, 255, 0.08)'
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
                  {/* Icon representation */}
                  <div
                    style={{
                      width: ratio.id === 'square' ? '40px' : ratio.id === 'portrait' ? '32px' : '48px',
                      height: ratio.id === 'square' ? '40px' : ratio.id === 'portrait' ? '48px' : '32px',
                      border: `2px solid ${isSelected ? '#8366FF' : '#D1D5DB'}`,
                      borderRadius: '4px',
                      transition: 'border-color 0.2s'
                    }}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <div 
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: isSelected ? '#8366FF' : '#000000',
                        fontFamily: 'Outfit, sans-serif',
                        marginBottom: '2px'
                      }}
                    >
                      {ratio.label}
                    </div>
                    <div 
                      style={{
                        fontSize: '11px',
                        color: '#9CA3AF',
                        fontFamily: 'Outfit, sans-serif'
                      }}
                    >
                      {ratio.subtitle}
                    </div>
                    <div 
                      style={{
                        fontSize: '12px',
                        color: '#9CA3AF',
                        fontFamily: 'Outfit, sans-serif',
                        marginTop: '2px'
                      }}
                    >
                      {ratio.ratio}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Style Selection */}
        <div className="mb-6">
          <label 
            style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: 600,
              color: '#000000',
              marginBottom: '12px',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Visual Style (Optional)
          </label>
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}
          >
            {visualStyles.map((style) => {
              const isSelected = selectedStyles.has(style);
              return (
                <button
                  key={style}
                  onClick={() => toggleStyle(style)}
                  style={{
                    padding: '10px 18px',
                    background: isSelected ? '#EDE9FE' : '#FFFFFF',
                    color: isSelected ? '#8366FF' : '#000000',
                    border: isSelected ? '1px solid #8366FF' : '1px solid #E5E7EB',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Outfit, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#8366FF';
                      e.currentTarget.style.background = '#F9FAFB';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.background = '#FFFFFF';
                    }
                  }}
                >
                  {style}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div 
        className="px-6 py-4"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: '480px',
          margin: '0 auto',
          background: '#FFFFFF',
          borderTop: '1px solid #F3F4F6'
        }}
      >
        <button
          onClick={() => alert('Generating AI graphic...')}
          disabled={!description.trim()}
          style={{
            width: '100%',
            background: description.trim() 
              ? 'linear-gradient(135deg, #8366FF 0%, #9D7FFF 100%)' 
              : '#E5E7EB',
            color: description.trim() ? '#FFFFFF' : '#9CA3AF',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'Outfit, sans-serif',
            border: 'none',
            cursor: description.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: description.trim() ? '0 4px 12px rgba(131, 102, 255, 0.3)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (description.trim()) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(131, 102, 255, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (description.trim()) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 102, 255, 0.3)';
            }
          }}
        >
          <Sparkles size={20} />
          Generate Image
        </button>
      </div>
    </div>
  );
}