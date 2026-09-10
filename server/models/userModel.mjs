import pool from "../database/db-connector.mjs";

// Get the play count, highscore and highscore date
// from each game for that user by their ID
const getTableStats = async (userId) => {
  const { rows } = await pool.query(
    "SELECT * FROM get_user_table_stats($1)",
    [userId]
  );
  return rows;
};

// Get the play count, highscore, and highscore date
// of the specific game the user is playing
const getGameStats = async (userId, gameName) => {
  const { rows } = await pool.query(
    "SELECT * FROM get_user_game_stats($1, $2)",
    [userId, gameName]
  );
  return rows;
};

// Update a new highscore for the user
const updateHighScore = async (userId, gameName, highScore, playCount) => {
  await pool.query("SELECT update_high_score($1, $2, $3, $4)", [
    userId,
    gameName,
    highScore,
    playCount,
  ]);
  return { message: "High score updated" };
};

export { getTableStats, getGameStats, updateHighScore };
