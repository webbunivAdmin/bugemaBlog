import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { getAdminStats, getWriterStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/admin-stats", userAuth, getAdminStats);
router.get("/writer-stats/:id", userAuth, getWriterStats);

export default router;