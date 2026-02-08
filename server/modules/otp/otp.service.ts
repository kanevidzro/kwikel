// services/otpService.ts
import crypto from "node:crypto";
import { prisma } from "../../lib/prisma";
import { sendSmsProvider } from "../../providers/sms.provider";
import { hashToken } from "../../utils/token";

const OTP_LENGTH = 6;
const OTP_EXPIRY_MS = 3 * 60 * 1000; // 3 minutes
const MAX_ATTEMPTS = 3;
const DEFAULT_SMS_FROM = "DugbleOt";
const MAX_ACTIVE_OTPS_PER_RECIPIENT = 3;

// Generate numeric OTP
function generateOtp(length = OTP_LENGTH) {
  const digits = "0123456789";
  const bytes = crypto.randomBytes(length);
  return Array.from(bytes, (b) => digits[b % 10]).join("");
}

// Request OTP (SMS only)
export const requestOtpService = async (
  projectId: string,
  recipient: string,
) => {
  const otpCode = generateOtp();
  const hashedCode = hashToken(otpCode);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);
  const message = `Your verification code is ${otpCode}. It expires in 3 minutes.`;

  // 1) Create OTP record first (fast transaction)
  const otpRecord = await prisma.$transaction(async (tx) => {
    const activeOtps = await tx.otpMessage.count({
      where: { projectId, recipient, status: "PENDING" },
    });
    if (activeOtps >= MAX_ACTIVE_OTPS_PER_RECIPIENT) {
      throw new Error("Too many active OTPs for this recipient");
    }

    return tx.otpMessage.create({
      data: {
        projectId,
        recipient,
        code: hashedCode,
        attempts: 0,
        maxAttempts: MAX_ATTEMPTS,
        expiresAt,
        channel: "SMS",
        status: "PENDING",
        metadata: { sentVia: "SMS" },
      },
    });
  });

  // 2) Send SMS after commit
  try {
    await sendSmsProvider(DEFAULT_SMS_FROM, recipient, message);
  } catch {
    // 3) No FAILED status: mark unusable
    await prisma.otpMessage.update({
      where: { id: otpRecord.id },
      data: { status: "FAILED" },
    });
    throw new Error("Failed to send OTP SMS");
  }

  return { otpId: otpRecord.id, recipient, expiresAt, channel: "SMS" as const };
};

// Verify OTP (SMS only)
export const verifyOtpService = async (
  projectId: string,
  recipient: string,
  code: string,
) => {
  return prisma.$transaction(async (tx) => {
    const otp = await tx.otpMessage.findFirst({
      where: { projectId, recipient, status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });

    if (!otp)
      throw Object.assign(new Error("Invalid OTP code"), {
        code: "INVALID_OTP",
      });

    if (new Date() > otp.expiresAt) {
      await tx.otpMessage.update({
        where: { id: otp.id },
        data: { status: "EXPIRED" },
      });
      throw Object.assign(new Error("OTP code has expired"), {
        code: "OTP_EXPIRED",
      });
    }

    if (otp.attempts >= otp.maxAttempts) {
      await tx.otpMessage.update({
        where: { id: otp.id },
        data: { status: "EXPIRED" },
      });
      throw Object.assign(
        new Error("Maximum OTP verification attempts exceeded"),
        { code: "MAX_ATTEMPTS" },
      );
    }

    const hashedInput = hashToken(code);
    if (otp.code !== hashedInput) {
      await tx.otpMessage.update({
        where: { id: otp.id },
        data: { attempts: { increment: 1 } },
      });
      throw Object.assign(new Error("Invalid OTP code"), {
        code: "INVALID_OTP",
      });
    }

    await tx.otpMessage.update({
      where: { id: otp.id },
      data: { status: "VERIFIED", verifiedAt: new Date() },
    });

    return { valid: true, message: "OTP verified successfully" };
  });
};
