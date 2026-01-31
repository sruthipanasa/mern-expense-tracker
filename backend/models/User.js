import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ✅ Monthly Budget
    monthlyBudget: {
      type: Number,
      default: 0,
    },

    // ✅ Track current budget month (YYYY-MM)
    budgetMonth: {
      type: String,
    },
  },
  { timestamps: true }
);

// ✅ FIXED PASSWORD HASHING (NO next PARAMETER)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// ✅ Compare password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
