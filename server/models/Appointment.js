const appointmentSchema = new mongoose.Schema({
  city: String,
  location: String,
  hospital: String,
  date: String,
  time: String,
  consultationType: String,
  problem: String,
  level: String,
  providerName: String // ✅ Add this
}, { timestamps: true });
