const Category = require('../models/Category');

// ! カテゴリの作成
// * GET => /api/categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      success: true,
      categories: categories
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
// * POST => /api/categories
exports.postAddCategory = async (req, res, next) => {
  try {
    const category = new Category();
    category.type = req.body.type;
    await category.save();
    res.status(200).json({
      success: true,
      message: 'Add Category'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}