import type { Context } from "hono";
import { z } from "zod";
import { getProjectById } from "../services/projectService";
import {
  createTemplate,
  deleteTemplate,
  getTemplateById,
  getTemplates,
  updateTemplate,
} from "../services/templateService";

export const templateSchema = z.object({
  name: z.string().min(1, "Template name is required"),
  content: z.string().min(1, "Template content is required"),
  category: z.string().optional(),
});

// Create
export const createTemplateHandler = async (c: Context) => {
  const { projectId } = c.req.param();
  const parsed = templateSchema.safeParse(await c.req.json());
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
  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const template = await createTemplate(projectId, parsed.data);
  return c.json({ message: "Template created", template });
};

// List
export const getTemplatesHandler = async (c: Context) => {
  const { projectId } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const templates = await getTemplates(projectId);
  return c.json({ message: "Templates fetched", templates });
};

// Get single
export const getTemplateHandler = async (c: Context) => {
  const { projectId, id } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const template = await getTemplateById(id);
  if (!template) {
    return c.json({ error: "Template not found", code: "NOT_FOUND" }, 404);
  }

  return c.json({ message: "Template fetched", template });
};

// Update
export const updateTemplateHandler = async (c: Context) => {
  const { projectId, id } = c.req.param();
  const parsed = templateSchema.partial().safeParse(await c.req.json());
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
  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const template = await getTemplateById(id);
  if (!template) {
    return c.json({ error: "Template not found", code: "NOT_FOUND" }, 404);
  }

  const updated = await updateTemplate(id, parsed.data);
  return c.json({ message: "Template updated", template: updated });
};

// Delete
export const deleteTemplateHandler = async (c: Context) => {
  const { projectId, id } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const template = await getTemplateById(id);
  if (!template) {
    return c.json({ error: "Template not found", code: "NOT_FOUND" }, 404);
  }

  await deleteTemplate(id);
  return c.json({ message: "Template deleted" });
};
