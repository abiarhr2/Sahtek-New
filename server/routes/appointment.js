const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// POST /api/appointments
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const saved = await appointment.save();
    console.log("Appointment saved:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving appointment:", err);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

module.exports = router;
