import { prisma } from "../lib/prisma";
import { hashToken } from "./token";

/**
 * Validate an API key string (including prefix, e.g. dug-xxxx).
 * Returns the apiKey record with project if valid, otherwise null.
 */
export const validateApiKey = async (token: string) => {
  const hashedKey = hashToken(token);

  const keyRecord = await prisma.apiKey.findUnique({
    where: { keyHash: hashedKey },
    include: { project: true },
  });

  if (!keyRecord || !keyRecord.isActive) {
    return null;
  }

  return keyRecord;
};
