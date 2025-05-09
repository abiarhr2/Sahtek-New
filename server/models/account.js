// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  about: { type: String },
  photo: { type: String }, // Path to the uploaded photo
});

const User = mongoose.model('User', userSchema);

module.exports = User;