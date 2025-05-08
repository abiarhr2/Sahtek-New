const express = require('express');
const router = express.Router();
const Calendar = require('../models/Appointment'); // Same model, just renaming the route

// GET /api/calendar - Return all appointments in calendar format
router.get('/', async (req, res) => {
  try {
    const appointments = await Calendar.find();

    const formatted = appointments.map((appt) => {
      const start = new Date(`${appt.date}T${appt.time}`);
      const end = new Date(start.getTime() + 30 * 60000); // 30 mins later

      return {
        title: `Appointment - ${appt.patientName || 'N/A'}`,
        start,
        end,
        allDay: false,
        description: `
          Hospital: ${appt.hospital}
          Location: ${appt.location}, ${appt.city}
          Type: ${appt.consultationType}
          Problem: ${appt.problem}
          Level: ${appt.level}
          Status: ${appt.status || 'N/A'}
        `,
        type: 'appointment',
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error('Calendar fetch error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
