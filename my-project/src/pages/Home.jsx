import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaPiggyBank,
  FaSignOutAlt,
  FaPlus,
  FaChartLine,
  FaShieldAlt,
  FaSyncAlt,
} from "react-icons/fa";

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Home() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState(0);

  // 🔍 Search states
  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchAmount, setSearchAmount] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const fetchData = async () => {
      try {
        const expRes = await fetch("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(await expRes.json());

        const userRes = await fetch(
          "http://localhost:5000/api/users/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userData = await userRes.json();
        setMonthlyBudget(userData.monthlyBudget || 0);
      } catch {
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  /* ================= CALCULATIONS ================= */
  const totalExpense = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const remaining = monthlyBudget - totalExpense;
  const percentUsed =
  monthlyBudget > 0
    ? Math.round((totalExpense / monthlyBudget) * 100)
    : 0;


  /* ================= SEARCH FILTER ================= */
  const filteredExpenses = expenses.filter((exp) => {
  const textMatch =
    exp.title.toLowerCase().includes(searchText.toLowerCase());

  const categoryMatch = searchCategory
    ? exp.category === searchCategory
    : true;

  return textMatch && categoryMatch;
});

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Delete this expense?")) return;

    const res = await fetch(
      `http://localhost:5000/api/expenses/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.ok) {
      setExpenses(expenses.filter((e) => e._id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= NAVBAR ================= */}
      {/* ================= NAVBAR ================= */}
<motion.nav
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  className="flex justify-between items-center px-8 py-4 bg-white shadow"
>
  {/* LOGO + NAME */}
  <div className="flex items-center gap-3">
    <div className="bg-indigo-600 text-white p-2 rounded-full flex items-center justify-center">
      <FaWallet size={30} />
    </div>
    <h1 className="text-4xl font-bold text-indigo-600">
      Expense Tracker
    </h1>
  </div>

  {/* ACTION BUTTONS */}
  <div className="flex gap-4 items-center">
    <button
      onClick={() => navigate("/set-budget")}
      className="bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Set Budget
    </button>

    <button
      onClick={() => navigate("/add-expense")}
      className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
    >
      <FaPlus /> Add Expense
    </button>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/charts")}
      className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
    >
      <FaChartLine /> Analytics
    </motion.button>

    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-red-500 font-semibold"
    >
      <FaSignOutAlt /> Logout
    </button>
  </div>
</motion.nav>


      {/* ================= HERO ================= */}
      <section className="px-8 py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <motion.h2 variants={fadeUp} initial="hidden" animate="visible" className="text-5xl font-bold mb-4">
          Manage Your Expenses Smartly
        </motion.h2>
        <p className="max-w-xl">
          Track spending, set budgets and stay financially strong.
        </p>
      </section>

      {/* ================= WE ARE BACK ================= */}
      <section className="px-8 py-10">
        <h2 className="text-3xl font-bold">We are back 👋</h2>
        <p className="text-gray-600">Here’s your expense summary</p>
      </section>

      {/* ================= DASHBOARD ================= */}
      <motion.section
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="px-8 grid md:grid-cols-4 gap-6 mb-10"
      >
        <DashboardCard title="Total Expenses" amount={`₹ ${totalExpense}`} icon={<FaWallet />} color="bg-indigo-600" />
        <DashboardCard title="Monthly Budget" amount={`₹ ${monthlyBudget}`} icon={<FaArrowUp />} color="bg-green-500" />
        <DashboardCard title="Remaining" amount={`₹ ${remaining}`} icon={<FaPiggyBank />} color={remaining < 0 ? "bg-red-500" : "bg-yellow-500"} />
        <DashboardCard title="Transactions" amount={expenses.length} icon={<FaArrowDown />} color="bg-purple-500" />
      </motion.section>
    {/* ================= BUDGET WARNING ================= */}
{monthlyBudget > 0 && percentUsed >= 80 && percentUsed < 100 && (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="mx-8 mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg font-semibold"
  >
    ⚠️ Warning: You have used {percentUsed}% of your monthly budget
  </motion.div>
)}

{monthlyBudget > 0 && percentUsed >= 100 && (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="mx-8 mb-4 p-4 bg-red-100 text-red-700 rounded-lg font-bold"
  >
    🚨 Budget exceeded! Please review your expenses
  </motion.div>
)}
{/* ================= BUDGET PROGRESS ================= */}
{monthlyBudget > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="mx-8 mb-10 bg-white rounded-xl shadow p-5"
  >
    <div className="flex justify-between mb-2 font-semibold">
      <span>Budget Usage</span>
      <span>{percentUsed}%</span>
    </div>

    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(percentUsed, 100)}%` }}
        transition={{ duration: 0.8 }}
        className={`h-full ${
          percentUsed >= 100
            ? "bg-red-500"
            : percentUsed >= 80
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
      />
    </div>

    <p className="text-sm text-gray-500 mt-2">
      ₹{totalExpense} spent out of ₹{monthlyBudget}
    </p>
  </motion.div>
)}

      {/* ================= SEARCH ================= */}
    <motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="px-8 mb-6"
>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
  >
    
    {/* CATEGORY */}
    <motion.select
      whileFocus={{ scale: 1.03 }}
      value={searchCategory}
      onChange={(e) => setSearchCategory(e.target.value)}
      className="md:col-span-1 border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
    >
      <option value="">All</option>
      <option value="Food">Food</option>
      <option value="Transport">Transport</option>
      <option value="Rent">Rent</option>
      <option value="Shopping">Shopping</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Others">Others</option>
    </motion.select>

    {/* DATE */}
    <motion.input
      whileFocus={{ scale: 1.03 }}
      type="date"
      value={searchDate}
      onChange={(e) => setSearchDate(e.target.value)}
      className="md:col-span-1 border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
    />

    {/* AMOUNT */}
    <motion.input
      whileFocus={{ scale: 1.03 }}
      type="number"
      placeholder="Amount"
      value={searchAmount}
      onChange={(e) => setSearchAmount(e.target.value)}
      className="md:col-span-1 border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
    />

    {/* CLEAR BUTTON (SAME ROW) */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        setSearchText("");
        setSearchCategory("");
        setSearchDate("");
        setSearchAmount("");
      }}
      className="md:col-span-1 bg-gray-200 rounded-lg font-semibold py-3"
    >
      Clear
    </motion.button>
  </motion.div>
</motion.section>




      {/* ================= RECENT EXPENSES ================= */}
      <section className="px-8 pb-16">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-bold mb-4">Recent Expenses</h3>

          {filteredExpenses.length === 0 ? (
            <p className="text-gray-500 text-center">
              No matching expenses
            </p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500">
                  <th>Date</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((exp) => (
                  <motion.tr
                  key={exp._id}
          whileHover={{ backgroundColor: "#f9fafb", scale: 1.01 }}
                     className="border-b"
              >

                    <td>{new Date(exp.date).toLocaleDateString()}</td>
                    <td>{exp.title}</td>
                    <td>{exp.category}</td>
                    <td className="text-red-500 font-semibold">
                      ₹ {exp.amount}
                    </td>
                    <td className="flex justify-center gap-3">
                      <button
                        onClick={() => navigate(`/edit-expense/${exp._id}`)}
                        className="text-indigo-600 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exp._id)}
                        className="text-red-500 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="px-8 py-14 bg-white">
        <h3 className="text-3xl font-bold text-center mb-10">Our Services</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Service icon={<FaChartLine />} title="Expense Tracking" />
          <Service icon={<FaShieldAlt />} title="Secure Data" />
          <Service icon={<FaSyncAlt />} title="Monthly Reset" />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-8 py-14 bg-gray-100">
        <h3 className="text-3xl font-bold text-center mb-10">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <Step step="1" text="Register / Login" />
          <Step step="2" text="Set Budget & Add Expenses" />
          <Step step="3" text="Track & Save Money" />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-indigo-600 text-white py-6 text-center">
        © {new Date().getFullYear()} Expense Monitor | MERN Project
      </footer>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function DashboardCard({ title, amount, icon, color }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`${color} text-white rounded-2xl p-6 shadow cursor-pointer`}
    >
      <p className="text-sm">{title}</p>
      <h3 className="text-2xl font-bold">{amount}</h3>
      <div className="text-3xl mt-2">{icon}</div>
    </motion.div>
  );
}


function Service({ icon, title }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 250 }}
      className="bg-gray-50 p-6 rounded-xl shadow text-center cursor-pointer"
    >
      <div className="text-3xl text-indigo-600 mb-2">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
    </motion.div>
  );
}


function Step({ step, text }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-xl shadow cursor-pointer"
    >
      <div className="text-indigo-600 text-2xl font-bold mb-2">
        Step {step}
      </div>
      <p>{text}</p>
    </motion.div>
  );
}
