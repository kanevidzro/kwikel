import type { z } from "zod";
import type { phoneBookSchema } from "../controllers/phoneBookController";
import { prisma } from "../lib/prisma";

// DTO types derived from Zod
export type PhoneBookCreateDTO = z.infer<typeof phoneBookSchema>;
export type PhoneBookUpdateDTO = Partial<PhoneBookCreateDTO>;

export const createPhoneBook = async (
  projectId: string,
  data: PhoneBookCreateDTO,
) => {
  return prisma.phoneBook.create({
    data: { ...data, projectId },
  });
};

export const getPhoneBooks = async (projectId: string) => {
  return prisma.phoneBook.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });
};

export const getPhoneBookById = async (id: string) => {
  return prisma.phoneBook.findUnique({ where: { id } });
};

export const updatePhoneBook = async (id: string, data: PhoneBookUpdateDTO) => {
  return prisma.phoneBook.update({
    where: { id },
    data,
  });
};

export const deletePhoneBook = async (id: string) => {
  return prisma.phoneBook.delete({ where: { id } });
};
