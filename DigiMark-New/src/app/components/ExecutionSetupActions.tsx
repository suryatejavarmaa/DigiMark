import { ArrowLeft, Rocket, BarChart3, Download, Calendar, Save } from 'lucide-react';

interface ExecutionSetupActionsProps {
  onNavigate: (screen: string) => void;
}

export function ExecutionSetupActions({ onNavigate }: ExecutionSetupActionsProps) {
  const actionCards = [
    {
      id: 'preview-dashboard',
      icon: BarChart3,
      title: 'Preview Dashboards',
      description: 'View campaign analytics preview',
      color: '#3B82F6'
    },
    {
      id: 'lead-export',
      icon: Download,
      title: 'Lead Sheet Export',
      description: 'Download lead collection template',
      color: '#10B981'
    }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)',
        fontFamily: 'Outfit, sans-serif',
        display: 'flex',
        flexDirection: 'column'
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
          onClick={() => onNavigate('execution-setup-info')}
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
          Execution Setup
        </h1>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        {/* Title */}
        <div>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 800,
              color: '#000000',
              marginBottom: '8px'
            }}
          >
            Campaign Actions
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: '#6B7280',
              lineHeight: '1.5'
            }}
          >
            Review and prepare for campaign launch
          </p>
        </div>

        {/* Action Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {actionCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #E5E7EB',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#8366FF';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(131, 102, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: `${card.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={28} style={{ color: card.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: 700,
                      color: '#000000',
                      marginBottom: '4px'
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#6B7280',
                      lineHeight: '1.5',
                      margin: 0
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Campaign Summary */}
        <div
          style={{
            background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
            borderRadius: '16px',
            padding: '20px',
            marginTop: 'auto',
            boxShadow: '0 8px 24px rgba(131, 102, 255, 0.3)'
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '12px'
            }}
          >
            Campaign Summary
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                Platform
              </span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#FFFFFF'
                }}
              >
                LinkedIn
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                Budget
              </span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#FFFFFF'
                }}
              >
                $500/month
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                Duration
              </span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#FFFFFF'
                }}
              >
                30 days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div
        style={{
          padding: '20px',
          background: '#FFFFFF',
          borderTop: '1px solid #F3F4F6',
          boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {/* Primary: Launch Campaign */}
        <button
          onClick={() => onNavigate('campaign-ready')}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
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
          <Rocket size={20} />
          Launch Campaign
        </button>

        {/* Secondary Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '12px',
              background: '#FFFFFF',
              border: '2px solid #8366FF',
              fontSize: '15px',
              fontWeight: 600,
              color: '#8366FF',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F8F6FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
            }}
          >
            <Calendar size={18} />
            Schedule
          </button>
          <button
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '12px',
              background: '#FFFFFF',
              border: '2px solid #E5E7EB',
              fontSize: '15px',
              fontWeight: 600,
              color: '#3B3A47',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F9FAFB';
              e.currentTarget.style.borderColor = '#8366FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#E5E7EB';
            }}
          >
            <Save size={18} />
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}
