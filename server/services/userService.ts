import type { z } from "zod";
import type { updateUserSchema } from "../controllers/userController";
import { prisma } from "../lib/prisma";
import { hashPassword, verifyPassword } from "../utils/hash";

export type UserUpdateDTO = z.infer<typeof updateUserSchema>;

export const getUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { projects: true },
  });
};

// Change user password
export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found");
  }

  const valid = await verifyPassword(currentPassword, user.password);
  if (!valid) {
    throw new Error("Invalid current password");
  }

  const hashed = await hashPassword(newPassword);

  // Run update + session invalidation in a transaction
  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    await tx.session.deleteMany({ where: { userId } });
  });

  return { success: true, message: "Password changed successfully" };
};

// Update user profile (name, phone, etc.)
export const updateUser = async (userId: string, data: UserUpdateDTO) => {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
};

// Delete user account
export const deleteUser = async (userId: string) => {
  await prisma.$transaction(async (tx) => {
    await tx.session.deleteMany({ where: { userId } });
    await tx.verificationToken.deleteMany({
      where: { userId },
    });
    await tx.user.delete({ where: { id: userId } });
  });
};
