// lib/session.ts
import { apiClient } from "./apiClient";

/**
 * Check if a session exists.
 * Returns true if authenticated, false otherwise.
 */
export async function getSession(): Promise<boolean> {
  const res = await apiClient.get<{ authenticated: boolean }>("/auth/session", {
    credentials: "include",
  });

  // If the API client itself failed (network error, etc.)
  if (!res.success) {
    return false;
  }

  // If the backend returns a structured response
  if (res.data && typeof res.data.authenticated === "boolean") {
    return res.data.authenticated;
  }

  // Fallback: treat any other case as unauthenticated
  return false;
}
