import express from "express";
import { login, logout, signup, updateProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

// Building a router for better management
const router = express.Router();

// auth routes
router.post("/signup" , signup)
router.post("/login" , login)
router.post("/logout" , logout)

router.post("./update-profile" , protectRoute , updateProfile)

export default router;
