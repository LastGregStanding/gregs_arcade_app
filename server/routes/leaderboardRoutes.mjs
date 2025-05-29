import express from "express";
import { getLeaderboardStats } from "../controllers/leaderboardController.mjs";
const router = express.Router();

router.get("/:game", getLeaderboardStats);

export default router;
