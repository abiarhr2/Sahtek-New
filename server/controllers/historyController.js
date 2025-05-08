const Appointment = require('../models/Appointment');

exports.getAppointmentHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const patientEmail = req.user.email; // Get patient email from authenticated user (set by authMiddleware)

    // Fetch appointments based on email
    const history = await Appointment.find({ patientEmail })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const count = await Appointment.countDocuments({ patientEmail });

    res.json({
      success: true,
      data: history,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch history',
      error: error.message,
    });
  }
};
