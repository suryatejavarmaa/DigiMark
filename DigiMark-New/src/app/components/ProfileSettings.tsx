import { User, Building2, Mail, Phone, MapPin, Settings, HelpCircle, LogOut, ChevronRight, House, Megaphone, Calendar, TrendingUp } from 'lucide-react';

interface UserProfile {
  fullName?: string;
  email?: string;
  businessName?: string;
  businessDescription?: string;
}

interface ProfileSettingsProps {
  onNavigate: (screen: string) => void;
  userProfile?: UserProfile | null;
  onLogout?: () => void;
}

export function ProfileSettings({ onNavigate, userProfile, onLogout }: ProfileSettingsProps) {
  // Get display values with fallbacks
  const displayName = userProfile?.fullName || userProfile?.email?.split('@')[0] || 'User';
  const displayEmail = userProfile?.email || 'No email set';
  const displayInitials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

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
          background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
          padding: '24px 20px 40px',
          boxShadow: '0 4px 24px rgba(131, 102, 255, 0.2)'
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#FFFFFF',
            fontFamily: 'Outfit, sans-serif',
            margin: '0 0 8px 0'
          }}
        >
          Profile
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'Outfit, sans-serif',
            margin: 0
          }}
        >
          Manage your account settings
        </p>
      </div>

      {/* User Info Card */}
      <div style={{ padding: '0 20px', marginTop: '-20px' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            marginBottom: '24px'
          }}
        >
          {/* Avatar & Info */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px'
            }}
          >
            {/* Avatar with initials */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(131, 102, 255, 0.3)'
              }}
            >
              <span style={{
                color: '#FFFFFF',
                fontSize: '24px',
                fontWeight: 700,
                fontFamily: 'Outfit, sans-serif'
              }}>
                {displayInitials || <User size={36} style={{ color: '#FFFFFF' }} />}
              </span>
            </div>

            {/* Name & Email */}
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#000000',
                  fontFamily: 'Outfit, sans-serif',
                  margin: '0 0 6px 0'
                }}
              >
                {displayName}
              </h2>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Mail size={14} style={{ color: '#6B7280' }} />
                <span
                  style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    fontWeight: 500
                  }}
                >
                  {displayEmail}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px'
            }}
          >
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#8366FF',
                  marginBottom: '4px'
                }}
              >
                48
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: '#6B7280',
                  fontWeight: 600
                }}
              >
                Total Posts
              </div>
            </div>
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#3B82F6',
                  marginBottom: '4px'
                }}
              >
                4
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: '#6B7280',
                  fontWeight: 600
                }}
              >
                Connected
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings Section */}
        <div style={{ marginBottom: '16px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#6B7280',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '12px',
              paddingLeft: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Account Settings
          </h3>

          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              overflow: 'hidden'
            }}
          >
            {/* Personal Information */}
            <button
              onClick={() => alert('Personal Information')}
              style={{
                width: '100%',
                padding: '16px',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderBottom: '1px solid #F3F4F6'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
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
                <User size={20} style={{ color: '#8366FF' }} />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#000000',
                    marginBottom: '2px'
                  }}
                >
                  Personal Information
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#6B7280'
                  }}
                >
                  Update your details
                </div>
              </div>
              <ChevronRight size={20} style={{ color: '#9CA3AF' }} />
            </button>

            {/* Password & Security */}
            <button
              onClick={() => alert('Password & Security')}
              style={{
                width: '100%',
                padding: '16px',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
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
                <Settings size={20} style={{ color: '#8366FF' }} />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#000000',
                    marginBottom: '2px'
                  }}
                >
                  Password & Security
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#6B7280'
                  }}
                >
                  Manage your password
                </div>
              </div>
              <ChevronRight size={20} style={{ color: '#9CA3AF' }} />
            </button>
          </div>
        </div>

        {/* Business Details Section */}
        <div style={{ marginBottom: '16px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#6B7280',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '12px',
              paddingLeft: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Business Details
          </h3>

          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              overflow: 'hidden'
            }}
          >
            {/* Business Info */}
            <button
              onClick={() => alert('Business Information')}
              style={{
                width: '100%',
                padding: '16px',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderBottom: '1px solid #F3F4F6'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Building2 size={20} style={{ color: '#3B82F6' }} />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#000000',
                    marginBottom: '2px'
                  }}
                >
                  Business Information
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#6B7280'
                  }}
                >
                  Company details & address
                </div>
              </div>
              <ChevronRight size={20} style={{ color: '#9CA3AF' }} />
            </button>

            {/* Contact Details */}
            <button
              onClick={() => alert('Contact Details')}
              style={{
                width: '100%',
                padding: '16px',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Phone size={20} style={{ color: '#3B82F6' }} />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#000000',
                    marginBottom: '2px'
                  }}
                >
                  Contact Details
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#6B7280'
                  }}
                >
                  Phone & location
                </div>
              </div>
              <ChevronRight size={20} style={{ color: '#9CA3AF' }} />
            </button>
          </div>
        </div>

        {/* Help & Support Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#6B7280',
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '12px',
              paddingLeft: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Help & Support
          </h3>

          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              overflow: 'hidden'
            }}
          >
            <button
              onClick={() => alert('Help Center')}
              style={{
                width: '100%',
                padding: '16px',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <HelpCircle size={20} style={{ color: '#F59E0B' }} />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#000000',
                    marginBottom: '2px'
                  }}
                >
                  Help Center
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#6B7280'
                  }}
                >
                  FAQs & tutorials
                </div>
              </div>
              <ChevronRight size={20} style={{ color: '#9CA3AF' }} />
            </button>
          </div>
        </div>

        {/* Log Out Button */}
        <button
          onClick={() => onLogout ? onLogout() : onNavigate('login-choice')}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: '#FFFFFF',
            border: '2px solid #EF4444',
            fontSize: '16px',
            fontWeight: 600,
            color: '#EF4444',
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FEF2F2';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.06)';
          }}
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>

      {/* Bottom Navigation */}
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
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.06)'
        }}
      >
        {/* Home */}
        <button
          onClick={() => onNavigate('dashboard')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            padding: '8px 16px'
          }}
        >
          <House size={24} style={{ color: '#9CA3AF' }} />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: '#9CA3AF',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Home
          </span>
        </button>

        {/* ADs */}
        <button
          onClick={() => onNavigate('ads-campaign-objective')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 16px'
          }}
        >
          <Megaphone size={24} style={{ color: '#9CA3AF' }} />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: '#9CA3AF',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            ADs
          </span>
        </button>

        {/* Calendar */}
        <button
          onClick={() => onNavigate('calendar-view')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 16px'
          }}
        >
          <Calendar size={24} style={{ color: '#9CA3AF' }} />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: '#9CA3AF',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Calendar
          </span>
        </button>

        {/* Profile - Active */}
        <button
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            padding: '8px 16px'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#8366FF'
            }}
          />
          <User size={24} style={{ color: '#8366FF' }} />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#8366FF',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Profile
          </span>
        </button>
      </div>
    </div>
  );
}