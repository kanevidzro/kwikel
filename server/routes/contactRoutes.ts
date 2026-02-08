import { Hono } from "hono";
import {
  createContactHandler,
  deleteContactHandler,
  getContactHandler,
  getContactsHandler,
  updateContactHandler,
} from "../controllers/contactController";
import { authMiddleware } from "../middleware/auth";

const contactRoutes = new Hono();

// Protect all contact routes
contactRoutes.use("/*", authMiddleware);

// Nested under /project/:projectId/phonebooks/:phoneBookId/contacts
contactRoutes.post(
  "/:projectId/phonebooks/:phoneBookId/contacts",
  createContactHandler,
);
contactRoutes.get(
  "/:projectId/phonebooks/:phoneBookId/contacts",
  getContactsHandler,
);
contactRoutes.get(
  "/:projectId/phonebooks/:phoneBookId/contacts/:id",
  getContactHandler,
);
contactRoutes.put(
  "/:projectId/phonebooks/:phoneBookId/contacts/:id",
  updateContactHandler,
);
contactRoutes.delete(
  "/:projectId/phonebooks/:phoneBookId/contacts/:id",
  deleteContactHandler,
);

export default contactRoutes;
