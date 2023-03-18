const router = require('express').Router();
const ownerController = require('../controllers/owners');
const upload = require('../config/multer.config');

// ! ProductnのOwner
// * GET => /api/owners
router.get('/owners', ownerController.getOwners);
// * POST => /api/owners
router.post('/owners', upload.single('photo'), ownerController.postOwner);

module.exports = router;