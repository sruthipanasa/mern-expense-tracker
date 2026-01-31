import { motion } from "framer-motion";

export default function StatCard({ title, amount, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br ${color} text-white`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">₹{amount}</p>
    </motion.div>
  );
}
