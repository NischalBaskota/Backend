const Booking = require('../models/Booking');

// Create a new booking (Parent only)
const createBooking = async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,           // subject, grade, tutorId, message etc from request body
      parentId: req.user.id, // The logged-in parent's ID from JWT middleware
      dateRequested: new Date()
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update status of a booking (Tutor only)
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = req.body.status; // new status from request
    await booking.save();
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get bookings for logged-in tutor
const getTutorBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ tutorId: req.user.id }).populate('parentId');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get bookings for logged-in parent
const getParentBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ parentId: req.user.id }).populate('tutorId');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createBooking, updateBookingStatus, getTutorBookings, getParentBookings };
