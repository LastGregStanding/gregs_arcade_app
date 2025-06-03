import {
  getTableStats,
  getGameStats,
  updateHighScore,
} from "../models/userModel.mjs";
import jwt from "jsonwebtoken";

// Get all the stats for a specific user
// to fill up their stats table
const userTableStats = async (req, res) => {
  try {
    // Retrieve the token
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    // Decocode the token to view its data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Retrieve the stats
    const stats = await getTableStats(userId);
    res.json(stats);
  } catch (err) {
    console.error("Failed to get user stats:", err);
    res.status(500).json({ message: "Failed to retrieve stats" });
  }
};

// Get the stats of the specific game the user is playing
const userGameStats = async (req, res) => {
  try {
    // Retrieve the token
    const token = req.cookies.token;

    /*
    The game query is <gamename>-name
    For example "pacman-game"
    I need to grab only the first part of that query
    So it needs to be just "pacman" instead of "pacman-game"
    */
    const gameNameParam = req.query.gameName;
    const gameName = gameNameParam.split("-")[0];

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    // Decocode the token to view its data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const stats = await getGameStats(userId, gameName);
    res.json(stats);
  } catch (err) {
    console.error("Failed to get user stats:", err);
    res.status(500).json({ message: "Failed to retrieve stats" });
  }
};

// Update with the new user highscore
const userNewHighScore = async (req, res) => {
  try {
    // Retrieve the token
    const token = req.cookies.token;

    /*
    The game query is <gamename>-name
    For example "pacman-game"
    I need to grab only the first part of that query
    So it needs to be just "pacman" instead of "pacman-game"
    */

    const gameNameParam = req.query.gameName;
    const gameName = gameNameParam.split("-")[0];
    const highScore = req.body.score;
    const playCount = req.body.playCount + 1;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    // Decocode the token to view its data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    // Update with the new highscore
    const stats = await updateHighScore(userId, gameName, highScore, playCount);
    res.json(stats);
  } catch (err) {
    console.error("Failed to get user stats:", err);
    res.status(500).json({ message: "Failed to retrieve stats" });
  }
};

export { userTableStats, userGameStats, userNewHighScore };
