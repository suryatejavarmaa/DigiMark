import React from 'react';
import { ArrowLeft, Shield, Trash2, Mail } from 'lucide-react';

interface PrivacyPolicyProps {
    onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#FFFFFF',
                fontFamily: 'Outfit, sans-serif'
            }}
        >
            {/* Header */}
            <header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    background: '#FFFFFF',
                    borderBottom: '1px solid #E5E7EB',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
            >
                <div
                    style={{
                        maxWidth: '480px',
                        margin: '0 auto',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}
                >
                    <button
                        onClick={onBack}
                        style={{
                            padding: '8px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ArrowLeft size={24} style={{ color: '#374151' }} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={24} style={{ color: '#8366FF' }} />
                        <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: 0 }}>
                            Privacy Policy
                        </h1>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main
                style={{
                    maxWidth: '480px',
                    margin: '0 auto',
                    padding: '24px 20px 100px 20px'
                }}
            >
                {/* Last Updated */}
                <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '24px' }}>
                    Last updated: December 30, 2025
                </p>

                {/* Introduction */}
                <section style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#8366FF', marginBottom: '12px' }}>
                        Welcome to DigiMark
                    </h2>
                    <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
                        DigiMark ("we", "our", or "us") operates the DigiMark Social Post application.
                        This page informs you of our policies regarding the collection, use, and disclosure
                        of personal information when you use our Service.
                    </p>
                </section>

                {/* Information We Collect */}
                <section
                    style={{
                        marginBottom: '20px',
                        background: '#F9FAFB',
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid #E5E7EB'
                    }}
                >
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#8366FF', marginBottom: '16px' }}>
                        📊 Information We Collect
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { title: 'Account Information', desc: 'Email address, name, and profile picture from your social media accounts.' },
                            { title: 'Social Media Tokens', desc: 'OAuth tokens from LinkedIn, Twitter/X, Facebook, and Instagram to publish posts.' },
                            { title: 'User Content', desc: 'Posts, captions, AI-generated images, video reels, and templates you create.' },
                            { title: 'Business Information', desc: 'Company name, website URL, and business category for AI personalization.' }
                        ].map((item, i) => (
                            <div key={i} style={{ paddingLeft: '12px', borderLeft: '3px solid #8366FF' }}>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827', marginBottom: '2px' }}>
                                    {item.title}
                                </div>
                                <div style={{ fontSize: '13px', color: '#6B7280' }}>
                                    {item.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How We Use */}
                <section
                    style={{
                        marginBottom: '20px',
                        background: '#F9FAFB',
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid #E5E7EB'
                    }}
                >
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#8366FF', marginBottom: '16px' }}>
                        🎯 How We Use Your Information
                    </h2>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                            'Publish and schedule posts to your social media accounts',
                            'Generate AI-powered content, images, and video reels',
                            'Store your scheduled posts and publishing history',
                            'Provide customer support and respond to requests'
                        ].map((item, i) => (
                            <li key={i} style={{ fontSize: '13px', color: '#6B7280', display: 'flex', gap: '8px' }}>
                                <span style={{ color: '#8366FF' }}>•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Third-Party Services */}
                <section
                    style={{
                        marginBottom: '20px',
                        background: '#F9FAFB',
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid #E5E7EB'
                    }}
                >
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#8366FF', marginBottom: '16px' }}>
                        🔗 Third-Party Services
                    </h2>
                    <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px' }}>
                        We share data with the following services:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {['Facebook/Meta', 'LinkedIn', 'Twitter/X', 'Instagram', 'Firebase', 'Groq AI', 'Segmind'].map((service) => (
                            <span
                                key={service}
                                style={{
                                    background: '#EDE9FE',
                                    color: '#8366FF',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    padding: '6px 12px',
                                    borderRadius: '20px'
                                }}
                            >
                                {service}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Data Storage */}
                <section
                    style={{
                        marginBottom: '20px',
                        background: '#F9FAFB',
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid #E5E7EB'
                    }}
                >
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#8366FF', marginBottom: '12px' }}>
                        🔒 Data Storage & Security
                    </h2>
                    <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6 }}>
                        Your data is securely stored on Google Firebase Cloud infrastructure with industry-standard encryption.
                        Data is retained until you request deletion.
                    </p>
                </section>

                {/* Data Deletion */}
                <section
                    id="data-deletion"
                    style={{
                        marginBottom: '20px',
                        background: '#FEF2F2',
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid #FECACA'
                    }}
                >
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#DC2626', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Trash2 size={20} />
                        Data Deletion Request
                    </h2>
                    <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
                        You can request deletion of all your personal data:
                    </p>
                    <div
                        style={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            padding: '16px',
                            marginBottom: '16px',
                            border: '1px solid #FECACA'
                        }}
                    >
                        <ol style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: '#374151', lineHeight: 1.8 }}>
                            <li>Disconnect all social media from DigiMark</li>
                            <li>Email us with subject: <strong>"Data Deletion Request"</strong></li>
                            <li>Include your registered email address</li>
                            <li>We'll delete all data within <strong>30 days</strong></li>
                        </ol>
                    </div>
                    <a
                        href="mailto:jaivarma89@gmail.com?subject=Data%20Deletion%20Request%20-%20DigiMark"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: '#DC2626',
                            color: '#FFFFFF',
                            padding: '12px 20px',
                            borderRadius: '12px',
                            fontSize: '14px',
                            fontWeight: 600,
                            textDecoration: 'none'
                        }}
                    >
                        <Mail size={18} />
                        Request Data Deletion
                    </a>
                </section>

                {/* Your Rights */}
                <section
                    style={{
                        marginBottom: '20px',
                        background: '#F9FAFB',
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid #E5E7EB'
                    }}
                >
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#8366FF', marginBottom: '16px' }}>
                        ⚖️ Your Rights
                    </h2>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                            { label: 'Access', desc: 'Request a copy of your personal data' },
                            { label: 'Rectification', desc: 'Update or correct your information' },
                            { label: 'Deletion', desc: 'Request removal of your data' },
                            { label: 'Revoke', desc: 'Disconnect social accounts anytime' }
                        ].map((item, i) => (
                            <li key={i} style={{ fontSize: '13px', color: '#6B7280', display: 'flex', gap: '8px' }}>
                                <span style={{ color: '#10B981' }}>✓</span>
                                <span><strong>{item.label}:</strong> {item.desc}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Contact Us */}
                <section
                    style={{
                        marginBottom: '20px',
                        background: '#EDE9FE',
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid #DDD6FE'
                    }}
                >
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#8366FF', marginBottom: '12px' }}>
                        📧 Contact Us
                    </h2>
                    <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
                        Questions about this Privacy Policy?
                    </p>
                    <a
                        href="mailto:jaivarma89@gmail.com"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: '#8366FF',
                            color: '#FFFFFF',
                            padding: '12px 20px',
                            borderRadius: '12px',
                            fontSize: '14px',
                            fontWeight: 600,
                            textDecoration: 'none'
                        }}
                    >
                        <Mail size={18} />
                        jaivarma89@gmail.com
                    </a>
                    <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '16px' }}>
                        DigiMark Social Post • By Bristle Tech
                    </p>
                </section>

                {/* Terms of Service */}
                <section
                    id="terms"
                    style={{
                        marginBottom: '20px',
                        background: '#F9FAFB',
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid #E5E7EB'
                    }}
                >
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#8366FF', marginBottom: '12px' }}>
                        📜 Terms of Service
                    </h2>
                    <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px' }}>
                        By using DigiMark, you agree to:
                    </p>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {[
                            'Use the service only for lawful purposes',
                            'Not abuse AI content generation features',
                            'Comply with each platform\'s terms of service',
                            'Not use the service for spam or harassment'
                        ].map((item, i) => (
                            <li key={i} style={{ fontSize: '13px', color: '#6B7280', display: 'flex', gap: '8px' }}>
                                <span style={{ color: '#8366FF' }}>•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Footer */}
                <footer style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
                    <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
                        © 2025 DigiMark by Bristle Tech. All rights reserved.
                    </p>
                </footer>
            </main>
        </div>
    );
}
