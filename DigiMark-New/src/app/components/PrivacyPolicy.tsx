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
                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#8366FF', marginBottom: '8px' }}>
                        Privacy & Terms
                    </h2>
                    <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6 }}>
                        At <strong>DigiDhanda</strong>, we keep things simple. This page explains how we handle your data and how you should use our app.
                    </p>
                </section>

                {/* What We Do */}
                <section style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
                        🛠️ What We Do
                    </h3>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            'We use AI to help you create amazing social media posts.',
                            'We post the content directly to your social media accounts.',
                            'We save your draft posts so you can use them later.'
                        ].map((item, i) => (
                            <li key={i} style={{ fontSize: '14px', color: '#6B7280', display: 'flex', gap: '10px' }}>
                                <span style={{ color: '#8366FF', fontWeight: 900 }}>•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Your Data */}
                <section style={{ marginBottom: '32px', background: '#F5F3FF', borderRadius: '20px', padding: '24px', border: '1px solid #DDD6FE' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#8366FF', marginBottom: '16px' }}>
                        🛡️ Your Data
                    </h3>
                    <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.6, marginBottom: '16px' }}>
                        We only collect what’s necessary to make the app work for you:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { label: 'Profile', desc: 'Your name and email to identify your account.' },
                            { label: 'Access', desc: 'Social media tokens to post on your behalf. We never see your passwords.' },
                            { label: 'Content', desc: 'The AI-generated images and text you create.' }
                        ].map((item, i) => (
                            <div key={i} style={{ paddingLeft: '12px', borderLeft: '2px solid #8366FF' }}>
                                <strong style={{ color: '#111827', fontSize: '14px' }}>{item.label}:</strong>
                                <span style={{ color: '#6B7280', fontSize: '13px', marginLeft: '4px' }}>{item.desc}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How to Delete */}
                <section id="data-deletion" style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
                        🗑️ Delete Anytime
                    </h3>

                    <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6, marginBottom: '20px' }}>
                        You are in control. You can disconnect your social media accounts at any time or request a full data deletion by emailing us.
                    </p>
                    <a
                        href="mailto:Bhargavsai.9290@gmail.com?subject=Data%20Deletion%20Request%20-%20DigiDhanda"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: '#8366FF',
                            color: '#FFFFFF',
                            padding: '14px 24px',
                            borderRadius: '16px',
                            fontSize: '15px',
                            fontWeight: 700,
                            textDecoration: 'none',
                            boxShadow: '0 4px 12px rgba(131, 102, 255, 0.2)'
                        }}
                    >
                        <Mail size={20} />
                        Contact for Data Deletion
                    </a>
                </section>

                {/* Simple Rules */}
                <section id="terms" style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
                        📜 Simple Rules
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                            'Don’t use the app for spam or illegal content.',
                            'Respect the rules of the social platforms you connect to.',
                            'Be fair and use the AI features responsibly.'
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '14px', color: '#6B7280' }}>
                                <span style={{ color: '#10B981' }}>✓</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer style={{ textAlign: 'center', paddingTop: '32px', borderTop: '1px solid #F3F4F6' }}>
                    <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
                        © 2025 DigiDhanda by Bristle Tech.
                    </p>
                </footer>

            </main>
        </div>
    );
}
