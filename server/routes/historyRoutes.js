const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const authMiddleware = require('./auth');

// Protect the /api/history route with the authMiddleware
router.use(authMiddleware);

// Get appointment history
router.get('/', historyController.getAppointmentHistory);

module.exports = router;
