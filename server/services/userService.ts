import { prisma } from "../lib/prisma";
import { hashPassword, verifyPassword } from "../utils/hash";

export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user || !user.password) throw new Error("User not found");

    const valid = await verifyPassword(currentPassword, user.password);
    if (!valid) throw new Error("Current password is incorrect");

    if (newPassword.length < 8) throw new Error("Password too short");

    const hashed = await hashPassword(newPassword);

    await tx.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    // Force re-login
    await tx.session.deleteMany({ where: { userId } });

    return { message: "Password changed successfully" };
  });
};

// Update user profile (name, phone, etc.)
export const updateUser = async (
  userId: string,
  updates: { name?: string; phone?: string },
) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: updates,
  });
  const { password: _, ...safeUser } = user;
  return safeUser;
};

// Delete user account
export const deleteUser = async (userId: string) => {
  await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user) return;

    await tx.session.deleteMany({ where: { userId } });
    await tx.verificationToken.deleteMany({
      where: { identifier: user.email },
    });
    await tx.user.delete({ where: { id: userId } });
  });

  return { message: "User deleted successfully" };
};
