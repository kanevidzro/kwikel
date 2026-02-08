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
import { authMiddleware } from "../middleware/auth";

const authRoutes = new Hono();

authRoutes.post("/signup", signupHandler);
authRoutes.post("/signin", signinHandler);
authRoutes.post("/signout", authMiddleware, signoutHandler);

authRoutes.post("/forgot-password", forgotPasswordHandler);
authRoutes.post("/reset-password", resetPasswordHandler);
authRoutes.get("/verify-email", verifyEmailHandler);

authRoutes.get("/session", authMiddleware, sessionHandler);
authRoutes.post("/refresh", authMiddleware, refreshSessionHandler);

export default authRoutes;
