import { Hono } from "hono";
import otpRoutes from "../modules/otp/otp.routes";
import smsRoutes from "../modules/sms/sms.routes";
import authRoutes from "./authRoute";
import projectRoutes from "./projectRoutes";
import userRoutes from "./userRoute";

const routes = new Hono();

routes.route("/sms", smsRoutes);
routes.route("/otp", otpRoutes);
routes.route("/auth", authRoutes);
routes.route("/user", userRoutes);
routes.route("/project", projectRoutes);

export default routes;
