import { z } from "zod";

// Define schema for all required environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  DATABASE_URL: z.url(),

  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number(), // converts string to number
  SMTP_USER: z.email(),
  SMTP_PASS: z.string().min(1),

  BACKEND_BASE_URL: z.url().default("http://localhost:8080"),
  FRONTEND_BASE_URL: z.url().default("http://localhost:3000"),
});

// Parse & validate process.env
export const env = envSchema.parse(process.env);
