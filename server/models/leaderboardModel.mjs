import pool from "../database/db-connector.mjs";

// Get the top 10 highscores from the specific game
// along with the username and the date of the score
const getStats = async (gameTitle) => {
  const { rows } = await pool.query(
    "SELECT * FROM get_leaderboard_stats($1)",
    [gameTitle]
  );
  return rows;
};

export { getStats };
