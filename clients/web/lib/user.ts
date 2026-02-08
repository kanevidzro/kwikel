// lib/user.ts
import { apiClient } from "./apiClient";

export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
};

/**
 * Fetch the authenticated user's profile.
 * Returns null if not authenticated or request fails.
 */

export async function getUser(): Promise<User | null> {
  const res = await apiClient.get<{ user: User }>("/user", {
    credentials: "include",
  });
  return res.success ? (res.data?.user ?? null) : null;
}
