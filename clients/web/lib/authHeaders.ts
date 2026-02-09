// lib/authHeaders.ts
import { cookies } from "next/headers";

export async function getAuthHeaders(): Promise<{ cookie: string }> {
  const cookieStore = await cookies();
  const dugSession = cookieStore.get("dug-session")?.value;

  return {
    cookie: dugSession ? `dug-session=${dugSession}` : "",
  };
}
