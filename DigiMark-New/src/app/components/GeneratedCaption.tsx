import { ArrowLeft, Copy, RefreshCw, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GeneratedCaptionProps {
  onNavigate: (screen: string) => void;
  caption?: string;
  onRegenerate?: () => void;
  onEdit?: (caption: string) => void;
}

export function GeneratedCaption({ onNavigate, caption: externalCaption, onRegenerate, onEdit }: GeneratedCaptionProps) {
  const [caption, setCaption] = useState(
    externalCaption || "🚀 Excited to announce our new product launch! Our team has been working tirelessly to bring you something truly special. Stay tuned for more updates! #Innovation #ProductLaunch #BusinessGrowth"
  );
  const [refineText, setRefineText] = useState('');
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  // Sync with external caption changes
  useEffect(() => {
    if (externalCaption) {
      setCaption(externalCaption);
    }
  }, [externalCaption]);

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    if (onRegenerate) {
      // Use external regenerate handler if provided (calls API)
      onRegenerate();
    } else {
      // Fallback to mock regeneration
      setRegenerating(true);
      setTimeout(() => {
        setCaption(
          "✨ Big news coming your way! We've been developing something amazing that will transform the way you work. Can't wait to share it with you all! #NewBeginnings #Startup #Tech"
        );
        setRegenerating(false);
      }, 1500);
    }
  };

  const handleCaptionChange = (newCaption: string) => {
    setCaption(newCaption);
    if (onEdit) {
      onEdit(newCaption);
    }
  };

  const handleRefine = () => {
    if (!refineText.trim()) return;

    setRegenerating(true);
    setTimeout(() => {
      const newCaption = `🎯 ${refineText}! Thrilled to share our latest innovation with you. Our team has crafted something extraordinary that will elevate your business to new heights. More exciting details coming soon! #${refineText.replace(/\s+/g, '')} #Innovation #GrowthMindset`;
      handleCaptionChange(newCaption);
      setRefineText('');
      setRegenerating(false);
    }, 1500);
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
            onClick={() => onNavigate('social-post-creation')}
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
            Generated Caption
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Caption Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
            border: '2px solid #E5E7EB',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(131, 102, 255, 0.15)'
          }}
        >
          {/* AI Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
              padding: '6px 12px',
              borderRadius: '8px',
              marginBottom: '16px'
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#FFFFFF',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              ✨ AI Generated
            </span>
          </div>

          {/* Caption Text */}
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '20px',
              whiteSpace: 'pre-wrap'
            }}
          >
            {caption}
          </p>

          {/* Action Buttons Row */}
          <div className="flex gap-3">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              disabled={copied}
              style={{
                flex: 1,
                padding: '12px 20px',
                borderRadius: '12px',
                background: copied ? '#22C55E' : '#F9FAFB',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: copied ? 'default' : 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              {copied ? (
                <>
                  <Check size={18} style={{ color: '#FFFFFF' }} />
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#FFFFFF'
                    }}
                  >
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy size={18} style={{ color: '#000000' }} />
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#000000'
                    }}
                  >
                    Copy Text
                  </span>
                </>
              )}
            </button>

            {/* Regenerate Button */}
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                background: '#8366FF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: regenerating ? 'default' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(131, 102, 255, 0.3)',
                fontFamily: 'Outfit, sans-serif',
                opacity: regenerating ? 0.7 : 1
              }}
            >
              <RefreshCw
                size={18}
                style={{
                  color: '#FFFFFF',
                  animation: regenerating ? 'spin 1s linear infinite' : 'none'
                }}
              />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#FFFFFF'
                }}
              >
                Regenerate
              </span>
            </button>
          </div>
        </div>

        {/* Refine Section */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: 600,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '12px'
            }}
          >
            Refine Caption
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={refineText}
              onChange={(e) => setRefineText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && refineText.trim()) {
                  handleRefine();
                }
              }}
              placeholder="Add specific keywords or tone..."
              style={{
                width: '100%',
                padding: refineText.trim() ? '16px 90px 16px 20px' : '16px 20px',
                borderRadius: '12px',
                border: '2px solid #E5E7EB',
                background: '#FFFFFF',
                fontSize: '14px',
                color: '#000000',
                fontFamily: 'Outfit, sans-serif',
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
            {refineText.trim() && (
              <button
                onClick={handleRefine}
                disabled={regenerating}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  fontFamily: 'Outfit, sans-serif',
                  cursor: regenerating ? 'default' : 'pointer',
                  opacity: regenerating ? 0.7 : 1,
                  boxShadow: '0 2px 8px rgba(131, 102, 255, 0.3)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!regenerating) {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(131, 102, 255, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!regenerating) {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(131, 102, 255, 0.3)';
                  }
                }}
              >
                Refine
              </button>
            )}
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
          onClick={() => onNavigate('select-channels')}
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
          Post to Socials
        </button>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}