import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPsychologists = async (req: Request, res: Response) => {
    try {
        const psychologists = await prisma.psychologist.findMany({
            where: { isVerified: true },
            select: {
                id: true,
                name: true,
                specialization: true,
                experienceYears: true,
                hourlyRate: true,
                image: true,
                bio: true,
            }
        });
        res.json(psychologists);
    } catch (error) {
        console.error('Error fetching psychologists:', error);
        res.status(500).json({ error: 'Failed to fetch psychologists' });
    }
};

export const getPsychologistById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const psychologist = await prisma.psychologist.findUnique({
            where: { id },
        });

        if (!psychologist) {
            return res.status(404).json({ error: 'Psychologist not found' });
        }

        res.json(psychologist);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching psychologist details' });
    }
}
