import { Hono } from "hono";
import {
  forgotPasswordHandler,
  refreshSessionHandler,
  resetPasswordHandler,
  sessionHandler,
  signinHandler,
  signoutHandler,
  signupHandler,
  verifyEmailHandler,
} from "../controllers/authController";

const authRoutes = new Hono();

authRoutes.post("/signup", signupHandler);
authRoutes.post("/signin", signinHandler);
authRoutes.post("/signout", signoutHandler);

authRoutes.post("/forgot-password", forgotPasswordHandler);
authRoutes.post("/reset-password", resetPasswordHandler);
authRoutes.get("/verify-email", verifyEmailHandler);

authRoutes.get("/session", sessionHandler);

authRoutes.post("/refresh", refreshSessionHandler);

export default authRoutes;
