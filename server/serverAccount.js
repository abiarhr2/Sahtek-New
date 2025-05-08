const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/accountdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose Schema
const Profile = mongoose.model('Profile', new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  about: String,
  photoUrl: String,
}));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage });

// API route
app.post('/api/account', upload.single('photo'), async (req, res) => {
  try {
    const { name, email, phone, about } = req.body;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newProfile = new Profile({
      name,
      email,
      phone,
      about,
      photoUrl,
    });

    await newProfile.save();
    res.json({ message: 'Profile saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save profile' });
  }
});

// Server start
app.listen(5000, () => console.log('Server running on port 5000'));
