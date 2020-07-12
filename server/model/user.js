const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  // 後で入れる
  username: {
    type: String,
    required: true,
    // 字数制限
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    //字数制限
  },
  password: {
    type: String,
    required: true,
    // 字数制限
  }
});

//新規登録の際にパスワードをbcryptでハッシュ化をする

module.exports = mongoose.model('user', UserSchema)