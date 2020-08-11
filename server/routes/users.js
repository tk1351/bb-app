const express = require('express')
const router = express.Router()
const User = require('../model/user')

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


router.delete('/:userId', (req, res) => {
  const userId = req.params.userId
  User.deleteOne({_id: userId})
    .then(function() {
      res.json({ delete: 'success' })
    })
})

module.exports = router