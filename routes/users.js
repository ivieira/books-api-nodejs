var UsersController = require('../controllers/users')()

module.exports = function (app) {
  var usersController = new UsersController(app.datasource.models.Users)

  app.route('/users')
    .all(app.auth.authenticate())
    .get(function (req, res) {
      usersController.getAll()
        .then(function (response) {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })
    .post(function (req, res) {
      usersController.create(req.body)
        .then(function (response) {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  app.route('/users/:id')
    .all(app.auth.authenticate())
    .get(function (req, res) {
      usersController.getById(req.params)
        .then(function (response) {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })
  .put(function (req, res) {
    usersController.update(req.body, req.params)
      .then(function (response) {
        res.status(response.statusCode)
        res.json(response.data)
      })
  })
  .delete(function (req, res) {
    usersController.delete(req.params)
    .then(function (response) {
      res.sendStatus(response.statusCode)
    })
  })
}
