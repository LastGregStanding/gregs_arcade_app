import express from "express";
import {
  userTableStats,
  userGameStats,
  userNewHighScore,
} from "../controllers/userController.mjs";

const router = express.Router();

// User personal stats table
router.get("/table-stats", userTableStats);

// User stats for the game they are playing
router.get("/game-stats", userGameStats);

// User got a new high score
router.post("/new-highscore", userNewHighScore);

export default router;
