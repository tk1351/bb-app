const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  uid: { type: String },
  icon: { type: String },
  username: { type: String, max:[30] },
  bio: { type: String, max:[100] },
  birthday: { type: Date },
  address: { type: String },
  post_number: { type: Number },
  follow: { type: Number },
  follower: { type: Number },
  created: { type: Date, default: Date.now },
  updated: { type: Date }
})

module.exports = mongoose.model('profile', ProfileSchema)