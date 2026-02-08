import type { Context } from "hono";
import { z } from "zod";
import {
  createCampaign,
  deleteCampaign,
  getCampaignById,
  getCampaigns,
  updateCampaign,
} from "../services/campaignService";
import { getProjectById } from "../services/projectService";

// Validation schema
// controllers/campaignController.ts
export const campaignSchema = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
  description: z.string().optional(),
  scheduledAt: z.iso.datetime().optional(),
  status: z.enum(["DRAFT", "SCHEDULED", "CANCELLED", "SENT"]),
});

export const createCampaignHandler = async (c: Context) => {
  const { projectId } = c.req.param();
  const parsed = campaignSchema.safeParse(await c.req.json());
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

  const campaign = await createCampaign(projectId, parsed.data);
  return c.json({ message: "Campaign created", campaign });
};

export const getCampaignsHandler = async (c: Context) => {
  const { projectId } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const campaigns = await getCampaigns(projectId);
  return c.json({ message: "Campaigns fetched", campaigns });
};

export const getCampaignHandler = async (c: Context) => {
  const { projectId, id } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const campaign = await getCampaignById(id);
  if (!campaign) return c.json({ error: "Not found", code: "NOT_FOUND" }, 404);

  return c.json({ message: "Campaign fetched", campaign });
};

export const updateCampaignHandler = async (c: Context) => {
  const { projectId, id } = c.req.param();
  const parsed = campaignSchema.partial().safeParse(await c.req.json());
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

  const updated = await updateCampaign(id, parsed.data);
  return c.json({ message: "Campaign updated", campaign: updated });
};

export const deleteCampaignHandler = async (c: Context) => {
  const { projectId, id } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  await deleteCampaign(id);
  return c.json({ message: "Campaign deleted" });
};
