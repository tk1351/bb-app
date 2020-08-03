const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('./dev')

const verifyToken = (res, req, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]

  if(token) {
    jwt.verify(token, config.SECRET, function(error, decoded) {
      if(error) {
        return res.status(403).send({ message: "トークンの認証に失敗しました。" })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(401).send({ message: "トークンがありません。" })
  }
}

module.exports = verifyToken