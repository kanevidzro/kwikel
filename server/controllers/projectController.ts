import type { Context } from "hono";
import { z } from "zod";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../services/projectService";

// Validation schemas
export const ProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

// Handlers

export const createProjectHandler = async (c: Context) => {
  const parsed = ProjectSchema.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json(
      {
        error: "Invalid input",
        code: "INVALID_INPUT",
        details: parsed.error.format(),
      },
      400,
    );
  }

  const userId = c.get("userId");
  const project = await createProject(userId, parsed.data);
  return c.json({ message: "Project created", project });
};

export const getProjectsHandler = async (c: Context) => {
  const userId = c.get("userId");
  const projects = await getProjects(userId);
  return c.json({ message: "Projects fetched", projects });
};

export const getProjectHandler = async (c: Context) => {
  const { id } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(id);
  if (!project) {
    return c.json({ error: "Project not found", code: "NOT_FOUND" }, 404);
  }

  if (project.userId !== userId) {
    return c.json(
      { error: "Forbidden: You do not own this project", code: "FORBIDDEN" },
      403,
    );
  }

  return c.json({ message: "Project fetched", project });
};

export const updateProjectHandler = async (c: Context) => {
  const { id } = c.req.param();
  const parsed = ProjectSchema.partial().safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json(
      {
        error: "Invalid input",
        code: "INVALID_INPUT",
        details: parsed.error.format(),
      },
      400,
    );
  }

  const userId = c.get("userId");
  const project = await getProjectById(id);
  if (!project) {
    return c.json({ error: "Project not found", code: "NOT_FOUND" }, 404);
  }

  if (project.userId !== userId) {
    return c.json(
      { error: "Forbidden: You do not own this project", code: "FORBIDDEN" },
      403,
    );
  }

  const updated = await updateProject(id, parsed.data);
  return c.json({ message: "Project updated", project: updated });
};

export const deleteProjectHandler = async (c: Context) => {
  const { id } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(id);
  if (!project) {
    return c.json({ error: "Project not found", code: "NOT_FOUND" }, 404);
  }

  if (project.userId !== userId) {
    return c.json(
      { error: "Forbidden: You do not own this project", code: "FORBIDDEN" },
      403,
    );
  }

  await deleteProject(id);
  return c.json({ message: "Project deleted" });
};
