const express = require('express')
const router = express.Router()
const Post = require('../model/post')

router.get('', (req, res) => {
  Post.find({}, function(err, foundPost) {
    return res.json(foundPost)
  })
})

router.post('/searchPost', (req, res) => {
  const { queryParam } = req.body

  if(!queryParam) {
    Post.find({}, function(err, foundPost) {
      if(err) {
        return res.status(422).send({errors: [{title: 'search error', detail: 'エラー発生'}]})
      }
      if(!foundPost) {
        return res.status(422).send({errors: [{title: 'search error', detail: '投稿が存在しません'}]})
      }
      return res.status(400).send({errors: [{title: 'search error', detail: '検索ワードを入れてください。'}]})
    })
  } else {
    Post.find({$or:[
      {title: new RegExp(".*"+queryParam+".*")},
      {text: new RegExp( ".*"+queryParam+".*")},
    ]}, function(err, foundPost) {
      if(err) {
        return res.status(422).send({errors: [{title: 'search error', detail: 'エラー発生'}]})
      }
      if(!foundPost) {
        return res.status(422).send({errors: [{title: 'search error', detail: '投稿が存在しません。'}]})
      }
      return res.json(foundPost)
    })
  }
})

module.exports = router