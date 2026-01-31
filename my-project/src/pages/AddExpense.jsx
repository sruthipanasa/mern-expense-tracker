import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaWallet,
  FaCalendarAlt,
  FaFileAlt,
  FaTags,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* ================= NAVBAR ================= */
function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-60">
      <div className="max-w-8xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Name */}
        <div className="flex items-center gap-2">
         <div className="bg-indigo-600 text-white p-2 rounded-full">
            <FaWallet size={30} />
          </div>
          <span className=" font-bold text-indigo-600 text-4xl">
            Expense Tracker
          </span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600"
        >
          <FaArrowLeft /> Back
        </button>
      </div>
    </nav>
  );
}

export default function AddExpense() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddExpense = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login again");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          title,
          category,
          date,
          notes,
        }),
      });

      if (!res.ok) throw new Error("Failed to add expense");

      navigate("/home");
    } catch (error) {
      alert("Error adding expense");
      console.error(error);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center pt-24"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(79,70,229,0.8), rgba(236,72,153,0.8)), url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c')",
        }}
      >
        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-3"
        >
          {/* TITLE */}
          <div className="text-center mb-3">
            <h2 className="text-2xl font-bold text-gray-800">Add Expense</h2>
            <p className="text-sm text-gray-500">
              Track your daily spending
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleAddExpense} className="space-y-2">
            {/* AMOUNT */}
            <div>
              <label className="text-sm text-gray-600">Amount</label>
              <div className="flex items-center border rounded-lg px-2">
                <FaWallet className="text-gray-400 mr-2" />
                <input
                  type="number"
                  required
                  placeholder="₹ 0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full py-2 outline-none text-sm"
                />
              </div>
            </div>

            {/* TITLE */}
            <div>
              <label className="text-sm text-gray-600">Title</label>
              <div className="flex items-center border rounded-lg px-2">
                <FaFileAlt className="text-gray-400 mr-2" />
                <input
                  type="text"
                  required
                  placeholder="Groceries, Rent"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full py-2 outline-none text-sm"
                />
              </div>
            </div>

            {/* CATEGORY */}
            <div>
              <label className="text-sm text-gray-600">Category</label>
              <div className="flex items-center border rounded-lg px-2">
                <FaTags className="text-gray-400 mr-2" />
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full py-2 outline-none text-sm"
                >
                  <option value="">Select</option>
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Rent</option>
                  <option>Shopping</option>
                  <option>Entertainment</option>
                  <option>Others</option>
                </select>
              </div>
            </div>

            {/* DATE */}
            <div>
              <label className="text-sm text-gray-600">Date</label>
              <div className="flex items-center border rounded-lg px-2">
                <FaCalendarAlt className="text-gray-400 mr-2" />
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full py-2 outline-none text-sm"
                />
              </div>
            </div>

            {/* NOTES */}
            <div>
              <label className="text-sm text-gray-600">Notes</label>
              <textarea
                rows="2"
                placeholder="Optional notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border rounded-lg px-2 py-1 outline-none text-sm"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-semibold"
              >
                Add
              </motion.button>

              <button
                type="button"
                onClick={() => navigate("/home")}
                className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
