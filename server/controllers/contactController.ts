import type { Context } from "hono";
import { z } from "zod";
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from "../services/contactService";
import { getPhoneBookById } from "../services/phoneBookService";
import { getProjectById } from "../services/projectService";

// Validation schema
export const contactSchema = z.object({
  name: z.string().min(1, "Contact name is required"),
  email: z.email().optional(),
  phone: z.string().min(5, "Phone number is required"),
  address: z.string().optional(),
});

// Create
export const createContactHandler = async (c: Context) => {
  const { projectId, phoneBookId } = c.req.param();
  const parsed = contactSchema.safeParse(await c.req.json());
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

  const phoneBook = await getPhoneBookById(phoneBookId);
  if (!phoneBook || phoneBook.projectId !== projectId) {
    return c.json({ error: "PhoneBook not found", code: "NOT_FOUND" }, 404);
  }

  const contact = await createContact(phoneBookId, parsed.data);
  return c.json({ message: "Contact created", contact });
};

// List
export const getContactsHandler = async (c: Context) => {
  const { projectId, phoneBookId } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const phoneBook = await getPhoneBookById(phoneBookId);
  if (!phoneBook || phoneBook.projectId !== projectId) {
    return c.json({ error: "PhoneBook not found", code: "NOT_FOUND" }, 404);
  }

  const contacts = await getContacts(phoneBookId);
  return c.json({ message: "Contacts fetched", contacts });
};

// Get single
export const getContactHandler = async (c: Context) => {
  const { projectId, phoneBookId, id } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const phoneBook = await getPhoneBookById(phoneBookId);
  if (!phoneBook || phoneBook.projectId !== projectId) {
    return c.json({ error: "PhoneBook not found", code: "NOT_FOUND" }, 404);
  }

  const contact = await getContactById(id);
  if (!contact || contact.phoneBookId !== phoneBookId) {
    return c.json({ error: "Contact not found", code: "NOT_FOUND" }, 404);
  }

  return c.json({ message: "Contact fetched", contact });
};

// Update
export const updateContactHandler = async (c: Context) => {
  const { projectId, phoneBookId, id } = c.req.param();
  const parsed = contactSchema.partial().safeParse(await c.req.json());
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

  const phoneBook = await getPhoneBookById(phoneBookId);
  if (!phoneBook || phoneBook.projectId !== projectId) {
    return c.json({ error: "PhoneBook not found", code: "NOT_FOUND" }, 404);
  }

  const contact = await getContactById(id);
  if (!contact || contact.phoneBookId !== phoneBookId) {
    return c.json({ error: "Contact not found", code: "NOT_FOUND" }, 404);
  }

  const updated = await updateContact(id, parsed.data);
  return c.json({ message: "Contact updated", contact: updated });
};

// Delete
export const deleteContactHandler = async (c: Context) => {
  const { projectId, phoneBookId, id } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const phoneBook = await getPhoneBookById(phoneBookId);
  if (!phoneBook || phoneBook.projectId !== projectId) {
    return c.json({ error: "PhoneBook not found", code: "NOT_FOUND" }, 404);
  }

  const contact = await getContactById(id);
  if (!contact || contact.phoneBookId !== phoneBookId) {
    return c.json({ error: "Contact not found", code: "NOT_FOUND" }, 404);
  }

  await deleteContact(id);
  return c.json({ message: "Contact deleted" });
};
