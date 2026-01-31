import { motion } from "framer-motion";

const transactions = [
  { title: "Food", amount: 250, type: "Expense" },
  { title: "Salary", amount: 15000, type: "Income" },
  { title: "Travel", amount: 1200, type: "Expense" },
];

export default function RecentTransactions() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-2xl shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>

      <ul className="space-y-3">
        {transactions.map((t, i) => (
          <li
            key={i}
            className="flex justify-between items-center border-b pb-2"
          >
            <span className="font-medium">{t.title}</span>
            <span
              className={`font-semibold ${
                t.type === "Income"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              ₹{t.amount}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
