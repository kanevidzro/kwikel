import type { Context } from "hono";
import {
  activateApiKey,
  createApiKey,
  deactivateApiKey,
  deleteApiKey,
  getApiKeys,
} from "../services/apiKeyService";

// Create new API key
export const createApiKeyHandler = async (c: Context) => {
  const { projectId } = await c.req.json();
  const { rawKey, ...apiKey } = await createApiKey(projectId);
  return c.json({
    message: "API key created",
    apiKey,
    rawKey, // show once
  });
};

// Get all API keys for a project
export const getApiKeysHandler = async (c: Context) => {
  const { projectId } = c.req.param();
  const keys = await getApiKeys(projectId);
  return c.json({ apiKeys: keys });
};

// Deactivate API key
export const deactivateApiKeyHandler = async (c: Context) => {
  const { id } = c.req.param();
  const key = await deactivateApiKey(id);
  return c.json({ message: "API key deactivated", apiKey: key });
};

// Activate API key
export const activateApiKeyHandler = async (c: Context) => {
  const { id } = c.req.param();
  const key = await activateApiKey(id);
  return c.json({ message: "API key activated", apiKey: key });
};

// Delete API key
export const deleteApiKeyHandler = async (c: Context) => {
  const { id } = c.req.param();
  await deleteApiKey(id);
  return c.json({ message: "API key deleted" });
};
