const Review = require('../models/Review');
const User = require('../models/User');

// ! Reviewの投稿
exports.postReview = async (req, res, next) => {
  try {
    const review = req.user.createReview({
      headline: req.body.headline,
      body: req.body.body,
      rating: req.body.rating,
      photo: req.file.path,
      productId: req.params.productID
    });
    if (review) {
      res.json({
        success: true,
        message: 'Succesfully added Reviews'
      });
    }
    // const review = new Review();
    // review.headline = req.body.headline;
    // review.body = req.body.body;
    // review.rating = req.body.rating;
    // review.photo = req.file.path;

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// ! Reviewの取得
exports.getReviews = async (req, res, next) => {
  try {
    const productReviews = await Review.findAll({
      where: { productId: productID },
      include: User
    });
    res.json({
      success: true,
      reviews: productReviews
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};