var express = require('express')
var router = express.Router()

var submitMove = require('./db')

router.post('/submit', function (req, res) {
  return submitMove(Number(req.body.x), Number(req.body.y), Number(req.body.id), req.app.get('knex'))
    .then(result => res.send(result))
    .catch(err => res.status(500).send('Error: ' + err.message))
})

module.exports = router
