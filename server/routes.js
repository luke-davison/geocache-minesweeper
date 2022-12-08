var express = require('express')
var router = express.Router()

var submitMove = require('./db')

router.post('/submit', function (req, res) {
  const result = submitMove(Number(req.body.x), Number(req.body.y), req.body.id)
  return res.send(result)
})

module.exports = router
