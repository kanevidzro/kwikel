import { Hono } from "hono";
import {
  createCampaignHandler,
  deleteCampaignHandler,
  getCampaignHandler,
  getCampaignsHandler,
  updateCampaignHandler,
} from "../controllers/campaignController";
import { authMiddleware } from "../middleware/auth";

const campaignRoutes = new Hono();

campaignRoutes.use("/*", authMiddleware);

campaignRoutes.post("/:projectId/campaigns", createCampaignHandler);
campaignRoutes.get("/:projectId/campaigns", getCampaignsHandler);
campaignRoutes.get("/:projectId/campaigns/:id", getCampaignHandler);
campaignRoutes.put("/:projectId/campaigns/:id", updateCampaignHandler);
campaignRoutes.delete("/:projectId/campaigns/:id", deleteCampaignHandler);

export default campaignRoutes;
