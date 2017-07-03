const express = require('express')
const app = express()
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

let todos = [ {id: 1, todo: 'This is my first Todo'}, {id: 2, todo: 'This is second todo'} ]

app.get('/', (req, res) => {
  res.send(`${todos[0].id} ${todos[0].todo}`)
})

app.listen(process.env.PORT || 3000)

module.exports = app
