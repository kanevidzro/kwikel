import type { z } from "zod";
import type { contactSchema } from "../controllers/contactController";
import { prisma } from "../lib/prisma";

// DTO types derived from Zod
export type ContactCreateDTO = z.infer<typeof contactSchema>;
export type ContactUpdateDTO = Partial<ContactCreateDTO>;

// Create a new contact in a phonebook
export const createContact = async (
  phoneBookId: string,
  data: ContactCreateDTO,
) => {
  return prisma.contact.create({
    data: {
      ...data,
      phoneBookId,
    },
  });
};

// Get all contacts in a phonebook
export const getContacts = async (phoneBookId: string) => {
  return prisma.contact.findMany({
    where: { phoneBookId },
    orderBy: { createdAt: "desc" },
  });
};

// Get a single contact by ID
export const getContactById = async (id: string) => {
  return prisma.contact.findUnique({
    where: { id },
  });
};

// Update a contact
export const updateContact = async (id: string, data: ContactUpdateDTO) => {
  return prisma.contact.update({
    where: { id },
    data,
  });
};

// Delete a contact
export const deleteContact = async (id: string) => {
  return prisma.contact.delete({
    where: { id },
  });
};
