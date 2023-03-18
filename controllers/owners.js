const Owner = require('../models/Owner');

// ! ProductnのOwner
// * GET => /api/owners
exports.getOwners = async (req, res, next) => {
  try {
    const owners = await Owner.findAll();
    res.status(200).json({
      success: true,
      owners: owners
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
// * POST => /api/owners
exports.postOwner = async (req, res, next) => {
  try {
    const owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = req.file.path;
    await owner.save();
    res.status(200).json({
      success: true,
      message: 'Create a new owner'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};