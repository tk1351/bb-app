const express = require('express')
const router = express.Router()
const Profile = require('../model/profile')
const expressJwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// const checkJwt = expressJwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://bb-app.us.auth0.com/.well-known/jwks.json`
//   }),

//   // Validate the audience and the issuer.
//   audience: 'ZaNQOhpAOFVAGiQv0GdUv664UcKOT3Ru',
//   issuer: `https://bb-app.us.auth0.com/`,
//   algorithms: ['RS256']
// })

router.get('', (req, res) => {
  Profile.find({}, function(err, foundProfile) {
    return res.json(foundProfile)
  })
})

router.post('', (req, res) => {
  const ProfilePost = new Profile()

  ProfilePost.username = req.body.username
  ProfilePost.bio = req.body.bio
  ProfilePost.uid = req.body.uid
  ProfilePost.birthday = req.body.birthday

  ProfilePost.save(function(err) {
    if(err) {
      res.send(err)
    } else {
      res.json({ profilepost: 'success' })
    }
  })
})

module.exports = router