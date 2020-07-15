const express = require('express')
const router = express.Router()
const Post = require('../model/post')

router.get('', (req, res) => {
  Post.find({}, function(err, foundPost) {
    return res.json(foundPost)
  })
})

router.post('', (req, res) => {
  const ArticlePost = new Post()

  ArticlePost.title = req.body.title
  ArticlePost.text = req.body.text
  ArticlePost.tag = req.body.tag
  ArticlePost.category = req.body.category
  ArticlePost.url = req.body.url
  ArticlePost.created = req.body.created

  ArticlePost.save(function(err) {
    if(err) {
      res.send(err)
    } else {
      res.json({ articlepost: 'success' })
    }
  })
})

module.exports = router