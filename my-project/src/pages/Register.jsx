import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaWallet } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-pink-500">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full bg-white/100 backdrop-blur shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-2 rounded-full">
            <FaWallet size={30} />
          </div>
          <h1 className="text-4xl font-bold text-indigo-600">
            Expense Tracker
          </h1>
        </div>
      </nav>

      {/* ================= REGISTER CARD ================= */}
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6"
        >

          {/* LOGO CENTER */}
          <motion.div className="flex justify-center mb-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center"
            >
              <FaWallet size={28} />
            </motion.div>
          </motion.div>

          {/* TITLE */}
          <div className="text-center mb-5">
            <h2 className="text-2xl font-bold text-indigo-600 mt-2">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm">
              Start tracking your expenses
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full border rounded-xl px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              required
              className="w-full border rounded-xl px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex items-center border rounded-xl px-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full py-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex items-center border rounded-xl px-3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                className="w-full py-2 outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold"
            >
              Register
            </motion.button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
