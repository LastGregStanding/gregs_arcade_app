import pool from "../database/db-connector.mjs";

// Get the top 10 highscores from the specific game
// along with the username and the date of the score
const getStats = async (gameTitle) => {
  const [rows] = await pool
    .promise()
    .query("CALL GetLeaderboardStats(?)", [gameTitle]);
  return rows[0];
};

export { getStats };
