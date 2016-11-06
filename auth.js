var passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

module.exports = function (app) {
  var Users = app.datasource.models.Users
  var opts = {}

  opts.secretOrKey = app.config.jwtSecret
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()

  var strategy = new JwtStrategy(opts, function (payload, done) {
    Users.findById(payload.id)
    .then(function (user) {
      if (user) {
        return done(null, {
          id: user.id,
          email: user.email
        })
      }
      return done(null, false)
    })
    .catch(function (error) {
      done(error, null)
    })
  })

  passport.use(strategy)

  return {
    initialize: function () {
      return passport.initialize()
    },
    authenticate: function () {
      return passport.authenticate('jwt', app.config.jwtSession)
    }
  }
}
