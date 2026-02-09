// lib/user.ts
import { env } from "@/lib/env";

export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  createdAt: string;
};

export async function getUser(headers: {
  cookie: string;
}): Promise<User | null> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/user`, {
      method: "GET",
      headers: { cookie: headers.cookie },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data?.user) return null;

    return data.user as User;
  } catch (err) {
    console.error("User fetch failed:", err);
    return null;
  }
}
