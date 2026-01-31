import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaWallet,
  FaFileAlt,
  FaTags,
  FaCalendarAlt,
  FaStickyNote,
} from "react-icons/fa";

/* ================= NAVBAR ================= */
/* ================= NAVBAR ================= */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50 h-15">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center gap-3">
        <div className="bg-indigo-600 text-white p-2 rounded-full flex items-center justify-center">
          <FaWallet size={28} />
        </div>
        <h1 className="text-2xl font-bold text-indigo-600">
          Expense Tracker
        </h1>
      </div>
    </nav>
  );
}


export default function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH SINGLE EXPENSE ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5000/api/expenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((expense) => {
        setTitle(expense.title);
        setAmount(String(expense.amount));
        setCategory(expense.category);
        setDate(expense.date.split("T")[0]);
        setNotes(expense.notes || "");
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load expense");
        navigate("/home");
      });
  }, [id, navigate]);

  /* ================= UPDATE ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:5000/api/expenses/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            amount: Number(amount),
            category,
            date,
            notes,
          }),
        }
      );

      if (!res.ok) throw new Error();
      navigate("/home");
    } catch {
      alert("Failed to update expense");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(79,70,229,0.85), rgba(236,72,153,0.85)), url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c')",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-4"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-indigo-600">
              Edit Expense
            </h2>
            <button
              onClick={() => navigate("/home")}
              className="flex items-center gap-1 text-gray-600 hover:text-indigo-600"
            >
              <FaArrowLeft /> Back
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleUpdate} className="space-y-3">
            {/* AMOUNT */}
            <InputField
              label="Amount"
              icon={<FaWallet />}
              type="number"
              value={amount}
              onChange={setAmount}
            />

            {/* TITLE */}
            <InputField
              label="Title"
              icon={<FaFileAlt />}
              value={title}
              onChange={setTitle}
            />

            {/* CATEGORY */}
            <div>
              <label className="text-sm text-gray-600">Category</label>
              <div className="flex items-center border rounded-lg px-2">
                <FaTags className="text-gray-400 mr-2" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full py-2 outline-none text-sm"
                >
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
            <InputField
              label="Date"
              icon={<FaCalendarAlt />}
              type="date"
              value={date}
              onChange={setDate}
            />

            {/* NOTES */}
            <div>
              <label className="text-sm text-gray-600">Notes</label>
              <div className="flex items-center border rounded-lg px-2">
                <FaStickyNote className="text-gray-400 mr-2" />
                <textarea
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full py-2 outline-none text-sm"
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 pt-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold"
              >
                Update
              </motion.button>

              <button
                type="button"
                onClick={() => navigate("/home")}
                className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg font-semibold"
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

/* ================= REUSABLE INPUT ================= */
function InputField({ label, icon, type = "text", value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <div className="flex items-center border rounded-lg px-2">
        <span className="text-gray-400 mr-2">{icon}</span>
        <input
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full py-2 outline-none text-sm"
        />
      </div>
    </div>
  );
}
