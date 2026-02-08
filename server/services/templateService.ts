import type { z } from "zod";
import type { templateSchema } from "../controllers/templateController";
import { prisma } from "../lib/prisma";

// DTO types derived from Zod
export type TemplateCreateDTO = z.infer<typeof templateSchema>;
export type TemplateUpdateDTO = Partial<TemplateCreateDTO>;

export const createTemplate = async (
  projectId: string,
  data: TemplateCreateDTO,
) => {
  return prisma.template.create({
    data: { ...data, projectId },
  });
};

export const getTemplates = async (projectId: string) => {
  return prisma.template.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });
};

export const getTemplateById = async (id: string) => {
  return prisma.template.findUnique({ where: { id } });
};

export const updateTemplate = async (id: string, data: TemplateUpdateDTO) => {
  return prisma.template.update({
    where: { id },
    data,
  });
};

export const deleteTemplate = async (id: string) => {
  return prisma.template.delete({ where: { id } });
};
