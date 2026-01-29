import app from './app';
import { config } from './config/env';

const PORT = config.port;

const server = app.listen(PORT, () => {
    console.log(`\n🚀 MindEase Server running on port ${PORT}`);
    console.log(`👉 http://localhost:${PORT}`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
