import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './router.js';
import { env } from './config/env.js';
import { createAuthMiddleware } from './middleware/auth.js';
import { upload } from './services/fileUploadService.js';
import { FileUploadService } from './services/fileUploadService.js';
import { TaxService } from './services/taxService.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// File upload endpoint
app.post('/api/upload-receipt', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { declarationId, category, amount, description, date } = req.body;
    
    if (!declarationId || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Process the uploaded file
    const fileData = await FileUploadService.processUploadedFile(req.file, category);
    
    // Create receipt record
    const receipt = await TaxService.createReceipt(declarationId, {
      ...fileData,
      category,
      amount: amount ? parseFloat(amount) : undefined,
      description,
      date: date ? new Date(date) : undefined,
    });

    res.json({ receipt });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// tRPC middleware
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: async ({ req, res }) => {
      // Create auth context for each request
      const authContext = await createAuthMiddleware()();
      return {
        req,
        res,
        ...authContext,
      };
    },
  }),
);

const PORT = parseInt(env.PORT, 10);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 tRPC endpoint: http://localhost:${PORT}/trpc`);
  console.log(`📁 File upload: http://localhost:${PORT}/api/upload-receipt`);
});