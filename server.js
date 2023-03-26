const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const express = require('express');

// * ルーターのインポート
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const ownerRouter = require('./routes/owner');
const reviewRouter = require('./routes/review');
const paymentRouter = require('./routes/payment');

// * モデルのインポート
const User = require('./models/User');
const Product = require('./models/Product');
const Owner = require('./models/Owner');
const Category = require('./models/Category');
const Review = require('./models/Review');

const multer = require('multer');

const app = express();

// * appの設定
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'images')));

// * ルーターのマウント
app.use('/api', authRouter);
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', ownerRouter);
app.use('/api', reviewRouter);
app.use('/api', paymentRouter);

// * アソシエーション
Product.belongsTo(Owner, { constraints: true, onDelete: 'CASCADE' });
Owner.hasMany(Product);
Product.belongsTo(Category);
Category.hasMany(Product);
Product.hasMany(Review, { constraints: true, onDelete: 'CASCADE' });
Review.belongsTo(Product);
Review.belongsTo(User);

// * データベースと接続してサーバー起動
sequelize
  // .sync()
  .sync({ alter: true })
  // .sync({ force: true })
  .then(result => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running PORT:${process.env.PORT}`)
    });
  })
  .catch(err => {
    console.log(err);
  });