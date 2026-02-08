import type { z } from "zod";
import type { campaignSchema } from "../controllers/campaignController";
import { prisma } from "../lib/prisma";

// DTO types derived from Zod
export type CampaignCreateDTO = z.infer<typeof campaignSchema>;
export type CampaignUpdateDTO = Partial<CampaignCreateDTO>;

export const createCampaign = async (
  projectId: string,
  data: CampaignCreateDTO,
) => {
  return prisma.campaign.create({
    data: { ...data, projectId },
  });
};

export const getCampaigns = async (projectId: string) => {
  return prisma.campaign.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });
};

export const getCampaignById = async (id: string) => {
  return prisma.campaign.findUnique({ where: { id } });
};

export const updateCampaign = async (id: string, data: CampaignUpdateDTO) => {
  return prisma.campaign.update({
    where: { id },
    data,
  });
};

export const deleteCampaign = async (id: string) => {
  return prisma.campaign.delete({ where: { id } });
};
