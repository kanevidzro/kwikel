import { Hono } from "hono";
import {
  createApiKeyHandler,
  createProjectHandler,
  deactivateApiKeyHandler,
  deleteProjectHandler,
  getProjectHandler,
  listProjectsHandler,
  updateProjectHandler,
} from "../controllers/projectController";
import { authMiddleware } from "../middleware/auth";

const projectRoutes = new Hono();

// Protect all project routes with authMiddleware
projectRoutes.use("/*", authMiddleware);

// Project CRUD
projectRoutes.post("/", createProjectHandler); // POST /project
projectRoutes.get("/", listProjectsHandler); // GET /project
projectRoutes.get("/:id", getProjectHandler); // GET /project/:id
projectRoutes.put("/:id", updateProjectHandler); // PUT /project/:id
projectRoutes.delete("/:id", deleteProjectHandler); // DELETE /project/:id

// API Key management
projectRoutes.post("/api-key", createApiKeyHandler); // POST /project/api-key
projectRoutes.put("/api-key/deactivate", deactivateApiKeyHandler); // PUT /project/api-key/deactivate

export default projectRoutes;
