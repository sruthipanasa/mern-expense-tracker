import User from "../models/User.js";

export const setMonthlyBudget = async (req, res) => {
  try {
    const { monthlyBudget } = req.body;

    const user = await User.findById(req.user._id);
    user.monthlyBudget = monthlyBudget;
    user.budgetMonth = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;

    await user.save();

    res.json({
      message: "Budget updated",
      monthlyBudget: user.monthlyBudget,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
