const express = require('express')
const app = express()
const path = require('path')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, 'public/build')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello world!!!!')
})

app.listen(process.env.PORT || 3000)

module.exports = app
