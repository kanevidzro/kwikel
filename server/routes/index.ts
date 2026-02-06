import { Hono } from "hono";

import authRoutes from "./authRoute";
import projectRoutes from "./projectRoutes";
import userRoutes from "./userRoute";

const routes = new Hono();

routes.route("/auth", authRoutes);
routes.route("/user", userRoutes);
routes.route("/project", projectRoutes);

export default routes;
