const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
    res.send('MindEase API is running 🌿');
});

// Mock Routes (Since we might not have a running DB immediately)
app.get('/api/psychologists', async (req, res) => {
    // In a real scenario, we would fetch from DB
    // const psychologists = await prisma.psychologist.findMany();
    res.json([
        { id: 1, name: "Dr. Ananya Sharma", specialization: "Anxiety", rating: 4.9 },
        { id: 2, name: "Dr. Rahul Verma", specialization: "Career", rating: 4.8 }
    ]);
});

app.post('/api/moods', async (req, res) => {
    const { mood, note } = req.body;
    console.log(`Received mood: ${mood}, Note: ${note}`);
    res.status(201).json({ message: "Mood logged successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
