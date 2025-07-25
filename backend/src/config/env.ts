import { z } from "zod";

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
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  MONGODB_URI: z
    .string()
    .default(
      "mongodb://admin:password123@localhost:27017/skattehjalpen?authSource=admin"
    ),
});

console.log('Loading environment variables...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI set:', !!process.env.MONGODB_URI);
export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
