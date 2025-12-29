import { useState } from 'react';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';

interface OnboardingStep1AProps {
  onNavigate: (screen: string) => void;
  onDataChange?: (data: any) => void;
  initialData?: any;
}

export function OnboardingStep1A({ onNavigate, onDataChange, initialData }: OnboardingStep1AProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: initialData?.email || '',
    password: initialData?.password || '',
    name: initialData?.name || '',
    dob: initialData?.dob || '',
    gender: initialData?.gender || '',
    role: initialData?.role || ''
  });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: '#FFFFFF',
        fontFamily: 'Outfit, sans-serif'
      }}
    >
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => onNavigate('login-choice')}
          style={{
            width: '40px',
            height: '40px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronLeft size={24} style={{ color: '#000000' }} />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="px-6 mb-8">
        <div className="flex gap-2 justify-center">
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#8366FF' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#E5E7EB' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#E5E7EB' }} />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {/* Title */}
        <h1
          className="mb-8"
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#000000',
            fontFamily: 'Outfit, sans-serif'
          }}
        >
          Tell us about you
        </h1>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Email */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#000000',
                marginBottom: '8px',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                fontSize: '16px',
                color: '#000000',
                fontFamily: 'Outfit, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#8366FF';
                e.currentTarget.style.borderWidth = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.borderWidth = '1px';
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#000000',
                marginBottom: '8px',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter secure password"
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 16px',
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '16px',
                  color: '#000000',
                  fontFamily: 'Outfit, sans-serif',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#8366FF';
                  e.currentTarget.style.borderWidth = '2px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.borderWidth = '1px';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                {showPassword ? (
                  <EyeOff size={20} style={{ color: '#9CA3AF' }} />
                ) : (
                  <Eye size={20} style={{ color: '#9CA3AF' }} />
                )}
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#000000',
                marginBottom: '8px',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                fontSize: '16px',
                color: '#000000',
                fontFamily: 'Outfit, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#8366FF';
                e.currentTarget.style.borderWidth = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.borderWidth = '1px';
              }}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#000000',
                marginBottom: '8px',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                fontSize: '16px',
                color: '#000000',
                fontFamily: 'Outfit, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#8366FF';
                e.currentTarget.style.borderWidth = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.borderWidth = '1px';
              }}
            />
          </div>

          {/* Gender */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#000000',
                marginBottom: '8px',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                fontSize: '16px',
                color: formData.gender ? '#000000' : '#9CA3AF',
                fontFamily: 'Outfit, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#8366FF';
                e.currentTarget.style.borderWidth = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.borderWidth = '1px';
              }}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
          </div>

          {/* Role */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#000000',
                marginBottom: '8px',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Your Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                fontSize: '16px',
                color: formData.role ? '#000000' : '#9CA3AF',
                fontFamily: 'Outfit, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#8366FF';
                e.currentTarget.style.borderWidth = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.borderWidth = '1px';
              }}
            >
              <option value="">Select your role</option>
              <option value="business-owner">Business Owner</option>
              <option value="freelancer">Freelancer</option>
              <option value="marketer">Marketer</option>
              <option value="agency">Agency</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div
        className="px-6 py-4"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#FFFFFF',
          borderTop: '1px solid #F3F4F6'
        }}
      >
        <button
          onClick={() => {
            if (onDataChange) {
              onDataChange(formData);
            }
            onNavigate('onboarding-1b');
          }}
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
            transition: 'transform 0.2s'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
