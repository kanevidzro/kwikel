import { Hono } from "hono";
import {
  changePasswordHandler,
  deleteUserHandler,
  updateUserHandler,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";

const userRoutes = new Hono();

userRoutes.use("/*", authMiddleware);

userRoutes.post("/change-password", changePasswordHandler);
userRoutes.put("/update", updateUserHandler);
userRoutes.delete("/delete", deleteUserHandler);

export default userRoutes;
