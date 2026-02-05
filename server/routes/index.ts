import { Hono } from "hono";

import authRoutes from "./authRoute";
import userRoutes from "./userRoute";

const routes = new Hono();

routes.route("/auth", authRoutes);
routes.route("/user", userRoutes);

export default routes;
