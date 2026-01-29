import { z } from 'zod';

export const createMoodSchema = z.object({
    mood: z.string().min(1, 'Mood is required'),
    score: z.number().min(1).max(10),
    note: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

export const createPostSchema = z.object({
    content: z.string().min(1, 'Content is required').max(1000, 'Content too long'),
    isAnonymous: z.boolean().default(true),
});

export const createReactionSchema = z.object({
    postId: z.string().uuid(),
    type: z.enum(['HEART', 'HUG', 'SUPPORT', 'LIKE']),
});

export const createSessionSchema = z.object({
    psychologistId: z.string().uuid(),
    scheduledAt: z.string().datetime(), // ISO 8601
    type: z.enum(['CHAT', 'VOICE', 'VIDEO']),
});
