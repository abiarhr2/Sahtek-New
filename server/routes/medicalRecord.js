const express = require("express");
const router = express.Router();
const MedicalHistory = require("../models/medicalRecord");

router.get("/:userId", async (req, res) => {
  try {
    const history = await MedicalHistory.findOne({ userId: req.params.userId });
    if (!history || !history.records.length) {
      return res.status(404).json({ message: "No medical records found" });
    }

    // Send the first record for now
    res.json(history.records[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
