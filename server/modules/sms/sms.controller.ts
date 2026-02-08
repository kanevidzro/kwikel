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
  recipients: z.array(z.string().min(1)).nonempty(),
  message: z.string().min(1),
});

// Handlers

export const sendSmsHandler = async (c: Context) => {
  try {
    const { from, to, message } = sendSmsSchema.parse(await c.req.json());

    // apiKeyMiddleware already validated and attached apiKey
    const projectId = c.get("projectId");
    const sms = await sendSmsService(projectId, from, to, message);

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

    const projectId = c.get("projectId");
    const results = await sendBulkSmsService(
      projectId,
      from,
      recipients,
      message,
    );

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
    const projectId = c.get("projectId");

    if (sms.projectId !== projectId) {
      return c.json(
        { success: false, error: "Forbidden", code: "FORBIDDEN" },
        403,
      );
    }

    return c.json({ success: true, data: sms });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: msg, code: "NOT_FOUND" }, 404);
  }
};
