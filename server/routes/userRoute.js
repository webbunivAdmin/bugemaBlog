import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
  OPTVerification,
  followWritter,
  getWriter,
  resendOTP,
  updateUser,
  getUsers,
  approveUser,
  makeAdmin,
  makeWriter,
  suspendUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/verify/:userId/:otp", OPTVerification);
router.post("/resend-link/:id", resendOTP);

// user routes
router.post("/follower/:id", userAuth, followWritter);
router.get("/all" , userAuth, getUsers);
router.put("/update-user", userAuth, updateUser);

router.patch('/approve/:id', userAuth, approveUser);
router.patch('/suspend/:id', userAuth, suspendUser);
router.patch('/makeadmin/:id', userAuth, makeAdmin);
router.patch('/makewriter/:id', userAuth, makeWriter);
router.patch('/suspend/:id', userAuth, suspendUser);

router.get("/get-user/:id?", getWriter);

export default router;
