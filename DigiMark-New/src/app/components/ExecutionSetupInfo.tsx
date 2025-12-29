import { ArrowLeft, Linkedin } from 'lucide-react';
import { useState } from 'react';

interface ExecutionSetupInfoProps {
  onNavigate: (screen: string) => void;
}

export function ExecutionSetupInfo({ onNavigate }: ExecutionSetupInfoProps) {
  const [campaignName, setCampaignName] = useState('');
  const [autoOptimization, setAutoOptimization] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [budgetReallocation, setBudgetReallocation] = useState(false);

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
          onClick={() => onNavigate('ads-setup-step3')}
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
          gap: '24px',
          overflowY: 'auto'
        }}
      >
        {/* Section 1: Campaign Info */}
        <div>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#000000',
              marginBottom: '16px'
            }}
          >
            Campaign Information
          </h2>

          {/* Campaign Name Input */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: '#3B3A47',
                marginBottom: '8px'
              }}
            >
              Campaign Name
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Enter campaign name"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '2px solid #E5E7EB',
                fontSize: '15px',
                fontFamily: 'Outfit, sans-serif',
                color: '#000000',
                background: '#FFFFFF',
                outline: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#8366FF';
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(131, 102, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
              }}
            />
          </div>

          {/* Platform Mapping */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: '#3B3A47',
                marginBottom: '8px'
              }}
            >
              Platform Mapping
            </label>
            <div
              style={{
                background: '#FFFFFF',
                border: '2px solid #E5E7EB',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0077B5 0%, #00A0DC 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Linkedin size={24} style={{ color: '#FFFFFF' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#000000',
                    margin: 0
                  }}
                >
                  LinkedIn
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#6B7280',
                    margin: 0,
                    marginTop: '2px'
                  }}
                >
                  Professional Network
                </p>
              </div>
              <div
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: '#ECFDF5',
                  border: '1px solid #10B981',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#10B981'
                }}
              >
                Active
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Optimization Settings */}
        <div>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#000000',
              marginBottom: '16px'
            }}
          >
            Optimization Settings
          </h2>

          {/* Toggle Options */}
          <div
            style={{
              background: '#FFFFFF',
              border: '2px solid #E5E7EB',
              borderRadius: '16px',
              padding: '4px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
          >
            {/* Auto-Optimization */}
            <div
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #F3F4F6'
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#000000',
                    margin: 0
                  }}
                >
                  Auto-Optimization
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#6B7280',
                    margin: 0,
                    marginTop: '2px'
                  }}
                >
                  Let AI optimize your campaign
                </p>
              </div>
              <button
                onClick={() => setAutoOptimization(!autoOptimization)}
                style={{
                  width: '52px',
                  height: '32px',
                  borderRadius: '16px',
                  background: autoOptimization ? '#8366FF' : '#E5E7EB',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s',
                  boxShadow: autoOptimization ? '0 4px 12px rgba(131, 102, 255, 0.3)' : 'none'
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    position: 'absolute',
                    top: '4px',
                    left: autoOptimization ? '24px' : '4px',
                    transition: 'all 0.3s',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                />
              </button>
            </div>

            {/* AI Suggestions */}
            <div
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #F3F4F6'
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#000000',
                    margin: 0
                  }}
                >
                  AI Suggestions
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#6B7280',
                    margin: 0,
                    marginTop: '2px'
                  }}
                >
                  Get real-time recommendations
                </p>
              </div>
              <button
                onClick={() => setAiSuggestions(!aiSuggestions)}
                style={{
                  width: '52px',
                  height: '32px',
                  borderRadius: '16px',
                  background: aiSuggestions ? '#8366FF' : '#E5E7EB',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s',
                  boxShadow: aiSuggestions ? '0 4px 12px rgba(131, 102, 255, 0.3)' : 'none'
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    position: 'absolute',
                    top: '4px',
                    left: aiSuggestions ? '24px' : '4px',
                    transition: 'all 0.3s',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                />
              </button>
            </div>

            {/* Budget Reallocation */}
            <div
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#000000',
                    margin: 0
                  }}
                >
                  Budget Reallocation
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#6B7280',
                    margin: 0,
                    marginTop: '2px'
                  }}
                >
                  Auto-adjust budget distribution
                </p>
              </div>
              <button
                onClick={() => setBudgetReallocation(!budgetReallocation)}
                style={{
                  width: '52px',
                  height: '32px',
                  borderRadius: '16px',
                  background: budgetReallocation ? '#8366FF' : '#E5E7EB',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s',
                  boxShadow: budgetReallocation ? '0 4px 12px rgba(131, 102, 255, 0.3)' : 'none'
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    position: 'absolute',
                    top: '4px',
                    left: budgetReallocation ? '24px' : '4px',
                    transition: 'all 0.3s',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div
        style={{
          padding: '20px',
          background: '#FFFFFF',
          borderTop: '1px solid #F3F4F6',
          boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.04)'
        }}
      >
        <button
          onClick={() => onNavigate('execution-setup-actions')}
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
          Continue to Actions
        </button>
      </div>
    </div>
  );
}
