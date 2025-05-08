require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connection = require("./config/db");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointment"); // correctly lowercase

const app = express();

// Connect to MongoDB


// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointment", appointmentRoutes); // POST /api/appointment

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
