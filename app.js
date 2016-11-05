var express = require('express')
var bodyParsre = require('body-parser')
var config = require('./config/config')()
var datasource = require('./config/datasource')
var booksRouter = require('./routes/books')
var usersRouter = require('./routes/users')

var app = express()

app.set('port', 3000)
app.use(bodyParsre.json())

app.config = config
app.datasource = datasource(app)

booksRouter(app)
usersRouter(app)

module.exports = function () {
  return app
}
