import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

export const env = envSchema.parse(process.env);

export const config = {
  supabase: {
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE,
  },
} as const;

/**
 * Returns the base site URL for constructing absolute redirects.
 * - In the browser, use window.location.origin to respect the current host.
 * - On the server, prefer NEXT_PUBLIC_SITE_URL; fallback to localhost for dev.
 */
export function getSiteUrl(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4000";
}
