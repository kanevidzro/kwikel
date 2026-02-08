import { createMiddleware } from "hono/factory";
import { logger } from "../utils/logger";

export const loggerPlugin = createMiddleware(async (c, next) => {
  const start = Date.now();

  logger.info({ method: c.req.method, url: c.req.url }, "Incoming request");

  await next();

  const duration = Date.now() - start;
  logger.info(
    {
      method: c.req.method,
      url: c.req.url,
      status: c.res.status,
      duration: `${duration}ms`,
    },
    "Request completed",
  );
});
