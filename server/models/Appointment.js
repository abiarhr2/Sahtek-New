const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  providerName: { type: String, required: true }, // replaces doctorName
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  city: { type: String, required: true },
  location: String,
  hospital: { type: String, required: true },
  date: { type: String, required: true }, // <- accept "Wednesday" as-is
  time: { type: String, required: true },
  consultationType: { type: String, required: true },
  problem: { type: String, required: true },
  level: { type: String, required: true },
  status: { type: String, default: 'Pending' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;