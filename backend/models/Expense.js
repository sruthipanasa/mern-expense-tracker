import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    category: String,
    amount: Number,
    date: {
      type: Date,
      default: Date.now,
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
