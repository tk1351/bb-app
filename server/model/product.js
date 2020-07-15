const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: { type: String },
  image: { type: String },
  summary: { type: String, max:[100] },
  brand: { type: String },
  fav: { type: Number },
})

module.exports = mongoose.model('product', ProductSchema)