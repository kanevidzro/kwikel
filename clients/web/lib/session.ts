// lib/session.ts

/**
 * Check if a session exists.
 * Returns true if authenticated, false otherwise.
 */
export async function getSession(): Promise<boolean> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
      {
        cache: "no-store",
        credentials: "include",
      },
    );

    return res.ok; // ✅ just true/false
  } catch {
    return false;
  }
}
