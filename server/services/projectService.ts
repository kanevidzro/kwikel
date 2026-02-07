import { randomBytes } from "node:crypto";
import { prisma } from "../lib/prisma";
import { hashToken } from "../utils/token";

export const createProject = async (userId: string, name: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  return prisma.project.create({ data: { name, userId } });
};

export const listProjects = async (userId: string) => {
  return prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getProjectById = async (projectId: string, userId: string) => {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
    include: {
      apiKeys: { where: { isActive: true } },
      senderIds: true,
    },
  });

  if (!project) throw new Error("Project not found");
  return project;
};

export const updateProject = async (
  projectId: string,
  userId: string,
  data: { name?: string },
) => {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });

  if (!project) throw new Error("Project not found or not owned by user");

  return prisma.project.update({ where: { id: projectId }, data });
};

export const deleteProject = async (projectId: string, userId: string) => {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });
  if (!project) throw new Error("Project not found or not owned by user");

  return prisma.project.delete({ where: { id: projectId } });
};

export const createApiKey = async (userId: string, projectId: string) => {
  // Validate project ownership
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
    select: { id: true },
  });
  if (!project) throw new Error("Project not found or not owned by user");

  // Generate a random token (raw API key)
  const rawToken = randomBytes(32).toString("hex"); // 64‑char hex string

  // Add Dugble prefix
  const prefixedToken = `dug-${rawToken}`;

  // Hash the full prefixed token for storage
  const keyHash = hashToken(prefixedToken);

  // Store only the hash
  const apiKey = await prisma.apiKey.create({
    data: { projectId, keyHash },
  });

  // Return the raw prefixed token once (user must save it)
  return { ...apiKey, token: prefixedToken };
};

export const deactivateApiKey = async (
  userId: string,
  projectId: string,
  apiKeyId: string,
) => {
  // Validate project ownership
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
    select: { id: true },
  });
  if (!project) throw new Error("Project not found or not owned by user");

  // Validate API key belongs to this project
  const apiKey = await prisma.apiKey.findFirst({
    where: { id: apiKeyId, projectId },
    select: { id: true, isActive: true },
  });
  if (!apiKey)
    throw new Error("API key not found or does not belong to project");
  if (!apiKey.isActive) throw new Error("API key is already deactivated");

  // Deactivate API key
  return prisma.apiKey.update({
    where: { id: apiKeyId },
    data: { isActive: false },
  });
};
