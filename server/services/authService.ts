// server/services/authService.ts

import { randomUUID } from "node:crypto";
import { sendEmail } from "../lib/mailer";
import { prisma } from "../lib/prisma";
import { hashPassword, verifyPassword } from "../utils/hash";
import { generateSessionToken, hashToken } from "../utils/token";

const redirectTo = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
const apiBaseUrl = process.env.BACKEND_BASE_URL || "http://localhost:8080";

// --- Signup ---
export const signupUser = async (
  email: string,
  password: string,
  name: string,
  phone?: string,
) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already in use");

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashed, name, phone },
  });

  const rawToken = randomUUID();
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

  await prisma.verificationToken.create({
    data: { userId: user.id, token: tokenHash, expiresAt },
  });

  const verifyUrl = `${apiBaseUrl}/auth/verify-email?token=${encodeURIComponent(rawToken)}`;

  await sendEmail({
    to: email,
    subject: "Verify your email",
    text: `Welcome! Please verify your email:\n\n${verifyUrl}\n\nExpires at ${expiresAt.toISOString()}.`,
  });

  return user;
};

// --- Signin ---
export const signinUser = async (
  email: string,
  password: string,
  userAgent?: string,
  ipAddress?: string,
) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) throw new Error("Invalid credentials");

  const valid = await verifyPassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  if (!user.emailVerified) {
    const rawToken = randomUUID();
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

    await prisma.verificationToken.deleteMany({ where: { userId: user.id } });
    await prisma.verificationToken.create({
      data: { userId: user.id, token: tokenHash, expiresAt },
    });

    const verifyUrl = `${apiBaseUrl}/auth/verify-email?token=${encodeURIComponent(rawToken)}`;

    await sendEmail({
      to: email,
      subject: "Verify your email",
      text: `Welcome back! Please verify your email:\n\n${verifyUrl}\n\nExpires at ${expiresAt.toISOString()}.`,
    });

    throw new Error(
      "Email not verified. A new verification link has been sent.",
    );
  }

  const { raw, hash } = generateSessionToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const session = await prisma.session.upsert({
    where: { userId: user.id },
    create: { userId: user.id, token: hash, expiresAt, userAgent, ipAddress },
    update: { token: hash, expiresAt, userAgent, ipAddress },
  });

  return { user, session: { ...session, token: raw } };
};

// --- Signout ---
export const signoutUser = async (token: string) => {
  const tokenHash = hashToken(token);
  await prisma.session.deleteMany({ where: { token: tokenHash } });
  return { ok: true };
};

// --- Get Session ---
export const getSession = async (token: string) => {
  const tokenHash = hashToken(token);
  const session = await prisma.session.findUnique({
    where: { token: tokenHash },
    include: { user: true },
  });
  if (!session) return null;

  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }
  return session;
};

// --- Refresh Session ---
export const refreshSession = async (token: string) => {
  const tokenHash = hashToken(token);
  const now = new Date();

  const session = await prisma.session.findUnique({
    where: { token: tokenHash },
  });
  if (!session || session.expiresAt <= now) return null;

  const { raw, hash } = generateSessionToken();
  const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24);

  const updated = await prisma.session.update({
    where: { id: session.id },
    data: { token: hash, expiresAt },
  });

  return { ...updated, token: raw };
};

// --- Forgot Password ---
export const forgotPassword = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15);
  if (!user) return { expiresAt }; // pretend success

  if (!user.emailVerified) {
    throw new Error("Please verify your email before resetting your password.");
  }

  const rawToken = randomUUID();
  const hashedToken = hashToken(rawToken);

  await prisma.$transaction(async (tx) => {
    // Clean up old tokens
    await tx.passwordResetToken.deleteMany({ where: { userId: user.id } });

    // Create new token
    await tx.passwordResetToken.create({
      data: { userId: user.id, token: hashedToken, expiresAt },
    });
  });

  const resetUrl = `${redirectTo}/reset-password?token=${encodeURIComponent(rawToken)}`;

  await sendEmail({
    to: email,
    subject: "Reset your password",
    text: `Click below to reset your password:\n\n${resetUrl}\n\nExpires at ${expiresAt.toISOString()}.`,
  });

  return { expiresAt };
};

// --- Reset Password ---
export const resetPassword = async (token: string, newPassword: string) => {
  const hashedToken = hashToken(token);
  const prt = await prisma.passwordResetToken.findUnique({
    where: { token: hashedToken },
    include: { user: true },
  });

  if (!prt || prt.expiresAt <= new Date()) return null;

  const hashed = await hashPassword(newPassword);

  return prisma.$transaction(async (tx) => {
    // Update user password
    await tx.user.update({
      where: { id: prt.user.id },
      data: { password: hashed },
    });

    // Invalidate sessions
    await tx.session.deleteMany({ where: { userId: prt.user.id } });

    // Delete all reset tokens for this user
    await tx.passwordResetToken.deleteMany({ where: { userId: prt.user.id } });

    return prt.user;
  });
};

// --- Verify Email ---
export const verifyEmail = async (token: string) => {
  const tokenHash = hashToken(token);
  const now = new Date();

  // Find verification token by hashed value
  const vt = await prisma.verificationToken.findUnique({
    where: { token: tokenHash },
    include: { user: true },
  });

  if (!vt || vt.expiresAt <= now || !vt.user) {
    throw new Error("Invalid or expired token");
  }

  // Update user and delete token in a transaction
  await prisma.$transaction([
    prisma.user.update({
      where: { id: vt.user.id },
      data: { emailVerified: new Date() },
    }),
    prisma.verificationToken.delete({ where: { id: vt.id } }),
  ]);

  return vt.user;
};
