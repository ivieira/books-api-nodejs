var BooksController = require('../controllers/books')()

module.exports = function (app) {
  var booksController = new BooksController(app.datasource.models.Books)

  app.route('/books')
    .get(function (req, res) {
      booksController.getAll()
        .then(function (response) {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })
    .post(function (req, res) {
      booksController.create(req.body)
        .then(function (response) {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  app.route('/books/:id')
    .get(function (req, res) {
      booksController.getById(req.params)
        .then(function (response) {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })
  .put(function (req, res) {
    booksController.update(req.body, req.params)
      .then(function (response) {
        res.status(response.statusCode)
        res.json(response.data)
      })
  })
  .delete(function (req, res) {
    booksController.delete(req.params)
    .then(function (response) {
      res.sendStatus(response.statusCode)
    })
  })
}
