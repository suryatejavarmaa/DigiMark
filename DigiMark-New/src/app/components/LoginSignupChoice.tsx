import { Chrome, Apple } from 'lucide-react';
import { AnimatedHeroModule } from './AnimatedHeroModule';

interface LoginSignupChoiceProps {
  onNavigate: (screen: string) => void;
}

export function LoginSignupChoice({ onNavigate }: LoginSignupChoiceProps) {
  return (
    <div
      className="min-h-screen flex flex-col px-6 py-8"
      style={{
        background: '#FFFFFF',
        fontFamily: 'Outfit, sans-serif'
      }}
    >
      {/* Abstract 3D Illustration */}
      <div
        className="flex-1 flex items-center justify-center mb-8"
        style={{
          overflow: 'hidden',
          maxHeight: '280px',
          minHeight: '280px'
        }}
      >
        <div
          className="w-full max-w-md"
          style={{
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <AnimatedHeroModule />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Hero Heading */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#000000',
            fontFamily: 'Outfit, sans-serif',
            lineHeight: '1.2',
            textAlign: 'center'
          }}
        >
          Welcome to the Future of Marketing
        </h1>

        {/* Primary CTA */}
        <button
          onClick={() => onNavigate('onboarding-1a')}
          style={{
            width: '100%',
            background: '#8366FF',
            color: '#FFFFFF',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'Outfit, sans-serif',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(131, 102, 255, 0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Create New Account
        </button>

        {/* Secondary Button */}
        <button
          onClick={() => onNavigate('welcome-back')}
          style={{
            width: '100%',
            background: '#FFFFFF',
            color: '#8366FF',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'Outfit, sans-serif',
            border: '2px solid #8366FF',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          Log In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 py-2">
          <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          <span style={{ fontSize: '14px', color: '#3B3A47', fontFamily: 'Outfit, sans-serif' }}>
            Or continue with
          </span>
          <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
        </div>

        {/* Social Login Icons */}
        <div className="flex justify-center gap-4">
          <button
            style={{
              width: '64px',
              height: '64px',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.2s, background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#8366FF';
              e.currentTarget.style.background = '#EDE9FE';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.background = '#FFFFFF';
            }}
          >
            <Chrome size={28} style={{ color: '#8366FF' }} />
          </button>
          <button
            style={{
              width: '64px',
              height: '64px',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.2s, background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#8366FF';
              e.currentTarget.style.background = '#EDE9FE';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.background = '#FFFFFF';
            }}
          >
            <Apple size={28} style={{ color: '#8366FF' }} />
          </button>
          <button
            style={{
              width: '64px',
              height: '64px',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.2s, background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#8366FF';
              e.currentTarget.style.background = '#EDE9FE';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.background = '#FFFFFF';
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z" stroke="#8366FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 7.5H21" stroke="#8366FF" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Privacy Policy Link */}
        <div className="text-center pt-4">
          <span style={{ fontSize: '13px', color: '#6B7280', fontFamily: 'Outfit, sans-serif' }}>
            By continuing, you agree to our{' '}
            <button
              onClick={() => onNavigate('privacy-policy')}
              style={{
                color: '#8366FF',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: 'Outfit, sans-serif',
                padding: 0
              }}
            >
              Privacy Policy
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}