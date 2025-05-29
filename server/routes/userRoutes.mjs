import express from "express";
import { userStats } from "../controllers/userController.mjs";

const router = express.Router();

router.get("/stats", userStats);

export default router;
