import { ArrowLeft, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface AdsSetupStep2Props {
  onNavigate: (screen: string) => void;
}

export function AdsSetupStep2({ onNavigate }: AdsSetupStep2Props) {
  const [dailyBudget, setDailyBudget] = useState(50);
  const [duration, setDuration] = useState(7);

  const minBudget = 10;
  const maxBudget = 500;
  const minDuration = 1;
  const maxDuration = 30;

  const estimatedReach = Math.floor(dailyBudget * duration * 200);

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
          onClick={() => onNavigate('ads-setup-step1')}
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
          Setup Campaign
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
            2
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#000000', marginBottom: '2px' }}>
              Budget & Duration
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>Step 2 of 3</p>
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
              width: '66.66%',
              background: 'linear-gradient(90deg, #8366FF 0%, #A78BFA 100%)',
              borderRadius: '3px',
              transition: 'width 0.3s'
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
          flexDirection: 'column',
          gap: '28px'
        }}
      >
        {/* Daily Budget Slider */}
        <div>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}
          >
            <DollarSign size={18} style={{ color: '#8366FF' }} />
            Daily Budget
          </label>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              border: '1px solid #F3F4F6'
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 800,
                color: '#8366FF',
                marginBottom: '16px',
                textAlign: 'center'
              }}
            >
              ${dailyBudget}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type="range"
                min={minBudget}
                max={maxBudget}
                value={dailyBudget}
                onChange={(e) => setDailyBudget(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  outline: 'none',
                  background: `linear-gradient(to right, #8366FF 0%, #8366FF ${
                    ((dailyBudget - minBudget) / (maxBudget - minBudget)) * 100
                  }%, #F3F4F6 ${((dailyBudget - minBudget) / (maxBudget - minBudget)) * 100}%, #F3F4F6 100%)`,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              />
              <style>
                {`
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #8366FF;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(131, 102, 255, 0.4);
                  }
                  input[type="range"]::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #8366FF;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 8px rgba(131, 102, 255, 0.4);
                  }
                `}
              </style>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '8px',
                fontSize: '12px',
                color: '#6B7280'
              }}
            >
              <span>${minBudget}</span>
              <span>${maxBudget}</span>
            </div>
          </div>
        </div>

        {/* Duration Slider */}
        <div>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}
          >
            <Calendar size={18} style={{ color: '#8366FF' }} />
            Campaign Duration
          </label>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              border: '1px solid #F3F4F6'
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 800,
                color: '#8366FF',
                marginBottom: '16px',
                textAlign: 'center'
              }}
            >
              {duration} {duration === 1 ? 'Day' : 'Days'}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type="range"
                min={minDuration}
                max={maxDuration}
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  outline: 'none',
                  background: `linear-gradient(to right, #8366FF 0%, #8366FF ${
                    ((duration - minDuration) / (maxDuration - minDuration)) * 100
                  }%, #F3F4F6 ${((duration - minDuration) / (maxDuration - minDuration)) * 100}%, #F3F4F6 100%)`,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '8px',
                fontSize: '12px',
                color: '#6B7280'
              }}
            >
              <span>{minDuration} day</span>
              <span>{maxDuration} days</span>
            </div>
          </div>
        </div>

        {/* Estimated Reach Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 8px 24px rgba(131, 102, 255, 0.3)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <TrendingUp size={22} style={{ color: '#FFFFFF' }} />
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2px' }}>
                Estimated Reach
              </p>
              <p style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF' }}>
                {estimatedReach.toLocaleString()}
              </p>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.5' }}>
            Based on your budget and duration settings
          </p>
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
          onClick={() => onNavigate('ads-setup-step3')}
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
          Next Step
        </button>
      </div>
    </div>
  );
}
