// lib/session.ts
import { env } from "@/lib/env";

export async function getSession(headers: { cookie: string }) {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/session`, {
      method: "GET",
      headers: {
        cookie: headers.cookie,
      },
      credentials: "include",
      cache: "no-store",
    });

    return res.ok;
  } catch (err) {
    console.error("Session check failed:", err);
    return false;
  }
}
