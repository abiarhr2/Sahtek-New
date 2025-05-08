// backend/server.js
const express = require('express');
const cors = require('cors');
const { connectDB, client } = require('./config/db');
const servicesRoutes = require('./routes/Services');
const appointmentRoutes = require('./routes/appointment'); // ✅ NEW: Import appointment routes

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/services', servicesRoutes);
app.use('/api/appointment', appointmentRoutes); // ✅ NEW: Register appointment routes

// 🟢 Seed function
const seedServices = async () => {
  const db = client.db('test');
  const services = db.collection('Services');

  const existing = await services.countDocuments();
  if (existing > 0) {
    console.log('🟡 Services already exist in the database. Skipping seeding.');
    return;
  }

  await services.insertOne({
    name: "Dr. Salim Idrissi",
    type: "Doctor",
    specialty: "Cardiology",
    phone: "0600011111",
    email: "salim.idrissi@hospital.com",
    availableDays: ["Monday", "Thursday"],
    city: "Fès",
    location: "CHU Hassan II"
  });

  // ... (keep the rest of your insertOne data unchanged)

  console.log("✅ Seeded 15+ services across Fès-Meknès with enough for 3+ choices per filter.");
};

// 🟢 Connect DB and Seed, then start the server
connectDB().then(async () => {
  await seedServices();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err);
});
