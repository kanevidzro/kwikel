import { Hono } from "hono";
import {
  createProjectHandler,
  deleteProjectHandler,
  getProjectHandler,
  getProjectsHandler,
  updateProjectHandler,
} from "../controllers/projectController";
import { authMiddleware } from "../middleware/auth";

const projectRoutes = new Hono();

// Protect all project routes with authMiddleware
projectRoutes.use("/*", authMiddleware);

// Project CRUD
projectRoutes.post("/", createProjectHandler); // POST /project
projectRoutes.get("/", getProjectsHandler); // GET /project
projectRoutes.get("/:id", getProjectHandler); // GET /project/:id
projectRoutes.put("/:id", updateProjectHandler); // PUT /project/:id
projectRoutes.delete("/:id", deleteProjectHandler); // DELETE /project/:id

export default projectRoutes;
