const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
  createBooking,
  updateBookingStatus,
  getTutorBookings,
  getParentBookings
} = require('../controllers/bookingController');

router.post('/', verifyToken, createBooking);               // Create booking
router.put('/:id/status', verifyToken, updateBookingStatus); // Update booking status
router.get('/tutor', verifyToken, getTutorBookings);         // Get tutor bookings
router.get('/parent', verifyToken, getParentBookings);       // Get parent bookings

module.exports = router;
