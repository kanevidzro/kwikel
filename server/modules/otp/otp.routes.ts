import { Hono } from "hono";
import { apiKeyMiddleware } from "../../middleware/apikey";
import {
  requestOtpHandler,
  resendOtpHandler,
  verifyOtpHandler,
} from "./otp.controller";

const otpRoutes = new Hono();

// Protect OTP routes with API key middleware
otpRoutes.use("/*", apiKeyMiddleware);

otpRoutes.post("/request", requestOtpHandler);
otpRoutes.post("/verify", verifyOtpHandler);
otpRoutes.post("/resend", resendOtpHandler);

export default otpRoutes;
