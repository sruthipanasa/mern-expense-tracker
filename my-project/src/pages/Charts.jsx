import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaChartPie, FaArrowLeft } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

/* ================= ANIMATION ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function Charts() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [monthlyChart, setMonthlyChart] = useState([]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCharts = async () => {
      try {
        // Expenses
        const expRes = await fetch("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(await expRes.json());

        // User budget
        const userRes = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userData = await userRes.json();
        setMonthlyBudget(userData.monthlyBudget || 0);

        // 🔥 Monthly line chart (BACKEND)
        const chartRes = await fetch(
          "http://localhost:5000/api/charts/monthly",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMonthlyChart(await chartRes.json());
      } catch (err) {
        navigate("/login");
      }
    };

    fetchCharts();
  }, [navigate]);

  /* ================= PIE DATA ================= */
  const categoryData = Object.values(
    expenses.reduce((acc, exp) => {
      if (!acc[exp.category]) {
        acc[exp.category] = { name: exp.category, value: 0 };
      }
      acc[exp.category].value += Number(exp.amount);
      return acc;
    }, {})
  );

  /* ================= BAR DATA ================= */
  const totalSpent = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  const barData = [
    { name: "Budget", amount: monthlyBudget },
    { name: "Spent", amount: totalSpent },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">

      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center px-8 py-4 bg-white/90 backdrop-blur shadow"
      >
        <div className="flex items-center gap-3">
          <FaChartPie className="text-indigo-600 text-3xl" />
          <h1 className="text-2xl font-bold text-indigo-600">
            Expense Tracker
          </h1>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          <FaArrowLeft /> Back
        </button>
      </motion.nav>

      {/* ================= HERO ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
        className="text-center text-white px-6 py-20"
      >
        <h2 className="text-5xl font-extrabold mb-4">
          Expense Analytics 📊
        </h2>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Visual insights to understand your spending and improve savings.
        </p>
      </motion.section>

      {/* ================= CHARTS ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-8 pb-20"
      >
        <div className="bg-white rounded-3xl shadow-xl p-10 space-y-16">

          {/* PIE CHART */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-6">
              Category-wise Expenses
            </h3>
            <PieChart width={400} height={300}>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* LINE CHART (BACKEND DATA) */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-6">
              Monthly Expense Trend
            </h3>

            <LineChart width={700} height={300} data={monthlyChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#6366F1"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>

          {/* BAR CHART */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-6">
              Budget vs Spent
            </h3>
            <BarChart width={500} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#10B981" />
            </BarChart>
          </div>

        </div>
      </motion.section>

      {/* ================= FOOTER ================= */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-white py-6 opacity-90"
      >
        © {new Date().getFullYear()} Expense Monitor | MERN Stack Project
      </motion.footer>
    </div>
  );
}
