import { protectRoute } from "../middleware/authMiddleware.js";
import { getUsersForSidebar } from "../controllers/messageControllers.js";
import { getMessages } from "../controllers/messageControllers.js";
import { sendMessage } from "../controllers/messageControllers.js";
import express from "express";
const router = express.Router();

router.get("/users",protectRoute, getUsersForSidebar)

router.get("/:id",protectRoute,getMessages)

router.post("/send/:id", protectRoute , sendMessage )

export default router;