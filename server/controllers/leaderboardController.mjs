import { getStats } from "../models/leaderboardModel.mjs";

// Get the stats for the universal leaderboard
const getLeaderboardStats = async (req, res) => {
  // Retrive the name of the game
  const gameTitle = req.params.game;
  try {
    const leaderboardStats = await getStats(gameTitle);
    res.json(leaderboardStats);
  } catch (error) {
    console.log("Error retrieving leaderboard stats:", error);
    res.status(500).json({ error: "Database error." });
  }
};

export { getLeaderboardStats };
