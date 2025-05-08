const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
<<<<<<< HEAD
  providerName: { type: String, required: true }, // replaces doctorName
  city: String,
  location: String,
  hospital: String,
  date: String, // <- accept "Wednesday" as-is
  time: String,
  consultationType: String,
  problem: String,
  level: String,
=======
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  city: { type: String, required: true },
  location: String,
  hospital: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  consultationType: { type: String, required: true },
  problem: { type: String, required: true },
  level: { type: String, required: true },
>>>>>>> 469f61299d66360ea5c4cd8006be7cc4480f8dbf
  status: { type: String, default: 'Pending' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
