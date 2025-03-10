import express from "express";
import {
  googleSignUp,
  login,
  register,
  forgotPassword, 
  resetPassword
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/google-signup", googleSignUp);
router.post("/login", login);

// Forgot Password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
