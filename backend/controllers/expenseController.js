import Expense from "../models/Expense.js";
import User from "../models/User.js";

/* ================= HELPER ================= */
// Current month date range
const getMonthRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  return { start, end };
};

/* ================= GET EXPENSES ================= */
/* Fetch ONLY current month expenses (NO DELETE EVER) */
export const getExpenses = async (req, res) => {
  try {
    const { start, end } = getMonthRange();

    // Ensure user exists
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize budgetMonth once (optional feature)
    if (!user.budgetMonth) {
      const now = new Date();
      user.budgetMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;
      await user.save();
    }

    const expenses = await Expense.find({
      user: req.user._id,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Get Expenses Error:", error.message);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};

/* ================= ADD EXPENSE ================= */
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    // ✅ Proper validation
    if (!title || amount === undefined || !category) {
      return res.status(400).json({
        message: "Title, amount, and category are required",
      });
    }

    const expense = new Expense({
      title,
      amount,
      category,
      date: date ? new Date(date) : new Date(),
      user: req.user._id,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error("Add Expense Error:", error.message);
    res.status(500).json({ message: "Failed to add expense" });
  }
};

/* ================= UPDATE EXPENSE ================= */
export const updateExpense = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data to update" });
    }

    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error("Update Expense Error:", error.message);
    res.status(500).json({ message: "Failed to update expense" });
  }
};

/* ================= DELETE EXPENSE ================= */
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Delete Expense Error:", error.message);
    res.status(500).json({ message: "Failed to delete expense" });
  }
};
/* ================= GET EXPENSE BY ID ================= */
export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error("Get Expense By ID Error:", error.message);
    res.status(500).json({ message: "Failed to load expense" });
  }
};

