// utils/apiKey.ts

import { prisma } from "../lib/prisma";
import { hashToken } from "./token";

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
