import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";

// Building a router for better management
const router = express.Router();

// auth routes
router.post("/signup" , signup)
router.post("/login" , login)
router.post("/logout" , logout)

export default router;
