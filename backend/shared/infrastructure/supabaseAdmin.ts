import "server-only";
import { createClient } from "@supabase/supabase-js";

const requireEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

/* The secret API key (sb_secret_...) bypasses RLS, so this client must never reach the browser. */
export const createSupabaseAdmin = () =>
  createClient(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_SECRET_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
