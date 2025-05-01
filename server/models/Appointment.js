const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  city: String,
  location: String,
  hospital: String,
  date: String,
  time: String,
  consultationType: String,
  problem: String,
  level: String
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
