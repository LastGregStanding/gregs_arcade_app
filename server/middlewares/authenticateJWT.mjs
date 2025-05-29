import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
  // Check if the token is in the cookies
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied, no token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

export default authenticateJWT;
