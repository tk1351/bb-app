const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    max:[30, 'ユーザー名は最大30文字です']
  },
  sub: {
    type: String,
    required: true,
    unique: true
  },
  picture: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('user', UserSchema)