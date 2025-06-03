import pool from "../database/db-connector.mjs";

// Register a new user in the DB
const registerUserModel = (username, email, hashedPassword) =>
  pool
    .promise()
    .query("CALL RegisterUser(?, ?, ?)", [username, email, hashedPassword]);

// Get the ID and password for the username from the DB
const getUserInfo = async (username) => {
  const [rows] = await pool.promise().query("CALL GetUserInfo(?)", [username]);
  return rows[0];
};

export { registerUserModel, getUserInfo };
