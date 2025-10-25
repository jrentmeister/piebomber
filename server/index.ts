import * as dotenv from 'dotenv';

// Load environment variables FIRST (before any other imports)
dotenv.config();

import express from 'express';
import cors from 'cors';
import menuRoutes from './routes/menu';
import eventsRoutes from './routes/events';
import cateringRoutes from './routes/catering';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'PieBomber API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/menu', menuRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/catering', cateringRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 PieBomber API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
