const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: { type: String },
  main: { type: String },
  sub: { type: String },
  subsub: { type: String }
}, {
  timestamps: true
})

module.exports = mongoose.model('category', CategorySchema)