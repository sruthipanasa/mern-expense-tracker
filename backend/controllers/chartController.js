import Expense from "../models/Expense.js";

/* ================= MONTHLY LINE CHART ================= */
// Output example:
// [{ month: "Jan", total: 1200 }, { month: "Feb", total: 3000 }]

export const getMonthlyExpenses = async (req, res) => {
  try {
    const userId = req.user._id;

    const data = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const formatted = data.map((item) => ({
      month: monthNames[item._id - 1],
      total: item.total,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Failed to load chart data" });
  }
};

/* ================= CATEGORY PIE / BAR ================= */
// Output example:
// [{ category: "Food", total: 5000 }, { category: "Travel", total: 2000 }]

export const getCategoryExpenses = async (req, res) => {
  try {
    const userId = req.user._id;

    const data = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const formatted = data.map((item) => ({
      category: item._id,
      total: item.total,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Failed to load chart data" });
  }
};
