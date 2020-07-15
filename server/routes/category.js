const express = require('express')
const router = express.Router()
const Category = require('../model/category')

router.get('', (req, res) => {
  Category.find({}, function(err, foundCategory) {
    return res.json(foundCategory)
  })
})

router.post('', (req, res) => {
  const CategoryPost = new Category()

  CategoryPost.name = req.body.name
  CategoryPost.main = req.body.main
  CategoryPost.sub = req.body.sub
  CategoryPost.subsub = req.body.subsub
  CategoryPost.created = req.body.created

  CategoryPost.save(function(err) {
    if(err) {
      res.send(err)
    } else {
      res.json({ categorypost: 'success' })
    }
  })
})

module.exports = router