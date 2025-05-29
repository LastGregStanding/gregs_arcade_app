import { getStats } from "../models/leaderboardModel.mjs";

const getLeaderboardStats = async (req, res) => {
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
