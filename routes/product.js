const router = require('express').Router();
const productsController = require('../controllers/products');
const upload = require('../config/multer.config');

// ! Create a Product
router.post('/products', upload.single('photo'), productsController.postAddProduct);

// ! Get All Products

// ! Get a Single Product

// ! Update a Product

// ! Delete a single Product

module.exports = router;