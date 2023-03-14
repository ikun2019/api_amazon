const router = require('express').Router();
const categoryController = require('../controllers/categories');

// ! カテゴリの作成
// * GET => /api/categories
router.get('/categories', categoryController.getCategories);
// * POST => /api/categories
router.post('/categories', categoryController.postAddCategory);

module.exports = router;