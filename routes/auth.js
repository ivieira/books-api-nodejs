var HttpStatus = require('http-status')
var jwt = require('jwt-simple')

module.exports = function (app) {
  var config = app.config
  var Users = app.datasource.models.Users

  app.post('/token', function (req, res) {
    if (req.body.email && req.body.password) {
      var email = req.body.email
      var password = req.body.password

      Users.findOne({where: {email}})
      .then(function (user) {
        if (Users.isPassword(user.password, password)) {
          var payload = {id: user.id}
          res.json({
            token: jwt.encode(payload, config.jwtSecret)
          })
        } else {
          res.sendStatus(HttpStatus.UNAUTHORIZED)
        }
      })
      .catch(function () {
        res.sendStatus(HttpStatus.UNAUTHORIZED)
      })
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED)
    }
  })
}
