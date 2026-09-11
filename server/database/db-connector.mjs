import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  max: 10,
  connectionString: process.env.DATABASE_URL,
});

export default pool;
