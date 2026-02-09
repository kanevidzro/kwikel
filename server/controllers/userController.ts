import type { Context } from "hono";
import { z } from "zod";
import {
  changePassword,
  deleteUser,
  getUserById,
  updateUser,
} from "../services/userService";

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/)
    .optional(),
});

export const getUserHandler = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const user = await getUserById(userId);
    if (!user) return c.json({ success: false, error: "User not found" }, 404);
    return c.json({ success: true, user });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 400);
  }
};

export const changePasswordHandler = async (c: Context) => {
  const parsed = changePasswordSchema.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json(
      {
        success: false,
        error: "Invalid input",
        details: parsed.error.format(),
      },
      400,
    );
  }
  try {
    const userId = c.get("userId");
    await changePassword(
      userId,
      parsed.data.currentPassword,
      parsed.data.newPassword,
    );
    return c.json({ success: true, message: "Password changed successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 400);
  }
};

export const updateUserHandler = async (c: Context) => {
  const parsed = updateUserSchema.partial().safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json(
      {
        success: false,
        error: "Invalid input",
        details: parsed.error.format(),
      },
      400,
    );
  }
  try {
    const userId = c.get("userId");
    const updated = await updateUser(userId, parsed.data);
    return c.json({ success: true, message: "User updated", data: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 400);
  }
};

export const deleteUserHandler = async (c: Context) => {
  try {
    const userId = c.get("userId");
    await deleteUser(userId);
    return c.json({ success: true, message: "User deleted" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 400);
  }
};
