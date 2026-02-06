import { Hono } from "hono";
import {
  changePasswordHandler,
  deleteUserHandler,
  updateUserHandler,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";

const userRoutes = new Hono();

userRoutes.use("/*", authMiddleware);

userRoutes.post("/password", changePasswordHandler); // POST /user/password
userRoutes.put("/profile", updateUserHandler); // PUT /user/profile
userRoutes.delete("/account", deleteUserHandler); // DELETE /user/account

export default userRoutes;
