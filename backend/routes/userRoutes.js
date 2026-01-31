import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { setMonthlyBudget } from "../controllers/userController.js";

const router = express.Router();

/* ================= USER PROFILE ================= */
// GET logged-in user
router.get("/profile", authMiddleware, (req, res) => {
  res.json(req.user);
});

/* ================= MONTHLY BUDGET ================= */
// Set / update monthly budget
router.put("/budget", authMiddleware, setMonthlyBudget);

export default router;
