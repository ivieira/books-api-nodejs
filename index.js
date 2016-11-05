var app = require('./app')()

app.listen(app.get('port'), function () {
  console.log('Server listening at port %d', app.get('port'))
})
