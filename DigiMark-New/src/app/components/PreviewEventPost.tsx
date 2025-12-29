import { ArrowLeft, MapPin, Clock, Calendar } from 'lucide-react';

interface PreviewEventPostProps {
  onNavigate: (screen: string) => void;
}

export function PreviewEventPost({ onNavigate }: PreviewEventPostProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
        fontFamily: 'Outfit, sans-serif',
        paddingBottom: '100px'
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}
      >
        <button
          onClick={() => onNavigate('select-channels-image')}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: '#F3F4F6',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#E5E7EB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F3F4F6';
          }}
        >
          <ArrowLeft size={20} style={{ color: '#000000' }} />
        </button>
        <div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              margin: 0
            }}
          >
            Preview Post
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: '#6B7280',
              fontFamily: 'Outfit, sans-serif',
              margin: 0
            }}
          >
            Review before posting
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 20px' }}>
        {/* Event Poster Image */}
        <div
          style={{
            width: '100%',
            aspectRatio: '9/16',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #8366FF 0%, #6B4FDB 100%)',
            marginBottom: '24px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 12px 32px rgba(131, 102, 255, 0.3)'
          }}
        >
          {/* Mock Event Poster Design */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)'
            }}
          >
            {/* Top Section */}
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  opacity: 0.9,
                  marginBottom: '8px'
                }}
              >
                GRAND OPENING
              </div>
              <h2
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: '1.2',
                  margin: '0 0 12px 0'
                }}
              >
                Summer Sale<br />2024
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  color: '#FFFFFF',
                  opacity: 0.95,
                  margin: 0
                }}
              >
                Join us for amazing deals & exclusive offers!
              </p>
            </div>

            {/* Bottom Section */}
            <div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '12px'
                  }}
                >
                  Event Details
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} style={{ color: '#FFFFFF' }} />
                    <span style={{ fontSize: '14px', color: '#FFFFFF' }}>
                      Central Plaza, Downtown
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={16} style={{ color: '#FFFFFF' }} />
                    <span style={{ fontSize: '14px', color: '#FFFFFF' }}>
                      Dec 20, 2024
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} style={{ color: '#FFFFFF' }} />
                    <span style={{ fontSize: '14px', color: '#FFFFFF' }}>
                      10:00 AM - 6:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            marginBottom: '24px'
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '16px'
            }}
          >
            Event Information
          </h3>

          {/* Venue */}
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: '#F9FAFB',
                borderRadius: '12px'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <MapPin size={20} style={{ color: '#8366FF' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#6B7280',
                    fontWeight: 500,
                    marginBottom: '2px'
                  }}
                >
                  Venue
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    color: '#000000',
                    fontWeight: 600
                  }}
                >
                  Central Plaza, Downtown
                </div>
              </div>
            </div>
          </div>

          {/* Time */}
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: '#F9FAFB',
                borderRadius: '12px'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Clock size={20} style={{ color: '#8366FF' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#6B7280',
                    fontWeight: 500,
                    marginBottom: '2px'
                  }}
                >
                  Time
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    color: '#000000',
                    fontWeight: 600
                  }}
                >
                  10:00 AM - 6:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Date */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: '#F9FAFB',
                borderRadius: '12px'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Calendar size={20} style={{ color: '#8366FF' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#6B7280',
                    fontWeight: 500,
                    marginBottom: '2px'
                  }}
                >
                  Date
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    color: '#000000',
                    fontWeight: 600
                  }}
                >
                  December 20, 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#FFFFFF',
          padding: '16px 20px 32px',
          boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.08)'
        }}
      >
        <button
          onClick={() => onNavigate('calendar-view')}
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
          Finalize & Post
        </button>
      </div>
    </div>
  );
}