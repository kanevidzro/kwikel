import { Hono } from "hono";
import {
  activateApiKeyHandler,
  createApiKeyHandler,
  deactivateApiKeyHandler,
  deleteApiKeyHandler,
  getApiKeysHandler,
} from "../controllers/apiKeyController";
import { authMiddleware } from "../middleware/auth";

const apiKeyRoutes = new Hono();

// Protect all API key routes with user auth
apiKeyRoutes.use("/*", authMiddleware);

// Create new API key for a project
apiKeyRoutes.post("/:projectId/apikey", createApiKeyHandler);

// List all API keys for a project
apiKeyRoutes.get("/:projectId/apikey", getApiKeysHandler);

// Deactivate API key
apiKeyRoutes.put("/:projectId/apikey/:id/deactivate", deactivateApiKeyHandler);

// Activate API key
apiKeyRoutes.put("/:projectId/apikey/:id/activate", activateApiKeyHandler);

// Delete API key
apiKeyRoutes.delete("/:projectId/apikey/:id", deleteApiKeyHandler);

export default apiKeyRoutes;
