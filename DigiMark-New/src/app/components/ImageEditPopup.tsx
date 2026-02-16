import { X, Wand2, Sparkles, Type, Palette, Sun, Layers } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageEditPopupProps {
    imageUrl: string;
    onClose: () => void;
    onApply: (editPrompt: string) => void;
    isProcessing?: boolean;
}

const quickSuggestions = [
    { icon: Type, label: 'Add Text', prompt: 'Add professional text overlay that says: ' },
    { icon: Sun, label: 'Brighter', prompt: 'Make the image brighter and more vibrant' },
    { icon: Palette, label: 'Change Colors', prompt: 'Change the color scheme to: ' },
    { icon: Layers, label: 'Add Border', prompt: 'Add a stylish decorative border around the image' },
];

export function ImageEditPopup({ imageUrl, onClose, onApply, isProcessing = false }: ImageEditPopupProps) {
    const [editPrompt, setEditPrompt] = useState('');
    const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

    const handleSuggestionClick = (suggestion: typeof quickSuggestions[0]) => {
        if (selectedSuggestion === suggestion.label) {
            setSelectedSuggestion(null);
            setEditPrompt('');
        } else {
            setSelectedSuggestion(suggestion.label);
            setEditPrompt(suggestion.prompt);
        }
    };

    const handleApply = () => {
        if (editPrompt.trim() && !isProcessing) {
            onApply(editPrompt.trim());
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    animation: 'fadeIn 0.2s ease-out'
                }}
            >
                {/* Modal */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: '100%',
                        maxWidth: '420px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F6FF 100%)',
                        borderRadius: '24px',
                        boxShadow: '0 25px 80px rgba(131, 102, 255, 0.3)',
                        animation: 'scaleIn 0.3s ease-out',
                        fontFamily: 'Outfit, sans-serif',
                        position: 'relative'
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            padding: '24px 24px 16px',
                            borderBottom: '1px solid #E9D5FF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(131, 102, 255, 0.3)'
                                }}
                            >
                                <Wand2 size={22} style={{ color: '#FFFFFF' }} />
                            </div>
                            <div>
                                <h2
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: 700,
                                        color: '#000000',
                                        margin: 0
                                    }}
                                >
                                    Edit Image
                                </h2>
                                <p
                                    style={{
                                        fontSize: '13px',
                                        color: '#6B7280',
                                        margin: 0
                                    }}
                                >
                                    Describe your changes
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            disabled={isProcessing}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: '#F3F4F6',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: isProcessing ? 'not-allowed' : 'pointer',
                                color: '#6B7280',
                                transition: 'all 0.2s',
                                opacity: isProcessing ? 0.5 : 1
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '20px 24px' }}>
                        {/* Image Preview */}
                        <div
                            style={{
                                marginBottom: '20px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '2px solid #E9D5FF',
                                position: 'relative'
                            }}
                        >
                            <ImageWithFallback
                                src={imageUrl}
                                alt="Current Design"
                                style={{
                                    width: '100%',
                                    height: '160px',
                                    objectFit: 'cover'
                                }}
                            />
                            {isProcessing && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(131, 102, 255, 0.2)',
                                        backdropFilter: 'blur(4px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <div
                                        style={{
                                            background: '#FFFFFF',
                                            borderRadius: '16px',
                                            padding: '16px 24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                                        }}
                                    >
                                        <div
                                            style={{
                                                animation: 'spin 1s linear infinite',
                                                color: '#8366FF'
                                            }}
                                        >
                                            <Sparkles size={20} />
                                        </div>
                                        <span
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                color: '#8366FF'
                                            }}
                                        >
                                            Editing...
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Suggestions */}
                        <div style={{ marginBottom: '16px' }}>
                            <label
                                style={{
                                    display: 'block',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    color: '#6B7280',
                                    marginBottom: '10px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                Quick Actions
                            </label>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '10px'
                                }}
                            >
                                {quickSuggestions.map((suggestion) => {
                                    const Icon = suggestion.icon;
                                    const isSelected = selectedSuggestion === suggestion.label;

                                    return (
                                        <button
                                            key={suggestion.label}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            disabled={isProcessing}
                                            style={{
                                                padding: '12px 14px',
                                                borderRadius: '12px',
                                                background: isSelected
                                                    ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
                                                    : '#FFFFFF',
                                                border: isSelected ? 'none' : '1px solid #E5E7EB',
                                                fontSize: '13px',
                                                fontWeight: 600,
                                                color: isSelected ? '#FFFFFF' : '#374151',
                                                cursor: isProcessing ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                opacity: isProcessing ? 0.6 : 1,
                                                boxShadow: isSelected
                                                    ? '0 4px 12px rgba(131, 102, 255, 0.3)'
                                                    : 'none'
                                            }}
                                        >
                                            <Icon size={16} />
                                            {suggestion.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Edit Prompt Input */}
                        <div style={{ marginBottom: '20px' }}>
                            <label
                                style={{
                                    display: 'block',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    color: '#6B7280',
                                    marginBottom: '10px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                Edit Instructions
                            </label>
                            <textarea
                                value={editPrompt}
                                onChange={(e) => setEditPrompt(e.target.value)}
                                disabled={isProcessing}
                                placeholder="Describe what you want to change..."
                                style={{
                                    width: '100%',
                                    height: '100px',
                                    padding: '14px 16px',
                                    borderRadius: '14px',
                                    border: '2px solid #E9D5FF',
                                    fontSize: '14px',
                                    fontFamily: 'Outfit, sans-serif',
                                    resize: 'none',
                                    outline: 'none',
                                    background: '#FFFFFF',
                                    color: '#000000',
                                    transition: 'all 0.2s',
                                    opacity: isProcessing ? 0.6 : 1,
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#8366FF';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(131, 102, 255, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#E9D5FF';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '12px',
                                    color: '#9CA3AF',
                                    marginTop: '8px',
                                    marginBottom: 0
                                }}
                            >
                                Examples: "Add 'SALE 50%' text at bottom", "Make background darker"
                            </p>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div
                        style={{
                            padding: '16px 24px 24px',
                            display: 'flex',
                            gap: '12px'
                        }}
                    >
                        <button
                            onClick={onClose}
                            disabled={isProcessing}
                            style={{
                                flex: 1,
                                padding: '14px',
                                borderRadius: '12px',
                                background: '#FFFFFF',
                                border: '2px solid #E5E7EB',
                                fontSize: '15px',
                                fontWeight: 600,
                                color: '#374151',
                                fontFamily: 'Outfit, sans-serif',
                                cursor: isProcessing ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                opacity: isProcessing ? 0.5 : 1
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleApply}
                            disabled={!editPrompt.trim() || isProcessing}
                            style={{
                                flex: 1,
                                padding: '14px',
                                borderRadius: '12px',
                                background:
                                    editPrompt.trim() && !isProcessing
                                        ? 'linear-gradient(135deg, #8366FF 0%, #A78BFA 100%)'
                                        : '#E5E7EB',
                                border: 'none',
                                fontSize: '15px',
                                fontWeight: 600,
                                color: '#FFFFFF',
                                fontFamily: 'Outfit, sans-serif',
                                cursor: editPrompt.trim() && !isProcessing ? 'pointer' : 'not-allowed',
                                boxShadow:
                                    editPrompt.trim() && !isProcessing
                                        ? '0 8px 24px rgba(131, 102, 255, 0.4)'
                                        : 'none',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            {isProcessing ? (
                                <>
                                    <Sparkles size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Wand2 size={18} />
                                    Apply Edit
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </>
    );
}
