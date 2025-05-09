// controllers/appointmentController.js
const Appointment = require('../models/Appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(200).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Error booking appointment', error });
  }
};

// Get appointments by patient email
exports.getAppointmentsByEmail = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientEmail: req.params.email });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointments', error });
  }
};