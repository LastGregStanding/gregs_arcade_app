import pool from "../database/db-connector.mjs";

const getStats = async (gameTitle) => {
  const [rows] = await pool
    .promise()
    .query("CALL GetLeaderboardStats(?)", [gameTitle]);
  return rows[0];
};

export { getStats };
