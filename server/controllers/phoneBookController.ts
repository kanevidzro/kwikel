import type { Context } from "hono";
import { z } from "zod";
import {
  createPhoneBook,
  deletePhoneBook,
  getPhoneBookById,
  getPhoneBooks,
  updatePhoneBook,
} from "../services/phoneBookService";
import { getProjectById } from "../services/projectService";

export const phoneBookSchema = z.object({
  name: z.string().min(1, "PhoneBook name is required"),
  description: z.string().optional(),
});

// Create
export const createPhoneBookHandler = async (c: Context) => {
  const { projectId } = c.req.param();
  const parsed = phoneBookSchema.safeParse(await c.req.json());
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

  const phoneBook = await createPhoneBook(projectId, parsed.data);
  return c.json({ message: "PhoneBook created", phoneBook });
};

// List
export const getPhoneBooksHandler = async (c: Context) => {
  const { projectId } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const phoneBooks = await getPhoneBooks(projectId);
  return c.json({ message: "PhoneBooks fetched", phoneBooks });
};

// Get single
export const getPhoneBookHandler = async (c: Context) => {
  const { projectId, id } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const phoneBook = await getPhoneBookById(id);
  if (!phoneBook) {
    return c.json({ error: "PhoneBook not found", code: "NOT_FOUND" }, 404);
  }

  return c.json({ message: "PhoneBook fetched", phoneBook });
};

// Update
export const updatePhoneBookHandler = async (c: Context) => {
  const { projectId, id } = c.req.param();
  const parsed = phoneBookSchema.partial().safeParse(await c.req.json());
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

  const phoneBook = await getPhoneBookById(id);
  if (!phoneBook) {
    return c.json({ error: "PhoneBook not found", code: "NOT_FOUND" }, 404);
  }

  const updated = await updatePhoneBook(id, parsed.data);
  return c.json({ message: "PhoneBook updated", phoneBook: updated });
};

// Delete
export const deletePhoneBookHandler = async (c: Context) => {
  const { projectId, id } = c.req.param();
  const userId = c.get("userId");

  const project = await getProjectById(projectId);
  if (!project || project.userId !== userId) {
    return c.json({ error: "Forbidden", code: "FORBIDDEN" }, 403);
  }

  const phoneBook = await getPhoneBookById(id);
  if (!phoneBook) {
    return c.json({ error: "PhoneBook not found", code: "NOT_FOUND" }, 404);
  }

  await deletePhoneBook(id);
  return c.json({ message: "PhoneBook deleted" });
};
