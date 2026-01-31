import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWallet, FaArrowLeft } from "react-icons/fa";
import { authFetch } from "../utils/api";

export default function SetBudget() {
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await authFetch("/users/budget", {
        method: "PUT",
        body: JSON.stringify({ monthlyBudget: budget }),
      });

      alert("Budget updated successfully");
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center px-8 py-4 bg-white shadow-md"
      >
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-2 rounded-full">
            <FaWallet size={30} />
          </div>
          <h1 className="text-4xl font-bold text-indigo-600">
            Expense Tracker
          </h1>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-indigo-600 font-semibold hover:underline"
        >
          <FaArrowLeft /> Back
        </button>
      </motion.nav>

      {/* ================= PAGE CONTENT ================= */}
      <div className="flex items-center justify-center px-4 py-10">

        {/* ================= CARD ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
        >

          {/* ================= LOGO ================= */}
          <motion.div
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-4"
          >
            <div className="bg-indigo-600 text-white p-4 rounded-full shadow-lg">
              <FaWallet size={32} />
            </div>
          </motion.div>

          {/* ================= TITLE ================= */}
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Set Monthly Budget
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Take control of your monthly spending
          </p>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSave}>
            <motion.input
              whileFocus={{ scale: 1.03 }}
              type="number"
              required
              placeholder="Enter monthly budget (₹)"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow"
            >
              Save Budget
            </motion.button>
          </form>

          {/* ================= FOOTER ================= */}
          <p className="text-center text-sm text-gray-400 mt-6">
            You can update this anytime from your dashboard
          </p>
        </motion.div>
      </div>
    </div>
  );
}

