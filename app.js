var express = require('express')
var bodyParsre = require('body-parser')
var config = require('./config/config')()
var datasource = require('./config/datasource')
var booksRouter = require('./routes/books')
var usersRouter = require('./routes/users')
var authRouter = require('./routes/auth')
var authorization = require('./auth')

var app = express()
app.config = config
app.datasource = datasource(app)
var auth = authorization(app)
app.auth = auth

app.set('port', 3000)
app.use(bodyParsre.json())
app.use(auth.initialize())

booksRouter(app)
usersRouter(app)
authRouter(app)

module.exports = function () {
  return app
}
