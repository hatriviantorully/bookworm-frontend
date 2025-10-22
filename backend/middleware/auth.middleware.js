// backend/src/middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
  try {
    console.log("=== AUTH MIDDLEWARE ===");

    // Get token from header
    const authHeader = req.header("Authorization");
    console.log("📨 Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No Bearer token found");
      return res.status(401).json({ message: "No authentication token" });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("🔑 Token extracted");

    if (!token) {
      console.log("❌ Empty token");
      return res.status(401).json({ message: "Empty token" });
    }

    // Verify token
    console.log("🔍 Verifying token...");
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Token verified:", decoded);
    } catch (verifyError) {
      console.log("❌ Token verification failed:", verifyError.message);
      return res.status(401).json({
        message: "Invalid token",
        error: verifyError.message,
      });
    }

    // Find user - try both id and userId
    const userId = decoded.id || decoded.userId;
    console.log("👤 Looking for user ID:", userId);

    if (!userId) {
      console.log("❌ No user ID in token");
      return res.status(401).json({
        message: "Invalid token structure",
        decoded: decoded,
      });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      console.log("❌ User not found with ID:", userId);
      return res.status(401).json({ message: "User not found" });
    }

    console.log("✅ User authenticated:", user.username);
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Auth middleware error:", error);
    res.status(500).json({ message: "Server error in authentication" });
  }
};

export default protectRoute;
