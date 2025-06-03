import express from "express";
import { getLeaderboardStats } from "../controllers/leaderboardController.mjs";
const router = express.Router();

// Universal leaderboard stats
router.get("/:game", getLeaderboardStats);

export default router;
