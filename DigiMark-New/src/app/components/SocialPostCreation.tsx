import { useState, useEffect } from 'react';
import { ChevronLeft, Sparkles, Linkedin, Twitter, Instagram, Facebook, RefreshCw } from 'lucide-react';
import { AIService } from '../../services/AIService';

interface SocialPostCreationProps {
  onNavigate: (screen: string) => void;
  onGenerate?: (prompt: string, platform: string, tones: string[]) => void;
  userId?: string | null;
  companyName?: string;
  companySummary?: string;
}

export function SocialPostCreation({ onNavigate, onGenerate, userId, companyName, companySummary }: SocialPostCreationProps) {
  const [topic, setTopic] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set(['linkedin']));
  const [toneOfVoice, setToneOfVoice] = useState('professional');
  const [suggestions, setSuggestions] = useState<string[]>([]); // Start empty, no static suggestions
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true); // Start with loading state

  // Fetch dynamic suggestions on mount
  useEffect(() => {
    fetchSuggestions();
  }, [userId]);

  const fetchSuggestions = async () => {
    setIsLoadingSuggestions(true);
    try {
      if (userId) {
        const templates = await AIService.generateTemplates(userId, companyName, companySummary, 8);
        if (templates.length > 0) {
          setSuggestions(templates);
        }
      } else {
        // Fallback suggestions when no userId (demo mode)
        setSuggestions(['Summer Promo', 'New Collection', 'Product Launch', 'Team Update', 'Industry Insights']);
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      // Fallback suggestions on error
      setSuggestions(['Summer Promo', 'New Collection', 'Product Launch', 'Team Update', 'Industry Insights']);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const platforms = [
    { id: 'linkedin', icon: Linkedin, color: '#0A66C2' },
    { id: 'twitter', icon: Twitter, color: '#000000' },
    { id: 'facebook', icon: Facebook, color: '#1877F2' },
    { id: 'instagram', icon: Instagram, color: '#E4405F' }
  ];

  const tones = [
    { id: 'professional', label: 'Professional' },
    { id: 'casual', label: 'Casual' },
    { id: 'enthusiastic', label: 'Enthusiastic' },
    { id: 'informative', label: 'Informative' }
  ];

  const togglePlatform = (platformId: string) => {
    const newPlatforms = new Set(selectedPlatforms);
    if (newPlatforms.has(platformId)) {
      if (newPlatforms.size > 1) { // Keep at least one selected
        newPlatforms.delete(platformId);
      }
    } else {
      newPlatforms.add(platformId);
    }
    setSelectedPlatforms(newPlatforms);
  };

  const addSuggestion = (suggestion: string) => {
    setTopic(suggestion); // Replace instead of append
  };

  const handleRefresh = () => {
    fetchSuggestions();
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
            New AI Caption
          </h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {/* Topic Input */}
        <div className="mb-6">
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#000000',
              marginBottom: '8px',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            What would you like to post about?
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Announce our new product launch happening next week..."
            rows={5}
            style={{
              width: '100%',
              padding: '14px 16px',
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              fontSize: '16px',
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              outline: 'none',
              resize: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#8366FF';
              e.currentTarget.style.borderWidth = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.borderWidth = '1px';
            }}
          />
        </div>

        {/* Suggestion Chips */}
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
                Quick Suggestions
              </label>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoadingSuggestions}
              style={{
                padding: '6px',
                background: 'transparent',
                color: '#8366FF',
                border: 'none',
                cursor: isLoadingSuggestions ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'Outfit, sans-serif',
                transition: 'opacity 0.2s',
                opacity: isLoadingSuggestions ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isLoadingSuggestions) e.currentTarget.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                if (!isLoadingSuggestions) e.currentTarget.style.opacity = '1';
              }}
            >
              <RefreshCw
                size={14}
                style={{
                  animation: isLoadingSuggestions ? 'spin 1s linear infinite' : 'none'
                }}
              />
              {isLoadingSuggestions ? 'Loading...' : 'Refresh'}
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
            {isLoadingSuggestions ? (
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
              suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => addSuggestion(suggestion)}
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
                  {suggestion}
                </button>
              ))
            )}
          </div>
          <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            @keyframes shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </div>

        {/* Platform Selection */}
        <div className="mb-6">
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#000000',
              marginBottom: '8px',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Select Platforms
          </label>
          <div className="flex gap-3">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              const isSelected = selectedPlatforms.has(platform.id);
              return (
                <button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: isSelected ? `${platform.color}15` : '#F9FAFB',
                    border: isSelected ? `2px solid ${platform.color}` : '1px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon
                    size={24}
                    style={{ color: isSelected ? platform.color : '#9CA3AF' }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Tone of Voice */}
        <div className="mb-6">
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#000000',
              marginBottom: '8px',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Tone of Voice
          </label>
          <div className="grid grid-cols-2 gap-3">
            {tones.map((tone) => (
              <button
                key={tone.id}
                onClick={() => setToneOfVoice(tone.id)}
                style={{
                  padding: '12px 16px',
                  background: toneOfVoice === tone.id ? '#EDE9FE' : '#F9FAFB',
                  border: toneOfVoice === tone.id ? '2px solid #8366FF' : '1px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: toneOfVoice === tone.id ? '#8366FF' : '#3B3A47',
                  fontFamily: 'Outfit, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center'
                }}
              >
                {tone.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Tips Card */}
        <div
          style={{
            background: '#EDE9FE',
            padding: '16px',
            borderRadius: '12px',
            marginTop: '24px'
          }}
        >
          <div className="flex items-start gap-2">
            <Sparkles size={20} style={{ color: '#8366FF', flexShrink: 0, marginTop: '2px' }} />
            <p
              style={{
                fontSize: '14px',
                color: '#3B3A47',
                fontFamily: 'Outfit, sans-serif',
                lineHeight: '1.6'
              }}
            >
              <strong style={{ color: '#000000' }}>AI Tip:</strong> Be specific about your topic and target audience. The more context you provide, the better your caption will be!
            </p>
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
          onClick={() => {
            if (topic.trim()) {
              // Get the first selected platform for caption optimization
              const platformArray = Array.from(selectedPlatforms);
              const primaryPlatform = platformArray[0] || 'linkedin';

              if (onGenerate) {
                onGenerate(topic, primaryPlatform, [toneOfVoice]);
              } else {
                onNavigate('caption-generating');
              }
            }
          }}
          disabled={!topic.trim()}
          style={{
            width: '100%',
            background: topic.trim() ? '#8366FF' : '#E5E7EB',
            color: topic.trim() ? '#FFFFFF' : '#9CA3AF',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'Outfit, sans-serif',
            border: 'none',
            cursor: topic.trim() ? 'pointer' : 'not-allowed',
            boxShadow: topic.trim() ? '0 8px 24px rgba(131, 102, 255, 0.3)' : 'none',
            transition: 'transform 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseDown={(e) => {
            if (topic.trim()) {
              e.currentTarget.style.transform = 'scale(0.98)';
            }
          }}
          onMouseUp={(e) => {
            if (topic.trim()) {
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          <Sparkles size={20} />
          Generate Caption
        </button>
      </div>
    </div>
  );
}