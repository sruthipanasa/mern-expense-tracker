import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token missing",
      });
    }

    // ✅ Extract token
    const token = authHeader.split(" ")[1];

    // ❌ Invalid token
    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ❌ User not found
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // ✅ Attach user to request
    req.user = user;

    next(); // 🚀 MUST CALL NEXT
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({
      message: "Token is invalid or expired",
    });
  }
};

export default authMiddleware;
