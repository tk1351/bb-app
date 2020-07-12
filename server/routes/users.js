const express = require('express')
const router = express.Router()
const User = require('../model/user')

router.get('', (req, res) => {
  User.find({}, function(err, foundUser) {
    console.log(foundUser)
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

module.exports = router