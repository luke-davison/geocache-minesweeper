const express = require('express')
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const knex = require('knex')(config)

const routes = require('./routes')

const server = express()

server.set('knex', knex)

// Middleware
server.use(bodyParser.json())

// Routes
server.use(express.static('public'))
server.use('/', routes)

module.exports = server
