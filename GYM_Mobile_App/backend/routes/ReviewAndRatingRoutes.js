const express = require('express');
const router = express.Router();
const ReviewAndRatingController = require('../controllers/ReviewAndRatingController');


router.post('/review-and-rating-create/:personId', ReviewAndRatingController.createReviewAndRating);
router.patch('/review-and-rating-update/:personId', ReviewAndRatingController.updateReviewAndRating);
router.get('/review-and-rating-get-by-person-id/:personId', ReviewAndRatingController.getReviewAndRatingByPersonID);
router.get('/review-and-rating-get-all', ReviewAndRatingController.getAllReviewAndRating);
router.delete('/review-and-rating-delete-by-person-id/:personId', ReviewAndRatingController.deleteReviewAndRatingByPersonID);
router.delete('/review-and-rating-delete-by-id-admin-only/:reviewAndRatingId', ReviewAndRatingController.deleteReviewAndRatingByIDAdminOnly);

module.exports = router;