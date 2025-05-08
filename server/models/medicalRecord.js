const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  date: Date,
  type: String,
  description: String,
  doctor: String,
});

const medicalHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  records: [recordSchema], // array of records
});

// Match your actual MongoDB collection name
module.exports = mongoose.model("MedicalHistory", medicalHistorySchema, "Medical History");
