const express = require('express')
const router = express.Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../config/dev')
const verifyToken = require('../config/verifyToken')

router.get('', (req, res) => {
  User.find({}, function(err, foundUser) {
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

router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body
  
  if(!username) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'ユーザー名を入力してください'}]})
  }
  if(!email) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'メールアドレスを入力してください'}]})
  }
  if(!password) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'パスワードを入力してください'}]})
  }
  if(password !== confirmPassword) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'パスワードを確認してください'}]})
  }
  //メールアドレスだけじゃなくてユーザー名も探すように変更
  User.findOne({email}, function(err, foundUser) {
    if(err) {
      return res.status(422).send({errors: [{title: 'user error', detail: 'エラー発生'}]})
    }
    if(foundUser) {
      return res.status(422).send({errors: [{title: 'user error', detail: '既にユーザーが存在します'}]})
    }
    const user = new User({ username, email, password })
    user.save(function(err) {
      if(err) {
        return res.status(422).send({errors: [{title: 'user error', detail: 'エラー発生'}]})
      }
      return res.json({ "registerd": true })
    })
  })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body

  if(!username) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'ユーザー名を入力してください'}]})
  }
  if(!password) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'パスワードを入力してください'}]})
  }
  User.findOne({ username }, function(err, foundUser) {
    if(err) {
      return res.status(422).send({errors: [{title: 'user error', detail: 'エラー発生'}]})
    }
    if(!foundUser) {
      return res.status(422).send({errors: [{title: 'user error', detail: 'ユーザーが存在しません'}]})
    }
    if(!foundUser.hasSamePassword(password)) {
      return res.status(422).send({errors: [{title: 'user error', detail: 'パスワードが正しくありません'}]})
    }
    const token = jwt.sign( {
      userId: foundUser.id,
      username: foundUser.username,
    }, config.SECRET, { expiresIn: '1h' })

    return res.json(token)
  })
})

router.delete('/:userId', (req, res) => {
  const userId = req.params.userId
  User.deleteOne({_id: userId})
    .then(function() {
      res.json({ delete: 'success' })
    })
})

module.exports = router