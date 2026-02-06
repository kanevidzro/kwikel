import type { Context } from "hono";
import { z } from "zod";
import {
  changePassword,
  deleteUser,
  updateUser,
} from "../services/userService";

// Validation schemas
const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8),
});

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/)
    .optional(),
});

// Change password
export const changePasswordHandler = async (c: Context) => {
  try {
    const { currentPassword, newPassword } = changePasswordSchema.parse(
      await c.req.json(),
    );
    const user = c.get("user") as { id: string };

    const result = await changePassword(user.id, currentPassword, newPassword);
    return c.json({ success: true, ...result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 400);
  }
};

// Update user profile
export const updateUserHandler = async (c: Context) => {
  try {
    const updates = updateUserSchema.parse(await c.req.json());
    const user = c.get("user") as { id: string };

    const updated = await updateUser(user.id, updates);
    return c.json({ success: true, message: "User updated", data: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 400);
  }
};

// Delete user
export const deleteUserHandler = async (c: Context) => {
  try {
    const user = c.get("user") as { id: string };

    await deleteUser(user.id);
    return c.json({ success: true, message: "User deleted" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ success: false, error: message }, 500);
  }
};
