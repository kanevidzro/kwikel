import type { Context, Next } from "hono";
import { validateApiKey } from "../utils/apiKey";

export const apiKeyMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ success: false, error: "Missing or invalid API key" }, 401);
  }

  const apiKey = authHeader.replace("Bearer ", "").trim();
  const keyRecord = await validateApiKey(apiKey);

  if (!keyRecord) {
    return c.json(
      { success: false, error: "Invalid or inactive API key" },
      401,
    );
  }

  // Attach projectId & userId to context
  c.set("projectId", keyRecord.projectId);
  c.set("userId", keyRecord.project.userId);
  c.set("apiKey", keyRecord);

  await next();
};
