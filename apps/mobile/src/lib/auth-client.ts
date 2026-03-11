import { createAuthClient } from "better-auth/react";

/**
 * Better-Auth Client for React Native / Expo
 * Mobile-friendly authentication with persistent storage
 * Uses React client (works on Expo/RN)
 */

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_APP_URL || "http://localhost:3003",
});

export const { signIn, signUp, signOut, useSession } = authClient;

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  try {
    const session = await authClient.getSession();
    return !!session;
  } catch {
    return false;
  }
}

/**
 * Get current user session
 */
export async function getCurrentSession() {
  try {
    return await authClient.getSession();
  } catch {
    return null;
  }
}
