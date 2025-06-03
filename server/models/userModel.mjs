import pool from "../database/db-connector.mjs";

// Get the play count, highscore and highscore date
// from each game for that user by their ID
const getTableStats = async (userId) => {
  const [rows] = await pool
    .promise()
    .query("CALL GetUserTableStats(?)", [userId]);
  return rows[0];
};

// Get the play count, highscore, and highscore date
// of the specific game the user is playing
const getGameStats = async (userId, gameName) => {
  const [rows] = await pool
    .promise()
    .query("CALL GetUserGameStats(?, ?)", [userId, gameName]);
  return rows[0];
};

// Update a new highscore for the user
const updateHighScore = async (userId, gameName, highScore, playCount) => {
  const [rows] = await pool
    .promise()
    .query("CALL UpdateHighScore(?,?,?,?)", [
      userId,
      gameName,
      highScore,
      playCount,
    ]);
  return { message: "High score updated" };
};

export { getTableStats, getGameStats, updateHighScore };
