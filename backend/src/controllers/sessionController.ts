import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createSessionSchema } from '../utils/validationSchemas';

const prisma = new PrismaClient();

export const createSession = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const validation = createSessionSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: validation.error.format() });
        }

        const { psychologistId, scheduledAt, type } = validation.data;

        // TODO: Check availability (overlap check) in a transaction

        const session = await prisma.session.create({
            data: {
                userId,
                psychologistId,
                scheduledAt: new Date(scheduledAt),
                type,
                status: 'PENDING',
            },
        });

        res.status(201).json(session);
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Failed to create session' });
    }
};

export const getMySessions = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const sessions = await prisma.session.findMany({
            where: { userId },
            include: {
                psychologist: {
                    select: { name: true, image: true, specialization: true }
                },
                payment: {
                    select: { status: true, amount: true }
                }
            },
            orderBy: { scheduledAt: 'desc' }
        });

        res.json(sessions);
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ error: 'Failed to fetch sessions' });
    }
}
