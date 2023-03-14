const Product = require('../models/Product');

// ! Create a Product
// => /api/products
exports.postAddProduct = async (req, res, next) => {
  try {
    const product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.body.photo;
    product.stockQuantity = req.body.stockQuantity;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Successfully save'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// ! Get All Products

// ! Get a Single Product

// ! Update a Product

// ! Delete a single Product