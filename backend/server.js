require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const interviewSessionRoutes = require("./routes/interviewSessionRoutes");

const protect = require("./middleware/authMiddleware");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/evaluation", evaluationRoutes);
app.use("/api/interview-session", interviewSessionRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// Test Route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend API working",
  });
});

// Protected Route
app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    userId: req.user.id,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});