const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  consultationTypes: [String],
  availableSlots: [String],
});

module.exports = mongoose.model('Doctor', doctorSchema);
