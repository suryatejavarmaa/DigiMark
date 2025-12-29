// API Base URL - uses environment variable in production, localhost in development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

/**
 * Social Service - Manages platform connection status
 * Uses localStorage for quick checks, Firestore for persistence
 */
export const SocialService = {
    /**
     * Check if a platform is connected locally
     */
    isConnected: (platform: string): boolean => {
        const key = `social_connected_${platform.toLowerCase()}`;
        return localStorage.getItem(key) === 'true';
    },

    /**
     * Mark platform as connected locally
     */
    connect: (platform: string): void => {
        const key = `social_connected_${platform.toLowerCase()}`;
        localStorage.setItem(key, 'true');
    },

    /**
     * Disconnect platform locally
     */
    disconnect: (platform: string): void => {
        const key = `social_connected_${platform.toLowerCase()}`;
        localStorage.removeItem(key);
    },

    /**
     * Disconnect all platforms
     */
    disconnectAll: (): void => {
        ['linkedin', 'instagram', 'facebook', 'twitter', 'youtube'].forEach(p => {
            localStorage.removeItem(`social_connected_${p}`);
        });
        localStorage.removeItem('twitter_username');
        localStorage.removeItem('facebook_username');
    },

    /**
     * Check connection status for all platforms
     */
    checkConnectionStatus: async (userId: string): Promise<Record<string, boolean>> => {
        // In a real app, this would fetch from Firestore
        return {
            linkedin: localStorage.getItem('social_connected_linkedin') === 'true',
            instagram: localStorage.getItem('social_connected_instagram') === 'true',
            facebook: localStorage.getItem('social_connected_facebook') === 'true',
            twitter: localStorage.getItem('social_connected_twitter') === 'true',
        };
    },

    /**
     * Get OAuth URL for a platform
     */
    getOAuthUrl: (platform: string, userId: string): string => {
        const origin = window.location.origin;
        return `${API_BASE_URL}/auth/${platform}?userId=${userId}&origin=${encodeURIComponent(origin)}`;
    }
};
