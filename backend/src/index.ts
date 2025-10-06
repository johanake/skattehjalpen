import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './router.js';
import { env } from './config/env.js';
import { database } from './config/database.js';
import { createAuthMiddleware } from './middleware/auth.js';
import { requestLoggingMiddleware, errorLoggingMiddleware } from './middleware/logging.js';
import { logger } from './utils/logger.js';
import { WebhookController } from './controllers/webhookController.js';

const app = express();

// Request logging middleware (before other middleware)
app.use(requestLoggingMiddleware);

// CORS configuration
app.use(cors({
  origin: env.CORS_ORIGINS,
  credentials: true,
}));

// Stripe webhook endpoint (must be before express.json() to get raw body)
app.post('/webhook/stripe', express.raw({ type: 'application/json' }), WebhookController.handleStripeWebhook);

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

// Error logging middleware (after routes)
app.use(errorLoggingMiddleware);

const PORT = parseInt(env.PORT, 10);

async function startServer() {
  try {
    await database.connect();
    
    app.listen(PORT, () => {
      logger.info('Server started successfully', {
        port: PORT,
        environment: env.NODE_ENV,
        endpoints: {
          server: `http://localhost:${PORT}`,
          health: `http://localhost:${PORT}/health`,
          trpc: `http://localhost:${PORT}/trpc`
        }
      });
      logger.info('MongoDB connected successfully');
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  logger.info('Received SIGINT, shutting down server gracefully...');
  await database.disconnect();
  logger.info('Server shutdown completed');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Received SIGTERM, shutting down server gracefully...');
  await database.disconnect();
  logger.info('Server shutdown completed');
  process.exit(0);
});

startServer();