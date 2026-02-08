// server/controllers/authController.ts

import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import {
  forgotPassword,
  getSession,
  refreshSession,
  resetPassword,
  signinUser,
  signoutUser,
  signupUser,
  verifyEmail,
} from "../services/authService";

const isProd = () => process.env.NODE_ENV === "production";

const sessionCookieOpts = (expiresAt: Date) => ({
  httpOnly: true,
  secure: isProd(),
  sameSite: "Lax" as const,
  path: "/",
  expires: expiresAt,
  maxAge: Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000)),
});

export const signupHandler = async (c: Context) => {
  try {
    const { name, email, phone, password } = await c.req.json();
    const user = await signupUser(email, password, name, phone);
    const { password: _, ...safeUser } = user;
    return c.json({ message: "User registered", user: safeUser });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ error: message }, 400);
  }
};

export const signinHandler = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const userAgent = c.req.header("User-Agent");
    const xff = c.req.header("X-Forwarded-For");
    const ipAddress = xff ? xff.split(",")[0].trim() : "unknown";

    const result = await signinUser(email, password, userAgent, ipAddress);
    setCookie(
      c,
      "session",
      result.session.token,
      sessionCookieOpts(result.session.expiresAt),
    );

    const { password: _, ...safeUser } = result.user;
    return c.json({ message: "Logged in", user: safeUser });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ error: message }, 401);
  }
};

export const signoutHandler = async (c: Context) => {
  const token = getCookie(c, "session");
  if (token) await signoutUser(token);

  deleteCookie(c, "session", {
    path: "/",
    secure: isProd(),
    sameSite: "Lax",
  });

  return c.json({ message: "Logged out" });
};

export const forgotPasswordHandler = async (c: Context) => {
  try {
    const { email } = await c.req.json();
    await forgotPassword(email);
    return c.json({
      message: "If user exists, a password reset email has been sent.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ error: message }, 400);
  }
};

export const resetPasswordHandler = async (c: Context) => {
  try {
    const { token, newPassword } = await c.req.json();
    const user = await resetPassword(token, newPassword);
    if (!user) return c.json({ error: "Invalid or expired token" }, 400);

    const { password: _, ...safeUser } = user;
    deleteCookie(c, "session", { path: "/" }); // force signout
    return c.json({
      message: "Password reset successful. Please sign in again.",
      user: safeUser,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ error: message }, 400);
  }
};

export const sessionHandler = async (c: Context) => {
  const token = getCookie(c, "session");
  if (!token) return c.json({ error: "Unauthorized" }, 401);

  const session = await getSession(token);
  if (!session) {
    deleteCookie(c, "session", { path: "/" });
    return c.json({ error: "Session expired", code: "SESSION_EXPIRED" }, 401);
  }
  const { password: _, ...safeUser } = session.user;
  return c.json({ user: safeUser, expiresAt: session.expiresAt });
};

export const refreshSessionHandler = async (c: Context) => {
  const token = getCookie(c, "session");
  if (!token) return c.json({ error: "Unauthorized" }, 401);

  const refreshed = await refreshSession(token);
  if (!refreshed) {
    deleteCookie(c, "session", { path: "/" });
    return c.json({ error: "Invalid or expired session" }, 401);
  }
  setCookie(
    c,
    "session",
    refreshed.token,
    sessionCookieOpts(refreshed.expiresAt),
  );
  return c.json({
    message: "Session refreshed",
    expiresAt: refreshed.expiresAt,
  });
};

export const verifyEmailHandler = async (c: Context) => {
  const token = c.req.query("token");

  const frontendBase = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
  const loginUrl = `${frontendBase}/signin`;
  const errorUrl = `${frontendBase}/verify-error`;

  if (!token) return c.redirect(errorUrl, 302);

  try {
    const result = await verifyEmail(token);
    return c.redirect(result ? loginUrl : errorUrl, 302);
  } catch {
    return c.redirect(errorUrl, 302);
  }
};
