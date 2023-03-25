const router = require('express').Router();
const reviewsController = require('../controllers/reviews');
const verifyToken = require('../middlewares/verify-token');
const upload = require('../config/multer.config');

// ! Reviewの投稿
router.post('/reviews/:productID', verifyToken, upload.single('photo'), reviewsController.postReview);

// ! Reviewの取得
router.get('/reviews/;productID', reviewsController.getReviews);

module.exports = router;