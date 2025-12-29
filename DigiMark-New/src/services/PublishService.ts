// Backend API base URL - uses environment variable in production, localhost in development
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';

export interface PublishResult {
    success: boolean;
    results: Record<string, {
        status: string;
        action?: string;
        url?: string;
        message?: string;
        error?: string;
    }>;
    allSuccess?: boolean;
    partialSuccess?: boolean;
}

export interface ScheduleResult {
    success: boolean;
    postId?: string;
    scheduledAt?: string;
    message?: string;
    error?: string;
}

export const PublishService = {
    /**
     * Publish content to multiple platforms immediately
     */
    publish: async (
        userId: string,
        platforms: string[],
        content: string,
        mediaUrl?: string,
        postType: string = 'text'
    ): Promise<PublishResult> => {
        try {
            const response = await fetch(`${API_BASE}/publish`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    platforms,
                    content,
                    mediaUrl,
                    postType
                }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Publish Error:", error);
            return {
                success: false,
                results: {},
            };
        }
    },

    /**
     * Schedule a post for future publishing
     */
    schedulePost: async (
        userId: string,
        platforms: string[],
        content: string,
        scheduledAt: string,
        mediaUrl?: string
    ): Promise<ScheduleResult> => {
        try {
            const response = await fetch(`${API_BASE}/schedule-post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    platforms,
                    content,
                    mediaUrl,
                    scheduledAt
                }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Schedule Error:", error);
            return {
                success: false,
                error: (error as Error).message
            };
        }
    },

    /**
     * Update the schedule time and/or content for an existing scheduled post
     */
    updateScheduledPost: async (
        userId: string,
        postId: string,
        scheduledAt?: string,
        content?: string
    ): Promise<ScheduleResult> => {
        try {
            const body: Record<string, string> = { userId, postId };
            if (scheduledAt) body.scheduledAt = scheduledAt;
            if (content !== undefined) body.content = content;

            const response = await fetch(`${API_BASE}/update-scheduled-post`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Update Schedule Error:", error);
            return {
                success: false,
                error: (error as Error).message
            };
        }
    },

    /**
     * Delete a scheduled post (e.g., after publishing immediately)
     */
    deleteScheduledPost: async (
        userId: string,
        postId: string
    ): Promise<{ success: boolean; error?: string }> => {
        try {
            const response = await fetch(`${API_BASE}/delete-scheduled-post`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    postId
                }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Delete Schedule Error:", error);
            return {
                success: false,
                error: (error as Error).message
            };
        }
    }
};
