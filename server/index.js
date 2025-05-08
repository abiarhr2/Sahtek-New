require('dotenv').config();  // Load environment variables from a .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Route imports
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointmentRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

// Check that the MongoDB URI is being loaded correctly
console.log("MongoDB URI:", process.env.MONGODB_URI);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);  // Exit process on connection failure
});

// Get doctors by consultation type
app.get('/api/doctors', async (req, res) => {
  const { type } = req.query;
  try {
    const doctors = await Doctor.find({ consultationTypes: type });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001', // Use .env variable for frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use('/api', appointmentRoutes);
app.use("/api/history", historyRoutes);

app.use("/api/records", require("./routes/medicalRecord"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.use("/api/appointment", appointmentRoutes); // POST /api/appointment
//app.use('/api/calendar', calendarRoutes);
// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
