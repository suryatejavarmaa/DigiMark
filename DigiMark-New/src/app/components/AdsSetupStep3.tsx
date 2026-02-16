import { ArrowLeft, Target, Users, DollarSign, Calendar, CheckSquare, Square, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { saveCampaign, generateCampaignStrategy } from '../../services/AdsService';

interface AdsSetupStep3Props {
  onNavigate: (screen: string) => void;
  userId?: string | null;
}

export function AdsSetupStep3({ onNavigate, userId }: AdsSetupStep3Props) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [saving, setSaving] = useState(false);
  const [campaignData, setCampaignData] = useState<any>(null);

  // Load campaign data from localStorage (set by previous steps)
  useEffect(() => {
    const storedData = localStorage.getItem('adsCampaignDraft');
    if (storedData) {
      setCampaignData(JSON.parse(storedData));
    } else {
      // Default data if nothing stored
      setCampaignData({
        objective: 'leads',
        audience: 'Small Business Owners',
        platform: 'facebook',
        dailyBudget: 50,
        duration: 7
      });
    }
  }, []);

  const handleSaveCampaign = async () => {
    if (!agreedToTerms || !userId || !campaignData) return;

    setSaving(true);
    try {
      // Generate AI strategy
      const strategyResult = await generateCampaignStrategy({
        objective: campaignData.objective,
        audience: campaignData.audience,
        platform: campaignData.platform,
        budget: { daily: campaignData.dailyBudget },
        duration: `${campaignData.duration} days`
      });

      // Build campaign object
      const campaign: any = {
        name: `${campaignData.objective} Campaign`,
        objective: campaignData.objective,
        platform: campaignData.platform,
        audience: campaignData.audience,
        budget: {
          daily: campaignData.dailyBudget,
          total: campaignData.dailyBudget * campaignData.duration,
          currency: 'USD'
        },
        schedule: {
          startDate: new Date().toISOString(),
          duration: `${campaignData.duration} days`
        },
        targeting: strategyResult.strategy?.targeting || {
          ageRange: '25-54',
          interests: ['business', 'marketing'],
          behaviors: ['online shoppers']
        },
        adCopy: {
          selectedVariation: 0,
          variations: [
            {
              headline: strategyResult.strategy?.keyMessages?.[0] || 'Grow Your Business Today',
              description: strategyResult.strategy?.overview || 'AI-powered marketing at your fingertips',
              cta: 'Learn More'
            }
          ]
        },
        status: 'ready'
      };

      // Add strategy if available
      if (strategyResult.strategy) {
        campaign.strategy = strategyResult.strategy;
      }

      // Save to Firestore
      const result = await saveCampaign(userId, campaign);

      if (result.success) {
        // Clear draft
        localStorage.removeItem('adsCampaignDraft');
        // Navigate to campaigns list
        onNavigate('ads-campaigns-list');
      } else {
        console.error('Failed to save campaign:', result.error);
        alert('Failed to save campaign. Please try again.');
      }
    } catch (error) {
      console.error('Error saving campaign:', error);
      alert('Error saving campaign. Please try again.');
    }
    setSaving(false);
  };

  if (!campaignData) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6FF 100%)'
      }}>
        <Loader2 size={32} style={{ color: '#8366FF', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const totalBudget = campaignData.dailyBudget * campaignData.duration;
  const estimatedReach = Math.floor(campaignData.dailyBudget * campaignData.duration * 200);

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
          onClick={() => onNavigate('ads-setup-step2')}
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
          Review & Save
        </h1>
      </div>

      {/* Progress Indicator */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '16px 20px',
          borderBottom: '1px solid #F3F4F6'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700,
              color: '#FFFFFF'
            }}
          >
            3
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#000000', marginBottom: '2px' }}>
              Review & Confirm
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>Step 3 of 3</p>
          </div>
        </div>
        <div
          style={{
            height: '6px',
            background: '#F3F4F6',
            borderRadius: '3px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              width: '100%',
              background: 'linear-gradient(90deg, #8366FF 0%, #A78BFA 100%)',
              borderRadius: '3px'
            }}
          />
        </div>
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
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#000000',
            marginBottom: '20px'
          }}
        >
          Campaign Summary
        </h2>

        {/* Summary Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            border: '1px solid #F3F4F6',
            marginBottom: '24px'
          }}
        >
          {/* Objective */}
          <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #F3F4F6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Target size={20} style={{ color: '#8366FF' }} />
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280' }}>Objective</span>
            </div>
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#000000', paddingLeft: '30px', textTransform: 'capitalize' }}>
              {campaignData.objective}
            </p>
          </div>

          {/* Strategy */}
          <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #F3F4F6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Users size={20} style={{ color: '#8366FF' }} />
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280' }}>Strategy</span>
            </div>
            <div style={{ paddingLeft: '30px' }}>
              <div style={{ marginBottom: '8px' }}>
                <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '2px' }}>Target Audience</p>
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#000000' }}>
                  {campaignData.audience}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '2px' }}>Platform</p>
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#000000', textTransform: 'capitalize' }}>
                  {campaignData.platform}
                </p>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <DollarSign size={20} style={{ color: '#8366FF' }} />
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280' }}>Budget</span>
            </div>
            <div style={{ paddingLeft: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>Daily Budget</span>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#000000' }}>
                  ${campaignData.dailyBudget}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>Duration</span>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#000000' }}>
                  {campaignData.duration} Days
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid #F3F4F6'
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#000000' }}>Total Budget</span>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  ${totalBudget}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Reach */}
        <div
          style={{
            background: 'linear-gradient(135deg, #EDE9FE 0%, #F3E8FF 100%)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            border: '1px solid #E9D5FF'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280' }}>Estimated Reach</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#8366FF' }}>
              {estimatedReach.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Terms Checkbox */}
        <button
          onClick={() => setAgreedToTerms(!agreedToTerms)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '12px',
            borderRadius: '8px'
          }}
        >
          {agreedToTerms ? (
            <CheckSquare size={24} style={{ color: '#8366FF' }} />
          ) : (
            <Square size={24} style={{ color: '#9CA3AF' }} />
          )}
          <span style={{ fontSize: '14px', color: '#000000', fontFamily: 'Outfit, sans-serif', textAlign: 'left' }}>
            I agree to the <span style={{ color: '#8366FF', fontWeight: 600 }}>Advertising Terms</span>
          </span>
        </button>
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
          onClick={handleSaveCampaign}
          disabled={!agreedToTerms || saving}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: agreedToTerms && !saving
              ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
              : '#E5E7EB',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
            cursor: agreedToTerms && !saving ? 'pointer' : 'not-allowed',
            boxShadow: agreedToTerms && !saving ? '0 8px 24px rgba(131, 102, 255, 0.4)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {saving ? (
            <>
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
              Saving Campaign...
            </>
          ) : (
            'Save & View Campaigns'
          )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}