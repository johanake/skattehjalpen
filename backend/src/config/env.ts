import { z } from "zod";

// Ensure dotenv is loaded before parsing environment
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("3001"),
  GEMINI_API_KEY: z.string(),
  JWT_SECRET: z
    .string()
    .optional()
    .default(
      "ThisIsADefaultDevelopmentKeyThatShouldNotBeUsedInProductionILOVESTRAWBERRIES"
    ),
  CORS_ORIGINS: z
    .string()
    .default(
      "http://localhost:5173,https://skattehjalpen-frontend.vercel.app,https://skattehjalpen.se,https://www.skattehjalpen.se"
    )
    .transform((origins) => origins.split(",")),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_PUBLISHABLE_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  API_URL: z.string().default("http://localhost:3001/trpc"),
  MONGODB_URI: z
    .string()
    .default(
      "mongodb://admin:password123@localhost:27017/skattehjalpen?authSource=admin"
    ),
  IP_SALT: z
    .string()
    .default("default-analytics-salt-change-in-production"),
  ADMIN_ANALYTICS_KEY: z
    .string()
    .default("admin123-change-in-production"),
});

console.log("Loading environment variables...");
export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
