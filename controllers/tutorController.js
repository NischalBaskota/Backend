const Tutor = require('../models/Tutor');

// Get profile of logged-in tutor
const getTutorProfile = async (req, res) => {
  try {
    // req.user.id comes from your JWT auth middleware
    const tutor = await Tutor.findById(req.user.id);
    if (!tutor) return res.status(404).json({ message: 'Tutor not found' });

    res.status(200).json(tutor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update profile of logged-in tutor
const updateTutorProfile = async (req, res) => {
  try {
    const updates = req.body; // The fields tutor wants to update

    // Find tutor by ID and apply updates, return the updated document
    const tutor = await Tutor.findByIdAndUpdate(req.user.id, updates, { new: true });

    if (!tutor) return res.status(404).json({ message: 'Tutor not found' });

    res.status(200).json(tutor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTutorProfile, updateTutorProfile };



const searchTutors = async (req, res) => {
    const { subject, grade, location } = req.query;
  
    try {
      const tutors = await Tutor.find({
        ...(subject && { subjects: { $in: [subject] } }),
        ...(grade && { grades: { $in: [grade] } }),
        ...(location && { location: new RegExp(location, 'i') }),
      });
  
      res.status(200).json(tutors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  module.exports = {
    getTutorProfile,
    updateTutorProfile,
    searchTutors,
  };
  