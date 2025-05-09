require('dotenv').config();  // Load environment variables from .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Route imports
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointment");
const servicesRoutes = require("./routes/Services"); // Adjusted the filename
const medicalRecordRoutes = require("./routes/medicalRecord");

const app = express();

// MongoDB URI from .env
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware Setup
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allowed frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); // Middleware to parse JSON requests

// MongoDB Connection with Mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ Connected to MongoDB");
    // Start server after DB connection
    seedServices();  // Seed services after DB connection
    app.listen(process.env.PORT || 3001, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 3001}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);  // Exit if the DB connection fails
  });

// Service Seeding function
const seedServices = async () => {
  const db = mongoose.connection.db;
  const services = db.collection('Services');

  const existing = await services.countDocuments();
  if (existing > 0) {
    console.log('🟡 Services already exist in the database. Skipping seeding.');
    return;
  }

  await services.insertMany([
    {
      name: "Dr. Salim Idrissi",
      type: "Doctor",
      specialty: "Cardiology",
      phone: "0600011111",
      email: "salim.idrissi@hospital.com",
      availableDays: ["Monday", "Thursday"],
      availableTimes: ["09:00", "11:00", "14:00"],
      city: "Fès",
      location: "CHU Hassan II"
    },
    {
      name: "Nurse Amina Nouri",
      type: "Nurse",
      specialty: "Emergency Care",
      phone: "0600011112",
      email: "amina.nouri@hospital.com",
      availableDays: ["Tuesday", "Friday"],
      availableTimes: ["10:00", "13:00", "15:30"],
      city: "Fès",
      location: "CHU Hassan II"
    },
    // Add other providers...
  ]);

  console.log("✅ Seeded providers with dynamic availableTimes.");
};

// API Routes
app.use("/api/auth", authRoutes);  // Authentication routes (login/signup)
app.use("/api/appointment", appointmentRoutes);  // Appointment routes
app.use("/api/services", servicesRoutes);  // Services routes
app.use("/api/records", medicalRecordRoutes);  // Medical records routes

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
