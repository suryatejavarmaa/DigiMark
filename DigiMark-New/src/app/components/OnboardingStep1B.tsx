import { useState } from 'react';
import { ChevronLeft, ChevronDown, Check } from 'lucide-react';

interface OnboardingStep1BProps {
  onNavigate: (screen: string) => void;
  onDataChange?: (data: any) => void;
  initialData?: any;
}

export function OnboardingStep1B({ onNavigate, onDataChange, initialData }: OnboardingStep1BProps) {
  const [formData, setFormData] = useState({
    businessName: initialData?.businessName || '',
    businessType: initialData?.businessType || '',
    website: initialData?.website || ''
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const businessTypes = [
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'saas', label: 'SaaS' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'agency', label: 'Agency' },
    { value: 'retail', label: 'Retail' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'finance', label: 'Finance' },
    { value: 'tech', label: 'Technology' },
    { value: 'other', label: 'Other' }
  ];

  // Check if all required fields are filled
  const isFormValid = formData.businessName.trim() !== '' &&
    formData.businessType !== '' &&
    formData.website.trim() !== '';

  const selectedBusinessType = businessTypes.find(bt => bt.value === formData.businessType);

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
          onClick={() => onNavigate('onboarding-1a')}
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
        {/* Section Title */}
        <h2
          className="mb-2"
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#000000',
            fontFamily: 'Outfit, sans-serif'
          }}
        >
          Your Business
        </h2>
        <p
          className="mb-8"
          style={{
            fontSize: '14px',
            color: '#3B3A47',
            fontFamily: 'Outfit, sans-serif'
          }}
        >
          Help us understand your business better
        </p>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Business Name */}
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
              Business Name <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="Acme Corp"
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

          {/* Business Type */}
          <div style={{ position: 'relative' }}>
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
              Business Type <span style={{ color: '#EF4444' }}>*</span>
            </label>

            {/* Dropdown Button */}
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: '#F9FAFB',
                border: isDropdownOpen ? '2px solid #8366FF' : '1px solid #E5E7EB',
                borderRadius: '12px',
                fontSize: '16px',
                color: formData.businessType ? '#000000' : '#9CA3AF',
                fontFamily: 'Outfit, sans-serif',
                outline: 'none',
                transition: 'all 0.2s',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left'
              }}
            >
              <span>{selectedBusinessType ? selectedBusinessType.label : 'Select business type'}</span>
              <ChevronDown
                size={20}
                style={{
                  color: '#6B7280',
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                {/* Backdrop to close dropdown */}
                <div
                  onClick={() => setIsDropdownOpen(false)}
                  style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9
                  }}
                />

                {/* Dropdown List */}
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(131, 102, 255, 0.1)',
                    zIndex: 10,
                    maxHeight: '240px',
                    overflowY: 'auto',
                    animation: 'slideDown 0.2s ease-out'
                  }}
                  className="custom-scrollbar"
                >
                  {businessTypes.map((bt, index) => (
                    <div
                      key={bt.value}
                      onClick={() => {
                        setFormData({ ...formData, businessType: bt.value });
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: formData.businessType === bt.value ? '#8366FF' : '#000000',
                        background: formData.businessType === bt.value ? '#F5F3FF' : '#FFFFFF',
                        borderBottom: index < businessTypes.length - 1 ? '1px solid #F3F4F6' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (formData.businessType !== bt.value) {
                          e.currentTarget.style.background = '#F9FAFB';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (formData.businessType !== bt.value) {
                          e.currentTarget.style.background = '#FFFFFF';
                        }
                      }}
                    >
                      <span>{bt.label}</span>
                      {formData.businessType === bt.value && (
                        <Check
                          size={16}
                          style={{
                            color: '#8366FF',
                            flexShrink: 0
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Dropdown Animation */}
            <style>{`
              @keyframes slideDown {
                from {
                  opacity: 0;
                  transform: translateY(-8px);\n                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </div>

          {/* Website URL */}
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
              Website URL <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://yourwebsite.com"
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

          {/* Info Card */}
          <div
            style={{
              background: '#EDE9FE',
              padding: '16px',
              borderRadius: '12px',
              marginTop: '24px'
            }}
          >
            <p
              style={{
                fontSize: '14px',
                color: '#3B3A47',
                fontFamily: 'Outfit, sans-serif',
                lineHeight: '1.6'
              }}
            >
              💡 <strong style={{ color: '#000000' }}>Tip:</strong> We'll use this information to personalize your AI assistant and create better marketing content for your business.
            </p>
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
            if (isFormValid) {
              if (onDataChange) {
                onDataChange(formData);
              }
              onNavigate('onboarding-2');
            }
          }}
          disabled={!isFormValid}
          style={{
            width: '100%',
            background: isFormValid ? '#8366FF' : '#D1D5DB',
            color: '#FFFFFF',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'Outfit, sans-serif',
            border: 'none',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            boxShadow: isFormValid ? '0 8px 24px rgba(131, 102, 255, 0.3)' : 'none',
            transition: 'all 0.2s',
            opacity: isFormValid ? 1 : 0.6
          }}
          onMouseDown={(e) => {
            if (isFormValid) {
              e.currentTarget.style.transform = 'scale(0.98)';
            }
          }}
          onMouseUp={(e) => {
            if (isFormValid) {
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}