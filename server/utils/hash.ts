export const hashPassword = async (password: string): Promise<string> => {
  return Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 65536, // 64 MB
    timeCost: 3,
  });
};

export const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await Bun.password.verify(password, hash);
};
