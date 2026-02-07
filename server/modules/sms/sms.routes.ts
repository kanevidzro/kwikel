import { Hono } from "hono";
import { apiKeyMiddleware } from "../../middleware/apikey";
import {
  getSmsStatusHandler,
  sendBulkSmsHandler,
  sendSmsHandler,
} from "./sms.controller";

const smsRoutes = new Hono();

// Protect all SMS routes with API key middleware
smsRoutes.use("/*", apiKeyMiddleware);

smsRoutes.post("/send", sendSmsHandler); // single SMS
smsRoutes.post("/bulk", sendBulkSmsHandler); // bulk SMS
smsRoutes.get("/status/:id", getSmsStatusHandler); // get SMS status by ID

export default smsRoutes;
