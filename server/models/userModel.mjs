import pool from "../database/db-connector.mjs";

const getStats = async (userId) => {
  const [rows] = await pool.promise().query("CALL GetUserStats(?)", [userId]);
  return rows[0];
};

export { getStats };
