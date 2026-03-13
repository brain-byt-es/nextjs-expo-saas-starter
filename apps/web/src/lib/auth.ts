import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

// Initialize Better-Auth with fallback if not configured
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let authInstance: any;

try {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  // Use PostgreSQL for production databases
  authInstance = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    basePath: "/api/auth",
    secret: process.env.BETTER_AUTH_SECRET || "dev-secret-key",
    plugins: [nextCookies()],
    database: {
      type: "postgres",
      url: databaseUrl,
    },
  });
} catch (error) {
  // Fallback for build-time initialization
  authInstance = null;
  if (process.env.NODE_ENV === "development") {
    console.warn("Better-Auth initialization failed:", error);
  }
}

export const auth = authInstance;

export function getAuth() {
  return auth;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Session = any;
