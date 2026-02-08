import { z } from "zod";

// Define schema for all required environment variables
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
});

// Parse & validate process.env
export const env = envSchema.parse(process.env);
