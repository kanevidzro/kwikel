import type { Context } from "hono";
import { z } from "zod";
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
    return c.json({ success: false, error: msg }, 400);
  }
};

export const verifyOtpHandler = async (c: Context) => {
  try {
    const projectId = c.get("projectId");
    const { recipient, code } = verifyOtpSchema.parse(await c.req.json());

    const result = await verifyOtpService(projectId, recipient, code);
    return c.json({ success: result.valid, data: result });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: msg }, 400);
  }
};
