import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export const { signIn, signUp, signOut, useSession } = authClient;

/**
 * Update user profile
 */
export async function updateProfile(data: { name?: string }) {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/update-profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  })
    .then((res) => res.json())
}

/**
 * Change user password
 */
export async function changePassword(data: {
  currentPassword: string
  newPassword: string
}) {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/change-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  })
    .then((res) => res.json())
}
