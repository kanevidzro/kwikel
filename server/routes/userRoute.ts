import { Hono } from "hono";
import {
  changePasswordHandler,
  deleteUserHandler,
  getUserHandler,
  updateUserHandler,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";

const userRoutes = new Hono();

userRoutes.use("/*", authMiddleware);

// Current user profile
userRoutes.get("/", getUserHandler);
userRoutes.post("/password", changePasswordHandler);
userRoutes.put("/", updateUserHandler);
userRoutes.delete("/", deleteUserHandler);

export default userRoutes;

// sample frontend code to call the API

// GET https://api.example.com/user (fetch user profile)
// POST https://api.example.com/user/password (change password)
// PUT https://api.example.com/user (update user profile)
// DELETE https://api.example.com/user (delete user account)
