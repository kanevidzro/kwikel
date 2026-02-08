import type { Context, Next } from "hono";
import { validateApiKey } from "../utils/apiKey";

export const apiKeyMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("authorization");
  const apiKeyHeader = c.req.header("x-api-key");

  const rawKey = authHeader?.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "").trim()
    : apiKeyHeader?.trim();

  if (!rawKey) {
    return c.json(
      { success: false, error: "Missing API key", code: "MISSING_API_KEY" },
      401,
    );
  }

  const keyRecord = await validateApiKey(rawKey);
  if (!keyRecord) {
    return c.json(
      {
        success: false,
        error: "Invalid or inactive API key",
        code: "INVALID_API_KEY",
      },
      401,
    );
  }

  // Attach project info to context
  c.set("projectId", keyRecord.projectId);
  c.set("projectOwnerId", keyRecord.project.userId);
  c.set("apiKey", keyRecord);

  await next();
};
