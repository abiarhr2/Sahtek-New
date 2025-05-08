const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  providerName: { type: String, required: true }, // replaces doctorName
  city: String,
  location: String,
  hospital: String,
  date: String, // <- accept "Wednesday" as-is
  time: String,
  consultationType: String,
  problem: String,
  level: String,
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
