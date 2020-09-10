const express = require('express');
const router = express.Router();
const Post = require('../model/post');

router.get('', (req, res) => {
  Post.find({}, function(err, foundPost) {
    return res.json(foundPost)
  })
})

router.get('/user/:uid', (req, res) => {
  const uid = req.params.uid;
  console.log(uid);
  Post.find({ uid: uid }, function (err, foundPost) {
    return res.json(foundPost);
  });
});

router.get('/:postId', (req, res) => {
  const postId = req.params.postId;
  Post.findById(postId, function (err, foundPost) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: 'Error', detail: 'Post not found' }] });
    }
    return res.json(foundPost);
  });
});

router.post('', (req, res) => {
  const ArticlePost = new Post();

  ArticlePost.uid = req.body.uid;
  ArticlePost.title = req.body.title;
  ArticlePost.text = req.body.text;
  ArticlePost.tags = req.body.tags;
  ArticlePost.category = req.body.category;
  ArticlePost.url = req.body.url;
  ArticlePost.created = req.body.created;

  console.log(req.body)

  ArticlePost.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json({ articlepost: 'success' });
    }
  });
});

router.delete('/:postId', (req, res) => {
  const postId = req.params.postId;
  Post.deleteOne({ _id: postId }).then(function () {
    res.json({ delete: 'success' });
  });
});

router.put('/:postId', (req, res) => {
  const postId = req.params.postId
  Post.findById(postId, function(err, foundPost) {
    if(err) {
      res.send(err)
    } else {
      foundPost.title = req.body.title
      foundPost.text = req.body.text
      foundPost.tags = req.body.tags
      foundPost.category = req.body.category
      foundPost.url = req.body.url

      foundPost.save(function(err) {
        if(err) {
          res.send(err)
        } else {
          res.json({ update: 'success' })
        }
      })
    }
  })
})

module.exports = router;
