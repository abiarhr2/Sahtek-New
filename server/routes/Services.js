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

    if (city) {
      query.city = { $regex: `^${city}$`, $options: 'i' };
    }
    if (hospital) {
      query.location = { $regex: `^${hospital}$`, $options: 'i' };
    }
    if (providerType) {
      query.type = { $regex: `^${providerType}$`, $options: 'i' };
    }
    if (healthIssue) {
      query.specialty = { $regex: `^${healthIssue}$`, $options: 'i' };
    }

    // ✅ Log the actual query MongoDB will use
    console.log("🔍 Final Query:", query);

    const results = await services.find(query).toArray();
    res.json(results);
  } catch (err) {
    console.error('❌ Search error:', err);
    res.status(500).json({ message: 'Search failed' });
  }
});

module.exports = router;
