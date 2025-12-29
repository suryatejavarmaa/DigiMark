import { ArrowLeft, Sparkles, Linkedin, Facebook, Instagram, Twitter, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AIService } from '../../services/AIService';

interface CreateBusinessPosterProps {
  onNavigate: (screen: string) => void;
  onDescriptionChange?: (description: string) => void;
  onGenerate?: (prompt: string, style: string, ratio: string) => void;
  userId?: string | null;
  companyName?: string;
  companySummary?: string;
}

export function CreateBusinessPoster({ onNavigate, onDescriptionChange, onGenerate, userId, companyName, companySummary }: CreateBusinessPosterProps) {
  const [description, setDescription] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin']);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<'1:1' | '9:16' | '16:9'>('1:1');
  const [quickIdeas, setQuickIdeas] = useState<string[]>([]); // Start empty for dynamic loading
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(true); // Start with loading state

  // Fetch dynamic poster ideas on mount
  useEffect(() => {
    fetchPosterIdeas();
  }, [userId]);

  const fetchPosterIdeas = async () => {
    setIsLoadingIdeas(true);
    try {
      if (userId) {
        const templates = await AIService.generatePosterTemplates(userId, companyName, companySummary, 8);
        if (templates.length > 0) {
          setQuickIdeas(templates);
        }
      } else {
        // Fallback suggestions when no userId (demo mode)
        setQuickIdeas(['Summer Promo', 'New Collection', 'Product Launch', 'Team Update', 'Industry News']);
      }
    } catch (error) {
      console.error('Failed to fetch poster ideas:', error);
      // Fallback suggestions on error
      setQuickIdeas(['Summer Promo', 'New Collection', 'Product Launch', 'Team Update', 'Industry News']);
    } finally {
      setIsLoadingIdeas(false);
    }
  };

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F' },
    { id: 'x', name: 'X', icon: Twitter, color: '#000000' }
  ];

  const aspectRatios = [
    {
      value: '1:1',
      label: 'Square',
      subtitle: 'IG Feed',
      ratio: '1:1'
    },
    {
      value: '9:16',
      label: 'Portrait',
      subtitle: 'Stories',
      ratio: '9:16'
    },
    {
      value: '16:9',
      label: 'Landscape',
      subtitle: 'X/LI',
      ratio: '16:9'
    }
  ];

  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(id => id !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const applyQuickIdea = (idea: string) => {
    setDescription(`Create a professional poster for ${idea} with modern design elements and eye-catching visuals`);
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
            onClick={() => onNavigate('dashboard')}
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
            Create Business Poster
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* AI Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #F8F6FF 0%, #EDE9FE 100%)',
            padding: '8px 16px',
            borderRadius: '20px',
            marginBottom: '24px',
            border: '1px solid #8366FF30'
          }}
        >
          <Sparkles size={16} style={{ color: '#8366FF' }} />
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#8366FF',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            AI-Powered Design
          </span>
        </div>

        {/* Description Input */}
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
            Describe Your Poster
          </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (onDescriptionChange) {
                onDescriptionChange(e.target.value);
              }
            }}
            placeholder="E.g., Create a professional poster announcing our new product launch with modern design elements, bold typography, and vibrant colors..."
            style={{
              width: '100%',
              minHeight: '180px',
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid #E5E7EB',
              fontSize: '15px',
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              resize: 'vertical',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#8366FF';
              e.currentTarget.style.boxShadow = '0 0 0 4px rgba(131, 102, 255, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <p
            style={{
              fontSize: '13px',
              color: '#6B7280',
              fontFamily: 'Outfit, sans-serif',
              marginTop: '8px'
            }}
          >
            {description.length}/500 characters
          </p>
        </div>

        {/* Quick Poster Ideas */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} style={{ color: '#8366FF' }} />
              <label
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#000000',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                Quick Poster Ideas
              </label>
            </div>
            <button
              onClick={fetchPosterIdeas}
              disabled={isLoadingIdeas}
              style={{
                padding: '6px',
                background: 'transparent',
                color: '#8366FF',
                border: 'none',
                cursor: isLoadingIdeas ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'Outfit, sans-serif',
                transition: 'opacity 0.2s',
                opacity: isLoadingIdeas ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isLoadingIdeas) e.currentTarget.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                if (!isLoadingIdeas) e.currentTarget.style.opacity = '1';
              }}
            >
              <RefreshCw
                size={14}
                style={{
                  animation: isLoadingIdeas ? 'spin 1s linear infinite' : 'none'
                }}
              />
              {isLoadingIdeas ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingBottom: '4px'
            }}
            className="hide-scrollbar"
          >
            {isLoadingIdeas ? (
              // Loading skeleton placeholders
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(90deg, #EDE9FE 25%, #F5F3FF 50%, #EDE9FE 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s infinite',
                      borderRadius: '20px',
                      width: '100px',
                      height: '36px',
                      flexShrink: 0
                    }}
                  />
                ))}
              </>
            ) : (
              quickIdeas.map((idea) => (
                <button
                  key={idea}
                  onClick={() => applyQuickIdea(idea)}
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
              ))
            )}
          </div>
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
            Select Platform
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
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
                    padding: '16px',
                    borderRadius: '12px',
                    background: isSelected
                      ? 'linear-gradient(135deg, #F8F6FF 0%, #EDE9FE 100%)'
                      : '#FFFFFF',
                    border: isSelected ? '2px solid #8366FF' : '2px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `${platform.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon size={20} style={{ color: platform.color }} />
                  </div>
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#000000',
                      fontFamily: 'Outfit, sans-serif'
                    }}
                  >
                    {platform.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Aspect Ratio */}
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
            Aspect Ratio
          </label>
          <div
            style={{
              display: 'flex',
              gap: '12px'
            }}
          >
            {aspectRatios.map((ratio) => {
              const isSelected = selectedAspectRatio === ratio.value;

              return (
                <button
                  key={ratio.value}
                  onClick={() => setSelectedAspectRatio(ratio.value as '1:1' | '9:16' | '16:9')}
                  style={{
                    flex: 1,
                    padding: '20px 16px',
                    borderRadius: '12px',
                    background: isSelected
                      ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
                      : '#FFFFFF',
                    border: isSelected ? 'none' : '2px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isSelected ? '0 4px 12px rgba(131, 102, 255, 0.3)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  {/* Aspect Ratio Icon */}
                  <div
                    style={{
                      width: ratio.value === '1:1' ? '40px' : ratio.value === '9:16' ? '28px' : '52px',
                      height: ratio.value === '1:1' ? '40px' : ratio.value === '9:16' ? '48px' : '32px',
                      borderRadius: '6px',
                      border: `2px solid ${isSelected ? '#FFFFFF' : '#8366FF'}`,
                      background: 'transparent'
                    }}
                  />

                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: isSelected ? '#FFFFFF' : '#000000',
                        fontFamily: 'Outfit, sans-serif',
                        marginBottom: '2px'
                      }}
                    >
                      {ratio.label}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: isSelected ? '#FFFFFF' : '#6B7280',
                        fontFamily: 'Outfit, sans-serif',
                        marginBottom: '2px'
                      }}
                    >
                      {ratio.subtitle}
                    </div>
                    <div
                      style={{
                        fontSize: '10px',
                        color: isSelected ? '#FFFFFF' : '#9CA3AF',
                        fontFamily: 'Outfit, sans-serif'
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
          onClick={() => {
            if (onDescriptionChange) {
              onDescriptionChange(description);
            }
            if (onGenerate) {
              // Call the API handler with prompt, style (derived from platform), and ratio
              const style = selectedPlatforms.includes('instagram') ? 'Modern Professional' : 'Corporate';
              onGenerate(description, style, selectedAspectRatio);
            } else {
              onNavigate('generating-images');
            }
          }}
          disabled={!description.trim() || selectedPlatforms.length === 0}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: description.trim() && selectedPlatforms.length > 0
              ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
              : '#E5E7EB',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
            fontFamily: 'Outfit, sans-serif',
            cursor: description.trim() && selectedPlatforms.length > 0 ? 'pointer' : 'not-allowed',
            boxShadow: description.trim() && selectedPlatforms.length > 0
              ? '0 8px 24px rgba(131, 102, 255, 0.4)'
              : 'none',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            if (description.trim() && selectedPlatforms.length > 0) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(131, 102, 255, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            if (description.trim() && selectedPlatforms.length > 0) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(131, 102, 255, 0.4)';
            }
          }}
        >
          <Sparkles size={20} />
          Continue to Advanced Options
        </button>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}