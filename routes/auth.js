const router = require('express').Router();
const User = require('../models/User');

// ! ユーザー登録
// * UI表示
// * 機能部分
router.post('/signup', async (req, res, next) => {
  try {
    const user = await new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save();
    res.status(200).json({
      success: true
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;