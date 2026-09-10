import pool from "../database/db-connector.mjs";

// Register a new user in the DB
const registerUserModel = (username, email, hashedPassword) =>
  pool.query("SELECT register_user($1, $2, $3)", [
    username,
    email,
    hashedPassword,
  ]);

// Get the ID and password for the username from the DB
const getUserInfo = async (username) => {
  const { rows } = await pool.query("SELECT * FROM get_user_info($1)", [
    username,
  ]);
  return rows;
};

export { registerUserModel, getUserInfo };
