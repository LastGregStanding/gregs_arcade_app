import express from "express";
import {
  registerUser,
  loginUser,
  authenticateUser,
  logoutUser,
} from "../controllers/authController.mjs";
import authenticateJWT from "../middlewares/authenticateJWT.mjs";
const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authenticateJWT, authenticateUser);

export default router;
