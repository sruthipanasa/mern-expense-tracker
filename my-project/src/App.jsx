import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import SetBudget from "./pages/SetBudget";
import Charts from "./pages/charts";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/add-expense" element={<AddExpense />} />
      <Route path="/edit-expense/:id" element={<EditExpense/>}/>
      <Route path="/set-budget" element={<SetBudget/>}/>
      <Route path="/charts" element={<Charts/>}/>
    </Routes>
  );
}
