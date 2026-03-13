import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Client - Lazy initialized
 * Only initialize if SUPABASE_URL and SUPABASE_ANON_KEY are set
 */

let supabaseClient: ReturnType<typeof createClient> | null = null;

function initSupabase() {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable."
      );
    }
    return null;
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}

export function getSupabaseClient() {
  return initSupabase();
}

/**
 * Supabase Database Type Definitions
 * Supabase JS client requires generated types for table schemas
 * Run: supabase gen types typescript --project-id <id> > database.types.ts
 * Phase 2 switches to Drizzle ORM for full type safety
 */

export interface SupabaseResponse<T = unknown> {
  data: T | null;
  error: unknown;
}

// TypeScript-compatible Supabase client with untyped table access
// Requires: supabase gen types typescript
// Or Phase 2: Drizzle ORM migration
export type UntypedSupabaseClient = Record<string, Record<string, unknown>>;

export function castSupabase(): UntypedSupabaseClient {
  return getSupabaseClient() as unknown as UntypedSupabaseClient;
}

// Export client getter as default export for convenience
export const supabase = {
  auth: {
    getUser: async () => {
      const client = getSupabaseClient();
      if (!client) return { data: { user: null } };
      return client!.auth.getUser();
    },
    getSession: async () => {
      const client = getSupabaseClient();
      if (!client) return { data: { session: null } };
      return client!.auth.getSession();
    },
  },
  from: (table: string) => {
    const client = getSupabaseClient();
    if (!client) throw new Error("Supabase is not configured");
    return client!.from(table);
  },
};

/**
 * Helper to get authenticated user from session
 */
export async function getAuthUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Helper to get current session
 */
export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

/**
 * Example: Fetch data from a table
 * const { data, error } = await supabase
 *   .from('your_table')
 *   .select('*');
 */
