const express = require('express');
const router = express.Router();
const { getTutorProfile, updateTutorProfile } = require('../controllers/tutorController');
const { verifyToken } = require('../middleware/authMiddleware');

// Protect routes with JWT verification
router.get('/profile', verifyToken, getTutorProfile);
router.put('/profile', verifyToken, updateTutorProfile);

router.get('/search', searchTutors); // Public search, no auth needed

module.exports = router;
