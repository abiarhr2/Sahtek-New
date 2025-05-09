// backend/routes/Services.js
const express = require('express');
const router = express.Router();
const { getServicesCollection } = require('../models/services');

router.post('/search', async (req, res) => {
  try {
    const services = getServicesCollection();

    // ✅ Log the incoming search parameters
    console.log("📩 Incoming request body:", req.body);

    const { city, hospital, healthIssue, providerType } = req.body;

    const query = {};

    // Correct the regular expression usage
    if (city) {
      query.city = { $regex: city, $options: 'i' }; // Match the city case-insensitively
    }
    if (hospital) {
      query.location = { $regex: hospital, $options: 'i' }; // Match hospital name case-insensitively
    }
    if (providerType) {
      query.type = { $regex: providerType, $options: 'i' }; // Match provider type case-insensitively
    }
    if (healthIssue) {
      query.specialty = { $regex: healthIssue, $options: 'i' }; // Match specialty case-insensitively
    }

    // ✅ Log the actual query MongoDB will use
    console.log("🔍 Final Query:", query);

    // Perform the search in the services collection
    const results = await services.find(query).toArray();
    res.json(results);
  } catch (err) {
    console.error('❌ Search error:', err);
    res.status(500).json({ message: 'Search failed' });
  }
});

module.exports = router;
