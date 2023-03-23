const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('../middlewares/verify-token');

// ! ユーザー登録
// * UI表示
// * 機能部分
router.post('/auth/signup', async (req, res, next) => {
  try {
    const user = await new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save();

    // JWTトークンに署名
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token: token
    });
  } catch (err) {
    console.log(err);
  }
});

// ! ログイン
// * UI表示
router.get('/auth/user', verifyToken, async (req, res, next) => {
  try {
    let foundUser = await User.findOne({ where: { id: req.user.id } });
    if (foundUser) {
      res.json({
        success: true,
        user: foundUser
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});
// * 機能部分


module.exports = router;