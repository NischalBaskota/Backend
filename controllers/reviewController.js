const Review = require('../models/Review');
const Tutor = require('../models/Tutor');

const postReview = async (req, res) => {
  try {
    const { tutorId, rating, comment } = req.body;

    const review = new Review({
      parentId: req.user.id,
      tutorId,
      rating,
      comment
    });
    await review.save();

    // Update average rating on Tutor model
    const reviews = await Review.find({ tutorId });
    const avg = reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;

    await Tutor.findByIdAndUpdate(tutorId, {
      'ratings.average': avg.toFixed(1),
      'ratings.count': reviews.length
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTutorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ tutorId: req.params.tutorId })
                                .populate('parentId', 'fullName');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { postReview, getTutorReviews };
