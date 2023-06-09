const Product = require('../models/Product');
const Owner = require('../models/Owner');
const Category = require('../models/Category');

// ! Create a Product
// => /api/products
exports.postAddProduct = async (req, res, next) => {
  try {
    const product = new Product();
    // product.setOwner({ ownerID: req.body.ownerID });
    // product.setCategory({ categoryID: req.body.categoryID });
    product.ownerId = req.body.ownerID;
    product.categoryId = req.body.categoryID;
    product.price = req.body.price;
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.path;
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
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: Owner });
    res.status(200).json({
      success: true,
      products: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// ! Get a Single Product
exports.getProduct = async (req, res, next) => {
  try {
    const prodId = req.params.id;
    const product = await Product.findOne({
      where: { id: prodId },
      include: [Owner, Category]
    });
    if (!product) {
      return res.status(500).json({
        success: false,
        message: 'Productが見つかりません'
      });
    }
    res.status(200).json({
      success: true,
      product: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// ! Update a Product
exports.updateProduct = async (req, res, next) => {
  try {
    const prodId = req.params.id;
    const product = await Product.findOne({ where: { id: prodId } });
    if (!product) {
      return res.status(500).json({
        success: false,
        message: 'Productが見つかりません'
      });
    }
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.path;
    product.stockQuantity = req.body.stockQuantity;
    product.price = req.body.price;
    console.log(req.file);
    await product.save();
    res.status(200).json({
      success: true,
      message: 'Updated a Product'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// ! Delete a single Product
exports.deleteProduct = async (req, res, next) => {
  try {
    const prodId = req.params.id;
    const product = await Product.findOne({ where: { id: prodId } });
    if (!product) {
      return res.status(500).json({
        success: false,
        message: 'Productが見つかりません'
      });
    }
    await product.destroy();
    res.status(200).json({
      success: true,
      message: 'productを削除しました'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// TODO: ownerIDの紐付け