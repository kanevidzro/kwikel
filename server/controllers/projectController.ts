import type { Context } from "hono";
import { z } from "zod";
import {
  createApiKey,
  createProject,
  deactivateApiKey,
  deleteProject,
  getProjectById,
  listProjects,
  updateProject,
} from "../services/projectService";

// Validation schemas
const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
});

const updateProjectSchema = z.object({
  name: z.string().trim().min(1).optional(),
});

const deactivateApiKeySchema = z.object({
  projectId: z.string().uuid(),
  apiKeyId: z.string().uuid(),
});

const projectIdParamSchema = z.object({
  id: z.string().uuid(),
});

// Handlers

export const createProjectHandler = async (c: Context) => {
  try {
    const user = c.get("user");
    const { name } = createProjectSchema.parse(await c.req.json());

    const project = await createProject(user.id, name);
    return c.json({ success: true, message: "Project created", data: project });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 400);
  }
};

export const listProjectsHandler = async (c: Context) => {
  try {
    const user = c.get("user");
    const projects = await listProjects(user.id);
    return c.json({ success: true, data: projects });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 400);
  }
};

export const getProjectHandler = async (c: Context) => {
  try {
    const user = c.get("user");
    const { id: projectId } = projectIdParamSchema.parse(c.req.param());

    const project = await getProjectById(projectId, user.id);
    return c.json({ success: true, data: project });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 404);
  }
};

export const updateProjectHandler = async (c: Context) => {
  try {
    const user = c.get("user");
    const projectId = c.req.param("id");
    const updates = updateProjectSchema.parse(await c.req.json());

    const project = await updateProject(projectId, user.id, updates);
    return c.json({ success: true, message: "Project updated", data: project });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 400);
  }
};

export const deleteProjectHandler = async (c: Context) => {
  try {
    const user = c.get("user");
    const projectId = c.req.param("id");

    await deleteProject(projectId, user.id);
    return c.json({ success: true, message: "Project deleted" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 400);
  }
};

export const createApiKeyHandler = async (c: Context) => {
  try {
    const user = c.get("user");
    const { projectId } = z
      .object({ projectId: z.uuid() })
      .parse(await c.req.json());

    const apiKey = await createApiKey(user.id, projectId);

    // Return raw token once
    return c.json({
      success: true,
      message: "API key created",
      data: {
        id: apiKey.id,
        projectId: apiKey.projectId,
        token: apiKey.token, // raw token, only shown once
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 400);
  }
};

export const deactivateApiKeyHandler = async (c: Context) => {
  try {
    const user = c.get("user");
    const { projectId, apiKeyId } = deactivateApiKeySchema.parse(
      await c.req.json(),
    );

    const apiKey = await deactivateApiKey(user.id, projectId, apiKeyId);
    return c.json({
      success: true,
      message: "API key deactivated",
      data: apiKey,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 400);
  }
};
