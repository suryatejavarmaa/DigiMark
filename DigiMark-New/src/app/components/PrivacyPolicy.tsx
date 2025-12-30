import React from 'react';
import { ArrowLeft, Shield, Trash2, Mail, ExternalLink } from 'lucide-react';

interface PrivacyPolicyProps {
    onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} className="text-gray-700" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Shield className="text-purple-600" size={24} />
                        <h1 className="text-xl font-bold text-gray-900">Privacy Policy</h1>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">

                {/* Last Updated */}
                <p className="text-sm text-gray-500">Last updated: December 30, 2025</p>

                {/* Introduction */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-purple-600">Welcome to DigiMark</h2>
                    <p className="text-gray-600 leading-relaxed">
                        DigiMark ("we", "our", or "us") operates the DigiMark Social Post application.
                        This page informs you of our policies regarding the collection, use, and disclosure
                        of personal information when you use our Service.
                    </p>
                </section>

                {/* Information We Collect */}
                <section className="space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-purple-600 flex items-center gap-2">
                        📊 Information We Collect
                    </h2>
                    <div className="space-y-3 text-gray-600">
                        <div className="pl-4 border-l-2 border-purple-500">
                            <h3 className="font-semibold text-gray-900">Account Information</h3>
                            <p>Email address, name, and profile picture from your social media accounts when you connect them.</p>
                        </div>
                        <div className="pl-4 border-l-2 border-purple-500">
                            <h3 className="font-semibold text-gray-900">Social Media Access Tokens</h3>
                            <p>OAuth tokens from LinkedIn, Twitter/X, Facebook, and Instagram to publish posts on your behalf.</p>
                        </div>
                        <div className="pl-4 border-l-2 border-purple-500">
                            <h3 className="font-semibold text-gray-900">User-Generated Content</h3>
                            <p>Posts, captions, AI-generated images, video reels, and content templates you create.</p>
                        </div>
                        <div className="pl-4 border-l-2 border-purple-500">
                            <h3 className="font-semibold text-gray-900">Business Information</h3>
                            <p>Company name, website URL, and business category for AI content personalization.</p>
                        </div>
                    </div>
                </section>

                {/* How We Use Your Information */}
                <section className="space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-purple-600 flex items-center gap-2">
                        🎯 How We Use Your Information
                    </h2>
                    <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Publish and schedule posts to your connected social media accounts</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Generate AI-powered content, images, and video reels tailored to your brand</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Store your scheduled posts and publishing history</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Provide customer support and respond to your requests</span>
                        </li>
                    </ul>
                </section>

                {/* Third-Party Services */}
                <section className="space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-purple-600 flex items-center gap-2">
                        🔗 Third-Party Services
                    </h2>
                    <p className="text-gray-600 mb-4">
                        We share necessary data with the following services to provide our functionality:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Facebook/Meta', 'LinkedIn', 'Twitter/X', 'Instagram', 'Google Firebase', 'Groq AI', 'Segmind AI'].map((service) => (
                            <div key={service} className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 text-sm text-center text-purple-700 font-medium">
                                {service}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Data Storage */}
                <section className="space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-purple-600 flex items-center gap-2">
                        🔒 Data Storage & Security
                    </h2>
                    <p className="text-gray-600">
                        Your data is securely stored on Google Firebase Cloud infrastructure.
                        We use industry-standard encryption and security measures to protect your information.
                        Data is retained until you request deletion.
                    </p>
                </section>

                {/* Data Deletion - IMPORTANT SECTION */}
                <section id="data-deletion" className="space-y-4 bg-red-50 rounded-2xl p-6 border border-red-200">
                    <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
                        <Trash2 size={24} />
                        Data Deletion Request
                    </h2>
                    <p className="text-gray-600">
                        You have the right to request deletion of all your personal data from our systems.
                    </p>
                    <div className="bg-white rounded-xl p-4 space-y-3 border border-red-200">
                        <h3 className="font-semibold text-gray-900">How to Delete Your Data:</h3>
                        <ol className="list-decimal list-inside text-gray-600 space-y-2">
                            <li>Disconnect all social media accounts from DigiMark settings</li>
                            <li>Send an email to the address below with subject: <strong>"Data Deletion Request"</strong></li>
                            <li>Include your registered email address in the request</li>
                            <li>We will process your request and delete all data within <strong>30 days</strong></li>
                        </ol>
                    </div>
                    <a
                        href="mailto:jaivarma89@gmail.com?subject=Data%20Deletion%20Request%20-%20DigiMark"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                    >
                        <Mail size={20} />
                        Request Data Deletion
                    </a>
                </section>

                {/* Your Rights */}
                <section className="space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-purple-600 flex items-center gap-2">
                        ⚖️ Your Rights
                    </h2>
                    <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span><strong>Access:</strong> Request a copy of your personal data</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span><strong>Rectification:</strong> Update or correct your information</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span><strong>Deletion:</strong> Request removal of your data</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span><strong>Revoke Access:</strong> Disconnect social media accounts at any time</span>
                        </li>
                    </ul>
                </section>

                {/* Contact Us */}
                <section className="space-y-4 bg-purple-50 rounded-2xl p-6 border border-purple-200">
                    <h2 className="text-xl font-bold text-purple-600 flex items-center gap-2">
                        📧 Contact Us
                    </h2>
                    <p className="text-gray-600">
                        If you have any questions about this Privacy Policy, please contact us:
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="mailto:jaivarma89@gmail.com"
                            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                        >
                            <Mail size={20} />
                            jaivarma89@gmail.com
                        </a>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        DigiMark Social Post<br />
                        By Digital Shout
                    </p>
                </section>

                {/* Terms of Service */}
                <section id="terms" className="space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-purple-600">📜 Terms of Service</h2>
                    <p className="text-gray-600">
                        By using DigiMark, you agree to:
                    </p>
                    <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Use the service only for lawful purposes</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Not abuse the AI content generation features</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Comply with each social platform's terms of service</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Not use the service for spam, harassment, or illegal content</span>
                        </li>
                    </ul>
                </section>

                {/* Footer */}
                <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-200">
                    <p>© 2025 DigiMark by Digital Shout. All rights reserved.</p>
                    <p className="mt-2">This privacy policy was last updated on December 30, 2025.</p>
                </footer>

            </main>
        </div>
    );
}
