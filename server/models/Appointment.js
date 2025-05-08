const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
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
  status: { type: String, default: 'Pending' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
