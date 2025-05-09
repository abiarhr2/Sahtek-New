require('dotenv').config();  // Load environment variables from a .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Route imports
const servicesRoutes = require("./routes/Services");
const appointmentRoutes = require("./routes/appointment");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
console.log("MongoDB URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);  // Exit process on connection failure
  });

// Middleware to enable CORS and parse JSON
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001', // Use .env variable for frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Seed function to populate the services collection
const seedServices = async () => {
  try {
    const db = mongoose.connection.db;
    const services = db.collection('Services');

    const existing = await services.countDocuments();
    if (existing > 0) {
      console.log('🟡 Services already exist in the database. Skipping seeding.');
      return;
    }

    // Insert sample services
    await services.insertMany([
      {
        name: "Dr. Salim Idrissi",
        type: "Doctor",
        specialty: "Cardiology",
        phone: "0600011111",
        email: "salim.idrissi@hospital.com",
        availableDays: ["Monday", "Thursday"],
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
        city: "Fès",
        location: "CHU Hassan II"
      },
      {
        name: "Dr. Amal Kabbaj",
        type: "Doctor",
        specialty: "Dermatology",
        phone: "0600011113",
        email: "amal.kabbaj@hospital.com",
        availableDays: ["Wednesday", "Saturday"],
        city: "Fès",
        location: "Hôpital Ghassani Public"
      },
      {
        name: "Dr. Hicham Benslimane",
        type: "Doctor",
        specialty: "Internal Medicine",
        phone: "0600011120",
        email: "hicham.benslimane@hospital.com",
        availableDays: ["Monday", "Friday"],
        city: "Meknès",
        location: "CH Mohamed V"
      },
      {
        name: "Nurse Yasmine El Fassi",
        type: "Nurse",
        specialty: "Pediatrics",
        phone: "0600011121",
        email: "yasmine.fassi@hospital.com",
        availableDays: ["Tuesday", "Thursday"],
        city: "Meknès",
        location: "CH Mohamed V"
      },
      // More services can be added here...
    ]);

    console.log("✅ Seeded services data.");
  } catch (error) {
    console.error("❌ Error seeding services:", error);
  }
};

// Call seedServices when the server starts
mongoose.connection.once('open', async () => {
  await seedServices();

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date() });
  });

  // API Routes
  app.use('/api/services', servicesRoutes);
  app.use('/api/appointment', appointmentRoutes); // Register appointment routes

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error("🔥 Error:", err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
