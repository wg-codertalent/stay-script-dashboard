import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY: z.string().min(1),
  SUPABASE_JWT_SECRET: z.string().min(1).optional(),
});

export const env = envSchema.parse(process.env);

export const config = {
  supabase: {
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY,
    jwtSecret: env.SUPABASE_JWT_SECRET,
  },
} as const;
