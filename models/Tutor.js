const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subjects: [String],
  grades: [String],
  location: { type: String, required: true }, // E.g. "Kathmandu", "Baneshwor"
  education: String,
  experience: String,
  phone: String,
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Tutor', tutorSchema);
