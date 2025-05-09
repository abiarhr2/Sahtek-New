const express = require('express');
const cors = require('cors');
const { connectDB, client } = require('./config/db');
const servicesRoutes = require('./routes/Services');
const appointmentRoutes = require('./routes/appointment'); // Added
const historyRoutes = require('./routes/history'); // Added

const app = express();
const PORT = 3000;

// Middleware to enable CORS and parse JSON
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/services', servicesRoutes);
app.use('/api/appointment', appointmentRoutes); // Register appointment routes
app.use('/api/history', historyRoutes); // Register history routes

// Seed function to populate the services collection
const seedServices = async () => {
  try {
    const db = client.db('test');
    const services = db.collection('Services');

    const existing = await services.countDocuments();
    if (existing > 0) {
      console.log('🟡 Services already exist in the database. Skipping seeding.');
      return;
    }

    // Inserting seed data into services collection
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
      {
        name: "Dr. Mourad Jaouhari",
        type: "Doctor",
        specialty: "Cardiology",
        phone: "0600011122",
        email: "mourad.jaouhari@hospital.com",
        availableDays: ["Wednesday", "Saturday"],
        city: "Meknès",
        location: "CH Mohamed V"
      },
      {
        name: "Nurse Ibtissam Rami",
        type: "Nurse",
        specialty: "Emergency Care",
        phone: "0600011130",
        email: "ibtissam.rami@hospital.com",
        availableDays: ["Monday", "Tuesday"],
        city: "Taza",
        location: "Centre Hospitalier Provincial de Taza"
      },
      {
        name: "Dr. Omar Ait Lahcen",
        type: "Doctor",
        specialty: "Dermatology",
        phone: "0600011131",
        email: "omar.lahcen@hospital.com",
        availableDays: ["Thursday", "Friday"],
        city: "Taza",
        location: "Centre Hospitalier Provincial de Taza"
      },
      {
        name: "Nurse Khadija Toumi",
        type: "Nurse",
        specialty: "Cardiology",
        phone: "0600011132",
        email: "khadija.toumi@hospital.com",
        availableDays: ["Wednesday", "Sunday"],
        city: "Taza",
        location: "Centre Hospitalier Provincial de Taza"
      },
      {
        name: "Dr. Ayman El Idrissi",
        type: "Doctor",
        specialty: "Maternity",
        phone: "0600011140",
        email: "ayman.idrissi@hospital.com",
        availableDays: ["Monday", "Thursday"],
        city: "Sefrou",
        location: "Hôpital Provincial de Sefrou"
      },
      {
        name: "Nurse Salma Benhammou",
        type: "Nurse",
        specialty: "Maternity",
        phone: "0600011141",
        email: "salma.benhammou@hospital.com",
        availableDays: ["Tuesday", "Friday"],
        city: "Sefrou",
        location: "Hôpital Provincial de Sefrou"
      },
      {
        name: "Dr. Yassine El Meknassi",
        type: "Doctor",
        specialty: "Pediatrics",
        phone: "0600011142",
        email: "yassine.meknassi@hospital.com",
        availableDays: ["Wednesday", "Saturday"],
        city: "Sefrou",
        location: "Hôpital Provincial de Sefrou"
      },
      {
        name: "Dr. Noura Zahidi",
        type: "Doctor",
        specialty: "General Medicine",
        phone: "0600011150",
        email: "noura.zahidi@hospital.com",
        availableDays: ["Monday", "Wednesday"],
        city: "Ifrane",
        location: "Hôpital Public Ifrane"
      },
      {
        name: "Nurse Hamza Outaleb",
        type: "Nurse",
        specialty: "ICU",
        phone: "0600011151",
        email: "hamza.outaleb@hospital.com",
        availableDays: ["Thursday", "Saturday"],
        city: "Ifrane",
        location: "Hôpital Public Ifrane"
      },
      {
        name: "Dr. Soukaina Jabbari",
        type: "Doctor",
        specialty: "Emergency Care",
        phone: "0600011152",
        email: "soukaina.jabbari@hospital.com",
        availableDays: ["Tuesday", "Sunday"],
        city: "Ifrane",
        location: "Hôpital Public Ifrane"
      }
    ]);

    console.log("✅ Seeded 15+ services across Fès-Meknès with enough for 3+ choices per filter.");
  } catch (error) {
    console.error('❌ Error seeding services:', error);
  }
};

// Connect to DB and start server
connectDB().then(async () => {
  await seedServices();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err);
});
