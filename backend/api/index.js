import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();

// Prisma Client with Serverless Global Reuse Pattern
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
    res.send('MindEase API is running 🌿');
});

// Real Routes
app.get('/api/psychologists', async (req, res) => {
    try {
        const psychologists = await prisma.psychologist.findMany();
        res.json(psychologists);
    } catch (error) {
        console.error('Error fetching psychologists:', error);
        res.status(500).json({ error: 'Failed to fetch psychologists' });
    }
});

app.post('/api/sessions', async (req, res) => {
    const { psychologistId, date, time, type } = req.body;

    try {
        if (!psychologistId || !date || !time) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log(`Booking received: Psych ${psychologistId} on ${date} at ${time}`);

        // Simulate DB delay
        await new Promise(resolve => setTimeout(resolve, 500));

        res.status(201).json({ message: "Session booked successfully", id: Math.floor(Math.random() * 1000) });
    } catch (error) {
        console.error('Error booking session:', error);
        res.status(500).json({ error: 'Failed to book session' });
    }
});

app.post('/api/moods', async (req, res) => {
    const { mood, note } = req.body;
    console.log(`Received mood: ${mood}, Note: ${note}`);
    res.status(201).json({ message: "Mood logged successfully" });
});

export default app;
