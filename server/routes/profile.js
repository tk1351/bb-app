const express = require('express')
const router = express.Router()
const Profile = require('../model/profile')

router.get('', (req, res) => {
  Profile.find({}, function(err, foundProfile) {
    return res.json(foundProfile)
  })
})

router.post('', (req, res) => {
  const ProfilePost = new Profile()

  ProfilePost.username = req.body.username
  ProfilePost.bio = req.body.bio

  ProfilePost.save(function(err) {
    if(err) {
      res.send(err)
    } else {
      res.json({ profilepost: 'success' })
    }
  })
})

module.exports = router