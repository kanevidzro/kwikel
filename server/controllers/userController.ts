import type { Context } from "hono";
import {
  changePassword,
  deleteUser,
  updateUser,
} from "../services/userService";

// Change password
export const changePasswordHandler = async (c: Context) => {
  try {
    const { currentPassword, newPassword } = await c.req.json();
    const user = c.get("user"); // from authMiddleware
    const result = await changePassword(user.id, currentPassword, newPassword);
    return c.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ error: message }, 400);
  }
};

// Update user profile
export const updateUserHandler = async (c: Context) => {
  try {
    const updates = await c.req.json();
    const user = c.get("user");
    const updated = await updateUser(user.id, updates);
    return c.json({ message: "User updated", user: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ error: message }, 400);
  }
};

// Delete user
export const deleteUserHandler = async (c: Context) => {
  try {
    const user = c.get("user");
    await deleteUser(user.id);
    return c.json({ message: "User deleted" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return c.json({ error: message }, 400);
  }
};
