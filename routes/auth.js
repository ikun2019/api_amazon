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
// * 機能部分
router.post('/auth/login', async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ where: { email: req.body.email } });
    if (!foundUser) {
      return res.status(403).json({
        success: false,
        message: 'ユーザーが見つかりません'
      });
    }
    const isMatch = await foundUser.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: 'パスワードが一致しません'
      });
    }
    const token = foundUser.getSignedJwtToken();
    res.status(200).json({
      success: true,
      token
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message
    });
  }
});

// ! ユーザー情報の表示
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
module.exports = router;