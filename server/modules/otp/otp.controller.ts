import type { Context } from "hono";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { requestOtpService, verifyOtpService } from "./otp.service";

// Validation schemas
const requestOtpSchema = z.object({
  recipient: z.string().min(1), // phone number
});

const verifyOtpSchema = z.object({
  recipient: z.string().min(1), // phone number
  code: z.string().min(1, "OTP code is required"),
});

// Handlers
export const requestOtpHandler = async (c: Context) => {
  try {
    const projectId = c.get("projectId"); // from apiKeyMiddleware
    const { recipient } = requestOtpSchema.parse(await c.req.json());

    const otp = await requestOtpService(projectId, recipient);
    return c.json({ success: true, message: "OTP sent via SMS", data: otp });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unexpected error";
    return c.json(
      { success: false, error: msg, code: "OTP_REQUEST_FAILED" },
      400,
    );
  }
};

export const verifyOtpHandler = async (c: Context) => {
  try {
    const projectId = c.get("projectId");
    const { recipient, code } = verifyOtpSchema.parse(await c.req.json());

    const result = await verifyOtpService(projectId, recipient, code);
    return c.json({ success: true, message: result.message });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unexpected error";
    return c.json(
      { success: false, error: msg, code: "OTP_VERIFY_FAILED" },
      400,
    );
  }
};

// Handler
export const resendOtpHandler = async (c: Context) => {
  try {
    const projectId = c.get("projectId");
    const { recipient } = requestOtpSchema.parse(await c.req.json());

    // enforce cooldown
    const lastOtp = await prisma.otpMessage.findFirst({
      where: { projectId, recipient, status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });
    if (lastOtp && Date.now() - lastOtp.createdAt.getTime() < 30_000) {
      return c.json(
        {
          success: false,
          error: "Please wait before requesting another OTP",
          code: "OTP_COOLDOWN",
        },
        429,
      );
    }

    const otp = await requestOtpService(projectId, recipient);
    return c.json({ success: true, message: "OTP resent via SMS", data: otp });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unexpected error";
    return c.json(
      { success: false, error: msg, code: "OTP_RESEND_FAILED" },
      400,
    );
  }
};
