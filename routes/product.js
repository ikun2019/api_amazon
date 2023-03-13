const router = require('express').Router();
const productsController = require('../controllers/products');

// ! Create a Product
router.post('/products', productsController.postAddProduct);

// ! Get All Products

// ! Get a Single Product

// ! Update a Product

// ! Delete a single Product

module.exports = router;