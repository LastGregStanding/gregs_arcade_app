import { getStats } from "../models/userModel.mjs";
import jwt from "jsonwebtoken";

const userStats = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const stats = await getStats(userId);
    res.json(stats);
  } catch (err) {
    console.error("Failed to get user stats:", err);
    res.status(500).json({ message: "Failed to retrieve stats" });
  }
};

export { userStats };
