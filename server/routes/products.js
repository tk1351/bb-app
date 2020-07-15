const express = require('express')
const router = express.Router()
const Product = require('../model/product')

router.get('', (req, res) => {
  Product.find({}, function(err, foundProduct) {
    return res.json(foundProduct)
  })
})

router.post('', (req, res) => {
  const ProductPost = new Product()

  ProductPost.name = req.body.name
  ProductPost.summary = req.body.summary
  ProductPost.brand = req.body.brand

  ProductPost.save(function(err) {
    if(err) {
      res.send(err)
    } else {
      res.json({ productpost: 'success' })
    }
  })
})

module.exports = router