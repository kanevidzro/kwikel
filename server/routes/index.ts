import { Hono } from "hono";
import otpRoutes from "../modules/otp/otp.routes";
import smsRoutes from "../modules/sms/sms.routes";
import apiKeyRoutes from "./apiKeyRoutes";
import authRoutes from "./authRoute";
import campaignRoutes from "./campaignRoutes";
import contactRoutes from "./contactRoutes";
import phoneBookRoutes from "./phoneBookRoutes";
import projectRoutes from "./projectRoutes";
import templateRoutes from "./templateRoutes";
import userRoutes from "./userRoute";

const routes = new Hono();

routes.route("/auth", authRoutes);
routes.route("/project", projectRoutes);
routes.route("/project", campaignRoutes);
routes.route("/project", templateRoutes);
routes.route("/project", phoneBookRoutes);
routes.route("/project", contactRoutes);
routes.route("/user", userRoutes);
routes.route("/sms", smsRoutes);
routes.route("/otp", otpRoutes);
routes.route("/project", apiKeyRoutes);

export default routes;
