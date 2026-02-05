import { createHash, randomUUID } from "node:crypto";

export const generateSessionToken = () => {
  const raw = randomUUID();
  const hash = createHash("sha256").update(raw).digest("hex");

  return {
    raw, // send to client
    hash, // store in DB
  };
};

export const hashToken = (token: string) => {
  return createHash("sha256").update(token).digest("hex");
};
