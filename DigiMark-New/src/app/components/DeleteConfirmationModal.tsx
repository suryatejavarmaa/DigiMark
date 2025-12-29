import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmationModal({ isOpen, title, onConfirm, onCancel }: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '24px',
        fontFamily: 'Outfit, sans-serif'
      }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '24px',
          maxWidth: '340px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          animation: 'modalSlideIn 0.3s ease-out'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onCancel}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
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
          <X size={16} style={{ color: '#9CA3AF' }} />
        </button>

        {/* Warning Icon */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: '#FEF3C7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}
        >
          <AlertTriangle size={28} style={{ color: '#F59E0B' }} />
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#000000',
            fontFamily: 'Outfit, sans-serif',
            marginBottom: '12px',
            textAlign: 'center'
          }}
        >
          Delete Post?
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: '14px',
            color: '#6B7280',
            fontFamily: 'Outfit, sans-serif',
            marginBottom: '12px',
            lineHeight: '1.5',
            textAlign: 'center'
          }}
        >
          Are you sure you want to delete this scheduled post?
        </p>

        {/* Post Title */}
        <p
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#8366FF',
            fontFamily: 'Outfit, sans-serif',
            marginBottom: '16px',
            textAlign: 'center'
          }}
        >
          "{title}"
        </p>

        <p
          style={{
            fontSize: '13px',
            color: '#9CA3AF',
            fontFamily: 'Outfit, sans-serif',
            marginBottom: '24px',
            lineHeight: '1.5',
            textAlign: 'center'
          }}
        >
          This action cannot be undone. The post will be permanently removed from your calendar.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Cancel Button */}
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '12px',
              background: '#F3F4F6',
              border: 'none',
              fontSize: '15px',
              fontWeight: 600,
              color: '#6B7280',
              fontFamily: 'Outfit, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E5E7EB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F3F4F6';
            }}
          >
            Cancel
          </button>

          {/* Delete Button */}
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '12px',
              background: '#EF4444',
              border: 'none',
              fontSize: '15px',
              fontWeight: 600,
              color: '#FFFFFF',
              fontFamily: 'Outfit, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#DC2626';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#EF4444';
            }}
          >
            Delete
          </button>
        </div>

        <style>
          {`
            @keyframes modalSlideIn {
              from {
                opacity: 0;
                transform: scale(0.95) translateY(10px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}