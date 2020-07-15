const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  uid: { type: String },
  title: { type: String, max:[30] },
  text: { type: String },
  image: { type: String },
  tag: { type: String },
  category: { type: String },
  url: { type: String },
  fav: { type: Number },
  created: { type: Date, default: Date.now },
  updated: { type: Date }
})

module.exports = mongoose.model('post', PostSchema)