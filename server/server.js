const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes')

const server = express()

// Middleware
server.use(bodyParser.json())

// Routes
server.use(express.static('public'))
server.use('/', routes)

module.exports = server
