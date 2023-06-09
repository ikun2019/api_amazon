const router = require('express').Router();
const productsController = require('../controllers/products');
const upload = require('../config/multer.config');

// ! Create a Product
router.post('/products', upload.single('photo'), productsController.postAddProduct);

// ! Get All Products
// * GET => /api/products
router.get('/products', productsController.getProducts);

// ! Get a Single Product
// * GET => /api/products/:id
router.get('/products/:id', productsController.getProduct);

// ! Update a Product
// * PUT => /api/products/:id
router.put('/products/:id', upload.single('photo'), productsController.updateProduct);

// ! Delete a single Product
// * DELETE => /api/products/:id
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;