import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { getAdminStats, getWriterStats } from "../controllers/dashboardController.js";
import { getRecentComments } from "../controllers/commentController.js";

const router = express.Router();

router.get("/admin-stats", userAuth, getAdminStats);
router.get("/writer-stats/:id", userAuth, getWriterStats);
router.get("/recent-comments", userAuth, getRecentComments);

export default router;