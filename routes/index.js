const express = require('express')
const todoRoute = require('./todoRoute')
const router = express.Router()

todoRoute(router)

module.exports = router
