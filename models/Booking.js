const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent', required: true },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
  subject: String,
  grade: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  dateRequested: Date,
  message: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
