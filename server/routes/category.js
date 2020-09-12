const express = require('express')
const router = express.Router()
const Category = require('../model/category')

router.get('', (req, res) => {
  Category.find({}, function(err, foundCategory) {
    return res.json(foundCategory)
  })
})

router.get('/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId
  Category.findById(categoryId, function (err, foundCategory) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: 'Error', detail: 'Category not found' }] })
    }
    return res.json(foundCategory)
  })
})

router.post('', (req, res) => {
  const CategoryPost = new Category()

  CategoryPost.name = req.body.name
  CategoryPost.main = req.body.main
  CategoryPost.sub = req.body.sub
  CategoryPost.subsub = req.body.subsub

  CategoryPost.save(function(err) {
    if(err) {
      res.send(err)
    } else {
      res.json({ categorypost: 'success' })
    }
  })
})

router.delete('/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId
  Category.deleteOne({ _id: categoryId }).then(function () {
    res.json({ delete: 'success' })
  })
})

module.exports = router