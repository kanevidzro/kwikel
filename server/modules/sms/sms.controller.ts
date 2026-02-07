import type { Context } from "hono";
import { z } from "zod";
import {
  getMessagesService,
  sendBulkSmsService,
  sendSmsService,
} from "./sms.service";

// Validation schemas
const sendSmsSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  message: z.string().min(1),
});

const sendBulkSmsSchema = z.object({
  from: z.string().min(1),
  recipients: z.array(z.string().min(1)),
  message: z.string().min(1),
});

// Handlers

export const sendSmsHandler = async (c: Context) => {
  try {
    const { from, to, message } = sendSmsSchema.parse(await c.req.json());

    // apiKeyMiddleware already validated and attached apiKey
    const apiKey = c.get("apiKey");
    const sms = await sendSmsService(apiKey, from, to, message);

    return c.json({ success: true, message: "SMS processed", data: sms });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: msg }, 400);
  }
};

export const sendBulkSmsHandler = async (c: Context) => {
  try {
    const { from, recipients, message } = sendBulkSmsSchema.parse(
      await c.req.json(),
    );

    const apiKey = c.get("apiKey");
    const results = await sendBulkSmsService(apiKey, from, recipients, message);

    return c.json({
      success: true,
      message: "Bulk SMS processed",
      data: results,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: msg }, 400);
  }
};

export const getSmsStatusHandler = async (c: Context) => {
  try {
    const smsId = c.req.param("id");
    const sms = await getMessagesService(smsId);
    return c.json({ success: true, data: sms });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: msg }, 404);
  }
};
