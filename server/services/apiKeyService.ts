import { randomUUID } from "node:crypto";
import { prisma } from "../lib/prisma";
import { hashToken } from "../utils/token";

// Create a new API key for a project
export const createApiKey = async (projectId: string) => {
  const rawKey = randomUUID(); // raw key returned to user
  const keyHash = hashToken(rawKey);

  const apiKey = await prisma.apiKey.create({
    data: { projectId, keyHash },
  });

  return { ...apiKey, rawKey }; // return raw key once
};

// Get all API keys for a project
export const getApiKeys = async (projectId: string) => {
  return prisma.apiKey.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });
};

// Deactivate an API key
export const deactivateApiKey = async (id: string) => {
  return prisma.apiKey.update({
    where: { id },
    data: { isActive: false },
  });
};

// Reactivate an API key
export const activateApiKey = async (id: string) => {
  return prisma.apiKey.update({
    where: { id },
    data: { isActive: true },
  });
};

// Delete an API key
export const deleteApiKey = async (id: string) => {
  return prisma.apiKey.delete({ where: { id } });
};

// Verify an API key (for middleware)
export const verifyApiKey = async (rawKey: string) => {
  const keyHash = hashToken(rawKey);
  return prisma.apiKey.findUnique({
    where: { keyHash },
    include: { project: true },
  });
};
