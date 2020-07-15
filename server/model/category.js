const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: { type: String },
  main: { type: String },
  sub: { type: String },
  subsub: { type: String },
  created: { type: Date, default: Date.now },
  updated: { type: Date }
})

module.exports = mongoose.model('category', CategorySchema)