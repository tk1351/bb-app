const express = require('express')
const router = express.Router()
const User = require('../model/user')

router.get('', (req, res) => {
  User.find({}, function(err, foundUser) {
    return res.json(foundUser)
  })
})

router.get('/:sub', (req, res) => {
  const sub = req.params.sub
  User.find({sub: sub}, function(err, foundUser) {
    return res.json(foundUser)
  })
})

router.get('/:userId', (req, res) => {
  const userId = req.params.userId
  User.findById(userId, function(err, foundUser) {
    if(err) {
      return res.status(422).send(
        { errors: [{ title: 'Error', detail: 'User not found' }]}
      )
    }
    return res.json(foundUser)
  })
})


router.delete('/:userId', (req, res) => {
  const userId = req.params.userId
  User.deleteOne({_id: userId})
    .then(function() {
      res.json({ delete: 'success' })
    })
})

router.post('', (req, res) => {
  const { nickname, sub, picture } = req.body

  if(!nickname) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'ユーザー名を入力してください'}]})
  }
  if(!sub) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'IDがありません'}]})
  }
  if(!picture) {
    return res.status(422).send({errors: [{title: 'user error', detail: '写真がありません'}]})
  }
  User.findOne({sub}, function(err, foundUser) {
    if(err) {
      return res.status(422).send({errors: [{title: 'user error', detail: 'エラーの発生'}]})
    }
    if(foundUser) {
      return res.status(422).send({errors: [{title: 'user error', detail: '既にユーザーが存在します'}]})
    }
    const user = new User({ nickname, sub, picture })
    
    user.save(function(err) {
      if(err) {
        console.log(err)
        return res.status(422).send({errors: [{title: 'user error', detail: 'エラー発生'}]})
      }
      return res.json({ "registerd": true })
    })
  })
})

module.exports = router