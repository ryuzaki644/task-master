const express = require('express')
const app = express()
const path = require('path')
// const favicon = require('serve-favicon')
const router = require('./routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(express.static(path.join(__dirname, 'public/build')))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/v1', router)
app.use(bodyParser.urlencoded({ extended: false }))


// this is action section


app.listen(process.env.PORT || 3000)
