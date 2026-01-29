import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env';
import { apiLimiter } from './middleware/rateLimit';

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // CORS
app.use(express.json()); // Parse JSON bodies
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined')); // Logging
app.use(apiLimiter); // Apply global rate limiting

// Health Check
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'MindEase Backend is running 🌿',
        env: config.nodeEnv,
    });
});

import routes from './routes';
app.use('/api', routes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

export default app;
