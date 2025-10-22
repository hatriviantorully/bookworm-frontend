import express from "express";
import cors from "cors";
import "dotenv/config";
import job from "./lib/cron.js";
import jwt from "jsonwebtoken";
import User from "./models/User.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 PERBAIKAN CORS - tambahkan ini:
app.use(
  cors({
    origin: function (origin, callback) {
      // Izinkan semua origin dalam development
      const allowedOrigins = [
        "http://localhost:8081",
        "exp://localhost:8081",
        "http://10.146.205.241:8081",
        "exp://10.146.205.241:8081",
        "http://localhost:19006",
        "exp://localhost:19006",
      ];
      // Izinkan requests tanpa origin (mobile apps, postman, dll)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.includes("localhost") ||
        origin.includes("10.146.205.241")
      ) {
        callback(null, true);
      } else {
        console.log("CORS blocked for origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
    ],
  })
);

// Handle preflight requests
app.options("*", cors());

// Middleware untuk log requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

job.start();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Test route
app.get("/api/health", (req, res) => {
  res.json({
    status: "Server is running!",
    cors: "Enabled",
    timestamp: new Date().toISOString(),
  });
});

// Test books endpoint tanpa auth
app.get("/api/books/test", async (req, res) => {
  try {
    const Book = await import("./models/Book.js");
    const books = await Book.default.find().limit(2);
    res.json({
      message: "Books endpoint working",
      books: books || [],
      count: books?.length || 0,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error testing books", error: error.message });
  }
});

app.get("/api/debug/token-test", async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("=== DEBUG TOKEN TEST ===");
    console.log("📨 Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "No Bearer token",
        header: authHeader,
      });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("🔑 Token:", token.substring(0, 20) + "...");

    try {
      // Coba verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Token decoded successfully:", decoded);

      // Cari user berdasarkan decoded data
      const userId = decoded.id || decoded.userId;
      console.log("👤 Looking for user ID:", userId);

      if (!userId) {
        return res.status(401).json({
          error: "No user ID in token",
          decoded: decoded,
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({
          error: "User not found",
          userId: userId,
        });
      }

      console.log("✅ User found:", user.username);

      return res.json({
        status: "SUCCESS",
        tokenInfo: {
          decoded: decoded,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        },
        message: "Token is valid!",
      });
    } catch (tokenError) {
      console.log("❌ Token verification failed:", tokenError.message);
      return res.status(401).json({
        error: "Token verification failed",
        message: tokenError.message,
        type: tokenError.name,
      });
    }
  } catch (error) {
    console.error("❌ Debug endpoint error:", error);
    res.status(500).json({ error: error.message });
  }
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 CORS enabled for development`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database", error);
    process.exit(1);
  }
};

startServer();
