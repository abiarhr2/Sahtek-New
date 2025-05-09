// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('./controllers/appointmentController'); // Adjust the path as necessary
// Route to create an appointment
router.post('/appointments', appointmentController.createAppointment);

// Route to get appointments by patient email
router.get('/appointments/:email', appointmentController.getAppointmentsByEmail);

module.exports = router;