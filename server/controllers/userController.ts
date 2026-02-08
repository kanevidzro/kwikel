import type { Context } from "hono";
import { z } from "zod";
import {
  changePassword,
  deleteUser,
  getUserById,
  updateUser,
} from "../services/userService";

// Validation schemas
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
  const userId = c.get("userId");
  const user = await getUserById(userId);

  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ user });
};

// Change password
export const changePasswordHandler = async (c: Context) => {
  try {
    const { currentPassword, newPassword } = changePasswordSchema.parse(
      await c.req.json(),
    );
    const userId = c.get("userId");

    await changePassword(userId, currentPassword, newPassword);
    return c.json({ success: true, message: "Password changed successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 400);
  }
};

// Update user profile
export const updateUserHandler = async (c: Context) => {
  const parsed = updateUserSchema.partial().safeParse(await c.req.json());
  const userId = c.get("userId");

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
  const updated = await updateUser(userId, parsed.data);
  return c.json({ success: true, message: "User updated", data: updated });
};

// Delete user
export const deleteUserHandler = async (c: Context) => {
  const userId = c.get("userId");

  await deleteUser(userId);
  return c.json({ success: true, message: "User deleted" });
};
