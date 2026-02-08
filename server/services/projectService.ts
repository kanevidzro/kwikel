import type { z } from "zod";
import type { ProjectSchema } from "../controllers/projectController";
import { prisma } from "../lib/prisma";

// DTO types derived from Zod
export type ProjectCreateDTO = z.infer<typeof ProjectSchema>;
export type ProjectUpdateDTO = Partial<ProjectCreateDTO>;

export const createProject = async (userId: string, data: ProjectCreateDTO) => {
  return prisma.project.create({
    data: { userId, ...data },
  });
};

export const getProjects = async (userId: string) => {
  return prisma.project.findMany({
    where: { userId },
    include: {
      smsMessages: true,
      otpMessages: true,
      senderIds: true,
      apiKeys: true,
      templates: true,
      campaigns: true,
      phoneBooks: true,
    },
  });
};

export const getProjectById = async (projectId: string) => {
  return prisma.project.findUnique({
    where: { id: projectId },
    include: { templates: true, campaigns: true },
  });
};

export const updateProject = async (
  projectId: string,
  data: ProjectUpdateDTO,
) => {
  return prisma.project.update({
    where: { id: projectId },
    data,
  });
};

export const deleteProject = async (projectId: string) => {
  return prisma.project.delete({ where: { id: projectId } });
};
