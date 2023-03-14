const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./config/database');
const express = require('express');

// * ルーターのインポート
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const ownerRouter = require('./routes/owner');

// * モデルのインポート
const User = require('./models/User');
const Product = require('./models/Product');
const Owner = require('./models/Owner');
const Category = require('./models/Category');
const multer = require('multer');

const app = express();

// * appの設定
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * ルーターのマウント
app.use('/auth', authRouter);
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', ownerRouter);

// * アソシエーション
Product.belongsTo(Owner, { constraints: true, onDelete: 'CASCADE' });
Owner.hasMany(Product);
Product.belongsTo(Category);
Category.hasMany(Product);

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