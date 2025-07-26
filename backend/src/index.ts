import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './router.js';
import { env } from './config/env.js';
import { database } from './config/database.js';
import { createAuthMiddleware } from './middleware/auth.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: env.CORS_ORIGINS,
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


// tRPC middleware
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: async ({ req, res }) => {
      // Create auth context for each request
      const authContext = await createAuthMiddleware()(req);
      return {
        req,
        res,
        ...authContext,
      };
    },
  }),
);

const PORT = parseInt(env.PORT, 10);

async function startServer() {
  try {
    await database.connect();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔧 tRPC endpoint: http://localhost:${PORT}/trpc`);
      console.log(`🗄️ MongoDB connected successfully`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await database.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down server...');
  await database.disconnect();
  process.exit(0);
});

startServer();