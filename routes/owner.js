const router = require('express').Router();
const ownerController = require('../controllers/owners');

// ! ProductnのOwner
// * GET => /api/owners
router.get('/owners', ownerController.getOwners);
// * POST => /api/owners
router.post('/owners', ownerController.postOwner);

module.exports = router;