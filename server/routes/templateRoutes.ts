import { Hono } from "hono";
import {
  createTemplateHandler,
  deleteTemplateHandler,
  getTemplateHandler,
  getTemplatesHandler,
  updateTemplateHandler,
} from "../controllers/templateController";
import { authMiddleware } from "../middleware/auth";

const templateRoutes = new Hono();

templateRoutes.use("/*", authMiddleware);

templateRoutes.post("/:projectId/templates", createTemplateHandler);
templateRoutes.get("/:projectId/templates", getTemplatesHandler);
templateRoutes.get("/:projectId/templates/:id", getTemplateHandler);
templateRoutes.put("/:projectId/templates/:id", updateTemplateHandler);
templateRoutes.delete("/:projectId/templates/:id", deleteTemplateHandler);

export default templateRoutes;
