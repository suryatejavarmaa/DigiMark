import { ArrowLeft, Target, Users, MousePointer, Check, Zap, House, Megaphone, Calendar, User } from 'lucide-react';

interface AdsCampaignObjectiveProps {
  onNavigate: (screen: string) => void;
}

export function AdsCampaignObjective({ onNavigate }: AdsCampaignObjectiveProps) {
  const objectives = [
    {
      id: 'ads-setup',
      icon: Zap,
      title: 'AD Setup',
      description: 'Configure your ad campaign with custom settings'
    },
    {
      id: 'brand-awareness',
      icon: Target,
      title: 'Brand Awareness',
      description: 'Increase visibility and reach new audiences'
    },
    {
      id: 'lead-generation',
      icon: Users,
      title: 'Lead Generation',
      description: 'Collect leads and grow your customer base'
    },
    {
      id: 'website-traffic',
      icon: MousePointer,
      title: 'Website Traffic',
      description: 'Drive more visitors to your website'
    }
  ];

  const handleObjectiveClick = (objectiveId: string) => {
    if (objectiveId === 'ads-setup') {
      onNavigate('ads-setup-step1');
    } else {
      onNavigate(`coming-soon-${objectiveId}`);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
        fontFamily: 'Outfit, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '80px'
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #F3F4F6',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}
      >
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
          <ArrowLeft size={20} style={{ color: '#000000' }} />
        </button>
        <h1
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 700,
            color: '#000000',
            marginRight: '40px'
          }}
        >
          Create Ad Campaign
        </h1>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#000000',
            marginBottom: '8px'
          }}
        >
          What's your goal?
        </h2>
        <p
          style={{
            fontSize: '15px',
            color: '#6B7280',
            marginBottom: '32px',
            lineHeight: '1.5'
          }}
        >
          Select your primary campaign objective
        </p>

        {/* Objective Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {objectives.map((objective) => {
            const Icon = objective.icon;

            return (
              <button
                key={objective.id}
                onClick={() => handleObjectiveClick(objective.id)}
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #E5E7EB',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#8366FF';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(131, 102, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: '#F9FAFB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon size={28} style={{ color: '#8366FF' }} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: 700,
                      color: '#000000',
                      marginBottom: '4px'
                    }}
                  >
                    {objective.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#6B7280',
                      lineHeight: '1.5'
                    }}
                  >
                    {objective.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
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
          alignItems: 'center'
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
            padding: '8px 16px'
          }}
        >
          <House size={24} style={{ color: '#9CA3AF' }} />
          <span 
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#9CA3AF',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Home
          </span>
        </button>

        {/* ADs - Active */}
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
          <Megaphone size={24} style={{ color: '#8366FF' }} />
          <span 
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#8366FF',
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
              fontWeight: 600,
              color: '#9CA3AF',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Calendar
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onNavigate('profile-settings')}
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
          <User size={24} style={{ color: '#9CA3AF' }} />
          <span 
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#9CA3AF',
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