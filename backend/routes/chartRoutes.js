import express from "express";
import {
  getMonthlyExpenses,
  getCategoryExpenses,
} from "../controllers/chartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Line chart
router.get("/monthly", authMiddleware, getMonthlyExpenses);

// Pie / Bar chart
router.get("/category", authMiddleware, getCategoryExpenses);
export default router;
