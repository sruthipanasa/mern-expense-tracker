import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between px-6 py-4 bg-white shadow"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold">
          ₹
        </div>
        <h1 className="text-xl font-bold text-gray-800">
          Expense Tracker
        </h1>
      </div>

      <p className="text-gray-600 font-medium">Welcome 👋</p>
    </motion.div>
  );
}
