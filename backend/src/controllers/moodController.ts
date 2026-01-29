import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createMoodSchema } from '../utils/validationSchemas';

const prisma = new PrismaClient();

export const logMood = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const validation = createMoodSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }

        const { mood, score, note, tags } = validation.data;

        const moodLog = await prisma.moodLog.create({
            data: {
                userId,
                mood,
                score,
                note,
                tags: tags || [],
            },
        });

        res.status(201).json(moodLog);
    } catch (error) {
        console.error('Error logging mood:', error);
        res.status(500).json({ error: 'Failed to log mood' });
    }
};

export const getMoodHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const moods = await prisma.moodLog.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 20, // Pagination limit
        });

        res.json(moods);
    } catch (error) {
        console.error('Error fetching mood history:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};
