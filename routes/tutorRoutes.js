const express = require('express');
const router = express.Router();

// Import all tutor controller functions, including searchTutors
const { getTutorProfile, updateTutorProfile, searchTutors } = require('../controllers/tutorController');

// Middleware to verify JWT token
const { verifyToken } = require('../middleware/authMiddleware');

// Protected routes - require token verification
router.get('/profile', verifyToken, getTutorProfile);
router.put('/profile', verifyToken, updateTutorProfile);

// Public route - no authentication required
router.get('/search', searchTutors);

module.exports = router;
