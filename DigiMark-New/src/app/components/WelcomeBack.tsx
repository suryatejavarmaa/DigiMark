import { ArrowLeft, Eye, EyeOff, User, Chrome, Apple, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { UserService } from '../../services/UserService';

interface WelcomeBackProps {
  onNavigate: (screen: string) => void;
  onLoginSuccess?: (userId: string) => void;
}

export function WelcomeBack({ onNavigate, onLoginSuccess }: WelcomeBackProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) return;
    setIsLoading(true);
    setError('');

    try {
      const userId = await UserService.login(username, password);
      console.log('Login successful, userId:', userId);

      if (onLoginSuccess) {
        onLoginSuccess(userId);
      }
      onNavigate('dashboard');
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

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
          background: 'transparent',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <button
          onClick={() => onNavigate('login-choice')}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F9FAFB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFFFFF';
          }}
        >
          <ArrowLeft size={20} style={{ color: '#000000' }} />
        </button>
      </div>

      {/* Content - Centered with left margin */}
      <div
        style={{
          flex: 1,
          padding: '20px',
          paddingLeft: '32px',
          paddingRight: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '480px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* Welcome Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}
        >
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 800,
              marginBottom: '4px',
              background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Welcome Back!
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#6B7280',
              lineHeight: '1.5'
            }}
          >
            Continue your journey to marketing success
          </p>

          {/* Error Message */}
          {error && (
            <div
              style={{
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: '12px',
                padding: '12px 16px',
                marginTop: '16px'
              }}
            >
              <p style={{ fontSize: '14px', color: '#DC2626', margin: 0 }}>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Username Field */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#000000',
              display: 'block',
              marginBottom: '8px'
            }}
          >
            Username or Email
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username or email"
              style={{
                width: '100%',
                padding: '16px',
                paddingLeft: '48px',
                borderRadius: '12px',
                border: '2px solid #E5E7EB',
                fontSize: '15px',
                fontFamily: 'Outfit, sans-serif',
                color: '#000000',
                background: '#FFFFFF',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#8366FF';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(131, 102, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6B7280'
              }}
            >
              <User size={20} />
            </div>
          </div>
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#000000',
              display: 'block',
              marginBottom: '8px'
            }}
          >
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '16px',
                paddingRight: '50px',
                borderRadius: '12px',
                border: '2px solid #E5E7EB',
                fontSize: '15px',
                fontFamily: 'Outfit, sans-serif',
                color: '#000000',
                background: '#FFFFFF',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#8366FF';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(131, 102, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && password) {
                  handleLogin();
                }
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'transparent',
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
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {showPassword ? (
                <EyeOff size={20} style={{ color: '#6B7280' }} />
              ) : (
                <Eye size={20} style={{ color: '#6B7280' }} />
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div
            style={{
              marginTop: '12px',
              textAlign: 'right'
            }}
          >
            <button
              onClick={() => alert('Forgot password flow')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                color: '#8366FF',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={!username || !password || isLoading}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: username && password && !isLoading
              ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
              : '#E5E7EB',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
            fontFamily: 'Outfit, sans-serif',
            cursor: username && password && !isLoading ? 'pointer' : 'not-allowed',
            boxShadow: username && password && !isLoading ? '0 8px 24px rgba(131, 102, 255, 0.4)' : 'none',
            transition: 'all 0.2s',
            marginBottom: '24px'
          }}
          onMouseEnter={(e) => {
            if (username && password && !isLoading) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(131, 102, 255, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            if (username && password && !isLoading) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(131, 102, 255, 0.4)';
            }
          }}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '28px'
          }}
        >
          <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          <span style={{ fontSize: '14px', color: '#3B3A47', fontWeight: 500 }}>Or continue with</span>
          <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
        </div>

        {/* Social Login Icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
          {/* Google Login */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => alert('Login with Google')}
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
                transition: 'border-color 0.2s, background 0.2s',
                marginBottom: '8px'
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
            <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>Google</span>
          </div>

          {/* Apple Login */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => alert('Login with Apple')}
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
                transition: 'border-color 0.2s, background 0.2s',
                marginBottom: '8px'
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
            <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>Apple</span>
          </div>

          {/* Card/Payment Login */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => alert('Login with Payment')}
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
                transition: 'border-color 0.2s, background 0.2s',
                marginBottom: '8px'
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
              <CreditCard size={28} style={{ color: '#8366FF' }} />
            </button>
            <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>Card</span>
          </div>
        </div>

        {/* Need Help */}
        <div
          style={{
            marginTop: '16px',
            textAlign: 'center'
          }}
        >
          <span
            style={{
              fontSize: '14px',
              color: '#6B7280'
            }}
          >
            Don't have an account?{' '}
          </span>
          <button
            onClick={() => onNavigate('onboarding-1a')}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '14px',
              fontWeight: 600,
              color: '#8366FF',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}