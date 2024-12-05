import express from "express";
import { login } from "../controllers/authControllers.js"
import { logout } from "../controllers/authControllers.js";
import { signup } from "../controllers/authControllers.js"
import { updateProfile } from "../controllers/authControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { checkAuth } from "../controllers/authControllers.js";

const router = express.Router()

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.put("/update-profile", protectRoute, updateProfile)

router.get("/check", protectRoute, checkAuth)

export default router;