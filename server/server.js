import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import contactRoutes from './routes/contact.js';

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
await connectDB();

// Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // Vite dev server
  'http://localhost:3000',
  'http://localhost:5000',
  process.env.CORS_ORIGIN || 'http://localhost:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow if no origin (postman), allowed exactly, or if it's a Vercel deployment
      if (
        !origin || 
        allowedOrigins.includes(origin) || 
        origin.endsWith('.vercel.app') ||
        origin === process.env.CORS_ORIGIN
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 3600,
  })
);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Devika Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      submit_contact: 'POST /api/contact/submit',
      get_submissions: 'GET /api/contact/submissions',
      get_submission: 'GET /api/contact/submission/:id',
      update_status: 'PATCH /api/contact/submission/:id/status',
      delete_submission: 'DELETE /api/contact/submission/:id',
      stats: 'GET /api/contact/stats',
    },
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   🚀 Server Running Successfully!      ║
  ║   📍 Port: ${PORT}                          ║
  ║   🌍 URL: http://localhost:${PORT}        ║
  ║   💾 Database: MongoDB Connected       ║
  ╚════════════════════════════════════════╝
  `);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});
