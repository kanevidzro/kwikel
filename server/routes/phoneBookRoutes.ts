import { Hono } from "hono";
import {
  createPhoneBookHandler,
  deletePhoneBookHandler,
  getPhoneBookHandler,
  getPhoneBooksHandler,
  updatePhoneBookHandler,
} from "../controllers/phoneBookController";
import { authMiddleware } from "../middleware/auth";

const phoneBookRoutes = new Hono();

phoneBookRoutes.use("/*", authMiddleware);

phoneBookRoutes.post("/:projectId/phonebooks", createPhoneBookHandler);
phoneBookRoutes.get("/:projectId/phonebooks", getPhoneBooksHandler);
phoneBookRoutes.get("/:projectId/phonebooks/:id", getPhoneBookHandler);
phoneBookRoutes.put("/:projectId/phonebooks/:id", updatePhoneBookHandler);
phoneBookRoutes.delete("/:projectId/phonebooks/:id", deletePhoneBookHandler);

export default phoneBookRoutes;
