import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import routes from "./routes";

const server = new Hono();
server.use("*", cors());
// Logging middleware
server.use(logger());

// Register routes
server.route("/", routes);

// Fallback for unmatched routes
server.notFound((c) => {
  return c.text("", 404);
});

server.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
});

export default {
  port: 8080,
  fetch: server.fetch,
};
