import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("3001"),
  GEMINI_API_KEY: z.string(),
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string().optional(),
  CORS_ORIGINS: z
    .string()
    .default("http://localhost:5173,https://skattehjalpen-frontend.vercel.app")
    .transform((origins) => origins.split(",")),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
