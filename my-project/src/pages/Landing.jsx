import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ Import Link
import { FaWallet, FaChartPie, FaBell, FaUserShield } from "react-icons/fa";

export default function Landing() {
  return (
    <div
      className="relative overflow-hidden min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgba(238,242,255,0.9), rgba(255,255,255,0.95)), url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c')",
      }}
    >
      {/* BLOBS */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute top-40 -right-32 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6 relative z-10">
        <div className="flex items-center gap-3">
          
          <div className="bg-indigo-600 text-white p-4 rounded-full shadow-lg">
                      <FaWallet size={32} />
                    </div>
          <h1 className="text-4xl font-bold text-indigo-600">
            Expense Tracker
          </h1>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Track Expenses. <br />
            <span className="text-indigo-600">Control Your Money.</span>
          </h2>

          <p className="mt-6 text-gray-600 text-lg">
            Expense Tracker helps you track income, manage expenses, set budgets,
            and visualize spending habits — all in one simple dashboard.
          </p>

          <div className="mt-8 flex gap-4">
            {/* Link buttons to /login */}
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg inline-block"
            >
              Get Started
            </Link>
            
          </div>
        </motion.div>

        {/* HERO IMAGE */}
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          src="https://cdn-icons-png.flaticon.com/512/9298/9298946.png"
          alt="Expense Dashboard"
          className="w-80 md:w-96 mt-10 md:mt-0"
        />
      </section>

      {/* OPTIONAL: FEATURES OR CTA SECTION CAN BE ADDED BELOW */}
    </div>
  );
}
