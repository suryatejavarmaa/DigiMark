import { CheckCircle2, Linkedin, Facebook, Instagram, Twitter, ExternalLink } from 'lucide-react';

interface PlatformResult {
  status: string;
  url?: string;
  message?: string;
  error?: string;
}

interface PostPublishSuccessProps {
  onNavigate: (screen: string) => void;
  publishResults?: {
    success?: boolean;
    allSuccess?: boolean;
    results?: Record<string, PlatformResult>;
  };
  platforms?: string[];
}

export function PostPublishSuccess({ onNavigate, publishResults, platforms = [] }: PostPublishSuccessProps) {
  const platformIcons: Record<string, any> = {
    linkedin: Linkedin,
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    x: Twitter
  };

  const platformNames: Record<string, string> = {
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    instagram: 'Instagram',
    twitter: 'X (Twitter)',
    x: 'X (Twitter)'
  };

  const platformColors: Record<string, string> = {
    linkedin: '#0A66C2',
    facebook: '#1877F2',
    instagram: '#E1306C',
    twitter: '#000000',
    x: '#000000'
  };

  // Get platforms from results or use passed platforms
  const displayPlatforms = publishResults?.results
    ? Object.keys(publishResults.results)
    : platforms;

  const platformCount = displayPlatforms.length;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
        fontFamily: 'Outfit, sans-serif',
        padding: '24px'
      }}
    >
      {/* Success Icon */}
      <div
        style={{
          marginBottom: '32px',
          animation: 'scaleIn 0.5s ease-out'
        }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 60px rgba(131, 102, 255, 0.3)',
          }}
        >
          <CheckCircle2
            size={60}
            style={{
              color: '#8366FF',
              strokeWidth: 2.5
            }}
          />
        </div>
      </div>

      {/* Success Message */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '32px',
          animation: 'fadeInUp 0.6s ease-out 0.2s both'
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#000000',
            marginBottom: '12px'
          }}
        >
          Success! 🎉
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: '#6B7280'
          }}
        >
          Your post is now live on {platformCount} platform{platformCount !== 1 ? 's' : ''}!
        </p>
      </div>

      {/* Published Successfully Card */}
      <div
        style={{
          background: 'rgba(16, 185, 129, 0.08)',
          borderRadius: '16px',
          padding: '20px',
          width: '100%',
          maxWidth: '350px',
          marginBottom: '24px',
          animation: 'fadeInUp 0.6s ease-out 0.3s both'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px'
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CheckCircle2 size={16} style={{ color: '#FFFFFF' }} />
          </div>
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#10B981' }}>
            Published Successfully
          </span>
        </div>

        {/* Platform Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {displayPlatforms.map((platform) => {
            const Icon = platformIcons[platform] || Linkedin;
            const name = platformNames[platform] || platform;
            const color = platformColors[platform] || '#8366FF';
            const result = publishResults?.results?.[platform];
            const url = result?.url;

            return (
              <div key={platform}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: url ? '8px' : '0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={20} style={{ color }} />
                    <span style={{ fontSize: '15px', fontWeight: 500, color: '#374151' }}>
                      {name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    ✓ Live
                  </span>
                </div>

                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      border: 'none'
                    }}
                  >
                    <ExternalLink size={16} />
                    View on {name}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Back to Dashboard Button */}
      <button
        onClick={() => onNavigate('dashboard')}
        style={{
          width: '100%',
          maxWidth: '350px',
          padding: '16px',
          borderRadius: '12px',
          background: '#FFFFFF',
          border: '2px solid #8366FF',
          fontSize: '16px',
          fontWeight: 600,
          color: '#8366FF',
          cursor: 'pointer',
          animation: 'fadeInUp 0.6s ease-out 0.4s both'
        }}
      >
        Back to Dashboard
      </button>

      {/* CSS Animations */}
      <style>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

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
    </div>
  );
}