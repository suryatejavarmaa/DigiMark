// Backend API base URL - uses environment variable in production, localhost in development
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';

export interface GeneratedContent {
    text?: string;
    imageUrl?: string;
}

export const AIService = {
    /**
     * Generate AI caption for social media posts
     */
    generateCaption: async (
        prompt: string,
        platform: string,
        tones: string[],
        userId?: string | null
    ): Promise<string> => {
        try {
            const response = await fetch(`${API_BASE}/generate-caption`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    topic: prompt,
                    platform: platform,
                    tone: tones.join(', ')
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate caption');
            }

            const data = await response.json();
            return data.caption;
        } catch (error) {
            console.error("AI Generation Error:", error);
            return `Error generating caption: ${(error as Error).message}. Please ensure the backend server is running.`;
        }
    },

    /**
     * Generate AI images for business posters
     */
    generateImage: async (
        prompt: string,
        style: string,
        ratio: string,
        userId?: string | null
    ): Promise<{ images: string[], prompts: string[] }> => {
        try {
            const response = await fetch(`${API_BASE}/generate-image`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    prompt: prompt,
                    style: style,
                    ratio: ratio
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate image');
            }

            const data = await response.json();
            return {
                images: data.images || [],
                prompts: data.prompts || []
            };
        } catch (error) {
            console.error("AI Image Generation Error:", error);
            // Fallback images
            return {
                images: [
                    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
                    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
                    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'
                ],
                prompts: [prompt, prompt, prompt]
            };
        }
    },

    /**
     * Generate caption templates/suggestions
     */
    generateTemplates: async (
        userId: string,
        companyName?: string,
        companySummary?: string,
        count: number = 8
    ): Promise<string[]> => {
        try {
            const response = await fetch(`${API_BASE}/api/generate-templates`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    companyName,
                    companySummary,
                    count
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate templates');
            }

            const data = await response.json();
            return data.templates || [];
        } catch (error) {
            console.error("Template Generation Error:", error);
            return [
                'Summer Promo',
                'New Collection',
                'Product Launch',
                'Team Update',
                'Industry Insights'
            ];
        }
    },

    /**
     * Generate poster/image templates
     */
    generatePosterTemplates: async (
        userId: string,
        companyName?: string,
        companySummary?: string,
        count: number = 8
    ): Promise<string[]> => {
        try {
            const response = await fetch(`${API_BASE}/api/generate-poster-templates`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    companyName,
                    companySummary,
                    count
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate poster templates');
            }

            const data = await response.json();
            return data.templates || [];
        } catch (error) {
            console.error("Poster Template Generation Error:", error);
            return [
                'Summer Sale Event',
                'Product Showcase',
                'Festival Greetings',
                'Team Milestone'
            ];
        }
    }
};
