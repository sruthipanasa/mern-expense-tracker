import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaWallet } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Invalid email or password");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch {
      alert("Backend server is not running");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgba(79,70,229,0.85), rgba(236,72,153,0.85)), url('https://images.unsplash.com/photo-1556742049-908b1f76c0d8')",
      }}
    >

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

      {/* ================= LOGIN CARD ================= */}
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
        >

          {/* LOGO CENTER */}
          <motion.div className="flex justify-center mb-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-indigo-600 text-white rounded-full w-14 h-14 flex items-center justify-center"
            >
              <FaWallet size={30} />
            </motion.div>
          </motion.div>

          {/* TITLE */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-600">
              Welcome Back
            </h1>
            <p className="text-gray-500">
              Login to manage your expenses
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* EMAIL */}
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <div className="flex items-center border rounded-xl px-3">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <div className="flex items-center border rounded-xl px-3">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold"
            >
              Login
            </motion.button>
          </form>

          {/* REGISTER */}
          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
