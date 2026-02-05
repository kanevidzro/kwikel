import type { Context, Next } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";
import { getSession } from "../services/authService";

export const authMiddleware = async (c: Context, next: Next) => {
  const token = getCookie(c, "session");
  if (!token) return c.json({ error: "Unauthorized" }, 401);

  const session = await getSession(token);
  if (!session) {
    deleteCookie(c, "session", { path: "/" });
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { password: _, ...safeUser } = session.user;
  c.set("user", safeUser);

  await next();
};
